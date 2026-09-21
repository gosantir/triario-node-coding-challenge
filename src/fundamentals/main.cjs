
const { sumArray } = require('./utils_module.cjs');

console.log('\n=== FUNDAMENTALS: COMMONJS ===\n');

// Tests
const testCases = [
  { label: 'Basic integers', data: [1, 2, 3, 4, 5] },
  { label: 'Decimals', data: [10.5, 20.3, 30.7, 40.1] },
];

testCases.forEach(({ label, data }) => {
  console.log(`--- ${label} ---`);
  const display =
    data.length > 10
      ? `[${data.slice(0, 5).join(', ')}, ... (${data.length} elements)]`
      : `[${data.join(', ')}]`;
  console.log(`  Input:   ${display}`);
  console.log(`  Sum:     ${sumArray(data)}`);
  console.log();
});

console.log('--- Error Handling ---');

try {
  sumArray('not an array');
} catch (error) {
  console.log(`  sumArray('not an array'): Error caught — ${error.message}`);
}

try {
  sumArray([1, 2, 'non number', 4]);
} catch (error) {
  console.log(`  sumArray([1,2,'no number',4]): Error caught — ${error.message}`);
}

