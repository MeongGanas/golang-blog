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

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      {discussions &&
        discussions.map((discussion) => (
          <DiscussionCard discussion={discussion} key={discussion.id} />
        ))}
    </div>
  );
}
