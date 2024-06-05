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
import { AuthCtx } from "../../store/auth.context";
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

	const auth = useContext(AuthCtx);
	const navigate = useNavigate();

	const onSubmitHandler = (data: LoginSchemaType) => {
		if (!auth?.login) return;

		auth?.login(data).then(() => navigate("/"));
	};

	return (
		<Form
			animationProps={animationProps}
			onSubmit={handleSubmit(onSubmitHandler)}>
			<Form.Header title="Login">
				<Button
					variant="link"
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
