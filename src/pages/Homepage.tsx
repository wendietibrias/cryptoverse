import "../assets/styles/css/Homepage.css";
import { useEffect,useState } from "react";
import { fetchCoins } from "../api/fetchCoins";
import { CryptoCard,NewsCard,Loading } from "../components";
import { fetchNews } from "../api/fetchNews";
import millify from "millify";
import { ICoinsResponse,INewsResponse,IStatsResponse } from "../interfaces/ResponseApiInterfaces";
import moment from "moment";
import { Link } from "react-router-dom";

const Homepage = () => {
    
    const [loadData,setLoadData] = useState<boolean>(false);
    const [stats,setStats] = useState<IStatsResponse | null>(null);
    const [coins,setCoins] = useState<ICoinsResponse[] | null>(null);
    const [news,setNews] = useState<INewsResponse[] | null>(null);

    const fetchTenCoin = async () => {
        const response : any = await fetchCoins({
          referenceCurrencyUuid: 'yhjMzLPhuIDl',
          timePeriod: '24h',
          orderBy: 'marketCap',
          orderDirection: 'desc',
          limit: '10',
           offset: '0'
        });


        const { stats, coins } = response;

        setCoins(coins);
        setStats(stats);
    }

    const fetchSixNews = async () => {
        const response : [any] = await fetchNews("crypto" , 6);

        if(response) {
            setNews(response);
            setLoadData(false);
        }
    }

    useEffect(() => {
        document.title = "Cryptoverse | Homepage"
        
        setLoadData(true);
        fetchTenCoin();
        fetchSixNews();

    }, []);

    if(loadData) {
        return (
            <Loading width={40} height={40} />
        )
    }

    return (
        <main className="main">
            <div className="crypto-stats-container">
                <h2 className="section-title">Global Crypto Stats</h2>
                {stats ? (
                    <div className="crypto-stats-content flex justify-between align-items-start">
                    <div className="crypto-stats-item">
                       <h5>Total Cryptocurrencies</h5>
                       <h4>{millify(stats?.total)}</h4>
                    </div>
                    <div className="crypto-stats-item">
                       <h5>Total Exchanges</h5>
                       <h4>{millify(stats?.totalExchanges)}</h4>
                    </div>
                    <div className="crypto-stats-item">
                       <h5>Total Market Cap</h5>
                       <h4>{millify(stats?.totalMarketCap)}</h4>
                    </div>
                    <div className="crypto-stats-item">
                       <h5>Total 24h Volume</h5>
                       <h4>{millify(stats?.total24hVolume)}</h4>
                    </div>
                    <div className="crypto-stats-item">
                       <h5>Total Cryptocurrencies</h5>
                       <h4>{millify(stats?.total)}</h4>
                    </div>
                    <div className="crypto-stats-item">
                       <h5>Total Markets</h5>
                       <h4>{millify(stats?.totalMarkets)}</h4>
                    </div>
               </div>
                ) : (
                    <div className="flex justify-center align-items-center">
                        <h4>Load stats data...</h4>
                    </div>
                )}
            </div>
            <div className="crypto-section-container"> 
             <h2 className="section-title">Top 10 Cryptocurrencies</h2>
             <div className="crypto-currencies-items grid grid-cols-4 grid-cols-sm-1">
                 {coins && Array.isArray(coins) && coins.map((coin : ICoinsResponse,idx : number) => (
                     <Link to={`/crypto/${coin.uuid}`}>
                       <CryptoCard coin={coin} idx={idx} />
                     </Link>
                 ))}
             </div>
            </div>
            <div className="news-section-container">
                <h2 className="section-title">Latest Crypto News</h2>
                <div className="news-items grid grid-cols-3 grid-cols-sm-1">
                    {news && Array.isArray(news) && news.map((news : INewsResponse, idx : number) => <NewsCard news={news} idx={idx} />)}
                </div>
            </div>
        </main>
    )
}

export default Homepage;