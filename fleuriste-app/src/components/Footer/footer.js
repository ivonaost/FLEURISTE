import React, { Component } from 'react';
import styles from './styles.module.css'


class Footer extends Component {
  render() {
    return (
      <div className={styles.Footer}>
          <div className={styles.Info}>
              <div>
                  <h4>Fleuriste</h4>
                  <p>Puni naziv firme: FLEURISTE d.o.o. <br/>
                    Djelatnost: Usluge izrade cvjetnih aranžmana<br/>
                    Adresa: Generala Blage Zadre 14 <br/>
                    Mjesto: 21000 Split <br/>
                    Telefon: 021/123 456 <br/>
                    Mobitel: 091 123 45 68 <br/>
                    E-mail: fleuriste@fleuriste.hr
                    </p>
              </div>
              <div>
                  <h4>O nama:</h4>
                  <p>Fleuriste je cvjećarski obrt koji se bavi nabavom i prodajom cvjetnih aranžmana za sve prigode.
                  </p>
              </div>
              <div>
                  <h4>Lokacija</h4>
                  <iframe title="ourMap" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2893.570869583362!2d16.467000315454857!3d43.511286979126446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13355e3cbb175f2d%3A0x505534f00924e86!2sFakultet+elektrotehnike%2C+strojarstva+i+brodogradnje+u+Splitu!5e0!3m2!1shr!2shr!4v1553638250280"></iframe>
              </div>
          </div>
          <p className={styles.Creators}>© Copyright 2019 - Ana Terzic & Ivona Ostojic</p>
      </div>
    );
  }
}

export default Footer;
