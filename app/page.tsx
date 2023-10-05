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
import { getAllProducts } from "@/lib/actions";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const allProducts = await getAllProducts();
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
          {allProducts?.map((item) => (
            <Card key={item._id} title={item.title} className="w-96">
              <Link href={`/products/${item._id}`}>
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <Image
                    alt={item.title}
                    src={item.image}
                    width={250}
                    height={250}
                    className="object-contain max-h-[250px] w-full h-full bg-transparent"
                  />
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <p className="text-muted-foreground uppercase text-base">
                    {item.category}
                  </p>

                  <p className="text-lg font-semibold text-brand">
                    <span>{item?.currency}</span>{" "}
                    <span>{item?.currentPrice}</span>
                  </p>
                </CardFooter>
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
