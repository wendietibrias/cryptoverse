import { INewsResponse } from "../interfaces/ResponseApiInterfaces";
import moment from "moment";

const NewsCard = ({ news , idx } : { news:INewsResponse,idx:number }) => {
    return (
        <div className="news-item flex flex-dir-col">
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
    )
}

export default NewsCard;