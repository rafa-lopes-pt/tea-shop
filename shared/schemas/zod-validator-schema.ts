import z, { ZodBoolean } from "zod";
import RegExpValidators from "../validators/regex-validators";

namespace ZodValidatorSchema {
	/*
	 * Checks for a required, non-empty string
	 */
	export const requiredNonEmptyString = z
		.string({ required_error: "Required" })
		.min(1, { message: "Required" });
	/*
	 * Checks for a required, non-empty string,
	 * ending with the proper email format
	 */
	export const email = requiredNonEmptyString.regex(RegExpValidators.email, {
		message: "Invalid",
	});
	/**
	 * Checks for a required, non-empty string,
	 * with alphabetic chars only
	 */
	export const alphabeticOnly = requiredNonEmptyString.regex(
		RegExpValidators.alphabeticOnly,
		{ message: "Invalid characters" }
	);
	/**
	 * Checks for a required, non-empty string,
	 * with alphabetic chars and white-spaces
	 */
	export const alphabeticWithWhiteSpaces = requiredNonEmptyString.regex(
		RegExpValidators.alphabeticWithWhiteSpaces,
		{ message: "Invalid characters" }
	);
	/**
	 * Checks for a required, non-empty string,
	 * with alphanumeric and white-space chars only
	 */
	export const alphanumericWithWhiteSpaces = requiredNonEmptyString.regex(
		RegExpValidators.alphanumericWithWhiteSpaces,
		{ message: "Invalid characters" }
	);
	/**
	 * Checks for a boolean value
	 */
	export const boolean = z.boolean({
		required_error: "Required",
	});
	/**
	 * Checks for a generic format of international zip codes
	 */
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
		.refine(
			(n) =>
				RegExpValidators.price.test(n.toString()),
			{
				message: "Not a valid format for price",
			}
		);
}
export default ZodValidatorSchema;
