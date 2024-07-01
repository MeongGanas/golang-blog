"use client";
import { Discussion } from "@/models/interface";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { discussionSchema } from "@/schema/formSchema";

export default function EditDiscussion() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [discussion, setDiscussion] = useState<Discussion>();
  const { discussionId } = useParams();

  const form = useForm<z.infer<typeof discussionSchema>>({
    resolver: zodResolver(discussionSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  useEffect(() => {
    (async () => {
      const fetchedDiscussion = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/discussion/${discussionId}/detail`
      )
        .then((res) => res.json())
        .catch((err) => console.log(err));

      form.reset({
        title: fetchedDiscussion.title,
        body: fetchedDiscussion.body,
      });

      setDiscussion(fetchedDiscussion);
    })();
  }, [discussionId, form.reset]);

  const EditDiscussion = (values: z.infer<typeof discussionSchema>) => {
    startTransition(async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/discussion/${discussionId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(values),
        }
      );

      const json = await response.json();

      if (!response.ok) {
        toast.error(json.msg || "Something went wrong!");
        return;
      }

      toast.success("Edit discussion success!");

      router.push("/discussions");
    });
  };

  return (
    <div>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Edit discussion</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(EditDiscussion)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          required
                          autoComplete="title"
                          placeholder="Your discussion title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="body"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Body</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          required
                          placeholder="Your discussion description"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                Edit discussion
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
