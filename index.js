var prompt = require('prompt');

// setup schema
var schema = {
  properties: {
    keywords: {
      description: 'Type all keywords of your business, product, service or whatever else (separated by comma)',
    },

  }
};

// settings
prompt.message = 'Namezen';

// start process
prompt.start();

// receive result from schema
prompt.get(schema, function (err, result) {
  console.log('keywords: ' + result.keywords);
});
