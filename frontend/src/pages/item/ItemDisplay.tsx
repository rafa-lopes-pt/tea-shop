import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShopDataCtx } from "../../store/shop/shop-data.context";

export default function ItemDisplay() {
	const { id } = useParams();
	const navigate = useNavigate();
	const shopData = useContext(ShopDataCtx)?.data;

	if (!shopData) {
		//Implement skeleton
		return <p>Loading...</p>;
	}

	const item = shopData?.find((e) => e.name == id);
	// redirect as a 404 since a use can put anything on the url bar
	// this is dev code only
	if (!item) throw new Error("Shop Item not found");

	// console.log(shopData.test());

	return (
		<div>
			<h1>{item.name}</h1>
			{/* <img src={item.image} /> */}
			<button
				onClick={() => {
					console.log("prev");

					navigate("/item/" + shopData.previous.name);
				}}>
				Previous
			</button>
			<br />
			<button
				onClick={() => {
					console.log("next");

					navigate("/item/" + shopData.next.name);
				}}>
				Next
			</button>

			<br />

			<p>{item.price}</p>

			{item.text.map((e, i) => (
				<p key={`item-display-text-description-p-${i}`}>{e}</p>
			))}
		</div>
	);
}
