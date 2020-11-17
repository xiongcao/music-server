require('babel-core/register')({
  presets: ['stage-3']
});

const model = require('./model.js');

model.sync.then(() => {
  process.exit(0);
}).catch((e) => {
  process.exit(0);
});