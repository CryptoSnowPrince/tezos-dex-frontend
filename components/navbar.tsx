import styles from '../styles/components/navbar.module.scss'
import Pinkbtn from "./buttons/pinkbtn";
import Link from "next/link";
import Thickbtn from "./buttons/thickbtn";
// import { motion } from "framer-motion"
import { useState } from "react";
import { DAppClient, PermissionScope, SigningType } from "@airgap/beacon-sdk";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";
import { useRouter } from 'next/router';
import { ConnectWalletBtnDeskTop } from '../src/components/Button/ConnectWalletDesktop';

export default function Navbar() {
    const router = useRouter();

    const [showToast, setShowToast] = useState(false);
    const [showFiat, setShowFiat] = useState(false);
    const [showNodeSelector, setNodeSelector] = useState(false);

    const createPool = () => {
        console.log('createPool: ')
        router.push('/pools')
    }
    const handleSwap = () => {
        console.log('handleSwap: ')
        router.push('/swap')
    }
    const handleHome = () => {
        console.log('handleHome: ')
        router.push('/home')
    }
    const connect = async () => {


        const dAppClient = new DAppClient({ name: "Kodex" });
        const wallet = new BeaconWallet({ name: "Kodex" });
        const activeAccount = await wallet.client.getActiveAccount();
        if (activeAccount) {
            console.log("Already connected:", activeAccount);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await wallet.clearActiveAccount();
            return;
        }

        // const scopes: PermissionScope[] = [
        //     PermissionScope.OPERATION_REQUEST,
        //     PermissionScope.SIGN,
        // ];
        try {
            console.log("Requesting permissions...");
            const permissions = await dAppClient.requestPermissions();
            console.log("Got permissions:", permissions.address);
            const activeAccount = await wallet.client.getActiveAccount();
            console.log(activeAccount);
        } catch (error) {
            console.log("Got error:", error);
        }

        // const response = await wallet.client.requestSignPayload({
        //     signingType: SigningType.MICHELINE,
        //     // This hex string needs to be prefixed with 05
        //     // The following is packed data, it can also be signed by Kukai
        //     payload:
        //         "05010000004254657a6f73205369676e6564204d6573736167653a206d79646170702e636f6d20323032312d30312d31345431353a31363a30345a2048656c6c6f20776f726c6421",
        // });
        //
        // console.log(`Signature: ${response.signature}`);

    }

    return (
        <section className={styles.navbar}>
            <div className="desktop-navbar-wrapper navbar-wrapper">
                <div className="navbar-contents left">

                    <div className="logo">
                        <Link href={"/"}>
                            <img src="/images/logo_blanc.png" />
                        </Link>

                    </div>

                    <div className="left-wrapper">
                        <div className="btn-home">
                            <Thickbtn text="Home" src="/images/home.png" onClick={handleHome} />
                        </div>
                        <div className="btn-swap">
                            <Thickbtn text="Swap" src="/images/swap.png" onClick={handleSwap} />
                        </div>
                    </div>
                </div>

                <div className="navbar-contents right">
                    <img className="settings" src="/images/settings.png" alt="settings" />
                    <div className="balance">
                        <Link href="/" target="_blank" className="balance-link">
                            $ 0.33
                        </Link>
                    </div>
                    <div className="right-wrapper">
                        <div className="btn-pool">
                            <Pinkbtn text="Create Pool" type="withoutBorder" onClick={createPool} />
                        </div>
                        <div className="btn-wallet">
                            {/* <Pinkbtn text="Connect Wallet" src="/images/home.png" type="withoutBorder" onClick={connect} /> */}
                            <ConnectWalletBtnDeskTop
                                setNodeSelector={setNodeSelector}
                                setShowFiat={setShowFiat}
                                setShowToast={setShowToast}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mobile-navbar-wrapper navbar-wrapper">

                <div className="mobile-wrapper">
                    <div className="burger">
                        <img src="/images/burger.png" />
                    </div>
                    <div className="logo">
                        <img src="/images/logo_noir.png" />
                    </div>
                </div>

                <div className="btn-wallet">
                    <Pinkbtn text="Connect Wallet" type="withoutBorder" style={{ height: "20px" }} onClick={connect} />
                </div>
                <div className="mobile-navbar-container">

                </div>
            </div>
        </section>
    )
}
