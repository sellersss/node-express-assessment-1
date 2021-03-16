const fs = require('fs');
const process = require('process');
const axios = require('axios');

function readUrls(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file "${path}" \n${err}`)
      process.exit(1);
    } else {
      const urls = data.split('\n').filter((url) => {
        return url !== '';
      });
      urlData(urls);
    }
  });
}

function urlData(urls) {
  urls.forEach(async (url) => {
    const afterSecondSlashIndex = url.indexOf('/') + 2;
    const thirdSlashIndex = url.indexOf('/', afterSecondSlashIndex) !== -1 ? url.indexOf('/', afterSecondSlashIndex) : null;
    const fileName = url.slice(afterSecondSlashIndex, thirdSlashIndex || url.length) + '.txt';
    try {
      const resp = await axios.get(url, { timeout: 5000 });
      handleOutput(resp.data, fileName)
    } catch (err) {
      console.error(`Could not download ${url}: ${err}`);
    }
  });
}

function handleOutput(text, outputFile) {
  fs.writeFile(`./output/${outputFile}`, text, 'utf8', function(err) {
    if (err) {
      console.error(`Couldn't write ${outputFile}: ${err}`);
    } else console.log(`Wrote to ${outputFile}`)
  });
}

readUrls(process.argv[2]);
