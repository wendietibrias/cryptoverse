import "../assets/styles/css/CryptoDetail.css";
import { useEffect,useState,useRef, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { fetchCoin,fetchCoinHistory } from "../api/fetchCoins";
import { Loading,Chart } from "../components";
import millify from "millify";
import moment from "moment";
import Select from "react-select";
import { ICoinHistoryResponse } from "../interfaces/ResponseApiInterfaces";
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

const Crypto = () => {
    const options = [
        {
            value:"3h",label:"3h"
        },
        {
            value:"24h" , label:"24h",

        },
        {
            value:"7d",label:"7d"
        },
        {
            value:"30d",label:"30d"
        },
        {
            value:"1y",label:"ly"
        },
        {
            label:"3m",value:"3m"
        },
        {
            label:"3y",value:"5y"
        },
        {
            label:"5y",value:"5y"
        }
    ]

    const { id } = useParams();
    const periodRef = useRef("24h");

    const [histories,setHistories] = useState<ICoinHistoryResponse>({
        price:[],
        timestamp:[]
    });
    const [coin,setCoin] = useState<any>(null);
    const [loadData,setLoadData] = useState<boolean>(false);

    const fetchDetailCoin = async () => {
        setLoadData(true);
        if(id) {
            const response : any = await fetchCoin(id);
            setCoin(response);
        }
    }

    const fetchHistoryCoinDetail = async () => {
        setLoadData(true);
        if(id) {
            const response = await fetchCoinHistory(id , periodRef.current);

            if(response && Array.isArray(response)) {
                const mapDataPrice = response.map((data : { price:string,timestamp:number })=>data.price);
                const mapDataTimestamp = response.map((data : { price:string,timestamp:number }) =>new Date(data.timestamp).toLocaleDateString());

                setHistories({
                    price:mapDataPrice,
                    timestamp:mapDataTimestamp
                });
            }

            setLoadData(false);        
        }
    }

    const changePeriod = (e : { value:string, label:string }) => {
       periodRef.current = e.value;
       fetchHistoryCoinDetail();
    }

    useEffect(() => {

        fetchDetailCoin();
        fetchHistoryCoinDetail();

    },[id,periodRef])

    if(loadData && !coin) {
        return (
            <Loading width={40} height={40}/>
        )
    }

    return (
        <div className="main">
            <div className="crypto-section-detail">
                <div className="crypto-detail-header">
                    <h3>{coin?.name} <span>({`${coin?.name} - ${coin?.symbol}`})</span> Price</h3>
                    <p>{coin?.name} live price in US Dollar (USD) View value statistics market cap and supply</p>
                </div>
                <div className="chart-detail-section">
                    <div className="select-box">
                        <Select onChange={changePeriod}   options={options} />
                    </div>
                    <div className="title-section flex justify-between align-items-center">
                        <h3>{coin?.name} Price Chart</h3>
                        <div className="sub-title flex align-items-center">
                            <h5>Change : {millify(coin?.change)}% </h5>
                            <h5>Current {coin?.name} Price : ${millify(coin?.price)}</h5>
                        </div>
                    </div>
                    <div className="chart">
                        <Chart histories={histories}/>
                    </div>
                </div>
                <div className="crypto-stats-info flex justify-between align-items-start">
                    <div className="stats-info-left">
                        <div className="stats-info-header">
                            <h3>{coin?.name} Value Statistics</h3>
                            <p>An overview showing the statistics of {coin?.name}, such as the base and quote currency, the rank, and trading volume.</p>
                        </div>
                        <div className="stats-data flex flex-dir-col">
                        <div className="stats-data-item flex justify-between align-items-center">
                            <p className="flex align-items-center">
                                <DollarCircleOutlined />
                                Price to USD
                            </p>
                            <h5>${millify(Number(coin?.price))}</h5>
                        </div>
                        <div className="stats-data-item flex justify-between align-items-center">
                            <p className="flex align-items-center">
                                <NumberOutlined  />
                                Rank
                            </p>
                            <h5>{coin?.rank}</h5>
                        </div>
                        <div className="stats-data-item flex justify-between align-items-center">
                            <p className="flex align-items-center">
                                <ThunderboltOutlined  />
                                24h Volume
                            </p>
                            <h5>{millify(Number(coin?.priceAt))}</h5>
                        </div>
                        <div className="stats-data-item flex justify-between align-items-center">
                            <p className="flex align-items-center">
                                <DollarCircleOutlined />
                                Market Cap
                            </p>
                            <h5>${millify(Number(coin?.marketCap))}</h5>
                        </div>
                        <div className="stats-data-item flex justify-between align-items-center">
                            <p className="flex align-items-center">
                                <TrophyOutlined />
                                All-time-high(daily.avg)
                            </p>
                            <h5>${millify(Number(coin?.allTimeHigh?.price))}</h5>
                        </div>
                        </div>
                    </div>
                    <div className="stats-info-right">
                    <div className="stats-info-header">
                            <h3>Other Stats Info</h3>
                            <p>An overview showing the statistics of {coin?.name}, such as the base and quote currency, the rank, and trading volume.</p>
                        </div>
                        <div className="stats-data flex flex-dir-col">
                        <div className="stats-data-item flex justify-between align-items-center">
                            <p className="flex align-items-center">
                                <FundOutlined />
                                Number of Market
                            </p>
                            <h5>${millify(Number(coin?.numberOfMarkets))}</h5>
                        </div>
                        <div className="stats-data-item flex justify-between align-items-center">
                            <p className="flex align-items-center">
                                <MoneyCollectOutlined  />
                                Number of Exchanges
                            </p>
                            <h5>{millify(Number(coin?.numberOfExchanges))}</h5>
                        </div>
                        <div className="stats-data-item flex justify-between align-items-center">
                            <p className="flex align-items-center">
                                <ThunderboltOutlined  />
                                Approved Supply
                            </p>
                            <h5><CheckOutlined/></h5>
                        </div>
                        <div className="stats-data-item flex justify-between align-items-center">
                            <p className="flex align-items-center">
                                <ExclamationCircleOutlined />
                                Total Supply
                            </p>
                            <h5>${millify(Number(coin?.supply?.total))}</h5>
                        </div>
                        <div className="stats-data-item flex justify-between align-items-center">
                            <p className="flex align-items-center">
                                <ExclamationCircleOutlined />
                                Circulating Supply
                            </p>
                            <h5>${millify(Number(coin?.supply?.circulating))}</h5>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Crypto;