#!/usr/bin/env node
const fs = require("fs");
const program = require("commander");
const TJO = require("translate-json-object")();
const Configstore = require("configstore");
const conf = new Configstore("jsonTranslate");
program.version("0.0.1").parse(process.argv);
const jsonData = require(process.argv[2]);
const language = process.argv[3];
const apiKey = process.argv[4] || conf.get("apiKey");
conf.set("apiKey", apiKey);

TJO.init({
  googleApiKey: apiKey,
});

TJO.translate(jsonData, language)
  .then(function (data) {
    let json = JSON.stringify(data, null, 2);

    fs.writeFile(`translated-${language}.json`, json, (err) => {
      if (err) throw err;
      console.log("Data written to file");
    });
  })
  .catch(function (err) {
    console.log("error ", err);
  });
