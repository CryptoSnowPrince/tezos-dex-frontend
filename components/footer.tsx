import styles from '../styles/components/footer.module.scss'
import Link from "next/link";
export default function Footer(){
    return(
        <div className={styles.footer}>
            <div className="footer-container footer-container-top">
                <div className="footer-wrapper footer-wrapper-top">
                    <div className="wrapper-wrapper">
                        <div className="left">
                            <img src="/images/logo_noir.png"/>
                            <div className="desc greyText">
                                Our community is building a comprehensive decentralized trading platform for the future of finance. Join us!
                            </div>
                        </div>
                        <div className="bar"></div>
                        <div className="right">
                            <div className="menus">
                                <div className="menu">Services</div>
                                <div className="sub-menu greyText">Swap</div>
                                <div className="sub-menu greyText">Create Pool</div>
                            </div>
                            <div className="menus">
                                <div className="menu">Help</div>
                                <div className="sub-menu greyText">Academy</div>
                                <div className="sub-menu greyText">About Us</div>
                            </div>
                            <div className="menus">
                                <div className="menu">Terms</div>
                                <div className="sub-menu greyText">Terms of Use</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-container footer-container-bottom">
                <div className="footer-wrapper footer-wrapper-bottom">
                    <p className="copyright greyText">Copyright © 2022 Kodex. All rights reserved.</p>
                    <div className="sns-wrapper">
                        <div className="sns">
                            <Link href="/">
                                <img src="/images/sns_git.svg"/>
                            </Link>
                        </div>
                        <div className="sns">
                            <Link href="/">
                                <img src="/images/sns_twitter.svg"/>
                            </Link>
                        </div>
                        <div className="sns">
                            <Link href="/">
                                <img src="/images/sns_instagram.svg"/>
                            </Link>
                        </div>
                        <div className="sns">
                            <Link href="/">
                                <img src="/images/sns_discord.svg"/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
