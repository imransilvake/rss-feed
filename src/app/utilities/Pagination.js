/**
 * apply paginaiton on the list
 * slice array depending on the page number
 * @param {*} array
 * @param {*} pageNo
 * @param {*} pageSize
 */
const paginatedList = (array, pageNo, pageSize = 20) => {
	return array.slice(pageNo * pageSize, pageNo * pageSize + pageSize);
};
export default paginatedList;
