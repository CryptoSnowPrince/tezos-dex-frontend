import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import styles from "../styles/components/cryptoSlider.module.scss"
export default function CryptoSlider(props: any) {

    console.log(props);
    const token = [
        {
            "img1": "/images/cryptoLogo/tether.png",
            "img2": "/images/cryptoLogo/bao.png",
            "name1": "QUIPU",
            "name2": "TEZ",
            "tvl": "65,355.2",
            "apr": "56.31689"
        },
        {
            "img1": "/images/cryptoLogo/tether.png",
            "img2": "/images/cryptoLogo/aave.png",
            "name1": "QUIPU",
            "name2": "TEZ",
            "tvl": "65,355.2",
            "apr": "56.31689"
        },
        {
            "img1": "/images/cryptoLogo/tether.png",
            "img2": "/images/cryptoLogo/doge.png",
            "name1": "QUIPU",
            "name2": "TEZ",
            "tvl": "65,355.2",
            "apr": "56.31689"
        },
        {
            "img1": "/images/cryptoLogo/tether.png",
            "img2": "/images/cryptoLogo/ngc.png",
            "name1": "QUIPU",
            "name2": "TEZ",
            "tvl": "65,355.2",
            "apr": "56.31689"
        },
        {
            "img1": "/images/cryptoLogo/tether.png",
            "img2": "/images/cryptoLogo/tezos.png",
            "name1": "QUIPU",
            "name2": "TEZ",
            "tvl": "65,355.2",
            "apr": "56.31689"
        },
        {
            "img1": "/images/cryptoLogo/tether.png",
            "img2": "/images/cryptoLogo/sushi.png",
            "name1": "QUIPU",
            "name2": "TEZ",
            "tvl": "65,355.2",
            "apr": "56.31689"
        },
        {
            "img1": "/images/cryptoLogo/tether.png",
            "img2": "/images/cryptoLogo/bao.png",
            "name1": "QUIPU",
            "name2": "TEZ",
            "tvl": "65,355.2",
            "apr": "56.31689"
        },
        {
            "img1": "/images/cryptoLogo/tether.png",
            "img2": "/images/cryptoLogo/aave.png",
            "name1": "QUIPU",
            "name2": "TEZ",
            "tvl": "65,355.2",
            "apr": "56.31689"
        },
        {
            "img1": "/images/cryptoLogo/tether.png",
            "img2": "/images/cryptoLogo/doge.png",
            "name1": "QUIPU",
            "name2": "TEZ",
            "tvl": "65,355.2",
            "apr": "56.31689"
        },
        {
            "img1": "/images/cryptoLogo/tether.png",
            "img2": "/images/cryptoLogo/ngc.png",
            "name1": "QUIPU",
            "name2": "TEZ",
            "tvl": "65,355.2",
            "apr": "56.31689"
        },
        {
            "img1": "/images/cryptoLogo/tether.png",
            "img2": "/images/cryptoLogo/tezos.png",
            "name1": "QUIPU",
            "name2": "TEZ",
            "tvl": "65,355.2",
            "apr": "56.31689"
        },
        {
            "img1": "/images/cryptoLogo/tether.png",
            "img2": "/images/cryptoLogo/sushi.png",
            "name1": "QUIPU",
            "name2": "TEZ",
            "tvl": "65,355.2",
            "apr": "56.31689"
        },
        {
            "img1": "/images/cryptoLogo/tether.png",
            "img2": "/images/cryptoLogo/aave.png",
            "name1": "QUIPU",
            "name2": "TEZ",
            "tvl": "65,355.2",
            "apr": "56.31689"
        },
        {
            "img1": "/images/cryptoLogo/tether.png",
            "img2": "/images/cryptoLogo/doge.png",
            "name1": "QUIPU",
            "name2": "TEZ",
            "tvl": "65,355.2",
            "apr": "56.31689"
        },
        {
            "img1": "/images/cryptoLogo/tether.png",
            "img2": "/images/cryptoLogo/ngc.png",
            "name1": "QUIPU",
            "name2": "TEZ",
            "tvl": "65,355.2",
            "apr": "56.31689"
        },
        {
            "img1": "/images/cryptoLogo/tether.png",
            "img2": "/images/cryptoLogo/tezos.png",
            "name1": "QUIPU",
            "name2": "TEZ",
            "tvl": "65,355.2",
            "apr": "56.31689"
        },
        {
            "img1": "/images/cryptoLogo/tether.png",
            "img2": "/images/cryptoLogo/sushi.png",
            "name1": "QUIPU",
            "name2": "TEZ",
            "tvl": "65,355.2",
            "apr": "56.31689"
        },
        {
            "img1": "/images/cryptoLogo/tether.png",
            "img2": "/images/cryptoLogo/bao.png",
            "name1": "QUIPU",
            "name2": "TEZ",
            "tvl": "65,355.2",
            "apr": "56.31689"
        },
        {
            "img1": "/images/cryptoLogo/tether.png",
            "img2": "/images/cryptoLogo/aave.png",
            "name1": "QUIPU",
            "name2": "TEZ",
            "tvl": "65,355.2",
            "apr": "56.31689"
        },
        {
            "img1": "/images/cryptoLogo/tether.png",
            "img2": "/images/cryptoLogo/doge.png",
            "name1": "QUIPU",
            "name2": "TEZ",
            "tvl": "65,355.2",
            "apr": "56.31689"
        },
        {
            "img1": "/images/cryptoLogo/tether.png",
            "img2": "/images/cryptoLogo/ngc.png",
            "name1": "QUIPU",
            "name2": "TEZ",
            "tvl": "65,355.2",
            "apr": "56.31689"
        },
        {
            "img1": "/images/cryptoLogo/tether.png",
            "img2": "/images/cryptoLogo/tezos.png",
            "name1": "QUIPU",
            "name2": "TEZ",
            "tvl": "65,355.2",
            "apr": "56.31689"
        },
    ]

    return (
        <Swiper
            className={styles.cryptoSlider}
            spaceBetween={25}
        >
            {
                props.pools && props.pools.map((data: any, index: any) => (
                    <SwiperSlide key={index}>
                        <div className="slide-wrapper">
                            <p className="hot">Hot Pool</p>
                            <div className="token">
                                <div className="token-imgs">
                                    <img className="token-img token-img1" src={`https://api-kodex.kodkodkod.studio/currency/uploads/${data.currency1?.image}`} />
                                    <img className="token-img token-img2" src={`https://api-kodex.kodkodkod.studio/currency/uploads/${data.currency2?.image}`} />
                                    <img className="token-faucet token-img3" src="/images/cryptoLogo/faucet.png" />
                                </div>
                            </div>
                            <p className="token-name greyText">{data.currency1?.name} / {data.currency2?.name}</p>
                            <div className="token-number">
                                <div className="token-number-content">
                                    <p className="title greyText">TVL</p>
                                    <p className="number">${data.tvl}</p>
                                </div>
                                <div className="token-number-content">
                                    <p className="title greyText">APR up to</p>
                                    <p className="number">{data.apr}%</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))
            }

        </Swiper>
    )
}
