import z from "zod";
import { RegExpValidators } from "../../../components/form/regex-validators";

const SignupSchema = z
	.object({
		name: z
			.string({ required_error: "Required" })
			.min(1, { message: "Required" })
			.regex(RegExpValidators.alphabeticOnly, {
				message: "Characters Only",
			}),

		email: z
			.string({ required_error: "Required" })
			.min(1, { message: "Required" })
			.regex(RegExpValidators.email, { message: "Invalid" }),

		password: z
			.string({ required_error: "Required" })
			.min(1, { message: "Required" }),
	})
	.required();

export type SignupSchemaType = z.infer<typeof SignupSchema>;

export default SignupSchema;
