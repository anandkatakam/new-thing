var request = require("request"),
  cheerio = require("cheerio"),
  fs = require("fs"),
  url = "http://www.bollywoodhungama.com/movies/top-100-movies/",
  data = [];

request(url, function(err, response, body){

  if (!err & response.statusCode == 200){
    var $ = cheerio.load(body);
    $(".bh-top-100-movies-wrapper .hentry").each(function(index, movie){

      data.push({
        url: $(movie).find("a").attr("href"),
        user_rating: +$(movie).find(".bh-poll-view-count").text().trim(),
        stars: $(movie).find(".current-rating").attr("class").split("rating-")[1] / 10,
        rank: +$(movie).find(".rank").text().trim(),
        movie_name: $(movie).find(".name").text().trim()});
    });
    fs.writeFileSync("data.json", JSON.stringify(data));
  } else {
    console.log(err);
  }

  console.log('this is an awesome scraper!')