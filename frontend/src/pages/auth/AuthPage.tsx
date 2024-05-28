import { useState } from "react";
import SectionWrapper from "../misc/SectionWrapper";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { AnimatePresenceProps, MotionProps } from "framer-motion";

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
		</SectionWrapper>
	);
}
