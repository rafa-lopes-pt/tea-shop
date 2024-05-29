import { describe, expect, test } from "@jest/globals";
import { LoginSchemaType, LoginSchema } from "../schemas/login.schema";
import {
	ShopItemSchema,
	ShopItemSchemaType,
} from "../schemas/shop-item.schema";

describe("Schema Validation", () => {
	test("ShopItem", () => {
		const dummyShopItem: ShopItemSchemaType = {
			image: "1",
			name: "White tea leaves",
			price: 12.35,
			text: ["asdasd", "asdasd"],
		};

		const parsingData = ShopItemSchema.safeParse(dummyShopItem);
		console.log(parsingData.error);
		console.log("Item", parsingData.data);

		expect(parsingData.success).toBeTruthy();
		//
		dummyShopItem.price = 2.222;
		expect(ShopItemSchema.safeParse(dummyShopItem).success).toBeFalsy();
		dummyShopItem.price = 2.2;
		expect(ShopItemSchema.safeParse(dummyShopItem).success).toBeTruthy();
		dummyShopItem.price = 2;
		expect(ShopItemSchema.safeParse(dummyShopItem).success).toBeTruthy();
	});
});
