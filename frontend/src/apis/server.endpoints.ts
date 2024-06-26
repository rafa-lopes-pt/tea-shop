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
			}, 1500)
		);

	export async function getShopItems() {
		// return baseFetch(...)
		const DUMMY_ShopItems: ShopItemSchemaType[] = [
			{
				image: "/media/white_tea.jpg",
				name: "White Tea Leaves",
				slogan: "The amazing white tea",
				text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae sit culpa natus ipsum ducimus unde dignissimos ad nostrum. Officiis nostrum eaque tempora illum reiciendis porro non? Tempore, molestiae. Error, iste!",
				benefits:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae sit culpa natus ipsum ducimus unde dignissimos ad nostrum.",
				pairings:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae sit culpa natus ipsum ducimus unde dignissimos ad nostrum.",
				price: 19.99,
			},
			{
				image: "/media/tea.jpg",
				name: "Dried Tea Leaves",
				slogan: "The amazing tea",
				text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae sit culpa natus ipsum ducimus unde dignissimos ad nostrum. Officiis nostrum eaque tempora illum reiciendis porro non? Tempore, molestiae. Error, iste!",
				benefits:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae sit culpa natus ipsum ducimus unde dignissimos ad nostrum.",
				pairings:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae sit culpa natus ipsum ducimus unde dignissimos ad nostrum.",
				price: 22.99,
			},
			{
				image: "/media/tea.jpg",
				name: "Immortality Tea Leaves",
				slogan: "The amazing tea",
				text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae sit culpa natus ipsum ducimus unde dignissimos ad nostrum. Officiis nostrum eaque tempora illum reiciendis porro non? Tempore, molestiae. Error, iste!",
				benefits:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae sit culpa natus ipsum ducimus unde dignissimos ad nostrum.",
				pairings:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae sit culpa natus ipsum ducimus unde dignissimos ad nostrum.",
				price: 189.99,
			},
			{
				image: "/media/tea.jpg",
				name: "Deathbringer Tea Leaves",
				slogan: "The amazing tea",
				text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae sit culpa natus ipsum ducimus unde dignissimos ad nostrum. Officiis nostrum eaque tempora illum reiciendis porro non? Tempore, molestiae. Error, iste!",
				benefits:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae sit culpa natus ipsum ducimus unde dignissimos ad nostrum.",
				pairings:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae sit culpa natus ipsum ducimus unde dignissimos ad nostrum.",
				price: 0.75,
			},
		];
		return await fakeFetch(DUMMY_ShopItems);
	}
}

export default ServerAPI;
