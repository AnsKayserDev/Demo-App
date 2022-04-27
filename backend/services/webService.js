var axios = require("axios");
async function getService(url) {
  try {
    const configuration = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let response = await axios.get(url, configuration);
    return response;
  } catch (error) {
    console.log("error", error);
  }
}


module.exports = {
  getService,
};
