import { MotionProps } from "framer-motion";
import { useState } from "react";
import SectionWrapper from "../misc/SectionWrapper";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export default function AuthPage() {
	const [showSignupScreen, setShowSignupScreen] = useState(false);

	const animationProps: MotionProps = {
		initial: { rotateY: "90deg" },
		animate: { rotateY: "0deg" },
		transition: { duration: 0.35 },
		exit: { rotateY: "90deg" },
	};

	return (
		<SectionWrapper className="auth auth__wrapper">
			{/* */}
			{!showSignupScreen && (
				<LoginForm
					onChangeScreen={() => setShowSignupScreen(true)}
					animationProps={animationProps}
				/>
			)}

			{showSignupScreen && (
				<SignupForm
					onChangeScreen={() => setShowSignupScreen(false)}
					animationProps={animationProps}
				/>
			)}


			{/* */}

			<div className="auth__image">
				<div className="auth__image__shape auth__image__shape--1"></div>
				<div className="auth__image__img auth__image__img--1" />
				<div className="auth__image__img auth__image__img--2" />
			</div>






		</SectionWrapper>
	);
}
