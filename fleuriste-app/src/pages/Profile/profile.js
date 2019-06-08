import React, { Component } from 'react';
import styles from './styles.module.css';
import Form from '../../components/LogInForm/form.js'


class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
        user: "",
        class: "Public"
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
  }

  render() {
    return (
     <div>
        
        <div className={this.state.class+"Form"}>
            <h1 className={styles.Title}>PRIJAVI SE</h1>
            <Form/>
        </div>

        <div className={this.state.class}>
            <h1 className={styles.Title}>Dobrodošao {this.state.user} !</h1> 
            <form action="/logout" method="post">
                <button className={styles.LogOutBtn}>Odjavi se :(</button>
            </form>
        </div>


     </div>
    );
  }
}

export default Profile;