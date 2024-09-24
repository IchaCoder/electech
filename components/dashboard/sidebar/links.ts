import { IoHomeOutline, IoPersonOutline, IoSettingsOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { FaChartLine } from "react-icons/fa6";

export const nav_links = {
  admin: [
    {
      name: "Home",
      icon: IoHomeOutline,
      href: "",
    },
    {
      name: "Results",
      icon: FaChartLine,
      href: "results",
    },
    {
      name: "Categogries",
      icon: BiCategory,
      href: "category",
    },
    {
      name: "Account",
      icon: IoPersonOutline,
      href: "account",
    },
    {
      name: "Settings",
      icon: IoSettingsOutline,
      href: "settings",
    },
  ],
  user: [
    {
      name: "Results",
      icon: FaChartLine,
      href: "results",
    },
    {
      name: "Account",
      icon: IoPersonOutline,
      href: "account",
    },
    {
      name: "Settings",
      icon: IoSettingsOutline,
      href: "settings",
    },
  ],
};
