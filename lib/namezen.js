const Promise = require("bluebird");
const prompt = require('prompt');
const suffixes = require('./suffixes.json');
const prefixes = require('./prefixes.json');
var dns = Promise.promisifyAll(require("dns"));

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
        totalCount: {
          description: 'How many of names you want?',
          default: '5',
          type: 'integer',
          required: true
        }
      }
    };
  }

  /**
   * Check if domain is available
   * @param {string} domain
   * @return {Promise}
   */
  lookup (domain) {
    return new Promise((resolve, reject) => {
      dns.resolve4(domain, (err, addresses) => {
        if ( err || addresses.length <= 0 ){
          resolve (domain);
        } else {
          reject();
        }
      });
    });
  }

  /**
   * Search whois database for free domains
   * @param {string} name Base word of domain
   * @param {string|array}  domains Domains for check availability, * for all
   * @return {array} Available domains
   */
  whois (name, domains = '*') {
    // check if domains are passed
    // otherwise use internal array with domains
    if ( typeof domains == 'Object' && domains.length > 0 ) {
      var TLD = domains;
    } else {
      var TLD = ['.com','.net','.org','.edu','.gov', '.biz', '.info', '.mobi', '.me', '.tv', '.info', '.io'];
    }

    var availableDomains = [];

    // for each name check each if domain is available
    for (let domain of TLD) {
      this.lookup(name + domain).then(data => {
        console.log(data);
      }).catch(err => {});
    }

    return availableDomains;
  }

  /**
   * Mix and generate different words
   * @param  {array} keywords  Array with keywords as strings
   * @param  {integer} lengthMin Minimal length of domain
   * @param  {integer} lengthMax Maximum length of domain
   * @param  {function} callback Return function
   * @param  {integer} totalCount   How many of names you want to generate
   * @param  {array} options   Array with additional options
   */
  generate (keywords, lengthMin, lengthMax, totalCount, callback, options) {
    let generatedNames = [];

    callback(this.whois('domain'));
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
        this.generate(result.keywords, result.lengthMin, result.lengthMax, result.totalCount, function (names) {
          console.log(`Generated names: ${names}`);
        });
      }
    });
  }
}

module.exports = Namezen;
