import { useState } from "react";
import SectionWrapper from "../misc/SectionWrapper";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export default function AuthPage() {
	const [showSignupScreen, setShowSignupScreen] = useState(false);

	const animationProps = {
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
					onChangeToSignup={() => setShowSignupScreen(true)}
					animationProps={animationProps}
				/>
			)}

			{showSignupScreen && (
				<SignupForm
					onChangeToLogin={() => setShowSignupScreen(false)}
					animationProps={animationProps}
				/>
			)}
			{/* */}
		</SectionWrapper>
	);
}
