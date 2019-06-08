import React, { Component } from 'react';
import styles from './styles.module.css'


class Form extends Component {
  render() {
    return (
      <div>
        <form className={styles.Form} action="/login" method="post">             
            <div className={styles.Container}>
                <label for="username"><b>Korisničko ime</b></label>
                <input type="text" placeholder="Unesi korisničko ime" name="username" required/>

                <label for="password"><b>Lozinka</b></label>
                <input type="password" placeholder="Unesi lozinku" name="password" required/>

                <button className={styles.LoginBtn} type="submit">Prijava</button>
            </div>
            <div className={styles.ContainerFooter}>
                <button className={styles.CancelBtn} type="button">Registriraj se</button>
                <span className="psw">Zaboravljena <a href="#">lozinka?</a></span>
            </div>
        </form>
      </div>
    );
  }
}

export default Form;