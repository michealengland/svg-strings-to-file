const fs = require('fs');
const path = require('path');
const {data} = require('./data');
const {formatData} = require('./formatData');

const dataToWrite = formatData(data);
const directoryPath = 'build';

/**
 * Clear the specificed directory.
 *
 * @param { string } directoryPath
 */
function purgeWritingDirectory(directoryPath) {
	if (fs.existsSync(directoryPath)) {
		const files = fs.readdirSync(directoryPath);
		files.forEach(file => {
			const filePath = path.join(directoryPath, file);
			fs.unlinkSync(filePath); // Delete each file in the directory
		});

		console.log(`\n${files.length} files were deleted from ${directoryPath}.`);
	}
}

/**
 * Write SVG files to directory.
 *
 * @param {*} items
 * @param {*} directoryPath
 */
function generateSvgFiles(items, directoryPath) {
	// Empty the directory first
	purgeWritingDirectory(directoryPath);

	// Ensure the directory exists
	if (!fs.existsSync(directoryPath)){
		fs.mkdirSync(directoryPath, { recursive: true });
	}

	const status = {
		createdFileCount: 0,
		totalCount: items.length,
		hasSameContent: false,
		skippedFilesWithMatchingContent: [],
		skippedFilesNoMatch: []
	}

	console.log(`\n📝 WRITING ${status.totalCount} items as SVGs TO DIRECTORY`);

	items.forEach(icon => {
		const filePath = path.join(directoryPath, `${icon.label}.svg`);

		if (!fs.existsSync(filePath)) {
			fs.writeFileSync(filePath, icon.value);
			console.log(`✅ New ${filePath}`);
			status.createdFileCount++;
		} else {
			const existingContent = fs.readFileSync(filePath, 'utf8');

			// Compare with new content
			if (existingContent === icon.value) {
				console.error(`🛑 SKIPPED - IDENTICAL FILE NAME & CONTENT: "${filePath}" with value: \n\n${icon.value}`);

				status.hasSameContent = true;
				status.skippedFilesWithMatchingContent.push(filePath);
			} else {
				status.skippedFilesNoMatch.push(filePath)

				console.error(`🛑 SKIPPED - IDENTICAL FILE NAME: "${filePath}" with value: \n\n${icon.value}`);
				console.log(`👯‍♀️ DUPLICATE CONTENT: ${status.hasSameContent}\n\n`);
			}
		}
	});

	console.log(
		`\n🤫 ${status.skippedFilesWithMatchingContent.length} files with matching content found.`,
		`😵 ${status.skippedFilesNoMatch.length} duplicate files did NOT have matching content.`,
		`✅ ${status.createdFileCount}/${status.totalCount} files written to ./${directoryPath}.`,
		`\nSKIPPED FILES WITH IDENTICAL CONTENT:\n${status.skippedFilesWithMatchingContent.join('\n')}`,
		`\nSKIPPED FILES NON IDENTICAL CONTENT:\n${status.skippedFilesNoMatch.join('\n')}`
	);
}

generateSvgFiles(dataToWrite, directoryPath);