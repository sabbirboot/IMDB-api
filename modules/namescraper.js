const axios = require("axios");
const cheerio = require("cheerio");
const { data } = require("cheerio/lib/api/attributes");
const searchById = require("./idresp");

async function search(term) {

  try {
    var web = await axios.get(
      `https://www.imdb.com/find?q=${term}&s=tt&exact=true&ref_=fn_al_tt_ex`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Referer': 'https://www.google.com/'
        },
        timeout: 10000
      }
    );  // ✅ Added headers!
  } catch {
    return null;
  }

  const $ = cheerio.load(web.data);
  var info = {};
  info.title = $(
    `#main > div > div.findSection > table > tbody > tr:nth-child(1) > td.result_text > a`
  ).text();

  info.url =
    "https://www.imdb.com/" +
    $(
      "#main > div > div.findSection > table > tbody > tr:nth-child(1) > td.result_text > a"
    ).attr("href");

  info.id = $(
    `tr.findResult:nth-child(1) > td:nth-child(2) > a:nth-child(1)`
  )[0].attribs.href.split("/")[2];

  var fdata = searchById.searchById(info.id);

  return fdata;
}

// search("avengers");

module.exports = {
  serach: search
}
