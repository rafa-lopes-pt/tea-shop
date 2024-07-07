import HTTPCodes from "simple-http-codes";
export const ErrorCodes = {
	...HTTPCodes.ClientError,
	...HTTPCodes.ServerError,
	...HTTPCodes.Redirection,
} as const;

export type ErrorNumbers = (typeof ErrorCodes)[keyof typeof ErrorCodes];
export type ErrorNames = keyof typeof ErrorCodes;
