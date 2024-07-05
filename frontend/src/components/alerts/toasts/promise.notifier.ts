import { Id, toast } from "react-toastify";

const notifyToastPromise = (
	promise: Promise<any>,
	error = "Something went wrong",
	pending = "Loading",
	success?: string
) => toast.promise(promise, { error, pending, success });

export default notifyToastPromise;

/**
 * ==========================================================================
 *  Use the methods bellow to have manual control over the promise lifecycle
 * ==========================================================================
 */

/**
 * Displays a toast with a loading icon
 * @note In order for this toast to disappear call notifyToastPromiseEnd, or one of the other methods.
 * @returns toast Id used to call the other methods
 */
export const notifyToastPromiseLoading = (msg = "Loading...") =>
	toast.loading(msg);

export const notifyToastPromiseSuccess = (id: Id, msg: string) =>
	toast.update(id, {
		render: msg,
		type: "success",
		isLoading: false,
		autoClose: 3000,
	});

export const notifyToastPromiseError = (id: Id, msg: string) =>
	toast.update(id, {
		render: msg,
		type: "error",
		isLoading: false,
		autoClose: 2000,
	});

export const notifyToastPromiseEnd = (id: Id) =>
	toast.update(id, {
		render: null,
		isLoading: false,
		autoClose: 0.01,
		type: "default",
	});
