import React, { useContext } from "react";
import { ShopItemSchemaType } from "../../../../shared/schemas/shop-item.schema";
import { useNavigate } from "react-router-dom";
import { ShopDataCtx } from "../../store/shop/shop-data.context";
import CyclicArray from "../../../../shared/types/CyclicArray.class";

export default function ShopItem({ data }: { data: ShopItemSchemaType }) {
	const navigate = useNavigate();
	const shopData = useContext(ShopDataCtx)
		?.data as CyclicArray<ShopItemSchemaType>;

	const handleShopItemDisplay = () => {
		shopData.currentIdx = shopData.findIndex((e) => e.name === data.name);
		navigate(`/item/${data.name}`);
	};

	return (
		<div
			className="shop-item"
			onClick={handleShopItemDisplay}>
			<img src={data.image} />
			<span className="shop-item__title">
				<h2>{data.name}</h2>
			</span>
			<p className="shop-item__description">{data.text[0]}</p>
		</div>
	);
}
