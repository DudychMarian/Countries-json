const countries = require('../index');

console.log('🧪 Running Countries-JSON Tests...\n');

let passed = 0;
let failed = 0;

function test(description, fn) {
  try {
    fn();
    console.log(`✅ ${description}`);
    passed++;
  } catch (error) {
    console.log(`❌ ${description}`);
    console.log(`   Error: ${error.message}`);
    failed++;
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

// Test getByAlpha2
test('getByAlpha2: Should return UK data for "GB"', () => {
  const uk = countries.getByAlpha2('GB');
  assert(uk !== null, 'UK should not be null');
  assert(uk.country_name === 'United Kingdom', 'Country name should be United Kingdom');
  assert(uk.alpha_2 === 'GB', 'Alpha-2 should be GB');
});

test('getByAlpha2: Should be case-insensitive', () => {
  const uk1 = countries.getByAlpha2('gb');
  const uk2 = countries.getByAlpha2('GB');
  assert(uk1 !== null && uk2 !== null, 'Both should return data');
  assert(uk1.alpha_2 === uk2.alpha_2, 'Should return same country');
});

test('getByAlpha2: Should return null for invalid code', () => {
  const result = countries.getByAlpha2('XX');
  assert(result === null, 'Should return null for invalid code');
});

// Test getByAlpha3
test('getByAlpha3: Should return UK data for "GBR"', () => {
  const uk = countries.getByAlpha3('GBR');
  assert(uk !== null, 'UK should not be null');
  assert(uk.iso === 'GBR', 'ISO should be GBR');
});

test('getByAlpha3: Should be case-insensitive', () => {
  const uk1 = countries.getByAlpha3('gbr');
  const uk2 = countries.getByAlpha3('GBR');
  assert(uk1 !== null && uk2 !== null, 'Both should return data');
  assert(uk1.iso === uk2.iso, 'Should return same country');
});

// Test getByISO
test('getByISO: Should return UK data for "21"', () => {
  const uk = countries.getByISO('21');
  assert(uk !== null, 'UK should not be null');
  assert(uk.id === '21', 'ID should be 21');
});

test('getByISO: Should accept number input', () => {
  const uk = countries.getByISO(21);
  assert(uk !== null, 'UK should not be null');
  assert(uk.id === '21', 'ID should be 21');
});

// Test getByName
test('getByName: Should return UK data for "United Kingdom"', () => {
  const uk = countries.getByName('United Kingdom');
  assert(uk !== null, 'UK should not be null');
  assert(uk.country_name === 'United Kingdom', 'Country name should match');
});

test('getByName: Should be case-insensitive', () => {
  const uk1 = countries.getByName('united kingdom');
  const uk2 = countries.getByName('UNITED KINGDOM');
  assert(uk1 !== null && uk2 !== null, 'Both should return data');
  assert(uk1.alpha_2 === uk2.alpha_2, 'Should return same country');
});

// Test getCountry (smart search)
test('getCountry: Should work with alpha-2 code', () => {
  const uk = countries.getCountry('GB');
  assert(uk !== null, 'Should return UK data');
  assert(uk.alpha_2 === 'GB', 'Should be UK');
});

test('getCountry: Should work with alpha-3 code', () => {
  const uk = countries.getCountry('GBR');
  assert(uk !== null, 'Should return UK data');
  assert(uk.iso === 'GBR', 'Should be UK');
});

test('getCountry: Should work with ISO code', () => {
  const uk = countries.getCountry('21');
  assert(uk !== null, 'Should return UK data');
  assert(uk.id === '21', 'Should be UK');
});

test('getCountry: Should work with country name', () => {
  const uk = countries.getCountry('United Kingdom');
  assert(uk !== null, 'Should return UK data');
  assert(uk.country_name === 'United Kingdom', 'Should be UK');
});

// Test searchByName
test('searchByName: Should return array of matches', () => {
  const results = countries.searchByName('United');
  assert(Array.isArray(results), 'Should return array');
  assert(results.length > 0, 'Should have results');
  assert(
    results.some(c => c.country_name === 'United Kingdom'),
    'Should include UK'
  );
});

test('searchByName: Should be case-insensitive', () => {
  const results1 = countries.searchByName('united');
  const results2 = countries.searchByName('UNITED');
  assert(results1.length === results2.length, 'Should return same count');
});

// Test getAllCountries
test('getAllCountries: Should return array of all countries', () => {
  const all = countries.getAllCountries();
  assert(Array.isArray(all), 'Should return array');
  assert(all.length > 0, 'Should have countries');
});

// Test getByLanguage
test('getByLanguage: Should return countries with English', () => {
  const englishCountries = countries.getByLanguage('English');
  assert(Array.isArray(englishCountries), 'Should return array');
  assert(
    englishCountries.some(c => c.alpha_2 === 'GB'),
    'Should include UK'
  );
});

// Test getCount
test('getCount: Should return number of countries', () => {
  const count = countries.getCount();
  assert(typeof count === 'number', 'Should return number');
  assert(count > 0, 'Should have countries');
});

// Test data structure
test('Data structure: UK should have required fields', () => {
  const uk = countries.getByAlpha2('GB');
  assert(uk.alpha_2, 'Should have alpha_2');
  assert(uk.iso, 'Should have iso');
  assert(uk.country_name, 'Should have country_name');
  assert(uk.capital, 'Should have capital');
  assert(Array.isArray(uk.official_language), 'Should have official_language array');
  assert(uk.currency, 'Should have currency');
  assert(uk.currency.symbol, 'Currency should have symbol');
});

// Summary
console.log('\n' + '='.repeat(50));
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log(`📊 Total: ${passed + failed}`);
console.log('='.repeat(50));

if (failed > 0) {
  process.exit(1);
}