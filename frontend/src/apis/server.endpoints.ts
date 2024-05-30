import { ShopItemSchemaType } from "../../../shared/schemas/shop-item.schema";

namespace ServerAPI {
	async function baseFetch(endpoint: string, method = "GET", body: any) {
		return await fetch(import.meta.env.VITE_BACKEND_URI + endpoint, {
			headers: {},
			method,
			body: JSON.stringify({ data: body }),
		});
	}
	const fakeFetch = async <T>(returnData: T) =>
		new Promise<T>((resolve) =>
			setTimeout(() => {
				resolve(returnData);
			}, 700)
		);

	export async function getShopItems() {
		// return baseFetch(...)
		const DUMMY_ShopItems: ShopItemSchemaType[] = [
			{
				image: "fix this",
				name: "White Tea Leaves",
				text: [
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
					"Quae sit culpa natus ipsum ducimus unde dignissimos ad nostrum. Officiis nostrum eaque tempora illum reiciendis porro non? Tempore, molestiae. Error, iste!",
				],
				price: 19.99,
			},
			{
				image: "fix this",
				name: "Dried Tea Leaves",
				text: [
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
					"Quae sit culpa natus ipsum ducimus unde dignissimos ad nostrum. Officiis nostrum eaque tempora illum reiciendis porro non? Tempore, molestiae. Error, iste!",
				],
				price: 22.99,
			},
			{
				image: "fix this",
				name: "Immortality Tea Leaves",
				text: [
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
					"Quae sit culpa natus ipsum ducimus unde dignissimos ad nostrum. Officiis nostrum eaque tempora illum reiciendis porro non? Tempore, molestiae. Error, iste!",
				],
				price: 189.99,
			},
			{
				image: "fix this",
				name: "Deathbringer Tea Leaves",
				text: [
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
					"Quae sit culpa natus ipsum ducimus unde dignissimos ad nostrum. Officiis nostrum eaque tempora illum reiciendis porro non? Tempore, molestiae. Error, iste!",
				],
				price: 0.75,
			},
		];
		return await fakeFetch(DUMMY_ShopItems);
	}
}

export default ServerAPI;
