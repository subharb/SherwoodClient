import sourceMap from 'source-map';
import fs from 'fs';


console.log('sourceMap');

async function getSourceMapConsumer(sourceMapFile) {
    const rawSourceMap = fs.readFileSync(sourceMapFile, 'utf-8');
    const consumer = await new sourceMap.SourceMapConsumer(rawSourceMap);
    return consumer;
}

function getOriginalPosition(error, sourceMapConsumer) {
    const position = {
        line: error.lineNumber || error.line,
        column: error.columnNumber || error.column,
        source: error.fileName || error.source,
    };
    return sourceMapConsumer.generatedPositionFor(position);
}

const error = {
    lineNumber: 1173,
    columnNumber: 5035,
    fileName: 'index-b3f2d26c.js',
};
const sourceMapFile = 'build/assets/index-b3f2d26c.js';
const sourceMapConsumer = await getSourceMapConsumer(sourceMapFile);
console.log('sourceMapConsumer:', sourceMapConsumer);   
const originalPosition = getOriginalPosition(error, sourceMapConsumer);

console.log('Original position:', originalPosition);