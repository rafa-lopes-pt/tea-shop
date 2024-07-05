import { UserSchema } from "./user.schema";
import z from "zod";

export const UpdateProfileSchema = UserSchema.partial()
	.omit({ email: true })
	.refine((data) => Object.keys(data).some((e) => e), {
		message: "Requires at least one field to update",
		path: [""],
	});

export type UpdateProfileSchemaType = z.infer<typeof UpdateProfileSchema>;
