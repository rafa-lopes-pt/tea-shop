/*
 * Read-only array with previous/current/next methods
 * to perform infinite cycles through it's elements
 */
export default class CyclicArray<T> {
	private _currentIdx: number;
	private readonly _array: Array<T>;

	constructor(...args: T[]) {
		if (!args)
			throw TypeError(
				"Can't initialize a CyclicArray with an empty array"
			);

		if (!Array.isArray(args)) throw TypeError(`Argument is not an array`);

		this._array = args;
		this._currentIdx = 0;
	}

	get next() {
		if (this._currentIdx + 1 === this._array.length) {
			this._currentIdx = 0;
		} else {
			this._currentIdx++;
		}

		return this.current;
	}

	get previous() {
		if (this._currentIdx === 0) {
			this._currentIdx = this._array.length - 1;
		} else {
			this._currentIdx--;
		}

		return this.current;
	}

	get current() {
		return this._array[this._currentIdx];
	}

	map<U>(callback: (e: T, i: number) => U) {
		return this._array.map(callback) as U;
	}

	find(callback: (e: T, i: number) => boolean) {
		return this._array.find(callback);
	}

	findIndex(callback: (e: T, i: number) => boolean) {
		return this._array.findIndex(callback);
	}

	set currentIdx(i: number) {
		if (i < 0 || i >= this._array.length)
			throw RangeError("Index out of bounds");

		this._currentIdx = i;
	}
}
