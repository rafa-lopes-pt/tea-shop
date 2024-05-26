import React from "react";
import ShopItem from "./ShopItem";
//IMPROVE: list shoudl be of type shopItem[]
export default function ShopSectionContainer({
	list,
	className = "",
}: {
	list: any[];
	className?: string;
}) {
	return (
		<div className={"shop-section__wrapper " + className}>
			<div className={"shop-section"}>
				{list.map((e, i) => (
					<ShopItem
						data={e}
						key={`shop-item-${e?.name}-${e?.price}-${i}`}
					/>
				))}
			</div>
		</div>
	);
}
