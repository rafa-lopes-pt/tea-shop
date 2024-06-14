namespace HTTPCodes {
	/**
	 * 200 - 299
	 */
	export enum success {
		OK = 200,
		CREATED,
		ACCEPTED,
	}
	/**
	 * 400 - 499
	 */
	export enum clientError {
		BAD_REQUEST = 400,
		UNAUTHORIZED,
		PAYMENT_REQUIRED,
		FORBIDDEN,
		NOT_FOUND,
		NOT_ALLOWED,
		NOT_ACCEPTABLE,
		REQUEST_TIMEOUT = 408,
		CONFLICT,
		GONE,
		UNSUPPORTED_MEDIA_TYPE = 415,
		AUTHENTICATION_TIMEOUT = 419,
		TOO_MANY_REQUESTS = 429,
	}

	/**
	 * 500 - 599
	 */
	export enum serverError {
		INTERNAL = 500,
		NOT_IMPLEMENTED,
		BAD_GATEWAY,
		GATEWAY_TIMEOUT = 504,
	}
}

export default HTTPCodes;
