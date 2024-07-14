import z from "zod";
import { BillingInfoSchema } from "./billing-info.schema";
import { CartItemSchema } from "./cart-item.schema";
import ZodValidatorSchema from "./zod-validator-schema";

export enum OrderState {
	PROCESSING = "processing",
	SHIPPED = "shipped",
	DELIVERED = "delivered",
}

export const OrderSchema = z
	.object({
		email: ZodValidatorSchema.email,
		items: z.array(CartItemSchema),
		billingInfo: BillingInfoSchema,
		state: z.enum([
			OrderState.PROCESSING,
			OrderState.SHIPPED,
			OrderState.DELIVERED,
		]),
	})
	.transform((e) => ({ ...e, createdAt: Date.now() }));
export type OrderSchemaType = z.infer<typeof OrderSchema>;
