
const { getMovieListingEndpoint, getGenreListingEndpoint } = require('../../configurations/api');
const webService = require('../webService');

async function getList(req, res) {
    const url = getMovieListingEndpoint()
    let response = await webService.getService(url);
    res.setHeader('Content-Type', 'application/json');
    if(JSON.stringify(response.status) == '500'){
        res.status(500).json({ "message": `Something Went Wrong` });        
    } else {
        res.send(JSON.stringify(response.data));
    }
}

async function getGenreList(req, res) {
    const url = getGenreListingEndpoint()
    let response = await webService.getService(url);
    res.setHeader('Content-Type', 'application/json');
    if(JSON.stringify(response.status) == '500'){
        res.status(500).json({ "message": `Something Went Wrong` });        
    } else {
        res.send(JSON.stringify(response.data));
    }
}

module.exports = {
    getList,
    getGenreList,
};