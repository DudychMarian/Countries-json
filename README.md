# Countries-JSON 🌎

Comprehensive JSON data for all 194 United Nations member countries. Whether you're building a world-centric application or need reliable country data, this package has you covered.

## Installation

```bash
npm install countries-json
```

## Features

- 🌍 Complete data for all 194 UN member countries
- 🔍 Multiple search methods (alpha-2, alpha-3, ISO, name)
- ⚡ Fast indexed lookups
- 📦 Zero dependencies
- 💾 Offline data (no API calls needed)
- 🎯 TypeScript support (coming soon)

## Usage

### Basic Usage

```javascript
const countries = require('countries-json');

// Get country by alpha-2 code
const uk = countries.getCountry('GB');
console.log(uk.country_name); // "United Kingdom"
console.log(uk.capital); // "London"
```

### Search Methods

#### By Alpha-2 Code
```javascript
const country = countries.getByAlpha2('US');
// Returns USA data
```

#### By Alpha-3 Code
```javascript
const country = countries.getByAlpha3('GBR');
// Returns United Kingdom data
```

#### By ISO Numeric Code
```javascript
const country = countries.getByISO('826');
// Returns United Kingdom data
```

#### By Country Name
```javascript
const country = countries.getByName('United Kingdom');
// Returns UK data (case-insensitive)
```

#### Smart Search (Auto-detect)
```javascript
// Works with any format
countries.getCountry('GB');        // Alpha-2
countries.getCountry('GBR');       // Alpha-3
countries.getCountry('826');       // ISO
countries.getCountry('United Kingdom'); // Name
```

### Advanced Features

#### Search by Partial Name
```javascript
const results = countries.searchByName('united');
// Returns array of countries with "united" in name
```

#### Get All Countries
```javascript
const allCountries = countries.getAllCountries();
console.log(allCountries.length); // 194
```

#### Filter by Language
```javascript
const englishCountries = countries.getByLanguage('English');
// Returns all countries where English is official
```

#### Filter by Currency
```javascript
const euroCountries = countries.getByCurrency('EUR');
// Returns all countries using Euro
```

#### Get Total Count
```javascript
const total = countries.getCount();
console.log(total); // 194
```

## Data Structure

Each country object contains:

```javascript
{
  "id": "21",
  "iso": "GBR",
  "alpha_2": "GB",
  "country_name": "United Kingdom",
  "cover_image": "...",
  "flag_url": "...",
  "short_description": "...",
  "known_for": [...],
  "capital": "London",
  "major_cities": [...],
  "official_language": ["English"],
  "currency": {
    "title": "Pound sterling",
    "symbol": "£"
  },
  "major_religions": "Christianity",
  "national_day": {...},
  "phone": {...},
  "plug_types": ["G"],
  "transport": {...},
  "health": {...},
  "money": {...},
  "weather": {...},
  "emergency": [...]
}
```

## API Reference

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `getCountry(query)` | query: string | Object\|null | Smart search (auto-detects format) |
| `getByAlpha2(code)` | code: string | Object\|null | Search by alpha-2 code |
| `getByAlpha3(code)` | code: string | Object\|null | Search by alpha-3 code |
| `getByISO(code)` | code: string\|number | Object\|null | Search by ISO numeric |
| `getByName(name)` | name: string | Object\|null | Search by exact name |
| `searchByName(query)` | query: string | Array | Partial name search |
| `getAllCountries()` | - | Array | Get all countries |
| `getByLanguage(lang)` | lang: string | Array | Filter by language |
| `getByCurrency(code)` | code: string | Array | Filter by currency |
| `getCount()` | - | number | Total country count |

## Examples

### Building a Country Selector

```javascript
const countries = require('countries-json');

function buildCountryDropdown() {
  const allCountries = countries.getAllCountries();
  return allCountries.map(country => ({
    value: country.alpha_2,
    label: country.country_name,
    flag: country.flag_url
  }));
}
```

### Phone Number Validation

```javascript
const countries = require('countries-json');

function getPhoneCode(countryCode) {
  const country = countries.getByAlpha2(countryCode);
  return country ? country.phone.digital_code : null;
}

console.log(getPhoneCode('GB')); // "+44"
```

### Travel Information

```javascript
const countries = require('countries-json');

function getTravelInfo(countryCode) {
  const country = countries.getByAlpha2(countryCode);
  if (!country) return null;
  
  return {
    capital: country.capital,
    currency: country.currency.symbol,
    emergency: country.emergency,
    plugTypes: country.plug_types,
    drivingSide: country.transport.driving_side
  };
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Support

If you find this package helpful, please give it a ⭐️ on GitHub!

## Links

- [GitHub Repository](https://github.com/DudychMarian/Countries-json)
- [NPM Package](https://www.npmjs.com/package/countries-json)
- [Report Issues](https://github.com/DudychMarian/Countries-json/issues)