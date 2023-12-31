﻿"use server";
import { User } from "@/types";
import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { generateEmailBody, sendEmail } from "./../nodemailer/index";

export async function scrapeAndStoreProduct(productUrl: string) {
  if (!productUrl) return;

  try {
    connectToDB();
    const scrapedProduct = await scrapeAmazonProduct(productUrl);

    if (!scrapedProduct) return;

    let product = scrapedProduct;
    const existingProduct = await Product.findOne({
      url: scrapedProduct.productUrl,
    });

    if (existingProduct) {
      const updatedPriceHistory: any = [
        ...existingProduct.priceHistory,
        { price: scrapedProduct.currentPrice },
      ];

      product = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
      };
    }

    const newProduct = await Product.findOneAndUpdate(
      {
        url: scrapedProduct.productUrl,
      },
      product,
      { upsert: true, new: true }
    );

    revalidatePath(`/product/${newProduct._id}`);
  } catch (error: any) {
    console.log(`failed to create/update product: ${error.message}`);
  }
}

export async function getProductById(productId: string) {
  try {
    connectToDB();
    const product = await Product.findOne({
      _id: productId,
    });

    if (!product) return null;

    return product;
  } catch (error: any) {
    console.log(`failed to get product: ${error.message}`);
  }
}

export async function getAllProducts() {
  try {
    connectToDB();
    const products = await Product.find();
    return products;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function getSimilarProducts(productId: string) {
  try {
    connectToDB();
    const currentProduct = await Product.findById(productId);

    if (!currentProduct) return null;

    const similarProducts = await Product.find({
      _id: { $ne: productId },
    }).limit(3);

    return similarProducts;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function addUserEmailToProduct(productId: string, email: string) {
  try {
    connectToDB();
    const product = await Product.findById(productId);

    if (!product) return;

    const userExist = product.users.some((user: User) => user.email === email);

    if (!userExist) {
      product.users.push({ email });
      await product.save();

      const emailContent = await generateEmailBody(product, "WELCOME");

      await sendEmail(emailContent, [email]);
    }
  } catch (error: any) {
    console.log(error.message);
  }
}
