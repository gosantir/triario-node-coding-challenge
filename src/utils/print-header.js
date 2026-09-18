const SEPARATOR = '='.repeat(40);

export function printHeader(title) {
  console.log(`\n${SEPARATOR}`);
  console.log(`  ${title}`);
  console.log(`${SEPARATOR}\n`);
}