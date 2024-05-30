namespace RegExpValidators {
	export const email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
	export const hasUpperCase = /[A-Z]+/gi;
	export const hasLowerCase = /[a-z]+/gi;
	export const hasSpecial = /[+*@.,-]+/gi;
	export const alphabeticOnly = /^[A-Za-z]+$/gi;
	export const alphanumericWithWhiteSpaces = /^[\w\s]+$/;
	export const alphabeticWithWhiteSpaces = /^[A-z\s]+$/;
	export const zipCodeGeneric = /^\d+-*\d+$/;
	export const price = /^\d+\.\d{1,2}$|^\d+$/;
}
export default RegExpValidators;
