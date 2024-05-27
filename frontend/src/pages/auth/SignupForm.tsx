import { motion } from "framer-motion";
import Button, { BUTTON_VARIANTS } from "../../components/buttons/Button";
import { FormEvent, useContext } from "react";
import { AuthCtx } from "../../store/auth.context";
import { Form } from "../../components/form/Form";
export default function SignupForm({
	onChangeToLogin,
	animationProps,
}: {
	onChangeToLogin: Function;
	animationProps: any;
}) {
	const auth = useContext(AuthCtx);

	const onSubmitHandler = (e: FormEvent) => {
		e.preventDefault();
		//get data
		//send server request
		//notify with toast
	};
	return (
		<Form animationProps={animationProps}>
			<Form.Header title="Register">
				<Button
					variant={BUTTON_VARIANTS.link}
					onClick={onChangeToLogin}>
					Login with your account
				</Button>
			</Form.Header>

			<Form.Body>
				<input type="text" />
				<input type="text" />
				<input type="text" />
				<Form.Submit>Register</Form.Submit>
			</Form.Body>
		</Form>
	);
}
