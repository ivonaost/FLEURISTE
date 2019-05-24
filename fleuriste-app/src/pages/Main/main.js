import React, { Component } from 'react';
import styles from './styles.module.css';
import mainphoto from '../../assets/img/all.jpg';
import postphoto from '../../assets/img/yxxx.jpg';
import Post from '../../components/Post/post';

var i = 0;
var k = 1;
var list1 = [], list2 = [], list3 = [];

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: this.props.match.params.id
    };
  }

  componentWillMount() {
    for (i = 0; i < 15; i++) {
      if (k === 1) {
        list1.push(<Post img={mainphoto} flower={this.state.page}></Post>)
        k++;
      }
      else if (k === 2) {
        list2.push(<Post img={mainphoto} flower={this.state.page}></Post>)
        k++;
      }
      else if (k === 3) {
        list3.push(<Post img={mainphoto} flower={this.state.page}></Post>)
        k = 1;
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      const currentPage = nextProps.match.params.id

      // const result = productlist.products.filter(obj => {
      //   return obj.id === currentPage;
      // })

      this.setState({
        page: currentPage
      });

      list1 = [];
      list2 = [];
      list3 = [];

      for (i = 0; i < 15; i++) {
        if (k === 1) {
          if (currentPage === "sahrana")
            list1.push(<Post img={mainphoto} flower={currentPage}></Post>);
          else
            list1.push(<Post img={postphoto} flower={currentPage}></Post>);
          k++;
        }
        else if (k === 2) {
          if (currentPage === "godišnjica")
            list2.push(<Post img={mainphoto} flower={currentPage}></Post>);
          else
            list2.push(<Post img={postphoto} flower={currentPage}></Post>);
          k++;
        }
        else if (k === 3) {
          if (currentPage === "zadnji tren")
            list3.push(<Post img={mainphoto} flower={currentPage}></Post>);
          else
            list3.push(<Post img={postphoto} flower={currentPage}></Post>);
          k = 1;
        }
      }
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
            {list1}
          </div>
          <div className={styles.PhotoColumn}>
            {list2}
          </div>
          <div className={styles.PhotoColumn}>
            {list3}
          </div>
        </div>
      </div>
    );
  }
}

export default Main;