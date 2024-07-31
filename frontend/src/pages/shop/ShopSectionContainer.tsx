import { useContext, useEffect, useRef } from "react";
import useHorizontalScroll from "../../hooks/useHorizontalScroll";
import { ShopDataCtx, ShopDataCtxProperties } from "../../store/shop-data.context";
import ShopItem from "./ShopItem";

export default function ShopSectionContainer({
	className = "",
}: {
	className?: string;
}) {
	const { items, refresh } = useContext(ShopDataCtx) as ShopDataCtxProperties;

	//due to asynchronous code, and the state updates on hoc, this "fix" prevents
	//unwanted refetch calls to the backend
	const ref = useRef(true)
	useEffect(() => {
		if (ref.current) {
			refresh()
			ref.current = false
		}
	}, [ref.current])

	const containerRef = useHorizontalScroll<HTMLDivElement>()

	return (
		<div className={"shop-section__wrapper " + className}>

			{!items && <div className="shop-section shop-section--loading"><h4>Looking for the best Tea ...</h4></div>}

			{items && (
				<div ref={containerRef} className={"shop-section"} >
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
