import z from "zod";
import ZodValidatorSchema from "./zod-validator-schema";

export const ItemSchema = z.object({
	id: ZodValidatorSchema.requiredNonEmptyString,
	image: ZodValidatorSchema.requiredNonEmptyString,
	name: ZodValidatorSchema.alphanumericWithWhiteSpaces,
	price: ZodValidatorSchema.price,
});

export type ItemSchemaType = z.infer<typeof ItemSchema>;
