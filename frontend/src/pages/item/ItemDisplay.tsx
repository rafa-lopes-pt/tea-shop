import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CartItemSchema, CartItemSchemaType } from "../../../../shared/schemas/cart-item.schema";
import Button from "../../components/buttons/Button";
import IconButton from "../../components/buttons/IconButton";
import FontAwesomeIcons from "../../components/misc/Icons";
import { CartCtx, CartCtxProperties } from "../../store/cart.context";
import { ShopDataCtx } from "../../store/shop-data.context";
import SectionWrapper from "../misc/SectionWrapper";
import { notifyErrorToast, notifyInfoToast, notifySuccessToast } from "../../components/alerts/toasts/toast.notifier";
import { AuthCtx, AuthCtxProperties } from "../../store/auth.context";
import Image from "../../components/misc/Image";

export default function ItemDisplay() {
	const { id } = useParams();
	const navigate = useNavigate();
	const shopData = useContext(ShopDataCtx)?.items;
	const cart = useContext(CartCtx) as CartCtxProperties
	const { isLoggedIn } = useContext(AuthCtx) as AuthCtxProperties

	if (!shopData) {
		navigate("/")
		return;
	}

	const item = shopData?.find((e) => e._id == id);
	if (!item) throw new Error("Shop Item not found");

	const onBuyNowHandler = () => {
		onAddToCartHandler() && navigate("/cart")
	}

	const onAddToCartHandler = () => {
		if (!isLoggedIn) { notifyInfoToast("Please login first"); navigate("/login"); return false; }

		const data = CartItemSchema.safeParse({ ...item, quantity: 1 })
		if (!data.success) {
			notifyErrorToast("Something went wrong...")
		}
		else {
			cart.addItem(data.data as CartItemSchemaType)
			notifySuccessToast(`Added ${item.name}!`)
			return true
		}
	}

	return (
		<SectionWrapper className="item-display">
			<header>
				<IconButton
					icon={FontAwesomeIcons.left}
					className="item-display__navigation item-display__navigation--prev"
					onClick={() => navigate("/item/" + shopData.previous._id)}
				/>
				<span className="item-display__title">
					<h1>{item.name}</h1>
					<p>{item.slogan}</p>
				</span>

				<IconButton
					icon={FontAwesomeIcons.right}
					className="item-display__navigation item-display__navigation--next"
					onClick={() => navigate("/item/" + shopData.next._id)}
				/>
			</header>

			<p className="item-display__text"> {item.text}</p>

			<div className="item-display__price">
				<p>{item.price} $</p>

				<span>
					<Button onClick={onBuyNowHandler}>Buy Now</Button>
					<Button onClick={onAddToCartHandler} variant="outlined">Add To Cart</Button>
				</span>
			</div>

			<footer>
				<article>
					<h2>Benefits</h2>
					{item.benefits}
				</article>
				<article>
					<h2>Pairings</h2>
					{item.benefits}
				</article>
			</footer>

			<div className="item-display__image-wrapper">
				<Image src={item.image} />
			</div>
		</SectionWrapper>
	);
}
