import { z } from "zod";

export const signedInUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
});

export type SignedInUser = z.infer<typeof signedInUserSchema>;
