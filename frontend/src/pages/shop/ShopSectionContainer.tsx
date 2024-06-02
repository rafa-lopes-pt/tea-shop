import React, { useContext, useEffect, useState } from "react";
import ShopItem from "./ShopItem";
import ServerAPI from "../../apis/server.endpoints";
import { ShopItemSchemaType } from "../../../../shared/schemas/shop-item.schema";
import { ShopDataCtx } from "../../store/shop/shop-data.context";

export default function ShopSectionContainer({
	className = "",
}: {
	className?: string;
}) {
	const shopItems = useContext(ShopDataCtx)?.data;
	// @ts-ignore
	console.log(shopItems);

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
