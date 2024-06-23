import { UserSchema } from "../../../../../shared/schemas/user.schema";
import z from "zod";

const UpdateProfileSchema = UserSchema.partial()
	.omit({ email: true })
	.refine((data) => Object.keys(data).some((e) => e), {
		message: "Requires at least one field to update",
		path: [""],
	});
export default UpdateProfileSchema;

export type UpdateProfileSchemaType = z.infer<typeof UpdateProfileSchema>;
