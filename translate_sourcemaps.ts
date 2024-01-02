const sourceMap = require('source-map');
const fs = require('fs');

function getSourceMapConsumer(sourceMapFile) {
  const rawSourceMap = fs.readFileSync(sourceMapFile, 'utf-8');
  const consumer = new sourceMap.SourceMapConsumer(rawSourceMap);
  return consumer;
}

function getOriginalPosition(error, sourceMapConsumer) {
  const position = {
    line: error.lineNumber || error.line,
    column: error.columnNumber || error.column,
  };
  return sourceMapConsumer.originalPositionFor(position);
}

const error = /* ... your error object ... */;
const sourceMapFile = 'path/to/your/source-map-file.map';
const sourceMapConsumer = getSourceMapConsumer(sourceMapFile);

const originalPosition = getOriginalPosition(error, sourceMapConsumer);

console.log('Original position:', originalPosition);