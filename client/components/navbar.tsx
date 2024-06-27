import { CircleUser, Menu, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import { clearUser, useUser, useUserDispatch } from "@/app/store";

export default function Navbar() {
  const user = useUser((state) => state.user);
  const dispatch = useUserDispatch();

  const router = useRouter();
  const currentPath = usePathname();

  const logout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then(() => {
        dispatch(clearUser());
        router.push("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base mr-8"
        >
          <span>Discussion App</span>
        </Link>
        <Link
          href="/"
          className={`${
            currentPath === "/" ? "text-foreground" : "text-muted-foreground"
          } transition-colors hover:text-foreground`}
        >
          Home
        </Link>
        <Link
          href="/discussions"
          className={`${
            currentPath === "/discussions"
              ? "text-foreground"
              : "text-muted-foreground"
          } transition-colors hover:text-foreground`}
        >
          Discussions
        </Link>
        <Link
          href="/discussions/create"
          className={`${
            currentPath === "/discussions/create"
              ? "text-foreground"
              : "text-muted-foreground"
          } transition-colors hover:text-foreground`}
        >
          Create Discussions
        </Link>
        <Link
          href={`/discussions/${user?.id}`}
          className={`${
            currentPath === `/discussions/${user?.id}`
              ? "text-foreground"
              : "text-muted-foreground"
          } transition-colors hover:text-foreground`}
        >
          My Discussions
        </Link>
        <Link
          href="/settings"
          className={`${
            currentPath === "/settings"
              ? "text-foreground"
              : "text-muted-foreground"
          } transition-colors hover:text-foreground`}
        >
          Settings
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <span>Discussion App</span>
            </Link>
            <Link
              href="/"
              className={`${
                currentPath === "/"
                  ? "text-foreground"
                  : "text-muted-foreground"
              } transition-colors hover:text-foreground`}
            >
              Home
            </Link>
            <Link
              href="/discussions"
              className={`${
                currentPath === "/discussion"
                  ? "text-foreground"
                  : "text-muted-foreground"
              } transition-colors hover:text-foreground`}
            >
              Discussions
            </Link>
            <Link
              href="/discussions/create"
              className={`${
                currentPath === "/discussions/create"
                  ? "text-foreground"
                  : "text-muted-foreground"
              } transition-colors hover:text-foreground`}
            >
              Create Discussions
            </Link>
            <Link
              href={`/discussions/${user?.id}`}
              className={`${
                currentPath === `/discussions/${user?.id}`
                  ? "text-foreground"
                  : "text-muted-foreground"
              } transition-colors hover:text-foreground`}
            >
              My Discussions
            </Link>
            <Link
              href="/settings"
              className={`${
                currentPath === "/settings"
                  ? "text-foreground"
                  : "text-muted-foreground"
              } transition-colors hover:text-foreground`}
            >
              Settings
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full lg:w-fit items-center gap-4 md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search other user..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              {user ? user.username : "My Account"}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/settings" className="w-full">
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button
                variant={"ghost"}
                onClick={logout}
                className="h-fit p-0 font-normal w-full justify-normal"
              >
                Logout
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
