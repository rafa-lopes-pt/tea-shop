import { useContext } from "react";
import { useForm } from "react-hook-form";
import Button, { BUTTON_VARIANTS } from "../../components/buttons/Button";
import { Form } from "../../components/form/Form";
import { AuthCtx } from "../../store/auth.context";
import SignupSchema, { SignupSchemaType } from "./form/signup.validator";
import { zodResolver } from "@hookform/resolvers/zod";
export default function SignupForm({
	onChangeScreen,
	animationProps,
}: {
	onChangeScreen: Function;
	animationProps: any;
}) {
	const { register, handleSubmit, formState } = useForm<SignupSchemaType>({
		resolver: zodResolver(SignupSchema),
	});

	return (
		<Form
			animationProps={animationProps}
			onSubmit={handleSubmit((data) => console.log(data))}>
			<Form.Header title="Register">
				<Button
					variant={BUTTON_VARIANTS.link}
					onClick={onChangeScreen}>
					Login with your account
				</Button>
			</Form.Header>

			<Form.Body>
				<Form.Name
					register={register}
					formState={formState}
				/>

				<Form.Email
					register={register}
					formState={formState}
				/>

				<Form.Password
					register={register}
					formState={formState}
				/>

				<Form.Submit>Register</Form.Submit>
			</Form.Body>
		</Form>
	);
}
