"use client";
import { scrapeAndStoreProduct } from "@/lib/actions";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type Props = {};

const isValidAmazonProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    if (
      hostname.includes("amazon.") ||
      hostname.includes("amazon.com") ||
      hostname.endsWith("amazon")
    ) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const SearchBar = (props: Props) => {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    const isValidLink = isValidAmazonProductURL(searchPrompt);
    if (!isValidLink) return toast.error("Please provide a valid amazon link");

    try {
      setIsLoading(true);
      toast.loading("Scraping...");
      // scrape the product page
      const product = await scrapeAndStoreProduct(searchPrompt);
    } catch (error: any) {
      console.log("Something went wrong" + error.message);
    } finally {
      toast.dismiss();
      setIsLoading(false);
    }
  };
  return (
    <div className="mt-12 flex w-full max-w-lg items-center space-x-2">
      <Input
        type="search"
        placeholder="Enter product link"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
      />
      <Button disabled={isLoading} type="submit" onClick={handleSubmit}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
