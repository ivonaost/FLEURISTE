import React, { Component } from 'react';
import styles from './styles.module.css';
import mainphoto from '../../assets/img/all.jpg';
import Post from '../../components/Post/post';

var k = 1;
var bouquets1 = [], bouquets2 = [], bouquets3 = [];

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: this.props.match.params.id,
      bouquets: []
    };
  }

  componentWillMount() {
    fetch('/api/bouquets')
      .then(res => res.json())
      .then(bouquets => this.setState({ bouquets }, () => {
        console.log('Successfull fetched...', bouquets);
        bouquets.map(b => {
          if (k === 1) {
            bouquets1.push(<Post key={b.bname + b.id} img={b.bname} flower={b.bname} price={b.price}></Post>)
            k++;
          }
          else if (k === 2) {
            bouquets2.push(<Post key={b.bname + b.id} img={b.bname} flower={b.bname} price={b.price}></Post>)
            k++;
          }
          else if (k === 3) {
            bouquets3.push(<Post key={b.bname + b.id} img={b.bname} flower={b.bname} price={b.price}></Post>)
            k = 1;
          }

        })
      }));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      const currentPage = nextProps.match.params.id
      this.setState({
        page: currentPage
      });
    }
  }

  render() {
    return (
      <div key={this.props.match.params.id + "page"} className={styles.Container}>
        <div className={styles.MainPhoto}>
          <img alt="photoThumb" src={mainphoto}></img>
          <h2 className={styles.PageTitle}>{this.state.page}</h2>
        </div>
        <div className={styles.Main}>
          <div className={styles.PhotoColumn}>
            {bouquets1}
          </div>
          <div className={styles.PhotoColumn}>
            {bouquets2}
          </div>
          <div className={styles.PhotoColumn}>
            {bouquets3}
          </div>
        </div>
      </div>
    );
  }
}

export default Main;