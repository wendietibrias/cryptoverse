import ReactLoading from "react-loading";

interface IPropsLoading {
    width:string | number;
    height:string | number;

}

const Loading = ({
    width,
    height,
} : IPropsLoading) => {
   return (
     <div className="loading-container">
         <ReactLoading 
            type="spin"
            color={"#0071bd"}
            width={width}
            height={height}
         />
         <h5>Loading...</h5>
     </div>
   )
}

export default Loading;