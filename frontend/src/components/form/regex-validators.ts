export namespace RegExpValidators {
	export const email = /@[A-z]+.[A-z]+/gi;
	export const hasUpperCase = /[A-Z]+/gi;
	export const hasLowerCase = /[a-z]+/gi;
	export const hasSpecial = /[+*@.,-]+/gi;
	export const alphabeticOnly = /^[A-Za-z]+$/gi;
}
