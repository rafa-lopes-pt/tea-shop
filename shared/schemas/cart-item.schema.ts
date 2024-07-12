import z from "zod";
import { ItemSchema } from "./item.schema";

export const CartItemSchema = ItemSchema.merge(
	z.object({
		quantity: z.number().positive("Invalid Quantity"),
	})
);

export type CartItemSchemaType = z.infer<typeof CartItemSchema>;
