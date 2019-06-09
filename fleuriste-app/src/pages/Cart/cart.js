import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

var bouquets = [], bouquetsList = [];

class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bouquets: [],
            user: "",
            class: "Public"
        }
    }

    componentDidMount() {
        fetch('/shoppingcart')
        .then(res => res.json())
        .then(cookies => {
            console.log('Successfull fetched...', cookies)
            bouquets = [];
            bouquetsList = [];
            cookies.map(cookie => {
                bouquets.push(cookie.value);
                bouquetsList.push(
                    <form action="/deleteorder" method="post">                            
                        <li key={cookie.name+"Key"} className={styles.Bouquet}>
                            <i className="fas fa-check"></i>
                            <span>{cookie.value} buket - {cookie.price} kn</span>
                            <button className={styles.DeleteBtn} type="submit"><i className="fas fa-trash-alt"></i></button>
                            <input type="hidden" name="deleteCookie" value={cookie.name}></input>
                        </li>
                        <input type="hidden" name={cookie.name} value={cookie.value}></input>
                    </form>
                );
                return 1; 
            });
            this.setState({bouquets});
        });


        fetch('/finduser')
        .then(res => res.json())
        .then(user => this.setState({ user: user.username}, () => {
            if(user.username){
                this.setState({ class: "Logged" })
            }
            else {
                this.setState({ class: "Public" })
            }
        }));
    }

    render() {
        return (
            <div className={styles.Background}>
                <h1 className={styles.Title}>Proizvodi u košarici:</h1>
                <form action="/order" method="post" className={styles.Div}>
                    <div>
                        {bouquetsList}
                    </div>
                    <div className={this.state.class+"Order"}>
                        <button className={styles.OrderBtn} type="submit"> NARUČI </button>
                    </div>                    
                </form>
                <div className={this.state.class+"Alert"}>Molimo <Link className={styles.LogInLink} to='/profile'>prijavite se</Link> kako bi obavili narudžbu!</div>
            </div>

        );
    }
}
export default Cart;