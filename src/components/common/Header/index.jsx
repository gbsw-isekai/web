import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../../../components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { Button } from "src/components/ui/button";
import useToken from "src/hooks/useToken";
import { GiHorizonRoad } from "react-icons/gi";


export default function Header() {
  const [token] = useToken();

  return (
    <div className="border-b py-2">
      <div className="px-4 flex items-center max-w-6xl mx-auto">
        <div className="flex items-center">
          <GiHorizonRoad className="w-10 h-10" />
          <div className="ml-2">
            <Link to="/">
              지름길
            </Link>
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
