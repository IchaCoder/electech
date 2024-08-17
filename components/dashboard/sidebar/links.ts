import { IoHomeOutline, IoPersonOutline, IoSettingsOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { FaChartLine } from "react-icons/fa6";

export const nav_links = [
  {
    name: "Home",
    icon: IoHomeOutline,
    href: "/dashboard",
  },
  {
    name: "Results",
    icon: FaChartLine,
    href: "/dashboard/results",
  },
  {
    name: "Cateogries",
    icon: BiCategory,
    href: "/dashboard/category",
  },
  {
    name: "Account",
    icon: IoPersonOutline,
    href: "/dashboard/account",
  },
  {
    name: "Settings",
    icon: IoSettingsOutline,
    href: "/dashboard/settings",
  },
];
