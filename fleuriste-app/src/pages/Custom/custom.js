import React, { Component } from 'react';
// import { Link } from 'react-router-dom'
import styles from './styles.module.css';
import mainphoto from '../../assets/img/custom.jpg';

var optionList = [];
var arrayOfPrices = [];

class Custom extends Component {

    constructor(props) {
        super(props);
        // select = 'izaberi','jedna vrsta' ili 'razvnovrsno'
        // optionList = lista elemenata opcija
        this.state = {
            select: 'select',
            optionList: [],
            price: 0,
            flowers: []
        }
    }

    // funkcija se poziva kada u selectu mijenjamo izbor "jedna vrsta" cvijeta ili "raznovrsno"
    handleOption(e) {
        this.resetValue();

        //chooseOption je opcija "izaberi" koju nakon prvog biranja izbora više nećemo vidjeti
        document.getElementById("chooseOption").style.display = "none";

        // postavljamo po defaultu da je unos kolicine nevidljiv
        document.getElementById("oneFlowerCount").style.display = "none";

        // ako je izabrana opcija "jedna vrsta" ili "raznovrsno" ulazimo u if
        if (e.target.value !== "select") {
            // prikazujemo kontejner za ponuđene opcije 
            document.getElementById("optionsForm").style.display = "block";
            //niz u koji cemo spremiti listu html elemenata opcija
            var makeOptionList = [];

            // ako je izabrana opcija 'raznovrsno'
            if (e.target.value === "many") {
                //pomocu map funkcije ( optionList = popis cvijeca ) stvaramo element za svaku opciju (tj cvijet)
                console.log("sad pocinjen")
                console.log(this.state.flowers)
                console.log("sad kraj")
                makeOptionList = optionList.map(option =>
                    // bitno je da svaki element liste ima jedinstveni kljuc (key)
                    // checkbox = moguce je odabrati samo vise cvjetova 
                    <div id={option + "ID"} key={option + "Key1"}>
                        <b>
                            <input className="flowerCheck" value={option} name="flowerCheck"
                                type="checkbox" onChange={this.handleFlowerNumber.bind(this)} />
                            {option}
                        </b>
                        <span className={styles.inputCounterSpan}> <input type="number" defaultValue="0" onChange={this.handlePrice.bind(this)}></input></span>
                    </div>
                )
            }
            // ako je izabrana opcija 'jedna vrsta'
            else if (e.target.value === "one") {
                //pomocu map funkcije ( optionList = popis cvijeca ) stvaramo element za svaku opciju (tj cvijet)
                makeOptionList = optionList.map(option =>
                    // bitno je da svaki element liste ima jedinstveni kljuc (key)
                    // radio button = moguce je odabrati samo jedan cvijet 
                    <div key={option + "Key2"}>
                        <b>
                            <input className="flowerCheck" value={option} name="flowerCheck"
                                type="radio" onChange={this.resetValue.bind(this)} />
                            {option}
                        </b>
                    </div>
                )
                //prikazujemo kontejner koji sadrzi input za kolicinu
                document.getElementById("oneFlowerCount").style.display = "block";
            }
        }
        // ako je jos uvijek opcija 'izaberi', sakrivamo kontejner s opcijama
        else {
            document.getElementById("optionsForm").style.display = "none";
        }

        // update stanja
        this.setState({
            select: e.target.value,
            optionList: makeOptionList
        });
    }

    // funkcija koja sluzi za prikazivanje inputa za unos kolicine zeljene vrste cvijeca
    handleFlowerNumber(e) {
        //provjeravamo je li označen radio/checkbox
        let isChecked = e.target.checked;
        //samo ukoliko se radi o checkboxu otkrivamo input za unos kolicine pojedine vrste cvijeta
        if (isChecked && e.target.type !== "radio")
            document.getElementById(e.target.value + "ID").querySelector("span").style.display = "inline";
        // ukoliko odznacimo checkbox
        else if (!isChecked && e.target.type !== "radio") {
            document.getElementById(e.target.value + "ID").querySelector("span").style.display = "none";
            // ako odznacimo tu vrstu, njezina se vrijednost vraca na kolicina = 0
            document.getElementById(e.target.value + "ID").querySelector("span input").value = 0;
            // u nizu vrsta/cijena pronademo taj cvijet i vratimo mu cijenu na 0kn ( izracunamo nanovo i ukupnu cijenu )
            let newPrice = 0;
            for (let i in arrayOfPrices) {
                if (e.target.value === arrayOfPrices[i].id) {
                    arrayOfPrices[i].price = 0;
                }
                newPrice += arrayOfPrices[i].price;
            }
            this.setState({
                price: newPrice
            });
        }

    }

    // funkcija koja sluzi za racunanje ukupne cijene buketa
    handlePrice(e) {
        // ukoliko imamo samo jednu vrstu cvijeta
        if (e.target.parentElement === document.getElementById("oneFlowerCount")) {
            this.setState({
                price: e.target.value * 15
            });
        }
        // ako imamo vise razlicitih vrsta
        else {
            let newPrice = 0;
            // prolazimo kroz listu svih vrsta cvjetova, ako naidemo na taj koji smo povecali, povecamo njegovu cijenu i zbrojimo s ostalim 
            // cijenama ( od ostalih vrsta ako su izabrane )
            for (let i in arrayOfPrices) {
                if (e.target.parentElement.parentElement === document.getElementById(arrayOfPrices[i].id + "ID")) {
                    arrayOfPrices[i].price = e.target.value * 15;
                }
                newPrice += arrayOfPrices[i].price;
                this.setState({
                    price: newPrice
                });
            }
        }
    }

    // funkcija koja vraca pocetne vrijednosti cijena na 0kn i jednoj vrsti kolicinu na 0
    resetValue() {
        this.setState({
            price: 0
        });
        arrayOfPrices = optionList.map(option => ({ "id": option, price: 0 }));
        document.getElementById("oneFlowerCount").querySelector("input").value = 0;
    }

    componentDidMount() {
        // fetch('/api/customers')
        //     .then(res => res.json())
        //     .then(customers => this.setState({ customers }, () => console.log('Customers fetched...', customers)));

        fetch('/api/flowers')
            .then(res => res.json())
            .then(flowers => this.setState({ flowers }, () => {
                console.log('Successfull fetched...', flowers)
                flowers.map(flower => optionList.push(flower.fname))
            }));
    }

    render() {
        return (

            <div className={styles.Container}>
                <div className={styles.MainPhoto}>
                    <img alt="photoThumb" src={mainphoto}></img>
                    <div className={styles.cardForm}>

                        <h1>SLOŽI SVOJ BUKET</h1>

                        <h4>OPCIJA:</h4>
                        <select onChange={this.handleOption.bind(this)} value={this.state.select}>
                            <option id="chooseOption" value="select">Izaberi</option>
                            <option value="one">Jedna vrsta</option>
                            <option value="many" >Raznovrsno</option>
                        </select>

                        <form id="optionsForm" className={styles.OptionsForm}>
                            <div className={styles.OptionsList}>
                                {this.state.optionList}
                            </div>
                            <div key="oneCountKey" id="oneFlowerCount" className={styles.oneFlowerCount}>
                                Količina: <input type="number" defaultValue="0" onChange={this.handlePrice.bind(this)}></input>
                            </div>
                            <div className={styles.Price}>
                                Cijena: {this.state.price} kn
                            </div>
                            <button className={styles.ShopNowBtn}>NARUČI</button>
                        </form>
                        {/* <ul>
                            {this.state.flowers.map(flowers =>
                                <li key={flowers.id + flowers.fname}>{flowers.fname}</li>
                            )}
                        </ul> */}
                    </div>
                </div>
            </div>


        );
    }
}
export default Custom;