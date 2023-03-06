import styles from "../../styles/pages/swap.module.scss"
import React, {useState} from "react";
import Navbar from "../../components/navbar";
// import SelectTokenModal from "../../components/selectTokenModal";
import SelectToken from "../../components/selectToken";
import Setting from "../../components/setting";

export default function Swap (){
    let [setting, setSetting] = useState(false);

    let [test, setTest] = useState([
        {
            "name" : "name1",
            "value" : "value1"
        },
        {
            "name" : "name2",
            "value" : "value2"
        }
    ]);


    return(
        <div className={styles.swap}>
            <Navbar/>
            <section className="section sec1 swap-main">
                <div className="sec-wrapper">
                    <div className="titles">
                        <h1 className="title">Swap</h1>
                        <img className="pointer" src="/images/settings.png" onClick={() => {setSetting(!setting)}}/>
                        {
                            setting
                                ?
                                    <><Setting/></>
                                :
                                    <></>
                        }
                    </div>
                    <div className="content-box">
                        <div className="content-box-left content-box-container">
                            <div className="content-box-top">
                                <div className="content-box-number">
                                    {test[0].name} and {test[0].value}
                                </div>
                                <div className="content-box-select">
                                    <SelectToken/>
                                </div>
                            </div>
                            <div className="content-box-bottom">
                                balance :
                            </div>

                        </div>
                        <div className="content-box-mid pointer" onClick={() => {
                            let copy = [];
                            let arr = [];

                            arr = [...test];
                            copy[0] = arr[1];
                            copy[1] = arr[0];

                            setTest([...copy]);
                        }}>
                            <img src="/images/swap.png"/>
                        </div>
                        <div className="content-box-right content-box-container">
                            <div className="content-box-top">
                                <div className="content-box-select">
                                    <SelectToken/>
                                </div>
                                <div className="content-box-number">
                                    {test[1].name} and {test[1].value}
                                </div>
                            </div>
                            <div className="content-box-bottom">
                                balance :
                            </div>

                        </div>
                        <div className="content-box-btn">
                            <button className="swap-btn">Swap</button>
                        </div>
                    </div>

                </div>

            </section>
        </div>
    )
}
