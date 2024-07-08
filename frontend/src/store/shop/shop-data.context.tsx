import { ReactNode, createContext, useEffect, useState } from "react";
import { ShopItemSchemaType } from "../../../../shared/schemas/shop-item.schema";
import CyclicArray from "../../../../shared/types/ds/CyclicArray.ds";
import responseHandler from "../../apis/responseHandler";
import RestAPI from "../../apis/server.endpoints";

type ShopDataCtxProperties = {
	items: CyclicArray<ShopItemSchemaType> | null;
};

export const ShopDataCtx = createContext<ShopDataCtxProperties | null>(null);

export const ShopDataProvider = ({ children }: { children?: ReactNode }) => {
	const [items, setItems] = useState<CyclicArray<ShopItemSchemaType> | null>(
		null
	);

	useEffect(() => {
		responseHandler(() => RestAPI.getShopItems(), async (res: Response) => {
			setItems(new CyclicArray(...(await res.json()).data))
		})

	}, []);

	return (
		<ShopDataCtx.Provider value={{ items }}>{children}</ShopDataCtx.Provider>
	);
};
