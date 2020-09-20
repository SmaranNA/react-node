const express = require('express');
const config = require('../config/newsapi.json');
const NewsAPI = require('newsapi');
const queryString = require('query-string');

const newsApi = new NewsAPI(config.key);

let router = express.Router();

/**
 * Endpoint: /api/news/search
 * API endpoint to return articles using query strings for keywords
 * @queryparam q String|required|Query string
 * @queryparam page Number|optional|Page Number
 * @returns results JSON
 */
router.get('/search', async function(req,res) {
  let results;
  try {
    if(req.query.q !== undefined) {
      results = await newsApi.v2.everything({
        q: queryString.stringify(req.query.q),
        page: req.query.page || 1,
        sortBy: 'publishedAt',
        pageSize: config.pageSize
      });
    } else {
      console.log('No query string found');
      res.status(404).json({err: 'No query string found'});
    }
  } catch(err) {
    console.log(err.message);
    res.status(404).json({err: err.message});
  }
  console.log('Results Length: ' + results.totalResults);
  res.status(200).json(results);
});

/**
 * Endpoint: /api/news/
 * API endpoint to return latest UK news articles
 * @queryparam page Number|optional|Page Number
 * @returns results JSON
 */
router.get('/', async function(req, res) {
  let results;
  try {
    results = await newsApi.v2.topHeadlines({
      country: config.country,
      page: req.query.page || 1,
      sortBy: 'publishedAt',
      pageSize: config.pageSize
    });
  } catch(err) {
    console.log(err.message);
    res.status(404).json({err: err.message});
  }
  console.log('Results Length: ' + results.totalResults);
  res.status(200).json(results);

});

/**
 * Endpoint: /api/news/article/:id
 * API endpoint to return specific article from News API everything endpoint
 * @queryparam page Number|required|Page Number
 * @queryparam q String|required|Query String
 * @param id Number required|Article position in search results
 * @returns results JSON
 */
router.get('/article/:id', async function(req,res) {
  let results;
  try {
    //Check if query and page are available
    if(req.query.q !== undefined && req.query.page !== undefined) {
      //Get page results
      results = await newsApi.v2.everything({
        q: queryString.stringify(req.query.q),
        page: req.query.page || 1,
        sortBy: 'publishedAt',
        pageSize: config.pageSize
      });
    } else {
      let errMsg;
      if(!req.query.q) {
        errMsg = 'No query string found';
      } else {
        errMsg = 'No page number found';
      }
      res.status(404).json({err: errMsg});
    }
    //Check if position in the results exist or not
    if(req.params.id > results.articles.length) {
      console.log('Page and Article ID combination invalid');
      res.status(404).json({err: 'Page and Article ID combination invalid'});
    } else {
      console.log('Result: ' + results.articles[req.params.id - 1].title);
      res.status(200).json(results.articles[req.params.id - 1]);
    }
  } catch(err) {
    console.log(err.message);
    res.status(404).json({err: err.message});
  }
});

module.exports = router;
