import axios from "axios";
import * as cheerio from "cheerio";
import { toast } from "sonner";
import { extractCurrency, extractPrice } from "../utils";

export async function scrapeAmazonProduct(productUrl: string) {
  if (!productUrl) return;

  // BrightData proxy configuration
  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const host = String(process.env.BRIGHT_DATA_HOST);
  const port = Number(process.env.BRIGHT_DATA_PORT);
  const sessionId = (1000000 * Math.random()) | 0;
  const options = {
    auth: {
      username: `${username}-session-${sessionId}`,
      password,
      host,
      port,
      rejectUnauthorized: false,
    },
  };

  try {
    // fetch the product page
    const response = await axios.get(productUrl, options);
    const $ = cheerio.load(response.data);
    const title = $("#productTitle").text().trim();
    const currentPrice = extractPrice(
      $(".priceToPay span.a-price-whole"),
      $("a.size.base.a-color-price"),
      $(".a-button-selected .a-color-base")
    );
    const originalPrice = extractPrice(
      $("#priceblock_ourprice"),
      $(".a-price.a-text-price span.a-offscreen"),
      $("#listprice"),
      $("#priceblock_dealprice"),
      $(".a-size-base.a-color-price")
    );

    const outOfStock =
      $("#availability span").text().trim().toLowerCase() ===
      "currently unavailable";

    const image =
      $("#imgBlkFront").attr("data-a-dynamic-image") ||
      $("#landingImage").attr("data-a-dynamic-image") ||
      "{}";

    const imageUrls = Object.keys(JSON.parse(image));

    const currency = extractCurrency($(".a-price-symbol"));

    const discountRate = $(".savingsPercentage").text().replace(/[-%]/g, "");

    // construct data object with scraped data
    const data = {
      productUrl,
      title,
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      isOutOfStock: outOfStock,
      image: imageUrls[0],
      currency: currency || "$",
      discountRate: Number(discountRate),
      priceHistory: [],
      category: "default",
      reviewsCount: 100,
      stars: 4.3,
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      averagePrice: Number(currentPrice) || Number(originalPrice),
    };

    return data;
  } catch (error: any) {
    toast.error(`failed to scrape product: ${error.message}`);
  }
}
