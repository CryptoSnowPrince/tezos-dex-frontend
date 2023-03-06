import styles from '../../styles/components/buttons.module.scss'
import { useRouter } from "next/router";
import { useEffect } from 'react';

export default function Pinkbtn(props: any) {
    const border = props.type;
    const src = props.src;

    // const router = useRouter();

    let smallPadding = props.padding;

    return (
        <>
            <div className={`btn ${border}`} onClick={props.onClick}>
                <div className={styles.pinkbtn}>
                    <div className={(smallPadding === "small") ? `btn-smallPadding btn ${border}` : `btn ${border}`}>
                        <img src={src} className={(src != null || src != undefined) ? "img" : "displayNone"} />
                        <p>{props.text}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
