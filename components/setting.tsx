import styles from "../styles/components/setting.module.scss"
import React, {useState} from "react";
import Pinkbtn from "./buttons/pinkbtn";
export default function Setting(){

    return(
        <div className={styles.setting}>
            <p className="title">Setting</p>
            <div className="setting-content setting-tolerance">
                <div className="setting-content-title">
                    <p>Slippage tolerance</p>
                    <div className="setting-tolerance-wrapper">
                        
                    </div>
                </div>
            </div>
            <div className="setting-content setting-deadline">
                <div className="setting-content-title">
                    Transaction deadline
                </div>
            </div>
            <p className="title">Interface Settings</p>
            <div className="setting-content-wrapper">
                <div className="setting-content setting-router">
                    <div className="setting-content-title">
                        Auto Router API
                    </div>
                </div>
                <div className="setting-content setting-mode">
                    <div className="setting-content-title">
                        Expert Modew
                    </div>
                </div>
            </div>

        </div>
    )
}
