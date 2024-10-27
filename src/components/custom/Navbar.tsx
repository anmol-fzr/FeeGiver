import { LogOut, Settings } from "lucide-react";
import { logout } from "@/config/axiosConfig";
import {
  Button,
  ThemeToggle,
  Avatar,
  AvatarImage,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  Link,
} from "@/components";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/services";

const Navbar = () => {
  const navigate = useNavigate();
  const toSettings = () => navigate("/settings/profile");

  const { data } = useQuery({
    queryFn: API.PROFILE.GET,
    queryKey: ["PROFILE"],
    refetchOnWindowFocus: false,
  });

  const avatar = data?.data.avatar;
  const fullName = data?.data.details.name;
  const name = fullName?.slice(0, 2).toUpperCase();

  return (
    <nav className="h-14 border-b flex items-center p-4 justify-between gap-4 max-w-theme !z-10">
      <Link to="/">Home</Link>

      <div className="flex items-center gap-4">
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="link" size="icon">
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src={
                    avatar ??
                    `https://avatar.iran.liara.run/public/${fullName?.length}`
                  }
                />
                <AvatarFallback>{name}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="flex flex-col gap-1 w-40">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={toSettings}>
                <Settings /> Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>
                <LogOut /> Logout
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export { Navbar };
