namespace RegExpValidators {
	export const email = /@[A-z]+.[A-z]+/gi;
	export const hasUpperCase = /[A-Z]+/gi;
	export const hasLowerCase = /[a-z]+/gi;
	export const hasSpecial = /[+*@.,-]+/gi;
	export const alphabeticOnly = /^[A-Za-z]+$/gi;
	export const alphanumericWithWhiteSpaces = /^[\w\s]+$/;
	export const alphabeticWithWhiteSpaces = /^[A-z\s]+$/;
	export const zipCodeGeneric = /^\d+-*\d+$/;
}
export default RegExpValidators;
