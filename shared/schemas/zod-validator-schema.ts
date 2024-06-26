import z from "zod";
import RegExpValidators from "../validators/regex-validators";

namespace ZodValidatorSchema {
	export const requiredNonEmptyString = z
		.string({ required_error: "Required" })
		.min(1, { message: "Required" })
		.trim();

	export const email = requiredNonEmptyString.regex(RegExpValidators.email, {
		message: "Invalid",
	});

	export const alphabeticOnly = requiredNonEmptyString.regex(
		RegExpValidators.alphabeticOnly,
		{ message: "Invalid characters" }
	);

	export const alphabeticWithWhiteSpaces = requiredNonEmptyString.regex(
		RegExpValidators.alphabeticWithWhiteSpaces,
		{ message: "Invalid characters" }
	);

	export const alphanumericWithWhiteSpaces = requiredNonEmptyString.regex(
		RegExpValidators.alphanumericWithWhiteSpaces,
		{ message: "Invalid characters" }
	);

	export const boolean = z.boolean({
		required_error: "Required",
	});

	export const zipCode = requiredNonEmptyString.regex(
		RegExpValidators.zipCodeGeneric,
		{ message: "Invalid zip-code" }
	);
	/**
	 * Checks for a positive finite number with maximum 2 decimal points
	 */
	export const price = z
		.number({ required_error: "Required" })
		.finite("Must be a finite number")
		.positive("Must be a positive number")
		.refine((n) => RegExpValidators.price.test(n.toString()), {
			message: "Not a valid format for price",
		});
}
export default ZodValidatorSchema;
