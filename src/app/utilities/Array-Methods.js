/**
 * custom map method
 * @param {*} callback
 */
// eslint-disable-next-line
Array.prototype.map = function map(callback) {
	const resultArray = [];
	for (let i = 0; i < this.length; i += 1) {
		resultArray.push(callback(this[i], i, this));
	}
	return resultArray;
};

/**
 * custom filter method
 * @param {*} callback
 */
// eslint-disable-next-line
Array.prototype.filter = function filter(callback) {
	const resultArray = [];
	for (let i = 0; i < this.length; i += 1) {
		const isFound = callback(this[i], i, this);
		if (isFound) {
			resultArray.push(this[i]);
			break;
		}
	}
	return resultArray;
};

/**
 * custom reduce method
 * @param {*} callback
 * @param {*} initialValue
 */
// eslint-disable-next-line
Array.prototype.reduce = function reduce(callback, start) {
	let result = start !== undefined ? start : this[0];
	for (let i = 0; i < this.length; i += 1) {
		result = callback(result, this[i]);
	}
	return result;
};
