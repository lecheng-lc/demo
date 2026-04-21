function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var commonEntry$1 = {};

var commonMath;
var hasRequiredCommonMath;

function requireCommonMath () {
	if (hasRequiredCommonMath) return commonMath;
	hasRequiredCommonMath = 1;
	function add(a, b) {
	  return a + b;
	}

	function multiply(a, b) {
	  return a * b;
	}

	function subtract(a, b) {
	  return a - b;
	}

	commonMath = { add, multiply, subtract };
	return commonMath;
}

var hasRequiredCommonEntry;

function requireCommonEntry () {
	if (hasRequiredCommonEntry) return commonEntry$1;
	hasRequiredCommonEntry = 1;
	const { add } = requireCommonMath();
	console.log(add(2, 3));
	return commonEntry$1;
}

var commonEntryExports = requireCommonEntry();
var commonEntry = /*@__PURE__*/getDefaultExportFromCjs(commonEntryExports);

export { commonEntry as default };
