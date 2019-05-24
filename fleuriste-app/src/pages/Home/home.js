import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import styles from './styles.module.css';
import mainphoto from '../../assets/img/main.jpg';
import popular from '../../assets/img/popular.jpg';
import today from '../../assets/img/today.jpg';

class Home extends Component {
  render() {
    return (
      <div>
        <Link to='/katalog/buketi'>
          <div className={styles.MainPhoto}>        
            <img alt="photoThumb" src={mainphoto}></img>
            <button className={styles.ShopNowBtn}>IZABERI BUKET</button>         
          </div>
        </Link>
        <div className={styles.Main}>
          <div className={styles.MainDiv}>
            <Link to='/katalog/čestitke'>
              <div>
                <i className="fas fa-handshake"></i> 
                <span>Čestitke</span>
              </div>
            </Link>
            <Link to='/katalog/godišnjica'>
              <div>
                <i className="fas fa-heart"></i>
                <span>Godišnjica</span>
              </div>
            </Link>
            <Link to='/katalog/vjenčanje'>
              <div>
                <i className="far fa-gem"></i>
                <span>Vjenčanje</span>
              </div>
            </Link>
            <Link to='/katalog/uljepšaj dan'>
              <div>
                <i className="fas fa-sun"></i>
                <span>Uljepšaj dan</span>
              </div>
            </Link>
            <Link to='/katalog/zadnji tren'>
              <div>
                <i className="fas fa-gift"></i>
                <span>Zadnji tren</span>
              </div>
            </Link>
            <Link to='/katalog/sahrana'>
              <div>
                <i className="fas fa-cross"></i>
                <span>Sahrana</span>
              </div>
            </Link>
          </div>
        </div>

        <div className={styles.MainBlock}>
          <div className={styles.MinnieBlock}>
            <div>
              <Link to='/najpopularniji'>
                <img alt="photoThumb" src={popular}></img>
                <button className={styles.ShopNowBtn}>NAJPOPULARNIJI</button>
              </Link>
            </div> 
            <div>
              <Link to='/ponuda tjedna'>
                <img alt="photoThumb" src={today}></img>
                <button className={styles.ShopNowBtn}>PONUDA TJEDNA</button>
              </Link>
            </div>
          </div>
              
        </div>
        
      </div>
    );
  }
}

export default Home;
