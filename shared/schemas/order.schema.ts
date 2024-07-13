import z from "zod";
import ZodValidatorSchema from "./zod-validator-schema";
import { BillingInfoSchema } from "./billing-info.schema";
import { PaymentInfoSchema } from "./payment.schema";
import { CartItemSchema } from "./cart-item.schema";
export const OrderSchema = z.object({
	email: ZodValidatorSchema.email,
	items: z.array(CartItemSchema),
	billingInfo: BillingInfoSchema,
	// paymentInfo: PaymentInfoSchema,
});
export type OrderSchemaType = z.infer<typeof OrderSchema>;
