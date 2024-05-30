import React, { useEffect, useState } from "react";
import ShopItem from "./ShopItem";
import ServerAPI from "../../apis/server.endpoints";
import { ShopItemSchemaType } from "../../../../shared/schemas/shop-item.schema";

export default function ShopSectionContainer({
	className = "",
}: {
	className?: string;
}) {
	const [shopItems, setShopItems] = useState<ShopItemSchemaType[] | null>(
		null
	);

	useEffect(() => {
		// should the shop sections get more complex, and each section should be
		// fetched separately, ShopSectionContainer should accept a section name to be used in the fetch process
		ServerAPI.getShopItems().then((res) => setShopItems(res));
	}, []);

	return (
		<div className={"shop-section__wrapper " + className}>
			{/* FIX: Add skelleton while loading */}
			{!shopItems && <p>LOADING... PLZ FIX ME</p>}

			{shopItems && (
				<div className={"shop-section"}>
					{shopItems.map((e, i) => (
						<ShopItem
							data={e}
							key={`shop-item-${e?.name}-${e?.price}-${i}`}
						/>
					))}
				</div>
			)}
		</div>
	);
}
