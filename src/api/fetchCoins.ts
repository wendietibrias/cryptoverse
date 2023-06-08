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

const fetchCoin = async (id : string) => {
  const options = {
    method: 'GET',
    url: `https://coinranking1.p.rapidapi.com/coin/${id}`,
    params: {
      timePeriod: '24h'
    },
    headers: {
      'X-RapidAPI-Key': '5a6bb2bb58msh8f64f98f0142d85p1c88cbjsn82920957c6ba',
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  };

  try {

    const { data } = await axios.request(options);


    if(data) {
       return data.data.coin;
    }

  } catch (err) {
    return err;
  }
}

const fetchCoinHistory = async (id : string,period : string = "24h") => {
  const options = {
    method: 'GET',
    url: `https://coinranking1.p.rapidapi.com/coin/${id}/history`,
    params: {timePeriod: period},
    headers: {
      'X-RapidAPI-Key': '5a6bb2bb58msh8f64f98f0142d85p1c88cbjsn82920957c6ba',
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  };

  try {

    const { data } = await axios.request(options);

    if(data) {
      return data.data.history;
    }

  } catch(err) {
     return err;   
  }
  
}

export {
    fetchCoins,
    fetchCoin,
    fetchCoinHistory
}