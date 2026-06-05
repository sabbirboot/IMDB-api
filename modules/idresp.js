const axios = require("axios");
const cheerio = require("cheerio");

async function searchById(id) {

  var data = [];

  try {
    var web = await axios.get(
      `https://www.imdb.com/title/${id}/?ref_=fn_tt_tt_1`,
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

  var finalinfo = {};

  finalinfo.name = $(
    "h1"
  ).text();

  finalinfo.year = $(
    "#__next > main > div > section.ipc-page-background.ipc-page-background--base.MainDetailPageLayout__StyledPageBackground-sc-13rp3wh-0.hsughJ > section > div:nth-child(4) > section > section > div.TitleBlock__Container-sc-1nlhx7j-0.hglRHk > div.TitleBlock__TitleMetaDataContainer-sc-1nlhx7j-2.hWHMKr > ul > li:nth-child(1) > a"
  ).text();

  finalinfo.rating = $(
    "#__next > main > div > section.ipc-page-background.ipc-page-background--base.MainDetailPageLayout__StyledPageBackground-sc-13rp3wh-0.hsughJ > section > div:nth-child(4) > section > section > div.TitleBlock__Container-sc-1nlhx7j-0.hglRHk > div.RatingBar__RatingContainer-sc-85l9wd-0.hNqCJh.TitleBlock__HideableRatingBar-sc-1nlhx7j-4.bhTVMj > div > div:nth-child(1) > a > div > div > div.AggregateRatingButton__ContentWrap-sc-1ll29m0-0.hmJkIS > div.AggregateRatingButton__Rating-sc-1ll29m0-2.bmbYRW"
  ).text();

  finalinfo.genre = $(
    "div.GenresAndPlot__ContentParent-sc-cum89p-8.hTqGWn.Hero__GenresAndPlotContainer-sc-kvkd64-11.iEHpKn > div"
  ).text();

  finalinfo.plot = $(
    'span[data-testid="plot-l"]'
  ).text();

  finalinfo.director = $(
    "div.PrincipalCredits__PrincipalCreditsPanelWideScreen-sc-hdn81t-0.hzbDAm > ul > li:nth-child(1) > div"
  ).text();

  // console.log(finalinfo);

  data.push(finalinfo);
//   console.log(data);
  return data;
}

module.exports = {
  searchById: searchById,
};
