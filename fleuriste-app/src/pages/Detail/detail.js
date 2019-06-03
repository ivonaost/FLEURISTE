import React, { Component } from 'react';
import styles from './styles.module.css';
import Photo from '../../assets/img/xxyy.jpg';
import Photo1 from '../../assets/img/all.jpg';
import Photo2 from '../../assets/img/main.jpg';
import Photo3 from '../../assets/img/today.jpg';
class Detail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      src: this.props.match.params.flowerID + '1.jpg',
      bouquet: ''
    }
  }

  componentDidMount() {
    fetch('/api/bouquets')
      .then(res => res.json())
      .then(bouquets => this.setState({ bouquet: bouquets.find(b => b.bname == this.props.match.params.flowerID) }, () => {
        console.log('Successfull fetched...', this.state.bouquet);

      }));
  }

  changeThumb(img) {
    this.setState({
      src: this.props.match.params.flowerID + img
    });
    console.log(this.state.src)

  }

  render() {
    return (
      <div className={styles.Container}>
        <div className={styles.ThumbColumn}>
          <div className={styles.Thumb}>
            <img src={require('../../assets/buketi/' + this.props.match.params.flowerID + '1.jpg')} alt="flower" onClick={() => this.changeThumb('1.jpg')} />
          </div>
          <div className={styles.Thumb}>
            <img src={require('../../assets/buketi/' + this.props.match.params.flowerID + '2.jpg')} alt="flower" onClick={() => this.changeThumb('2.jpg')} />
          </div>
          <div className={styles.Thumb}>
            <img src={require('../../assets/buketi/' + this.props.match.params.flowerID + '3.jpg')} alt="flower" onClick={() => this.changeThumb('3.jpg')} />
          </div>

        </div>
        <div className={styles.DetailPhoto}><img id="expandImg" alt="photoThumb" src={require('../../assets/buketi/' + this.state.src)}></img></div>
        <div className={styles.DetailAside}>
          <div className={styles.AsideHeader}>{this.state.bouquet.bname} buket</div>
          <div className={styles.Description}>{this.state.bouquet.description}</div>
          <div className={styles.Size}>
            <div>Cijena: {this.state.bouquet.price}kn</div>
            <button className={styles.AddBtn}>Dodaj u košaricu</button>
          </div>

        </div>
      </div>
    );
  }
}

export default Detail;