import HeroCarousel from "@/components/HeroCarousel";
import SearchBar from "@/components/SearchBar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <section className="px-6 md:px-20 py-24">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="flex text-brand items-center gap-2">
              Smart shopping start here
              <ArrowRight
                width={16}
                height={16}
                className="text-brand-accent"
              />
            </p>

            <h1 className="text-6xl font-bold pt-8">
              Unleash the power of <br />
              <span className="text-brand">PriceWise</span>
            </h1>

            <p className="mt-6 text-muted-foreground ">
              tay Informed and Save Money with PriceWise: Track and Compare
              Prices of Your Favorite Products in Real-Time
            </p>

            <SearchBar />
          </div>

          <HeroCarousel />
        </div>
      </section>

      <section className="flex flex-col gap-10 px-6 md:px-20 py-24">
        <h2 className="text-2xl font-bold">Trending</h2>

        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {["Apple", "Samsung", "Xiaomi"].map((item) => (
            <Card key={item} title={item}>
              <CardHeader>
                <CardTitle>{item}</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
