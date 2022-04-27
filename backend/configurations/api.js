var baseUrl = 'https://run.mocky.io/v3/';

function getMovieListingEndpoint() { 
//quoted string can be moved to different config file later on w.r.t enviroments;
  return baseUrl+'f8429c6b-1f08-444c-a06e-637325fe6460'; 
}

function getGenreListingEndpoint() { 
//quoted string can be moved to different config file later on w.r.t enviroments;
  return baseUrl+'09f1fe85-b261-4fbe-b896-5ae1f459e7c6'; 
}

module.exports = {
  getMovieListingEndpoint,
  getGenreListingEndpoint,
}