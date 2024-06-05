import { ReactNode, createContext, useEffect, useState } from "react";
import { ShopItemSchemaType } from "../../../../shared/schemas/shop-item.schema";
import CyclicArray from "../../../../shared/types/ds/CyclicArray.ds";
import ServerAPI from "../../apis/server.endpoints";

type ShopDataCtxProperties = {
	data: CyclicArray<ShopItemSchemaType> | null;
};

export const ShopDataCtx = createContext<ShopDataCtxProperties | null>(null);

/*

NOTE: Write small note about implementing a reducer to manage sections

*/

export const ShopDataProvider = ({ children }: { children?: ReactNode }) => {
	const [data, setData] = useState<CyclicArray<ShopItemSchemaType> | null>(
		null
	);

	useEffect(() => {
		ServerAPI.getShopItems().then((res: any) => {
			setData(new CyclicArray(...res));
		});
	}, []);

	return (
		<ShopDataCtx.Provider value={{ data }}>{children}</ShopDataCtx.Provider>
	);
};
