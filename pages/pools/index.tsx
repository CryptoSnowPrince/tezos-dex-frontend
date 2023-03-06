import styles from '../../styles/pages/pools.module.scss'
import Navbar from "../../components/navbar";
import Pinkbtn from "../../components/buttons/pinkbtn";
import React from "react";
import Link from "next/link";
import CryptoSlider from "../../components/cryptoSlider";
import Footer from "../../components/footer";
export default function Pools(){

    return(
        <div className={styles.pools}>

            <Navbar/>
            <section className="section sec1 pool-main">
                <div className="sec-wrapper">
                    <div className="titles">
                        <h1 className="title">Pools</h1>
                        <div className="extras">
                            <div className="more">
                                <p>More</p>
                                <img src="/images/arrow_down.svg"/>
                            </div>
                            <Link href="/liquidity">
                                <Pinkbtn src="/images/more.svg" type = "withoutBorder" text = "New Position" padding = "small"/>
                            </Link>
                        </div>
                    </div>
                    <div className="empty"></div>
                    <div className="connect-box">
                        <div className="title">
                            Your active V3 liquidity positions will appear here.<br/>Connect a wallet
                        </div>
                        <img src="/images/pool.svg"/>
                        <Link href="/">
                            <button className="connect-btn">Connect to Wallet</button>
                        </Link>
                    </div>
                    <div className="learn-boxes">
                        <div className="learn-box">
                            <div className="titles">
                                <p className="title">
                                    Learn about providing liquidity
                                </p>
                                <img src="/images/right_arrow.png"/>
                            </div>

                            <p className="desc">
                                Check out our v3 LP walkthrough and migration guides.
                            </p>
                        </div>
                        <div className="learn-box">
                            <div className="titles">
                                <p className="title">
                                    Learn about providing liquidity
                                </p>
                                <img src="/images/right_arrow.png"/>
                            </div>

                            <p className="desc">
                                Check out our v3 LP walkthrough and migration guides.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section topPools">
                <div className="sec-wrapper">
                    <div className="titles">
                        <div className="title">Top Pools</div>
                        <div className="explore">
                            <div className="explore-text">Explore Kodex Analytics</div>
                            <img src="/images/right_arrow.png"/>
                        </div>
                    </div>
                    <CryptoSlider pools={[]}/>
                </div>
            </section>

            <Footer/>
        </div>
    )
}
