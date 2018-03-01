const express = require('express');
const axios = require('axios');
const app = express();

var cache = {
    url: '',
    data: ''
}

app.get('/', function (req, res) {
    var movieId = req.query.i;
    var movieText = req.query.t;

    if (movieId) {
        if (cache.url == movieId) {
            res.json(cache.data)
        } else {
            axios
                .get('http://www.omdbapi.com/?i=' + movieId + '&apikey=8730e0e')
                .then(function (response) {
                    cache.url = movieId
                    cache.data = response.data;
                    res.json(response.data);
                })
                .catch(function (error) {
                    res.json(error.message);
                })
        }
    } else {
        if (cache.url == movieText) {
            res.json(cache.data)
        } else {
            axios.get('http://www.omdbapi.com/?t=' + encodeURIComponent(movieText) + '&apikey=8730e0e')
                .then(function (response) {
                    cache.url = movieText
                    cache.data = response.data;
                    res.json(response.data);
                })
                .catch(function (error) {
                    res.json(error.message);
                })
        }
    }
});



module.exports = app;
