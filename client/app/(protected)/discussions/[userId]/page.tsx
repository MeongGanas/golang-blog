"use client";
import DiscussionCard from "@/components/DiscussionCard";
import { Discussion, User } from "@/models/interface";
import { formatDistanceToNow } from "date-fns";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function MyDiscussion() {
  const { userId } = useParams();
  const [discussions, setDiscussions] = useState<Array<Discussion>>([]);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    (async () => {
      const fetchDiscussion = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/discussion/${userId}`
      )
        .then((res) => res.json())
        .catch((err) => console.log(err));

      const fetchedUser = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/${userId}`
      )
        .then((res) => res.json())
        .catch((err) => console.log(err));

      setUser(fetchedUser);
      setDiscussions(fetchDiscussion);
    })();
  }, [userId]);

  const handleDelete = (id: number) => {
    setDiscussions(discussions.filter((discussion) => discussion.id !== id));
  };

  return (
    <div>
      {user && (
        <div className="space-y-2 mb-5">
          <h1 className="text-2xl font-bold">{user.username}'s discussions</h1>
          <p className="text-muted-foreground text-sm">
            This user joined{" "}
            {formatDistanceToNow(
              new Date(user.created_at.slice(0, user.created_at.length - 1)),
              { addSuffix: true }
            )}
          </p>
        </div>
      )}
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {discussions &&
          discussions.map((discussion) => (
            <DiscussionCard
              discussion={discussion}
              onDelete={handleDelete}
              key={discussion.id}
            />
          ))}
      </div>
    </div>
  );
}
