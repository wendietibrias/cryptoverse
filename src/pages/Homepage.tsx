import "../assets/styles/css/Homepage.css";
import { useEffect,useState } from "react";
import { fetchCoins } from "../api/fetchCoins";
import { fetchNews } from "../api/fetchNews";
import millify from "millify";
import { ICoinsResponse,INewsResponse,IStatsResponse } from "../interfaces/ResponseApiInterfaces";
import moment from "moment";

const Homepage = () => {
    
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
        }
    }

    useEffect(() => {
        fetchTenCoin();
        fetchSixNews();
    }, []);

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
             <div className="crypto-currencies-items grid grid-cols-4">
                 {coins && Array.isArray(coins) && coins.map((coin : ICoinsResponse,idx : number) => (
                    <div className="crypto-currencies-item" key={idx}>
                        <div className="currencies-item-header flex align-items-center justify-between">
                            <h5>{idx + 1}.{coin?.name}</h5>
                            <img src={coin?.iconUrl} alt={coin?.name}/>
                        </div>
                        <div className="currencies-specific-info flex flex-dir-col">
                            <p>Price : {millify(Number(coin?.price))}</p>
                            <p>Market Cap : {millify(Number(coin?.marketCap))}</p>
                            <p>Daily Change : {millify(Number(coin?.change))}</p>
                        </div>
                    </div>
                 ))}
             </div>
            </div>
            <div className="news-section-container">
                <h2 className="section-title">Latest Crypto News</h2>
                <div className="news-items grid grid-cols-3">
                    {news && Array.isArray(news) && news.map((news : INewsResponse, idx : number) => (
                        <div className="news-item flex flex-dir-col align-items-start" key={idx}>
                           <div className="news-item-title flex align-items-stretch">
                           <h5>{news.name}</h5>
                            <img alt={news.name} src={news?.image?.thumbnail?.contentUrl}/>
                           </div>
                           <p>
                            {
                                news.description.length > 60 ? news.description.substring(0,70) : news.description
                            }
                           </p>
                           <div className="news-item-info-detail flex align-items-center justify-between">
                            <div className="info-detail-provider flex align-items-center">
                                <img src={news?.provider[0].image?.thumbnail?.contentUrl} alt={news.provider[0].name}/>
                                <span>{news?.provider[0].name}</span>
                            </div>
                            <h5>{moment(news.datePublished).fromNow()}</h5>
                           </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}

export default Homepage;