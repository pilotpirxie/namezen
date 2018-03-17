const Promise = require("bluebird");
const prompt = require('prompt');
const suffixes = require('./suffixes.json');
const prefixes = require('./prefixes.json');
const dns = require('dns');

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
          default: '12',
          type: 'integer',
          required: true
        },
        lengthMin: {
          description: 'What is the minimum length of name?',
          default: '6',
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
   * Search whois database for free domains
   * @param {string} name Base word of domain
   * @param {string|array}  domains Domains for check availability, * for all
   * @return {array} Available domains
   */
   whois(name, TLD, callback) {
     if ( name.length <= 0 ){
       return new Promise((resolve, reject)=>{reject([])});
     }
     // if TLD isn't an array, use the default array
     if (!Array.isArray(TLD)) {
       TLD = ['.com', '.net', '.org', '.edu', '.gov', '.biz', '.info', '.mobi', '.me', '.tv', '.info', '.io'];
     }

     // prepare the list of full domains to check
     const domains = TLD.map(domain => name + domain);

     const resolve4 = domain => new Promise((resolve, reject) => {
       dns.resolve4(domain, (err, addresses) => {
         if (addresses && addresses.length) {
           // domain resolves - so it's not available
           resolve(false);
          } else {
            // it's available
            resolve(domain);
         }
       });
     });

     // filter for available domains (i.e. return an array of non-falsey results)
     return Promise.map(domains, resolve4).then(results => {
        return results.filter(domain => domain);
      });
   }



  /**
   * Mix and generate different words
   * @param  {array} keywords  Array with keywords as strings
   * @param  {integer} lengthMin Minimal length of domain
   * @param  {integer} lengthMax Maximum length of domain
   * @param  {integer} totalCount   How many of names you want to generate
   */
  generate (keywords, lengthMin, lengthMax, totalCount) {
    // store <totalCount> per keyword names
    let possibleNames = [];

    // contains <totalCount> names selected randomly
    let generatedNames = [];

    keywords = keywords.split(',');

    // for each keyword random <totalCount> names
    keywords.forEach((keyword)=>{

      // set prefixes and suffixes to match lenght of output name
      var _suffixes = suffixes.filter(function(suffix){
        return (suffix.length <= lengthMax - keyword.length) && (suffix.length >= lengthMin - keyword.length);
      })
      var _prefixes = prefixes.filter(function(prefix){
        return (prefix.length <= lengthMax - keyword.length) && (prefix.length >= lengthMin - keyword.length);
      })

      // generate randomly <totalCount> names
      for( let i = 0; i < totalCount; i++ ) {
        if ( Math.floor(Math.random()*2) % 2 == 0 ) {
          possibleNames.push(_prefixes[Math.floor(Math.random()*_prefixes.length)] + keyword);
        } else {
          possibleNames.push(keyword + _suffixes[Math.floor(Math.random()*_suffixes.length)]);
        }
      }
    });

    // pick <totalCount> names from all previous generated names
    while ( generatedNames.length < totalCount ) {
      generatedNames.push(possibleNames[Math.floor(Math.random()*possibleNames.length)]);
    }

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
        let names = this.generate(result.keywords, result.lengthMin, result.lengthMax, result.totalCount);
        console.log(`Generated names: ${names}`);
        // look for available domains for each name
        names.forEach((name) => {
          this.whois(name).then(function(domains){
            console.log(`--- Available domains for ${name} ---`);
            console.log(`${domains}`);
          }).catch(err=>{});
        });
      }
    });
  }
}

module.exports = Namezen;
