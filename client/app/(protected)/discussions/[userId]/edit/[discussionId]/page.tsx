"use client";
import { Discussion } from "@/models/interface";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditDiscussion() {
  const [discussion, setDiscussion] = useState<Discussion>();
  const { discussionId } = useParams();

  useEffect(() => {
    (async () => {
      const fetchedDiscussion = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/discussion/${discussionId}/detail`
      )
        .then((res) => res.json())
        .catch((err) => console.log(err));

      setDiscussion(fetchedDiscussion);
    })();
  });

  return (
    <div>
      {JSON.stringify(discussion)}
      <h1>Hello</h1>
    </div>
  );
}
