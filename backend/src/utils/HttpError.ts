import HTTPCodes from "simple-http-codes";

const ErrorCodes = {
	...HTTPCodes.ClientError,
	...HTTPCodes.ServerError,
} as const;

type HttpErrorContext = { error: Error; cause: string };

export default class HttpError extends Error {
	private _statusCode: number;
	private _context?: HttpErrorContext;

	/**
	 *
	 * @param httpError A valid property of the HTTPCodes object, related to an error (4xx or 5xx).
	 * @param message Defaults to the HTTP status code name
	 * @param context An object containing the original error and a string explaining it's cause.
	 */
	constructor(
		httpError: keyof typeof ErrorCodes,
		message?: string,
		context?: HttpErrorContext
	) {
		super(message || httpError.split("_").join(" ").toLowerCase());
		this._statusCode = ErrorCodes[httpError];
		this._context = context;
		this.name = httpError;
	}

	get status() {
		return this._statusCode;
	}
	get error() {
		return this._context?.error;
	}
	get cause() {
		return this._context?.cause;
	}
}
