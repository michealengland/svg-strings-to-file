/**
 * This function takes a string of key-value pairs and converts them into an array of objects.
 *
 * @param {*} iconString
 * @returns {Array} An array of objects with label and value properties.
 */
function formatData(iconString) {
	// Split the string into entries
	const entries = iconString.split("',");

	console.log('SPLIT DATA INTO LABELS & VALUES')

	// Process each entry to extract key-value pairs and convert them into objects
	const icons = entries.map(entry => {
		// Split entry into key and value
		const [key, value] = entry.split('=>').map(s => s.trim());

		// Clean up key and value strings
		const cleanedKey = key.replace(/['"]/g, '').trim();
		let cleanedValue = value ? value.trim() : '';
		// Remove trailing single quote if it exists
		if(cleanedValue.startsWith("'")) {
			cleanedValue = cleanedValue.slice(1);
		}

		if (cleanedValue.endsWith("'")) {
			cleanedValue = cleanedValue.slice(0, -1);
		}

		console.log(`📄 ${key}`)

		// Return an object with key and value
		return {
			label: cleanedKey,
			value: cleanedValue
		};
	});

	console.log('TOTAL COUNT:', icons.length)

	return icons
}

module.exports = {formatData};