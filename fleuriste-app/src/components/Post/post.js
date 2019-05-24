import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
// import LazyLoad from 'react-lazy-load';


class Post extends Component {
    render() {
        return (
            <div className={styles.Post}>
                <div className={styles.container}>
                    <img className={styles.image} alt="photoThumb" src={this.props.img} />
                    <div className={styles.middle}>
                        <Link to={"/buket/" + this.props.flower} className={styles.text}>KUPI</Link>
                    </div>

                </div>
                <div className={styles.Price}>
                    <p>{this.props.flower}</p>
                    <p>100kn</p>
                </div>
            </div>);
    }
}

export default Post;