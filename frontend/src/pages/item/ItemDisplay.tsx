import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/buttons/Button";
import IconButton from "../../components/buttons/IconButton";
import FontAwesomeIcons from "../../components/misc/Icons";
import { ShopDataCtx } from "../../store/shop/shop-data.context";
import SectionWrapper from "../misc/SectionWrapper";

export default function ItemDisplay() {
	const { id } = useParams();
	const navigate = useNavigate();
	const shopData = useContext(ShopDataCtx)?.items;

	if (!shopData) {
		//Implement skeleton
		return <p>Loading...</p>;
	}

	const item = shopData?.find((e) => e.name == id);
	// redirect as a 404 since a use can put anything on the url bar
	// this is dev code only
	if (!item) throw new Error("Shop Item not found");


	return (
		<SectionWrapper className="item-display">
			<header>
				<IconButton
					icon={FontAwesomeIcons.left}
					className="item-display__navigation item-display__navigation--prev"
					onClick={() => navigate("/item/" + shopData.previous.name)}
				/>
				<span className="item-display__title">
					<h1>{item.name}</h1>
					<p>{item.slogan}</p>
				</span>

				<IconButton
					icon={FontAwesomeIcons.right}
					className="item-display__navigation item-display__navigation--next"
					onClick={() => navigate("/item/" + shopData.next.name)}
				/>
			</header>

			<p className="item-display__text"> {item.text}</p>

			<div className="item-display__price">
				<p>{item.price} $</p>

				<span>
					{" "}
					<Button>Buy Now</Button>
					<Button variant="outlined">Add To Cart</Button>
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
				<img src={item.image} />
			</div>
		</SectionWrapper>
	);
}
