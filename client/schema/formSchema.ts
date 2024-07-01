import { z } from "zod";

export const discussionSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be contains 2 character or more",
  }),
  body: z.string().min(5, {
    message: "Body must be contains 2 character or more",
  }),
});
