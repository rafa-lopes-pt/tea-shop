import HTTPCodes from "simple-http-codes";

const ErrorCodes = {
	...HTTPCodes.ClientError,
	...HTTPCodes.ServerError,
	...HTTPCodes.Redirection,
} as const;

type ErrorNumbers = (typeof ErrorCodes)[keyof typeof ErrorCodes];
type ErrorNames = keyof typeof ErrorCodes;

const getErrorName = (code: ErrorNumbers) =>
	[...Object.entries(ErrorCodes)].filter(
		([_key, value]) => value === code
	)[0][0];

const defaultErrorMessage = (
	code: (typeof ErrorCodes)[keyof typeof ErrorCodes]
) => getErrorName(code).split("_").join(" ").toLowerCase();

type HttpErrorContext = {
	error?: unknown;
	cause?: string;
	context?: unknown;
};

export default class HttpError extends Error {
	statusCode: ErrorNumbers;
	context?: HttpErrorContext;
	/**
	 * @param statusCode A valid property of the HTTPCodes object, related to an error (4xx or 5xx).
	 * @param message Defaults to the HTTP status code name
	 * @param context An object containing the original error and a string explaining it's cause.
	 */
	constructor(
		statusCode: ErrorNumbers,
		message?: string | ErrorNames,
		context?: HttpErrorContext
	) {
		const errName = getErrorName(statusCode);
		super(message || defaultErrorMessage(statusCode));
		this.statusCode = statusCode;
		this.context = context;
		this.name = errName;
	}

	log() {
		console.error(
			this.statusCode,
			this.name,
			this.message,
			this.context || ""
		);
	}
}
