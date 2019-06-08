import React, { Component } from 'react';
import styles from './styles.module.css';

var bouquets = [], bouquetsList = [];

class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bouquets: []
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
                        <form>                            
                            <li className={styles.Bouquet}>
                                <i class="fas fa-check"></i>
                                <span>{cookie.value} buket</span>
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
    }

    render() {
        return (
            <div className={styles.Background}>
                <h1 className={styles.Title}>Proizvodi u košarici:</h1>
                <form action="/order" method="post" className={styles.Div}>
                    <ul>
                        {bouquetsList}
                    </ul>
                    <button type="submit"> NARUČI </button>
                </form>
            </div>

        );
    }
}
export default Cart;