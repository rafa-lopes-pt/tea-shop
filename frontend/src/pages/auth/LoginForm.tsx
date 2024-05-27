import { motion } from "framer-motion";
import Button, { BUTTON_VARIANTS } from "../../components/buttons/Button";
import { Form } from "../../components/form/Form";
import Input from "../../components/input/Input";
export default function LoginForm({
	onChangeToSignup,
	animationProps,
}: {
	onChangeToSignup: Function;
	animationProps: any;
}) {
	return (
		<Form animationProps={animationProps}>
			<Form.Header title="Login">
				<Button
					variant={BUTTON_VARIANTS.link}
					onClick={onChangeToSignup}>
					Don't have an account yet?
				</Button>
			</Form.Header>

			<Form.Body>
				<Input
					label="Email"
					type="email"
				/>
				<Input
					label="Password"
					type="password"
				/>
				<Form.Submit>Login</Form.Submit>
			</Form.Body>
		</Form>
	);
}
