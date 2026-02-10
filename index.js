const fs = require('fs');
const path = require('path');

class CountriesJSON {
  constructor() {
    this.countries = [];
    this.dataPath = path.join(__dirname, 'data');
    this.indexMap = {
      alpha2: {},
      alpha3: {},
      iso: {},
      name: {}
    };
    this.loadCountries();
  }

  /**
   * Load all country data and build search indexes
   */
  loadCountries() {
    try {
      const files = fs.readdirSync(this.dataPath);
      
      files.forEach(file => {
        if (file.endsWith('.json')) {
          const filePath = path.join(this.dataPath, file);
          const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          
          this.countries.push(data);
          
          // Build indexes for fast lookup
          if (data.alpha_2) {
            this.indexMap.alpha2[data.alpha_2.toUpperCase()] = data;
          }
          if (data.iso) {
            this.indexMap.alpha3[data.iso.toUpperCase()] = data;
            this.indexMap.iso[data.id] = data;
          }
          if (data.country_name) {
            this.indexMap.name[data.country_name.toLowerCase()] = data;
          }
        }
      });
    } catch (error) {
      console.error('Error loading country data:', error);
    }
  }

  /**
   * Get country by alpha-2 code (e.g., "GB")
   * @param {string} code - Alpha-2 country code
   * @returns {Object|null} Country data or null
   */
  getByAlpha2(code) {
    if (!code) return null;
    return this.indexMap.alpha2[code.toUpperCase()] || null;
  }

  /**
   * Get country by alpha-3 code (e.g., "GBR")
   * @param {string} code - Alpha-3 country code
   * @returns {Object|null} Country data or null
   */
  getByAlpha3(code) {
    if (!code) return null;
    return this.indexMap.alpha3[code.toUpperCase()] || null;
  }

  /**
   * Get country by ISO numeric code (e.g., "826")
   * @param {string|number} code - ISO numeric code
   * @returns {Object|null} Country data or null
   */
  getByISO(code) {
    if (!code) return null;
    return this.indexMap.iso[code.toString()] || null;
  }

  /**
   * Get country by name (case-insensitive)
   * @param {string} name - Country name
   * @returns {Object|null} Country data or null
   */
  getByName(name) {
    if (!name) return null;
    return this.indexMap.name[name.toLowerCase()] || null;
  }

  /**
   * Smart search that tries all methods
   * @param {string} query - Search query (alpha-2, alpha-3, ISO, or name)
   * @returns {Object|null} Country data or null
   */
  getCountry(query) {
    if (!query) return null;

    const queryStr = query.toString().trim();
    
    // Try alpha-2 first (most common)
    if (queryStr.length === 2) {
      const result = this.getByAlpha2(queryStr);
      if (result) return result;
    }
    
    // Try alpha-3
    if (queryStr.length === 3) {
      const result = this.getByAlpha3(queryStr);
      if (result) return result;
    }
    
    // Try ISO numeric
    if (/^\d+$/.test(queryStr)) {
      const result = this.getByISO(queryStr);
      if (result) return result;
    }
    
    // Try by name
    return this.getByName(queryStr);
  }

  /**
   * Search countries by partial name match
   * @param {string} query - Partial country name
   * @returns {Array} Array of matching countries
   */
  searchByName(query) {
    if (!query) return [];
    
    const searchTerm = query.toLowerCase();
    return this.countries.filter(country => 
      country.country_name.toLowerCase().includes(searchTerm)
    );
  }

  /**
   * Get all countries
   * @returns {Array} Array of all country data
   */
  getAllCountries() {
    return this.countries;
  }

  /**
   * Get countries by region/continent
   * @param {string} region - Region name
   * @returns {Array} Array of countries in the region
   */
  getByRegion(region) {
    if (!region) return [];
    
    const searchTerm = region.toLowerCase();
    return this.countries.filter(country => 
      country.region && country.region.toLowerCase() === searchTerm
    );
  }

  /**
   * Get countries by currency code
   * @param {string} currencyCode - Currency code (e.g., "USD")
   * @returns {Array} Array of countries using the currency
   */
  getByCurrency(currencyCode) {
    if (!currencyCode) return [];
    
    const code = currencyCode.toUpperCase();
    return this.countries.filter(country => 
      country.currency && country.currency.title && 
      country.currency.title.toUpperCase().includes(code)
    );
  }

  /**
   * Get countries by official language
   * @param {string} language - Language name
   * @returns {Array} Array of countries with the language
   */
  getByLanguage(language) {
    if (!language) return [];
    
    const searchTerm = language.toLowerCase();
    return this.countries.filter(country => 
      country.official_language && 
      country.official_language.some(lang => 
        lang.toLowerCase().includes(searchTerm)
      )
    );
  }

  /**
   * Get total number of countries
   * @returns {number} Total countries
   */
  getCount() {
    return this.countries.length;
  }
}

// Create singleton instance
const countriesJSON = new CountriesJSON();

// Export methods
module.exports = {
  getCountry: (query) => countriesJSON.getCountry(query),
  getByAlpha2: (code) => countriesJSON.getByAlpha2(code),
  getByAlpha3: (code) => countriesJSON.getByAlpha3(code),
  getByISO: (code) => countriesJSON.getByISO(code),
  getByName: (name) => countriesJSON.getByName(name),
  searchByName: (query) => countriesJSON.searchByName(query),
  getAllCountries: () => countriesJSON.getAllCountries(),
  getByRegion: (region) => countriesJSON.getByRegion(region),
  getByCurrency: (currencyCode) => countriesJSON.getByCurrency(currencyCode),
  getByLanguage: (language) => countriesJSON.getByLanguage(language),
  getCount: () => countriesJSON.getCount()
};