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
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Voluptatum iste cupiditate excepturi tempora vitae
						tenetur
					</p>
				</div>
				<div className="footer-item">
					<h4 className="footer-item__title">Secure Payments</h4>
					<p className="footer-item_text">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Voluptatum iste cupiditate excepturi tempora vitae
						tenetur
					</p>
				</div>
			</footer>
		</SectionWrapper>
	);
}
