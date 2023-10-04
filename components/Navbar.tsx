import { navIcons } from "@/lib/contants";
import Image from "next/image";
import Link from "next/link";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <header className="w-full">
      <nav className="py-4 flex items-center justify-between gap-1 px-5 sm:px-10">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/assets/icons/logo.svg"
            alt="logo"
            width={27}
            height={27}
          />
          <p className="text-2xl font-bold">
            Price<span className="text-brand">Wise</span>
          </p>
        </Link>

        <div className="flex items-center gap-5">
          {navIcons.map((icon, index) => (
            <icon.icon key={index} width={28} height={28} />
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
