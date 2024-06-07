import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	UserSchema,
	UserSchemaType,
} from "../../../../../shared/schemas/user.schema";
import Dialog from "../../../components/alerts/dialogs/Dialog";
import Button from "../../../components/buttons/Button";
import { Form } from "../../../components/form/Form";
import FileInput from "../../../components/input/FileInput";
import { createPortal } from "react-dom";

export default function ProfileTab({ user }: { user: UserSchemaType }) {

	const [showDialog, setShowDialog] = useState(false)


	const { register, handleSubmit, formState, reset } = useForm<UserSchemaType>({
		resolver: zodResolver(UserSchema),
		defaultValues: user,
	});



	const onSubmitHandler = (data: UserSchemaType) => {
		console.log(data);
		console.log("formState", formState);

	};

	return (
		<>

			<Dialog
				type="danger"
				show={showDialog}
				message={"Deleting your account is an irreversible action! Please proceed with care."}
				title="Danger" onCancel={() => { setShowDialog(false) }} />

			<Form
				className="profile"
				onSubmit={handleSubmit(onSubmitHandler)}>
				<Form.Body>
					<header className="user-info">
						<FileInput
							onChange={() => { }}
							initialValue={user.image}
							className="user-info__image"
						/>
						<p className="user-info__name">{user.name}</p>
					</header>

					<Form.Separator />

					<h3 className="user-info__section-title">Personal</h3>
					<span>
						<Form.Email
							disabled
							register={register}
							formState={formState}
						/>
						<Form.Control
							register={register}
							formState={formState}
							name="notifyByEmail"
							label="Notify by email"
						/>

					</span>

					<Button variant="outlined">Change Password</Button>

					<Form.Separator />

					<h3 className="user-info__section-title">
						Billing Information
					</h3>
					<Form.Control
						name="billingInfo.street"
						label="Street Address"
						register={register}
						formState={formState}
					/>
					<Form.Control
						name="billingInfo.country"
						label="Country"
						register={register}
						formState={formState}
					/>
					<Form.Control
						name="billingInfo.city"
						label="City"
						register={register}
						formState={formState}
					/>
					<Form.Control
						name="billingInfo.zipCode"
						label="Postal Code"
						register={register}
						formState={formState}
					/>

					<Form.Separator />

					<section className="profile__actions">

						<Button variant="danger" onClick={() => setShowDialog(true)}>Delete Account</Button>

						<span>

							<Button disabled={!formState.isDirty} variant="outlined" onClick={() => reset()}>Discard</Button>
							<Form.Submit disabled={!formState.isDirty}>Save</Form.Submit>

						</span>

					</section>

				</Form.Body>
			</Form>
		</>
	);
}
