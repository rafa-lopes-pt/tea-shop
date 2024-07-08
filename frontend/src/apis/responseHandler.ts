import { Id } from "react-toastify";
import {
	notifyToastPromiseError,
	notifyToastPromiseLoading,
} from "../components/alerts/toasts/promise.notifier";

export default async function responseHandler(
	request: () => Promise<Response>,
	callback: (data: Response) => unknown
): Promise<boolean>;

export default async function responseHandler(
	request: () => Promise<Response>,
	callback: (data: Response, toastId: Id) => unknown
): Promise<boolean>;

/**
 * Dev friendly code :)
 * if the callback has 2 arguments, then display a toast, if you only use the first arg...then dont show any toast :)
 * no need to specify the additional flag :P
 */
export default async function responseHandler(
	request: () => Promise<Response>,
	callback: (...args: any[]) => unknown
) {
	const showToast = callback.length > 1;

	const id = showToast ? notifyToastPromiseLoading() : undefined;

	try {
		const res = await request();

		if (!res.ok) {
			id && notifyToastPromiseError(id, (await res.json()).data);
			return false;
		}

		return callback(res, id);
	} catch (err) {
		console.error(err);
		id && notifyToastPromiseError(id, "Something went wrong");
		return false;
	}
}
