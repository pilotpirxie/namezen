const prompt = require('prompt');
const suffixes = require('./suffixes.json');
const prefixes = require('./prefixes.json');

class Namezen {
  /**
   * Namezen setup
   */
  constructor (){
    this.schema = {
      properties: {
        keywords: {
          description: 'Type all keywords of your business, product, service or whatever else (separated by comma)',
          type: 'string',
          required: true
        },
        lengthMax: {
          description: 'What is the maximum length of name?',
          default: '6',
          type: 'integer',
          required: true
        },
        lengthMin: {
          description: 'What is the minimum length of name?',
          default: '12',
          type: 'integer',
          required: true
        },

      }
    };
  }

  /**
   * Search whois database for free domains
   * @param {string} name Base word of domain
   * @param {string|array}  domains Domains for check availability, * for all
   * @return {array} Available domains
   */
  whois (name, domains) {
    let availableDomains;
    return availableDomains;
  }

  /**
   * Mix and generate different words
   * @param  {array} keywords  Array with keywords as strings
   * @param  {integer} lengthMin Minimal length of domain
   * @param  {integer} lengthMax Maximum length of domain
   * @param  {array} options   Array with additional options
   * @return {array} Generated names
   */
  generate (keywords, lengthMin, lengthMax, options) {
    let generatedNames = [];
    return generatedNames;
  }

  /**
   * Step by step name generator
   * @return {void} Generate and write into terminal names
   */
  creator () {

    // prompt settings
    prompt.message = 'Namezen';

    // start process
    prompt.start();

    // receive result from schema
    prompt.get(this.schema, (err, result) => {
      if ( !err ){
        let names = this.generate(result.keywords, result.lengthMin, result.lengthMax);
        console.log('Generated names: ' + names);
      }
    });
  }
}

module.exports = Namezen;
