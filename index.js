const request = require("request");
const cheerio = require("cheerio");

const args = require("minimist")(process.argv.slice(2));
let url = args["url"];
let words = args["words"];
words = words.split(",");
let wordsMap = {};
for (let i = 0; i < words.length; i++) {
  wordsMap[words[i]] = 0;
}

request(`${url}`, (error, response, html) => {
  if (!error && response.statusCode == 200) {
    let data = cheerio.load(html);
    data = data.text();
    data = data.split(" ");
    for (let i = 0; i < data.length; i++) {
      data[i] = data[i].replace(/[^A-Za-z']/g, "");
    }
    data.forEach((res) => {
      if (wordsMap[`${res}`] !== undefined) {
        wordsMap[`${res}`] += 1;
      }
    });
    console.log(wordsMap);
  }
});
