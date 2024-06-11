import { useContext } from "react";
import { ShopDataCtx } from "../../store/shop/shop-data.context";
import ShopItem from "./ShopItem";

export default function ShopSectionContainer({
	className = "",
}: {
	className?: string;
}) {
	const shopItems = useContext(ShopDataCtx)?.data;


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
