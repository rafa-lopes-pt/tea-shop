import z from "zod"
import ZodValidatorSchema from "./zod-validator-schema"
export const SupportEmailSchema = z.object({
    user: ZodValidatorSchema.email,
    message: ZodValidatorSchema.alphanumericWithWhiteSpaces.max(256, "Maximum 256 characters")
})

export type SupportEmailSchemaType = z.infer<typeof SupportEmailSchema>
