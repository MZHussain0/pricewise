import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";

type Props = {
  title: string;
  icon: LucideIcon;
  value: string;
  iconColor: string;
};

const PriceInfoCard = ({ title, icon: Icon, value, iconColor }: Props) => {
  return (
    <Card className={` w-48`}>
      <CardContent className="pt-4">
        <p>{title}</p>
      </CardContent>
      <CardFooter>
        <div className=" flex items-center gap-2">
          <Icon
            width={24}
            height={24}
            className={`${iconColor}`}
            fill="currentColor"
          />
          <p className="text-xl font-bold">{value}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PriceInfoCard;
