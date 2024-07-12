import z from "zod";
import ZodValidatorSchema from "./zod-validator-schema";
import { ItemSchema } from "./item.schema";
export const ShopItemSchema = ItemSchema.merge(
	z.object({
		slogan: ZodValidatorSchema.alphabeticWithWhiteSpaces,
		text: ZodValidatorSchema.alphanumericWithWhiteSpaces,
		benefits: ZodValidatorSchema.alphanumericWithWhiteSpaces,
		pairings: ZodValidatorSchema.alphanumericWithWhiteSpaces,
	})
);

export type ShopItemSchemaType = z.infer<typeof ShopItemSchema>;
