import { LogOut, Settings } from "lucide-react";
import { logout } from "@/config/axiosConfig";
import {
  Button,
  ThemeToggle,
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const toSettings = () => navigate("/settings/profile");

  return (
    <nav className="h-14 border-b flex items-center p-4 justify-end gap-4">
      <ThemeToggle />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="link" size="icon">
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://avatars.githubusercontent.com/u/88301047?v=4" />
              <AvatarFallback>CN</AvatarFallback>
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
    </nav>
  );
};

export { Navbar };
