import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header/header.js';
import Home from './pages/Home/home.js';
import Footer from './components/Footer/footer.js';
import Main from './pages/Main/main.js';
import Detail from './pages/Detail/detail.js';
import Custom from './pages/Custom/custom.js'
import Profile from './pages/Profile/profile.js'
import Cart from './pages/Cart/cart.js'
class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header></Header>
        </div>
        <Route exact path="/" component={Home} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/katalog/:id" render={props => <Main {...props} />} />
        <Route exact path="/buket/:flowerID" render={props => <Detail {...props} />} />
        <Route exact path="/slozisam" component={Custom} />
        <Route exact path="/kosarica" component={Cart} />
        <Footer></Footer>
      </BrowserRouter>
    );
  }
}

export default App;
