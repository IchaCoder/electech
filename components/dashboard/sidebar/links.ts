import { IoHomeOutline, IoPersonOutline, IoSettingsOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";

export const nav_links = [
  {
    name: "Home",
    icon: IoHomeOutline,
    href: "/dashboard",
  },
  {
    name: "Cateogries",
    icon: BiCategory,
    href: "/dashboard/category",
  },
  {
    name: "Profile",
    icon: IoPersonOutline,
    href: "/dashboard/profile",
  },
  {
    name: "Settings",
    icon: IoSettingsOutline,
    href: "/dashboard/settings",
  },
];
