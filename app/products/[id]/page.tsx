import PriceInfoCard from "@/components/PriceInfoCard";
import TrackModal from "@/components/TrackModal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProductById, getSimilarProducts } from "@/lib/actions";
import { formatNumber } from "@/lib/utils";
import { Product } from "@/types";
import {
  ArrowBigDown,
  ArrowBigUp,
  Bookmark,
  GanttChartSquareIcon,
  HeartIcon,
  LineChartIcon,
  Share2Icon,
  ShoppingBagIcon,
  Star,
  TagIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: {
    id: string;
  };
};

const page = async ({ params }: Props) => {
  const product: Product = await getProductById(params.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const similarProducts = await getSimilarProducts(params.id);
  return (
    <div className="px-6 md:px-20 py-24">
      <div className="flex xl:flex-row flex-col items-center justify-center gap-28">
        <div>
          <Image
            alt={product.title}
            src={product.image}
            width={580}
            height={400}
            className="mx-auto object-contain rounded-lg"
          />
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
            <div className="flex flex-col gap-3">
              <p className="text-2xl font-semibold">{product.title}</p>
              <Link
                href={product.url}
                className="text-brand opacity-50 hover:text-brand-accent hover:underline hover:opacity-60"
                target="_blank">
                Visit Product
              </Link>
            </div>

            <div className="flex items-center gap-3 border-b pb-4 w-full">
              <div className="px-2 py-1 rounded-lg bg-rose-500/10">
                <HeartIcon className="text-brand" width={20} height={20} />
                {product.reviewsCount}
              </div>
              <div className="p-2 bg-slate-200 rounded">
                <Bookmark className="text-brand" width={20} height={20} />
              </div>
              <div className="p-2 bg-slate-200 rounded">
                <Share2Icon className="text-brand" width={20} height={20} />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between border-b pb-4 w-full ">
            <div className="flex flex-col gap-2">
              <p className="text-3xl  font-bold">
                {product.currency} {formatNumber(product.currentPrice)}
              </p>
              <p className="text-lg font-bold opacity-50 line-through">
                {product.currency} {formatNumber(product.originalPrice)}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex gap-3 ">
                <div className="flex items-center gap-1 bg-yellow-400/10 px-2 py-1">
                  <Star className="text-yellow-500" width={20} height={20} />
                  <p>{product.stars}</p>
                </div>

                <div className="flex items-center gap-1 bg-slate-400/10 px-2 py-1">
                  <GanttChartSquareIcon
                    className="text-slate-500"
                    width={20}
                    height={20}
                  />
                  <p>{product.reviewsCount} reviews</p>
                </div>
              </div>

              <p className="text-muted-foreground">
                <span className="text-brand">93%</span> of buyers have
                recommended this
              </p>
            </div>
          </div>
          <div className="my-7 flex flex-col gap-5 w-full">
            <div className="flex gap-5 items-center justify-center flex-wrap w-full">
              <PriceInfoCard
                title="Current Price"
                icon={TagIcon}
                value={`${product.currency} ${formatNumber(
                  product.currentPrice
                )}`}
                iconColor="text-blue-500"
              />
              <PriceInfoCard
                title="Average Price"
                icon={LineChartIcon}
                value={`${product.currency} ${formatNumber(
                  product.averagePrice
                )}`}
                iconColor="text-slate-600"
              />
              <PriceInfoCard
                title="Highest Price"
                icon={ArrowBigUp}
                value={`${product.currency} ${formatNumber(
                  product.highestPrice
                )}`}
                iconColor="text-green-500"
              />
              <PriceInfoCard
                title="Lowest Price"
                icon={ArrowBigDown}
                value={`${product.currency} ${formatNumber(
                  product.lowestPrice
                )}`}
                iconColor="text-rose-500"
              />
            </div>
          </div>

          <Button variant={"default"} className="w-full text-lg font-bold">
            <TrackModal productId={params.id} />
          </Button>

          <Link href={"/"} className="mt-8">
            <Button className="w-full bg-black text-lg font-bold py-4">
              <ShoppingBagIcon className="mr-2 w-6" /> Shop Now
            </Button>
          </Link>
        </div>
      </div>

      {similarProducts && similarProducts?.length > 0 && (
        <div className="py-14 flex flex-col gap-2 w-full">
          <p>Similar Products</p>

          <div className="flex flex-wrap gap-10 mt-7 w-full">
            {similarProducts.map((item) => (
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
        </div>
      )}
    </div>
  );
};

export default page;
