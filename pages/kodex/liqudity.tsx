import styles from '../styles/pages/liquidity.module.scss'
import Navbar from "../components/navbar";
import Pinkbtn from "../components/buttons/pinkbtn";
import React, {useState} from "react";
import Link from "next/link";
import CryptoSlider from "../components/cryptoSlider";
import Footer from "../components/footer";
import SelectToken from "../components/selectToken";
import {useRouter} from "next/router";

export default function Liqudity(){

    let [step1, setStep1] = useState(true);
    let [step2, setStep2] = useState(false);
    let [step3, setStep3] = useState(false);

    let [token1, setToken1] = useState('');
    let [token2, setToken2] = useState('');

    let [isPairsClicked, setIsPairsClicked] = useState([
        {
            "activated" : false
        },
        {
            "activated" : false
        },
        {
            "activated" : false
        }
    ])

    const router = useRouter();
    return(
        <div className={styles.liquidity}>

            <Navbar/>
            <section className="section sec1 liquidity liquidity1 liquidity1-sec1">
                <div className="sec-wrapper">
                    <div className="titles">
                        <div className="title-wrapper">
                            <img className="pointer" src="/images/left_arrow.png" onClick={()=>{ router.back()}}/>
                            <h1 className="title">Add Liquidity</h1>
                        </div>
                        <div className="extras">
                            <div className="more">
                                <p>Clear All</p>
                            </div>
                            <Link href="/liqudity" className="img-setting">
                                <img src="/images/settings.png"/>
                            </Link>
                        </div>
                    </div>
                    <div className="content-box">
                        <div className="content-part-wrapper left">
                            <div className="content-part content-part1">
                                <h2 className="title">Select Pair</h2>
                                <SelectToken/>
                                <SelectToken/>
                            </div>
                            <div className={step1 ? "content-part content-part2" : "content-part content-part2 greyText"}>
                                <h2 className="title">Select Fee Tier</h2>
                                <p className="desc">The % you will earn in fee’s</p>
                                <div className="pairs-wrapper">
                                    <div className={isPairsClicked[0].activated ? "pairs pairs-activated" : "pairs"} onClick={()=>{
                                        let temp = [...isPairsClicked];
                                        temp[0].activated = !temp[0].activated;
                                        setIsPairsClicked([...temp]);
                                        setStep2(!step2);
                                        for(let i = 0; i < temp.length; i++ ){
                                            if(temp[i].activated){
                                                alert("no");
                                            }
                                        }
                                    }}>
                                        <div className="number">0.05%</div>
                                        <div className="text">Best for stable pairs</div>
                                    </div>
                                    <div className={isPairsClicked[1].activated ? "pairs pairs-activated" : "pairs"} onClick={()=>{
                                        let temp = [...isPairsClicked];
                                        temp[1].activated = !temp[1].activated;
                                        setIsPairsClicked([...temp]);
                                        setStep2(!step2);
                                    }}>
                                        <div className="number">0.3%</div>
                                        <div className="text">Best for most pairs</div>
                                    </div>
                                    <div className={isPairsClicked[2].activated ? "pairs pairs-activated" : "pairs"} onClick={()=>{
                                        let temp = [...isPairsClicked];
                                        temp[2].activated = !temp[2].activated;
                                        setIsPairsClicked([...temp]);
                                        setStep2(!step2);
                                    }}>
                                        <div className="number">1%</div>
                                        <div className="text">Best for exotic pairs</div>
                                    </div>
                                </div>
                            </div>
                            <div className={step2 ? "content-part content-part3" : "content-part content-part3 greyText"}>
                                <h2 className="title">Deposit amount</h2>
                                <div className="deposit-wrapper">
                                    <div className="deposit">
                                        <img src="/images/cryptoLogo/ada.png" className="deposit-crypto-img"/>
                                        <div className="top">
                                            <div className="deposit-top-balance">0</div>
                                            <p className="deposit-crypto">ETH</p>
                                        </div>
                                        <div className="bottom">
                                            <div className="deposit-bottom-balance">
                                                Balance: 0
                                            </div>
                                        </div>
                                    </div>
                                    <div className="deposit">
                                        <img src="/images/cryptoLogo/bao.png" className="deposit-crypto-img"/>
                                        <div className="top">
                                            <div className="deposit-top-balance">0</div>
                                            <p className="deposit-crypto">ETH</p>
                                        </div>
                                        <div className="bottom">
                                            <div className="deposit-bottom-balance">
                                                Balance: 0
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className={step3 ? "content-part-wrapper right" : "content-part-wrapper right greyText"}>
                            <h2 className="title">Set Price Range</h2>
                            <div className="select">
                                <div className="select-token">

                                </div>
                                <div className="select-token">

                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </section>

            <Footer/>
        </div>
    )
}
