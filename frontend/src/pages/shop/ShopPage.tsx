import SectionWrapper from "../misc/SectionWrapper";
import ShopSectionContainer from "./ShopSectionContainer";
export default function ShopPage() {
	return (
		<SectionWrapper className="shop-page">
			<h1>Tea Shop</h1>

			{/* slot for sections navbar*/}

			<ShopSectionContainer />

			<footer>
				<div className="footer-item">
					<h4 className="footer-item__title">Free Shipping</h4>
					<p className="footer-item__text">
						Free shipping on all orders! Enjoy your favorite teas delivered right to your door.
					</p>
				</div>
				<div className="footer-item">
					<h4 className="footer-item__title">Secure Payments</h4>
					<p className="footer-item_text">
						Enjoy your tea without worry. Our payments are secured by Stripe.
					</p>
				</div>
			</footer>
		</SectionWrapper>
	);
}
