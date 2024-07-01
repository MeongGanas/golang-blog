"use client";
import { Discussion } from "@/models/interface";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DiscussionDetail() {
  const { discussionId } = useParams();
  const [discussion, setDiscussion] = useState<Discussion>();

  useEffect(() => {
    (async () => {
      const fetchedDiscussion = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/discussion/${discussionId}/detail`
      )
        .then((res) => res.json())
        .catch((err) => console.log(err));
      setDiscussion(fetchedDiscussion);
    })();
  }, [discussionId]);

  return (
    <div>
      <h1>oke</h1>
      {JSON.stringify(discussion)}
    </div>
  );
}
