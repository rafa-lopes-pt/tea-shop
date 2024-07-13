import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	SignupSchema,
	SignupSchemaType,
} from "../../../../shared/schemas/signup.schema";
import Button from "../../components/buttons/Button";
import { Form } from "../../components/form/Form";
import { useContext } from "react";
import { AuthCtx, AuthCtxProperties } from "../../store/auth.context";
export default function SignupForm({
	onChangeScreen,
	animationProps,
}: {
	onChangeScreen: Function;
	animationProps: any;
}) {
	const { signup } = useContext(AuthCtx) as AuthCtxProperties
	const { register, handleSubmit, formState } = useForm<SignupSchemaType>({
		resolver: zodResolver(SignupSchema),
	});

	const onSubmitHandler = async (data: SignupSchemaType) => {
		if (await signup(data))
			onChangeScreen()
	}


	return (
		<Form
			animationProps={animationProps}
			onSubmit={handleSubmit(onSubmitHandler)}
			honeyPotFieldName="username"
		>
			<Form.Header title="Register">
				<Button
					variant="link"
					onClick={() => onChangeScreen()}>
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

				<Form.Submit formState={formState}>Register</Form.Submit>
			</Form.Body>
		</Form>
	);
}
