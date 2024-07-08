import z, { ZodSchema } from "zod";

export const stripEmptyStringValuesFromFormFields = (schema: ZodSchema) =>
	z.preprocess((data) => {
		const obj = data as { [index: string]: any };
		for (const key in obj) {
			if (typeof obj[key] === "string" && obj[key].trim() === "") {
				delete obj[key];
			}
		}
		return obj;
	}, schema);
