/**
 * RSS Feed Parser
 */
export default class RSSFeedParser {
	constructor(xmlString) {
		this.xmlString = xmlString;
		this.treeObject = {};
	}

	/**
     * parse XML and get JS Object
     */
	getJSObject() {
		// convert string to XML
		const xml = this.convertStringToXML();

		// prepare JS Object
		return this.parseXML(xml);
	}

	/**
     * convert string to XML
     */
	convertStringToXML() {
		// validate DOMParser
		if (typeof window.DOMParser === 'undefined') {
			throw new Error('No XML parser found');
		}

		// create a new DOMParser object
		const domParser = new DOMParser();

		// parse the XML string into an XMLDocument object
		return domParser.parseFromString(this.xmlString, 'text/xml');
	}

	/**
     * recursive XML Parser
     * @param {*} xmlDocument
     */
	// eslint-disable-next-line class-methods-use-this
	parseXML(xmlDocument) {
		const tags = xmlDocument.getElementsByTagName('*');
		const finalObj = {};
		let item = {};
		let isInfo = true;

		for (let i = 0; i < tags.length; i += 1) {
			if (tags[i].nodeName === 'item' || tags[i].nodeName === 'entry') {
				// disable after getting feed info
				isInfo = false;

				// initialize items
				if (!finalObj['items']) finalObj['items'] = [];

				// validate item
				if (!(Object.keys(item).length === 0 && item.constructor === Object)) {
					// push item
					finalObj['items'].push(item);

					// empty item
					item = {};
				}
			} else if (tags[i] && tags[i].firstChild && tags[i].firstChild.nodeValue) {
				// validate feed info
				if (!isInfo) {
					item[tags[i].nodeName] = tags[i].firstChild.nodeValue;
				} else {
					// initialize info object
					if (!finalObj['info']) finalObj['info'] = {};

					// store value
					finalObj['info'][tags[i].nodeName] = tags[i].firstChild.nodeValue;
				}
			}
		}

		return finalObj;
	}
}
