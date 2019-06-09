import React, { Component } from 'react';
import styles from './styles.module.css';
import Form from '../../components/LogInForm/form.js'

var orderList = [];

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
        user: "",
        class: "Public",
        orders: []
    }
  }

  componentDidMount() {
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

    fetch('/api/myorders')
    .then(res => res.json())
    .then(orders => {      
      orderList = [];
      orderList = orders.map(order => 
            <li className={styles.Bouquet}>
                            <i class="fas fa-check"></i>
                            <span>{order.title} buket - {order.price} kn</span>
      </li>           
    );
    this.setState({ orders: orderList }); 
    return 1;
    });
  }

  render() {
    return (
     <div className={styles.ProfileBackground}>
        
        <div className={this.state.class+"Form"}>
            <h1 className={styles.Title}>PRIJAVI SE</h1>
            <Form/>
        </div>

        <div className={this.state.class}>
          <div className={styles.Container}>
              <h1 className={styles.Title}>
                <i className="fa fa-user-circle"></i> {this.state.user}</h1> 
              <form action="/logout" method="post">
                  <button className={styles.LogOutBtn}>ODJAVI SE</button>
              </form>
          </div>

          <div className={styles.Body}>
            <h3>Moje narudžbe:</h3>
            {this.state.orders}
          </div>
        </div>

     </div>
    );
  }
}

export default Profile;