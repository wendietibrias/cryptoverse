import logo from "../assets/image/cryptocurrency.png";
import { useLocation,Link } from "react-router-dom";
import { HomeOutlined,LineChartOutlined,BulbOutlined,DollarOutlined } from "@ant-design/icons";

const Sidebar = () => {
    const { pathname } = useLocation();

    return (
        <aside className="sidebar">
             <header className="sidebar__header flex align-items-center justify-start">
                <img src={logo} alt="logo" className="logo"/>
                <h5>Cryptoverse</h5>
             </header>
             <div className="sidebar__link-navigation flex flex-dir-col">
                <Link to="/" className={`link-navigation__item flex align-items-center ${pathname === '/' ? 'active' : ''}`}>
                    <HomeOutlined className="icon-navigation"/>
                    <span>Home</span>
                </Link>
                <Link to="/exchanges" className={`link-navigation__item flex align-items-center ${pathname === '/exchanges' ? 'active' : ''}`}>
                    <DollarOutlined className="icon-navigation"/>
                    <span>Exchanges</span>
                </Link>
                <Link to="/cryptocurrencies" className={`link-navigation__item flex align-items-center ${pathname === '/cryptocurrencies' ? 'active' : ''}`}>
                    <LineChartOutlined className="icon-navigation"/>
                    <span>Cryptocurrencies</span>
                </Link>
                <Link to="/news" className={`link-navigation__item flex align-items-center ${pathname === '/news' ? 'active' : ''}`}>
                    <BulbOutlined className="icon-navigation"/>
                    <span>News</span>
                </Link>
             </div>
        </aside>
    )
}

export default Sidebar;