import HTTPCodes from "simple-http-codes";

const ErrorCodes = {
	...HTTPCodes.ClientError,
	...HTTPCodes.ServerError,
} as const;

type HttpErrorContext = {
	error?: Error;
	cause?: string;
	context?: any;
};

export default class HttpError extends Error {
	statusCode: number;
	context?: HttpErrorContext;
	/**
	 * @param statusCode A valid property of the HTTPCodes object, related to an error (4xx or 5xx).
	 * @param message Defaults to the HTTP status code name
	 * @param context An object containing the original error and a string explaining it's cause.
	 */
	constructor(
		statusCode: keyof typeof ErrorCodes,
		message?: string,
		context?: HttpErrorContext
	) {
		super(message || statusCode.split("_").join(" ").toLowerCase());
		this.statusCode = ErrorCodes[statusCode];
		this.context = context;
		this.name = statusCode;
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
