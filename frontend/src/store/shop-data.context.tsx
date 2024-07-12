import { ReactNode, createContext, useState } from "react";
import { ShopItemSchemaType } from "../../../shared/schemas/shop-item.schema";
import CyclicArray from "../../../shared/types/ds/CyclicArray.ds";
import responseHandler from "../apis/responseHandler";
import RestAPI from "../apis/server.endpoints";

export type ShopDataCtxProperties = {
	items: CyclicArray<ShopItemSchemaType> | null;
	refresh: () => Promise<boolean>
};

export const ShopDataCtx = createContext<ShopDataCtxProperties | null>(null);

export const ShopDataCtxProvider = ({ children }: { children?: ReactNode }) => {
	const [items, setItems] = useState<CyclicArray<ShopItemSchemaType> | null>(
		null
	);

	async function refresh() {
		return responseHandler(RestAPI.getShopItems, async (res: Response) => {
			setItems(new CyclicArray(...(await res.json()).data))
			return true
		})
	}

	return (
		<ShopDataCtx.Provider value={{ items, refresh }}>{children}</ShopDataCtx.Provider>
	);
};
