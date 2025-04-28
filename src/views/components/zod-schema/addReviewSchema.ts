import { z } from "zod";

export const addReviewSchema = z.object({
  descriptionAr: z.string().min(1, { message: "الوصف مطلوب!" }),
  descriptionEn: z.string().min(1, { message: "Description is required!" }),
  images: z
    .array(z.instanceof(File), { message: "Invalid file format!" })
    .min(1, { message: "At least one image must be selected!" }),
});

export const updateReviewSchema = addReviewSchema.partial();
export type ReviewFormValues = z.infer<typeof addReviewSchema>;
export type UpdateReviewFormValues = z.infer<typeof updateReviewSchema>;
