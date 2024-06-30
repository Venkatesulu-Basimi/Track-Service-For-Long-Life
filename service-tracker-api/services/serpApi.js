const logger = require("./logger");
const axios = require('axios');


async function listLocalServices(data) {
    try {
        const apiKey = 'c056e130512e7e1fca59988f2880e1160b30fb3fd7e72d650963758abce41991';

        const searchQuery = data.searchText || 'services';
        const location = data.location || 'Ireland';

        const url = 'https://serpapi.com/search';
        const params = {
          engine: "google_local",
          q: searchQuery,
          location: location,
          api_key: apiKey
        };
        
          try {
            const response = await axios.get(url, { params });
            return response.data.local_results;
          } catch (error) {
            logger.error('Error fetching Google Services:', error);
            return [];
          }

    } catch(error) {
        logger.error(error);
        throw error;
    }

}

module.exports = {
  listLocalServices
}