const fs = require('fs');

setTimeout(() => {
  fs.copyFile('tsconfig_default.json', 'tsconfig.json', (err) => {
    if (err) throw err;
    console.log('Copy success');
  });
}, 3000);
