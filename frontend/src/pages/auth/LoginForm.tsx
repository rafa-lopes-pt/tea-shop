import { useForm } from "react-hook-form";
import Button, { BUTTON_VARIANTS } from "../../components/buttons/Button";
import { Form } from "../../components/form/Form";
import LoginSchema, { LoginSchemaType } from "./form/login.validator";
import { zodResolver } from "@hookform/resolvers/zod";
export default function LoginForm({
	onChangeScreen,
	animationProps,
}: {
	onChangeScreen: Function;
	animationProps: any;
}) {
	const { register, handleSubmit, formState } = useForm<LoginSchemaType>({
		resolver: zodResolver(LoginSchema),
	});

	return (
		<Form
			animationProps={animationProps}
			onSubmit={handleSubmit((data) => console.log(data))}>
			<Form.Header title="Login">
				<Button
					variant={BUTTON_VARIANTS.link}
					onClick={onChangeScreen}>
					Don't have an account yet?
				</Button>
			</Form.Header>

			<Form.Body>
				<Form.Email
					register={register}
					formState={formState}
				/>

				<Form.Password
					register={register}
					formState={formState}
				/>

				<Form.Submit>Login</Form.Submit>
			</Form.Body>
		</Form>
	);
}
