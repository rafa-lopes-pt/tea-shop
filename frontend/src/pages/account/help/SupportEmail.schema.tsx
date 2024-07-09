import z from "zod"
import ZodValidatorSchema from "../../../../../shared/schemas/zod-validator-schema"
export const SupportEmailSchema = z.object({
    to: ZodValidatorSchema.email,
    body: ZodValidatorSchema.alphanumericWithWhiteSpaces.max(256, "Maximum 256 characters")
})

export type SupportEmailSchemaType = z.infer<typeof SupportEmailSchema>
