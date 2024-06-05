import z from "zod";
import ZodValidatorSchema from "./zod-validator-schema";

export const ShopItemSchema = z
	.object({
		image: ZodValidatorSchema.requiredNonEmptyString,
		name: ZodValidatorSchema.alphanumericWithWhiteSpaces,
		slogan: ZodValidatorSchema.alphabeticWithWhiteSpaces,
		price: ZodValidatorSchema.price,
		text: ZodValidatorSchema.alphanumericWithWhiteSpaces,
		benefits: ZodValidatorSchema.alphanumericWithWhiteSpaces,
		pairings: ZodValidatorSchema.alphanumericWithWhiteSpaces,
	})
	.required();

export type ShopItemSchemaType = z.infer<typeof ShopItemSchema>;
