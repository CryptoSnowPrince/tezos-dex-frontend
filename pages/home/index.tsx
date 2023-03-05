import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.scss'
import Navbar from "../../components/navbar";
import Pinkbtn from "../../components/buttons/pinkbtn";
import CryptoSlider from "../../components/cryptoSlider";
import Link from "next/link";
import Footer from "../../components/footer";
import { getPools } from "../../services/poolService";
import {useEffect, useState} from "react";

import { useDispatch } from "react-redux";

export default function Home() {

    const token=[
        {
            "img1" : "/images/cryptoLogo/tether.png",
            "img2" : "/images/cryptoLogo/bao.png",
            "name1" : "QUIPU",
            "name2" : "TEZ",
            "tvl" : "65,355.2",
            "status" : "active"
        },
        {
            "img1" : "/images/cryptoLogo/tether.png",
            "img2" : "/images/cryptoLogo/aave.png",
            "name1" : "QUIPU",
            "name2" : "TEZ",
            "tvl" : "65,355.2",
            "status" : "active"
        },
        {
            "img1" : "/images/cryptoLogo/tether.png",
            "img2" : "/images/cryptoLogo/doge.png",
            "name1" : "QUIPU",
            "name2" : "TEZ",
            "tvl" : "65,355.2",
            "status" : "active"
        },
        {
            "img1" : "/images/cryptoLogo/tether.png",
            "img2" : "/images/cryptoLogo/ngc.png",
            "name1" : "QUIPU",
            "name2" : "TEZ",
            "tvl" : "65,355.2",
            "status" : "active"
        },
        {
            "img1" : "/images/cryptoLogo/tether.png",
            "img2" : "/images/cryptoLogo/tezos.png",
            "name1" : "QUIPU",
            "name2" : "TEZ",
            "tvl" : "65,355.2",
            "status" : "inactive"
        },
        {
            "img1" : "/images/cryptoLogo/tether.png",
            "img2" : "/images/cryptoLogo/sushi.png",
            "name1" : "QUIPU",
            "name2" : "TEZ",
            "tvl" : "65,355.2",
            "status" : "active"
        },
        {
            "img1" : "/images/cryptoLogo/tether.png",
            "img2" : "/images/cryptoLogo/bao.png",
            "name1" : "QUIPU",
            "name2" : "TEZ",
            "tvl" : "65,355.2",
            "status" : "active"
        },
        {
            "img1" : "/images/cryptoLogo/tether.png",
            "img2" : "/images/cryptoLogo/aave.png",
            "name1" : "QUIPU",
            "name2" : "TEZ",
            "tvl" : "65,355.2",
            "status" : "active"
        },
        {
            "img1" : "/images/cryptoLogo/tether.png",
            "img2" : "/images/cryptoLogo/doge.png",
            "name1" : "QUIPU",
            "name2" : "TEZ",
            "tvl" : "65,355.2",
            "status" : "active"
        },
        {
            "img1" : "/images/cryptoLogo/tether.png",
            "img2" : "/images/cryptoLogo/ngc.png",
            "name1" : "QUIPU",
            "name2" : "TEZ",
            "tvl" : "65,355.2",
            "status" : "inactive"
        },
        {
            "img1" : "/images/cryptoLogo/tether.png",
            "img2" : "/images/cryptoLogo/tezos.png",
            "name1" : "QUIPU",
            "name2" : "TEZ",
            "tvl" : "65,355.2",
            "status" : "active"
        },
        {
            "img1" : "/images/cryptoLogo/tether.png",
            "img2" : "/images/cryptoLogo/sushi.png",
            "name1" : "QUIPU",
            "name2" : "TEZ",
            "tvl" : "65,355.2",
            "status" : "active"
        },
        {
            "img1" : "/images/cryptoLogo/tether.png",
            "img2" : "/images/cryptoLogo/aave.png",
            "name1" : "QUIPU",
            "name2" : "TEZ",
            "tvl" : "65,355.2",
            "status" : "inactive"
        },
        {
            "img1" : "/images/cryptoLogo/tether.png",
            "img2" : "/images/cryptoLogo/doge.png",
            "name1" : "QUIPU",
            "name2" : "TEZ",
            "tvl" : "65,355.2",
            "status" : "active"
        },
        {
            "img1" : "/images/cryptoLogo/tether.png",
            "img2" : "/images/cryptoLogo/ngc.png",
            "name1" : "QUIPU",
            "name2" : "TEZ",
            "tvl" : "65,355.2",
            "status" : "active"
        },
        {
            "img1" : "/images/cryptoLogo/tether.png",
            "img2" : "/images/cryptoLogo/tezos.png",
            "name1" : "QUIPU",
            "name2" : "TEZ",
            "tvl" : "65,355.2",
            "status" : "inactive"
        },
        {
            "img1" : "/images/cryptoLogo/tether.png",
            "img2" : "/images/cryptoLogo/sushi.png",
            "name1" : "QUIPU",
            "name2" : "TEZ",
            "tvl" : "65,355.2",
            "status" : "active"
        },
        {
            "img1" : "/images/cryptoLogo/tether.png",
            "img2" : "/images/cryptoLogo/bao.png",
            "name1" : "QUIPU",
            "name2" : "TEZ",
            "tvl" : "65,355.2",
            "status" : "active"
        },
        {
            "img1" : "/images/cryptoLogo/tether.png",
            "img2" : "/images/cryptoLogo/aave.png",
            "name1" : "QUIPU",
            "name2" : "TEZ",
            "tvl" : "65,355.2",
            "status" : "active"
        },
        {
            "img1" : "/images/cryptoLogo/tether.png",
            "img2" : "/images/cryptoLogo/doge.png",
            "name1" : "QUIPU",
            "name2" : "TEZ",
            "tvl" : "65,355.2",
            "status" : "inactive"
        },
        {
            "img1" : "/images/cryptoLogo/tether.png",
            "img2" : "/images/cryptoLogo/ngc.png",
            "name1" : "QUIPU",
            "name2" : "TEZ",
            "tvl" : "65,355.2",
            "status" : "ACTIVE"
        },
        {
            "img1" : "/images/cryptoLogo/tether.png",
            "img2" : "/images/cryptoLogo/tezos.png",
            "name1" : "QUIPU",
            "name2" : "TEZ",
            "tvl" : "65,355.2",
            "status" : "active"
        },
    ]
    const [pools, setPools] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getPools();
            setPools(data["hydra:member"]);
        }
        fetchData();
    }, []);


    return (
    <div className={styles.home}>
      {/*<Head>*/}
      {/*  <title>Create Next App</title>*/}
      {/*  <meta name="description" content="Generated by create next app" />*/}
      {/*  <link rel="icon" href="/favicon.ico" />*/}
      {/*</Head>*/}

        <Navbar/>

        <section className="section sec1">
            <div className="sec-wrapper">
                <div className="left">
                    <h1 className="title">
                        Kodex DEX - Liquidity
                    </h1>
                    <div className="search-bar">
                        <form>
                            <input className="input" placeholder="Search Token"/>
                        </form>
                    </div>
                </div>
                <div className="right">
                    <div className="right-contents total">
                        <div className="titles">
                            <p className="title">Total Value Locked</p>
                            <div className="info">
                                <img src="/images/info.png"/>
                            </div>
                        </div>
                        <p className="title-value">$3,175,386</p>
                    </div>
                    <div className="right-contents pools">
                        <div className="titles">
                            <p className="title">Pools</p>
                            <div className="info">
                                <img src="/images/info.png"/>
                            </div>
                        </div>
                        <p className="title-value">{pools.length}</p>
                    </div>
                </div>
            </div>
        </section>

        {pools && (
            <section className="section sec2">
                <div className="sec2-wrapper">
                    <CryptoSlider pools={pools}/>
                </div>

            </section>
        )}


        <section className="section sec3">
            <div className="sec-wrapper">
                <div className="banner">
                    <p className="title">
                        Earn passive income on Tezos blockchain - No registration needed.
                    </p>
                    <div className="btn-pool">
                        <Link href="/pools">
                            <Pinkbtn text = "Create Pool" type="withoutBorder"/>
                        </Link>

                    </div>
                </div>
            </div>
        </section>

        <section className="section sec4">
            <div className="sec-wrapper">
                <div className="titles">
                    <div className="title">Tokens</div>
                    <div className="sort">
                        <p>Sort by TVL</p>
                        <img src="/images/sort.png"/>
                    </div>
                </div>
                <div className="token-box"></div>
                <div className="token-container-wrapper">
                    <div className="token-container">
                    {
                        token.map((data, index) => (
                            <div className="token" key={index}>
                                <div className="token-left">
                                    <div className="token-imgs">
                                        <img className="token-img token-img1" src={`${data.img1}`}/>
                                        <img className="token-img token-img2" src={`${data.img2}`}/>
                                        <img className="token-faucet token-img3" src="/images/cryptoLogo/faucet.png"/>
                                    </div>
                                    <p className="token-name">{data.name1} / {data.name2}</p>
                                </div>
                                <div className="token-mid">
                                    <p>TVL ≈&nbsp;$</p>
                                    <p className="greyText">{data.tvl}</p>
                                </div>
                                <div className="token-right">
                                    {
                                        (data.status.toLowerCase() == "active" )
                                            ? <div className="token-status">{data.status.toLowerCase()}</div>
                                            : <div className="token-status token-status-red ">{data.status.toLowerCase()}</div>
                                    }

                                    <img src="/images/right_arrow.png"/>
                                </div>
                            </div>
                        ))
                    }
                </div>
                </div>
            </div>
        </section>
        <Footer/>


    </div>
  )
}
