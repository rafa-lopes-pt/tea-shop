import { Id, toast } from "react-toastify";
import {
	notifyToastPromiseEnd,
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
			const data = (await res.json()).data;
			const message = typeof data === "string" ? data : data?.message;
			id && notifyToastPromiseError(id, message);
			return false;
		}

		return await callback(res, id);
	} catch (err) {
		console.error(err);
		id &&
			notifyToastPromiseError(
				id,
				(err as Error)?.message || "Something went wrong"
			);
		return false;
	}
}
