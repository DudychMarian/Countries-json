# World-Countries-JSON 🌍

[![npm version](https://img.shields.io/npm/v/world-countries-json.svg)](https://www.npmjs.com/package/world-countries-json)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**World-Countries-JSON** is a comprehensive, high-performance dataset and library providing detailed information for **249 countries and territories** worldwide. From basic ISO codes to travel-specific data like plug types and emergency numbers, this package is designed for modern web applications that need reliable global data.

---

## 🚀 Features

- **🌍 Global Coverage**: Comprehensive data for 249 countries and overseas territories.
- **🔍 Advanced Search**: Search by Alpha-2, Alpha-3, ISO Numeric, or Country Name (case-insensitive).
- **⚡ Super Fast**: Optimized for quick lookups via pre-indexed data.
- **🛡️ Travel Ready**: Includes plug types, driving side, emergency contacts, and tipping etiquette.
- **📦 Zero Dependencies**: Lightweight and reliable.
- **💾 Offline First**: All data is local—no external API calls required.

---

## 📦 Installation

```bash
npm install world-countries-json
```

---

## 🛠 Usage

### Basic Usage

```javascript
const countries = require("world-countries-json");

// Get country by Alpha-2 code
const uk = countries.getCountry("GB");
console.log(uk.country_name); // "United Kingdom"
console.log(uk.capital); // "London"
```

### Search Methods

| Method                | Description                              | Example                            |
| :-------------------- | :--------------------------------------- | :--------------------------------- |
| `getCountry(query)`   | Smart search (auto-detects code or name) | `countries.getCountry('US')`       |
| `getByAlpha2(code)`   | Search by 2-letter ISO code              | `countries.getByAlpha2('FR')`      |
| `getByAlpha3(code)`   | Search by 3-letter ISO code              | `countries.getByAlpha3('DEU')`     |
| `getByISO(code)`      | Search by ISO Numeric code               | `countries.getByISO('250')`        |
| `getByName(name)`     | Search by full country name              | `countries.getByName('France')`    |
| `searchByName(query)` | Partial name search (returns array)      | `countries.searchByName('united')` |

---

## 📄 Data Structure

Each country entry is a rich JSON object:

```json
{
  "id": "826",
  "iso": "GBR",
  "alpha_2": "GB",
  "country_name": "United Kingdom",
  "cover_image": "",
  "flag_url": "https://flagcdn.com/gb.svg",
  "short_description": "The United Kingdom is an island nation in northwestern Europe, known for its global cultural influence and historic landmarks.",
  "known_for": [
    {
      "title": "🏰 Buckingham Palace & Royalty",
      "color": "gray"
    },
    {
      "title": "🕰️ Big Ben & Westminster",
      "color": "brown"
    },
    {
      "title": "🪨 Stonehenge",
      "color": "gray"
    },
    {
      "title": "🎓 Oxford & Cambridge Universities",
      "color": "blue"
    },
    {
      "title": "⚽ Premier League Football",
      "color": "red"
    }
  ],
  "capital": "London",
  "major_cities": [
    "London",
    "Birmingham",
    "Glasgow",
    "Liverpool",
    "Manchester",
    "Edinburgh",
    "Bristol"
  ],
  "official_language": ["English"],
  "currency": {
    "title": "Pound Sterling",
    "symbol": "£"
  },
  "major_religions": "Christianity (60%)",
  "national_day": {
    "title": "King's Official Birthday",
    "date": "Occurs in June"
  },
  "phone": {
    "digital_code": "+44",
    "phone_operators": ["EE", "O2", "Vodafone UK", "Three"]
  },
  "plug_types": ["G"],
  "transport": {
    "driving_side": "Left",
    "taxi": ["Uber", "Free Now", "Black Cabs"],
    "metro": [
      "London Underground (The Tube)",
      "Glasgow Subway",
      "Tyne and Wear Metro"
    ]
  },
  "health": {
    "tap_water_safety": "Safe to drink",
    "alcohol_consumption_age": "18 years old",
    "alcohol_parchase_age": "18 years old",
    "alcohol_info": [
      "Legal age is 18",
      "Iconic pub culture with vast ales and spirits tradition"
    ]
  },
  "money": {
    "tipping": {
      "hotels": "£1-2 per bag",
      "guides": "10% for private tours",
      "restaurants": "10-15% is standard",
      "taxis": "Rounding up the fare"
    }
  },
  "weather": {
    "title": "The UK has a temperate maritime climate with cool winters and warm summers.",
    "when_to_visit": [
      {
        "icon": "🌤️",
        "title": "Late Spring / Summer",
        "time_period": "May to September",
        "short_description": "Longest days and warmest weather."
      },
      {
        "icon": "🎄",
        "title": "Christmas Season",
        "time_period": "December",
        "short_description": "Festive markets and lights, though cold."
      }
    ],
    "best_time": "The best time to visit is from June to August."
  },
  "emergency": [
    {
      "title": "Emergency Services",
      "number": "999"
    },
    {
      "title": "Emergency (EU standard)",
      "number": "112"
    },
    {
      "title": "Non-emergency Police",
      "number": "101"
    },
    {
      "title": "Non-emergency Medical",
      "number": "111"
    }
  ]
}
```

---

## 🤝 Contributing

We welcome contributions to keep the data accurate and up-to-date!

### How to Contribute

1. **Fork** the repository.
2. **Add/Modify data**: If you are adding a new country, use the `template.json` as your guide.
3. **Validate**:
   - Ensure your JSON follows the exact structure of `template.json`.
   - Your contribution **must** pass the schema validation.
   - Run `npm run test` to verify your changes.
4. **Submit a Pull Request**.

> [!IMPORTANT]
> All new data entries must follow the `template.json` structure strictly to ensure compatibility with our indexing engine.

---

## 📜 License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.

---

## 🔗 Links

- [GitHub Repository](https://github.com/DudychMarian/World-Countries-json)
- [NPM Package](https://www.npmjs.com/package/world-countries-json)
- [Issue Tracker](https://github.com/DudychMarian/World-Countries-json/issues)

---

Developed with ❤️ by [Marian Dudych](https://github.com/DudychMarian)
