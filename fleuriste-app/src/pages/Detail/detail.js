import React, { Component } from 'react';
import styles from './styles.module.css';
import Photo from '../../assets/img/xxyy.jpg';
import Photo1 from '../../assets/img/all.jpg';
import Photo2 from '../../assets/img/main.jpg';
import Photo3 from '../../assets/img/today.jpg';
class Detail extends Component {

  changeThumb(img) {
    var expandImg = document.getElementById("expandImg");
    expandImg.src = img;
  }

  render() {
    return (
      <div className={styles.Container}>
        <div className={styles.ThumbColumn}>
          <div className={styles.Thumb}>
            <img src={Photo} alt="flower" onClick={() => this.changeThumb(Photo)} />
          </div>
          <div className={styles.Thumb}>
            <img src={Photo1} alt="flower" onClick={() => this.changeThumb(Photo1)} />
          </div>
          <div className={styles.Thumb}>
            <img src={Photo2} alt="flower" onClick={() => this.changeThumb(Photo2)} />
          </div>
          <div className={styles.Thumb}>
            <img src={Photo3} alt="flower" onClick={() => this.changeThumb(Photo3)} />
          </div>
        </div>
        <div className={styles.DetailPhoto}><img id="expandImg" alt="photoThumb" src={Photo}></img></div>
        <div className={styles.DetailAside}>
          <div className={styles.AsideHeader}>{this.props.match.params.flowerID}</div>
          <div className={styles.Description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non odio quis ligula pellentesque ultrices.
          Aliquam erat volutpat. Aliquam eu placerat nisl. Curabitur pretium vitae neque in faucibus. Duis ornare in lacus in accumsan.
            In sodales, quam ac blandit ultrices, sapien tellus ultricies nunc, at lobortis nisl ligula eget turpis</div>
          <div className={styles.Size}>
            <select>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
            <button className={styles.AddBtn}>Dodaj u košaricu</button>
          </div>

        </div>
      </div>
    );
  }
}

export default Detail;