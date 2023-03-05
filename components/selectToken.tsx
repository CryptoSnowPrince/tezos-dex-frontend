import styles from "../styles/components/selectToken.module.scss"
import React, {useState} from "react";
export default function SelectToken (){

    let [isClicked, setIsClicked] = useState(false);
    let [currentToken, setCurrentToken] = useState('');

    return(
        <div className={styles.selectToken}>
            <div className="select pointer" onClick={()=>{setIsClicked(true)}}>
                <div className="select-token">
                    <img src="/images/token.png" />
                    <p className="default-option">Select Token</p>
                </div>
                <img className="select-open" src="/images/arrow_down.svg"/>
            </div>
            {
                isClicked
                    ?  <div className={styles.selectTokenModal}>
                        <div className="select-popup">
                            <div className="select-popup-titles">
                                <h2 className="title">Select Token</h2>
                                <img src="/images/close.svg" className="pointer" onClick={()=>{setIsClicked(false)}}/>
                            </div>

                            <div className="search-bar">
                                <form>
                                    <input className="input" placeholder="Search Token"/>
                                </form>
                            </div>
                            <div className="token-list-wrapper">
                                <div className="tokens-list">

                                    <div className="token">
                                        <div className="token-titles">
                                            <div className="token-img">
                                                <img src="/images/cryptoLogo/abt.png"/>
                                            </div>
                                            <div className="token-title">
                                                <p className="token-name-full">ETH</p>
                                                <p className="token-name-short">(Ether)</p>
                                            </div>
                                        </div>
                                        <div className="token-balance">
                                            0
                                        </div>
                                    </div>

                                    <div className="token">
                                        <div className="token-titles">
                                            <div className="token-img">
                                                <img src="/images/cryptoLogo/abt.png"/>
                                            </div>
                                            <div className="token-title">
                                                <p className="token-name-full">WETH</p>
                                                <p className="token-name-short">(Wrapped Ether)</p>
                                            </div>
                                        </div>
                                        <div className="token-balance">
                                            0
                                        </div>
                                    </div>

                                    <div className="token">
                                        <div className="token-titles">
                                            <div className="token-img">
                                                <img src="/images/cryptoLogo/abt.png"/>
                                            </div>
                                            <div className="token-title">
                                                <p className="token-name-full">ETH</p>
                                                <p className="token-name-short">(Alchemy Pay)</p>
                                            </div>
                                        </div>
                                        <div className="token-balance">
                                            0
                                        </div>
                                    </div>

                                    <div className="token">
                                        <div className="token-titles">
                                            <div className="token-img">
                                                <img src="/images/cryptoLogo/abt.png"/>
                                            </div>
                                            <div className="token-title">
                                                <p className="token-name-full">ETH</p>
                                                <p className="token-name-short">(Ether)</p>
                                            </div>
                                        </div>
                                        <div className="token-balance">
                                            0
                                        </div>
                                    </div>

                                    <div className="token">
                                        <div className="token-titles">
                                            <div className="token-img">
                                                <img src="/images/cryptoLogo/abt.png"/>
                                            </div>
                                            <div className="token-title">
                                                <p className="token-name-full">ETH</p>
                                                <p className="token-name-short">(Ether)</p>
                                            </div>
                                        </div>
                                        <div className="token-balance">
                                            0
                                        </div>
                                    </div>

                                    <div className="token">
                                        <div className="token-titles">
                                            <div className="token-img">
                                                <img src="/images/cryptoLogo/abt.png"/>
                                            </div>
                                            <div className="token-title">
                                                <p className="token-name-full">ETH</p>
                                                <p className="token-name-short">(Ether)</p>
                                            </div>
                                        </div>
                                        <div className="token-balance">
                                            0
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    : null
            }

        </div>
    )
}
