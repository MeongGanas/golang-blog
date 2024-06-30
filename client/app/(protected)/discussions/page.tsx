"use client";

import DiscussionCard from "@/components/DiscussionCard";
import { Discussion } from "@/models/interface";
import { useEffect, useState } from "react";

export default function Discussions() {
  const [discussions, setDiscussions] = useState<Array<Discussion>>([]);

  useEffect(() => {
    (async () => {
      const fetchDiscussion = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/discussion`
      )
        .then((res) => res.json())
        .catch((err) => console.log(err));

      setDiscussions(fetchDiscussion);
    })();
  }, []);

  const handleDelete = (id: number) => {
    setDiscussions(discussions.filter((discussion) => discussion.id !== id));
  };

  return (
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
  );
}
