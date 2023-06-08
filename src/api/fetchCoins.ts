import axios from "axios";
import { IFetchCoinParams } from "../interfaces/APIParamsInterfaces";

const fetchCoins = async (params : IFetchCoinParams) => {
    const options = {
        method: 'GET',
        url: 'https://coinranking1.p.rapidapi.com/coins',
        params,
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY_COIN_RANGKING ,
          'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
      };


     try {
        const { data } = await axios.request(options);

        if(data) {
            return { stats:data.data.stats, coins:data.data.coins };
        }

     } catch(err) {
        return err;
     }
}

export {
    fetchCoins
}