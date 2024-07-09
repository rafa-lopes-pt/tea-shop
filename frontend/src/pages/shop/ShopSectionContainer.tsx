import { useContext, useEffect } from "react";
import { ShopDataCtx, ShopDataCtxProperties } from "../../store/shop/shop-data.context";
import ShopItem from "./ShopItem";

export default function ShopSectionContainer({
	className = "",
}: {
	className?: string;
}) {
	const { items, refresh } = useContext(ShopDataCtx) as ShopDataCtxProperties;

	useEffect(() => {
		refresh()
	}, [])

	return (
		<div className={"shop-section__wrapper " + className}>
			{/* FIX: Add skelleton while loading */}
			{!items && <p>LOADING... PLZ FIX ME</p>}

			{items && (
				<div className={"shop-section"}>
					{items.map((e, i) => (
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
