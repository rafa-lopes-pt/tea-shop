import { ErrorCodes, ErrorNames, ErrorNumbers } from "./ErrorCodes.type";
import HttpErrorContext from "./HttpErrorContext.type";

const getErrorName = (code: ErrorNumbers) =>
	[...Object.entries(ErrorCodes)].filter((entry) => entry[1] === code)[0][0];

const defaultErrorMessage = (
	code: (typeof ErrorCodes)[keyof typeof ErrorCodes]
) => getErrorName(code).split("_").join(" ").toLowerCase();

export default interface HttpErrorInterface {
	statusCode: ErrorNumbers;
	context?: HttpErrorContext;
}
export default class HttpError extends Error implements HttpErrorInterface {
	statusCode: ErrorNumbers;
	context?: HttpErrorContext;
	/**
	 * @param statusCode A valid property of the HTTPCodes object, related to an error (4xx or 5xx).
	 * @param message Defaults to the HTTP status code name
	 * @param context An object containing the original error and optional extra data.
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
