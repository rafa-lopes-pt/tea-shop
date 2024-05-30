import React from "react";
import { ShopItemSchemaType } from "../../../../shared/schemas/shop-item.schema";
import { useNavigate } from "react-router-dom";

export default function ShopItem({ data }: { data: ShopItemSchemaType }) {
	const navigate = useNavigate();

	return (
		<div
			className="shop-item"
			onClick={() => navigate(`item/${data.name}`)}>
			<img src={data.image} />
			<span className="shop-item__title">
				<h2>{data.name}</h2>
			</span>
			<p className="shop-item__description">{data.text[0]}</p>
		</div>
	);
}
