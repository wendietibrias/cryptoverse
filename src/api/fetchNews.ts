import axios from "axios";

const fetchNews = async (q : string,limit : number) => {
    const options = {
        method: 'GET',
        url: 'https://bing-news-search1.p.rapidapi.com/news/search',
        params: {
          q: q,
          freshness: 'Day',
          textFormat: 'Raw',
          safeSearch: 'Off',
          count:limit
        },
        headers: {
          'X-BingApis-SDK': 'true',
          'X-RapidAPI-Key': '5a6bb2bb58msh8f64f98f0142d85p1c88cbjsn82920957c6ba',
          'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
        }
      };

      try {

        const { data } = await axios.request(options);

        if(data) {
            return data.value;
        }

      } catch(err) {
        return err;
      }
}

export {
    fetchNews
}