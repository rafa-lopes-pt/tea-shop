import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UserSchema, UserSchemaType } from "../../../../../shared/schemas/user.schema";
import { stripEmptyStringValuesFromFormFields } from "../../../../../shared/utils/form-utils";
import Dialog from "../../../components/alerts/dialogs/Dialog";
import Button from "../../../components/buttons/Button";
import { Form } from "../../../components/form/Form";
import FileInput from "../../../components/input/FileInput";
import { AuthCtx, AuthCtxProperties } from "../../../store/auth.context";
import { useNavigate } from "react-router-dom";

export default function ProfileTab({ user }: { user: UserSchemaType }) {
	const [showDialog, setShowDialog] = useState(false)
	const { updateUser, deleteAccount, updateImage } = useContext(AuthCtx) as AuthCtxProperties
	const navigate = useNavigate()
	const { register, handleSubmit, formState, reset } = useForm<UserSchemaType>({
		resolver: zodResolver(stripEmptyStringValuesFromFormFields(UserSchema)),
		shouldFocusError: true,
		values: user
	});

	const onSubmitHandler = (data: UserSchemaType) => updateUser(data);

	const onFileUploadHandler = (data: File) => {
		const f = new FormData()
		f.append("image", data)
		updateImage(f)
	}

	return (
		<>

			<Dialog
				type="danger"
				show={showDialog}
				title="Danger" onCancel={() => { setShowDialog(false) }} onConfirm={() => deleteAccount().then(() => {
					setShowDialog(false)
					navigate("/")
				})} >
				Deleting your account is an irreversible action! Please proceed with care.
			</Dialog>

			<Form
				className="profile"
				onSubmit={handleSubmit(onSubmitHandler)}>
				<Form.Body>
					<header className="user-info">
						<FileInput
							onChange={onFileUploadHandler}
							src={user.image}
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
						name="street"
						label="Street Address"
						register={register}
						formState={formState}
					/>
					<Form.Control
						name="country"
						label="Country"
						register={register}
						formState={formState}
					/>
					<Form.Control
						name="city"
						label="City"
						register={register}
						formState={formState}
					/>
					<Form.Control
						name="zipCode"
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
