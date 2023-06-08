import "../assets/styles/css/News.css";
import { useEffect, useState } from "react";
import { Loading, NewsCard } from "../components";
import { INewsResponse } from "../interfaces/ResponseApiInterfaces";
import { fetchNews } from "../api/fetchNews";

const News = () => {
    const [loadData,setLoadData] = useState<boolean>(false);
    const [news,setNews] = useState<INewsResponse[] | null>(null);

    const fetchAllNews = async () => {
        setLoadData(true);
         const response : any = await fetchNews('Cryptocurrencies' , 40);
         setNews(response);
        setLoadData(false);
    }

    useEffect(() => {
        fetchAllNews();
    },[])

    if(loadData) {
        return (
            <Loading width={40} height={40} />
        )
    }

    return (
        <div className="main">
          <div className="news-section-container">
                <h2 className="section-title">Latest Crypto News</h2>
                <div className="news-items grid grid-cols-3 grid-cols-sm-1">
                    {news && Array.isArray(news) && news.map((news : INewsResponse, idx : number) => <NewsCard news={news} idx={idx} />)}
                </div>
           </div>
        </div>
    )
}

export default News;