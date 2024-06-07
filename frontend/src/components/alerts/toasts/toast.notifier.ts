import { ToastOptions, toast } from "react-toastify";
//prettier-ignore
export const notifySuccessToast = (msg: string,options?:ToastOptions) => toast(msg, { type: "success", ...options});
//prettier-ignore
export const notifyErrorToast   = (msg: string,options?:ToastOptions) => toast(msg, { type: "error"  , ...options});
//prettier-ignore
export const notifyInfoToast    = (msg: string,options?:ToastOptions) => toast(msg, { type: "info"   , ...options});
