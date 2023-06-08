import "../assets/styles/css/AllCrypto.css";
import { useEffect, useState } from "react";
import { fetchCoins } from "../api/fetchCoins";
import { CryptoCard,Loading } from "../components";
import { ICoinsResponse } from "../interfaces/ResponseApiInterfaces";
import Select from "react-select";
import { Link } from "react-router-dom";

const AllCrypto = () => {
    const options = [
        { value:"50", label:"50 Coins",selected:true },
        { value:"100" , label:"100 Coins" }
    ]

    const [loadData,setLoadData] = useState<boolean>(false);
    const [coins,setCoins] = useState<ICoinsResponse[] | null>(null);

    const fetchAllCrypto = async () => {
        setLoadData(true);
        const response : any = await fetchCoins({
            referenceCurrencyUuid: 'yhjMzLPhuIDl',
            timePeriod: '24h',
            orderBy: 'marketCap',
            orderDirection: 'desc',
            limit: '50',
             offset: '0'
          });

          const { coins } = response;

          setCoins(coins);

          setLoadData(false);
    }

    useEffect(() => {
       document.title = "Cryptoverse | Cryptocurrencies";
      fetchAllCrypto();
      
    },[]);

    if(loadData) {
        return (
            <Loading width={40} height={40} />
        )
    }

    return (
        <div className="main">
            <div className="crypto-section-container"> 
             <div className="crypto-section-header">
             <h2 className="section-title">All Cryptocurrencies</h2>
             <div className="select-box">
               <Select options={options}/>
             </div>
             </div>
             <div className="crypto-currencies-items grid grid-cols-4 grid-cols-sm-1">
                 {coins && Array.isArray(coins) && coins.map((coin : ICoinsResponse,idx : number) => (
                    <Link to={`/crypto/${coin.uuid}`}>
                        <CryptoCard coin={coin} idx={idx} />
                    </Link>
                 ))}
             </div>
            </div>
        </div>
    )
}

export default AllCrypto;