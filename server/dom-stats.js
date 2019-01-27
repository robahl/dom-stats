const cheerio = require('cheerio');

const domStats = htmlString => {
  const $ = cheerio.load(htmlString);

  const domNodes = $('*');

  const stats = {};

  domNodes.each((idx, elem) => {
    const tag = elem.name;
    if (tag in stats) {
      stats[tag] += 1;
    } else {
      stats[tag] = 1;
    }
  });

  return stats;
};

module.exports = domStats;
