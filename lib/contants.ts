import { Heart, Search, User } from "lucide-react";

export const navIcons = [
  {
    icon: Search,
    alt: "search",
  },
  {
    icon: Heart,
    alt: "wishlist",
  },
  {
    icon: User,
    alt: "profile",
  },
] as const;

export const heroImages = [
  { imgUrl: "/assets/images/hero-1.svg", alt: "smart watch" },
  { imgUrl: "/assets/images/hero-2.svg", alt: "bag" },
  { imgUrl: "/assets/images/hero-3.svg", alt: "lamp" },
  { imgUrl: "/assets/images/hero-4.svg", alt: "air fryer" },
  { imgUrl: "/assets/images/hero-5.svg", alt: "chair" },
] as const;
