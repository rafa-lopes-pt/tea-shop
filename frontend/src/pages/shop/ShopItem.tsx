import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopItemSchemaType } from "../../../../shared/schemas/shop-item.schema";
import CyclicArray from "../../../../shared/types/ds/CyclicArray.ds";
import { ShopDataCtx } from "../../store/shop/shop-data.context";

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
			<div className="shop-item__description">
				<p>{data.text}</p></div>
		</div>
	);
}
