export interface ICoinsResponse {
    uuid:string;
    symbol:string;
    name:string;
    color:string;
    iconUrl:string;
    marketCap:string;
    price:string;
    btcPrice:string;
    listedAt:number;
    change:string;
    rank:number;
    sparkline:[any];
    coinrangkingUrl:string;
    '24hvolume':string;
}

export interface IStatsResponse {
    total:number;
    totalCoins:number;
    totalMarkets:number;
    totalExchanges:number;
    totalMarketCap:number;
    'total24hVolume':number;
}

export interface INewsResponse {
    _type:string;
    name:string;
    url:string;
    description:string;
    about:[any];
    image:{
        _type:string;
        thumbnail: {
            _type:string;
            contentUrl:string;
            width:number;
            height:number;
        }
    }
    mentions:[any];
    provider:[
        {
            _type:string;
            name:string;
            image: {
                _type:string;
                thumbnail: {
                    type:string;
                    contentUrl:string;
                    width:number;
                    height:number;
                }
            }
        }
    ];
    datePublished:string;
}