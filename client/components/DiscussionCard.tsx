import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Discussion } from "@/models/interface";
import { formatDistanceToNow } from "date-fns";

export default function DiscussionCard({
  discussion,
}: {
  discussion: Discussion;
}) {
  const date = new Date(
    discussion.created_at.slice(0, discussion.created_at.length - 1)
  );
  return (
    <Link href={`/discussions/detail/${discussion.id}`} className="h-full">
      <Card x-chunk="dashboard-01-chunk-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-medium">
            {discussion.title}
          </CardTitle>
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
