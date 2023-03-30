import React from 'react';
import playStore from '../../../images/playstore.png';
import appStore from '../../../images/Appstore.png';
import './footer.css';

const Footer = () => {
    return <div id="footer">
        <div className="leftFooter">
            <h4>DOWNLOAD OUR APP</h4>
            <p>Download App for Android and IOS mobile phone</p>
            <img src={playStore} alt="playstore" />
            <img src={appStore} alt="Applestore" />
        </div>
        <div className='midFooter'>
            <h1>Ecommerce</h1>
            <p>High Quality it our first priority</p>
            <p>Copyright 2022 &copy;socrate.com</p>
        </div>
        <div className='rightFooter'>
            <h4>Follow us</h4>
            <a href='https://www.instagram.com/'>Instagrame</a>
            <a href='https://www.youtube.com/'>Youtube</a>
            <a href='https://www.facebook.com/'>Facebook</a>           
        </div>
    </div>;
}

export default Footer;
