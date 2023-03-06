import styles from '../../styles/components/buttons.module.scss'

export default function Thickbtn(props: any) {

    return (
        <div className={styles.thickbtn} onClick={props.onClick}>
            <div className="btn">
                <img src={props.src} />
                <p>{props.text}</p>
            </div>
        </div>
    )
}
