import { ICoinsResponse } from "../interfaces/ResponseApiInterfaces"
import millify from "millify";

const CryptoCard = ({ coin,idx } : { coin : ICoinsResponse ,idx : number }) => {
   return (
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
   )
};

export default CryptoCard;