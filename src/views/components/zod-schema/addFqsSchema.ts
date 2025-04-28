import { z } from "zod";

export const addFqsSchema = z.object({
  questionAr: z.string().min(1, { message: "العنوان مطلوب!" }),
  questionEn: z.string().min(1, { message: "Title is required!" }),
  answerAr: z.string().min(1, { message: "الوصف مطلوب!" }),
  answerEn: z.string().min(1, { message: "Description is required!" }),
});

export const updateFqsSchema = addFqsSchema.partial();
export type FqsFormValues = z.infer<typeof addFqsSchema>;
export type UpdateFqsFormValues = z.infer<typeof updateFqsSchema>;
