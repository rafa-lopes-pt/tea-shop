import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
	LoginSchema,
	LoginSchemaType,
} from "../../../../shared/schemas/login.schema";
import Button from "../../components/buttons/Button";
import { Form } from "../../components/form/Form";
import { AuthCtx, AuthCtxProperties } from "../../store/auth.context";
export default function LoginForm({
	onChangeScreen,
	animationProps,
}: {
	onChangeScreen: Function;
	animationProps: any;
}) {
	const { register, handleSubmit, formState, reset } = useForm<LoginSchemaType>({
		resolver: zodResolver(LoginSchema),
	});


	const auth = useContext(AuthCtx) as AuthCtxProperties;
	const navigate = useNavigate();

	const onSubmitHandler = async (data: LoginSchemaType) =>
		await auth?.login(data) ? navigate("/") : reset();

	return (
		<Form
			animationProps={animationProps}
			onSubmit={handleSubmit(onSubmitHandler)}
			honeyPotFieldName="username"
		>
			<Form.Header title="Login">
				<Button
					variant="link"
					onClick={() => onChangeScreen()}
					disabled={formState.isSubmitting}
				>
					Don't have an account yet?
				</Button>
			</Form.Header>

			<Form.Body>
				<Form.Email
					register={register}
					formState={formState}
					disabled={formState.isSubmitting}
				/>

				<Form.Password
					register={register}
					formState={formState}
					disabled={formState.isSubmitting}
				/>


				<Form.Submit disabled={formState.isSubmitting}>
					Login
				</Form.Submit>
			</Form.Body>
		</Form>
	);
}
