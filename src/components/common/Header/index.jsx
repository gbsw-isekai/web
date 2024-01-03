import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../../../components/ui/navigation-menu";

import { cn } from "src/lib/utils";
import { Terminal } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import useToken from "src/hooks/useToken";

// const components = [
//   {
//     title: "Alert Dialog",
//     href: "/docs/primitives/alert-dialog",
//     description:
//       "A modal dialog that interrupts the user with important content and expects a response.",
//   },
//   {
//     title: "Hover Card",
//     href: "/docs/primitives/hover-card",
//     description:
//       "For sighted users to preview content available behind a link.",
//   },
//   {
//     title: "Progress",
//     href: "/docs/primitives/progress",
//     description:
//       "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
//   },
//   {
//     title: "Scroll-area",
//     href: "/docs/primitives/scroll-area",
//     description: "Visually or semantically separates content.",
//   },
//   {
//     title: "Tabs",
//     href: "/docs/primitives/tabs",
//     description:
//       "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
//   },
//   {
//     title: "Tooltip",
//     href: "/docs/primitives/tooltip",
//     description:
//       "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
//   },
// ];

export default function Header() {
  const [token] = useToken();

  return (
    <div className="border-b py-2">
      <div className="px-4 flex items-center max-w-6xl mx-auto">
        <div className="flex items-center">
          <Terminal className="w-6 h-6" />
          <div className="ml-2">
            <Link to="/">GBSWJOB</Link>
          </div>
        </div>
        <NavigationMenu className="ml-6">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/questions">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Q&A
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/companies">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  기업정보탐색
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex-1"></div>
        <Link to={token ? "/logout" : "/login"} className="self-end">
          <Button className="w-24">{token ? "로그아웃" : "로그인"}</Button>
        </Link>
      </div>
    </div>
  );
}
