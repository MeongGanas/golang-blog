import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Discussion } from "@/models/interface";
import { formatDistanceToNow } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";
import toast from "react-hot-toast";
import { useUser } from "@/app/store";

export default function DiscussionCard({
  discussion,
  onDelete,
}: {
  discussion: Discussion;
  onDelete: (id: number) => void;
}) {
  const user = useUser((state) => state.user);

  const date = new Date(
    discussion.created_at.slice(0, discussion.created_at.length - 1)
  );

  const deleteDiscussion = async (id: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/discussion/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        toast.success("Delete discussion success!");
        onDelete(id);
      })
      .catch((err) => toast.error(`Delete discussion fail! ${err.msg}`));
  };

  return (
    <Link href={`/discussions/detail/${discussion.id}`} className="h-full">
      <Card x-chunk="dashboard-01-chunk-0">
        <CardHeader className="h-[72px] flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-medium">
            {discussion.title}
          </CardTitle>
          {user && user.id == discussion.userId && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <MoreHorizontal className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link
                    href={`/discussions/${user != null ? user.id : ""}/edit/${
                      discussion.id
                    }`}
                    className="w-full"
                  >
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-0">
                  <Button
                    variant={"ghost"}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteDiscussion(discussion.id);
                    }}
                    className="h-fit p-0 font-normal w-full justify-normal py-1.5 px-2"
                  >
                    Delete
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-xs text-muted-foreground">
            By. {discussion.user.username}
          </p>

          <p className="text-sm mb-3 text-muted-foreground">
            {discussion.body.split(" ").slice(0, 3).join(" ")}...
          </p>
          <p className="text-xs">
            {formatDistanceToNow(date, { addSuffix: true })}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
