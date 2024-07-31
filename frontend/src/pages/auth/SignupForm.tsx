import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import {
	SignupSchema,
	SignupSchemaType,
} from "../../../../shared/schemas/signup.schema";
import Dialog from "../../components/alerts/dialogs/Dialog";
import { notifyInfoToast } from "../../components/alerts/toasts/toast.notifier";
import Button from "../../components/buttons/Button";
import Toggle from "../../components/buttons/Toggle";
import { Form } from "../../components/form/Form";
import { AuthCtx, AuthCtxProperties } from "../../store/auth.context";
import TermsAndConditions from "../../resources/terms-and-conditions.json"

export default function SignupForm({
	onChangeScreen,
	animationProps,
}: {
	onChangeScreen: Function;
	animationProps: any;
}) {

	const [show, setShow] = useState(false)
	const [isAccepted, setIsAccepted] = useState(false)

	const { signup } = useContext(AuthCtx) as AuthCtxProperties
	const { register, handleSubmit, formState } = useForm<SignupSchemaType>({
		resolver: zodResolver(SignupSchema),
	});

	const onSubmitHandler = async (data: SignupSchemaType) => {
		if (isAccepted) {
			await signup(data) && onChangeScreen();
		}
		else {
			notifyInfoToast("Must Accept Conditions")
		}
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

				<Toggle label="Terms & Conditions" onChange={() => { isAccepted ? setIsAccepted(false) : setShow(true) }} checked={isAccepted} />
				<Dialog show={show} title="Terms & Conditions" onConfirm={() => { setShow(false); setIsAccepted(true) }} justifyBody>
					{TermsAndConditions.data}
				</Dialog>


				<Form.Submit formState={formState}>Register</Form.Submit>
			</Form.Body>
		</Form>
	);
}
