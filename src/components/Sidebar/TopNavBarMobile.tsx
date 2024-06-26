import Image from "next/image";
import Link from "next/link";

import React, { useState, useMemo, useEffect } from "react";
import plentyIcon from "../../assets/icon/common/plentyIcon.svg";
import portfolio from "../../assets/icon/common/portfolio-mobile.svg";
import epoch from "../../assets/icon/navigation/epoch.svg";
import { store, useAppSelector } from "../../redux";
import { ConnectWalletBtnMobile } from "../Button/ConnectWalletMobile";
import { NotificationIcon } from "../NotificationIcon";
import "animate.css";
import clsx from "clsx";
import EpochMobile from "../Epoch/EpochMobile";

export interface ITopNavBarMobileProps {
  setShowNotification: Function;
  isBribes: boolean;
  isBanner: boolean;
  setShowFiat: React.Dispatch<React.SetStateAction<boolean>>;
  setNodeSelector: React.Dispatch<React.SetStateAction<boolean>>;
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
}

export function TopNavBarMobile(props: ITopNavBarMobileProps) {
  const userAddress = useAppSelector((state) => state.wallet.address);
  const [showEpoch, setShowEpoch] = useState(false);
  return (
    <>
      <div
        className={clsx(
          "flex fixed  w-screen bottomNavBarMobile px-5 h-[61px] justify-between border-b border-b-borderColor z-40",
          props.isBanner ? "top-[38px]" : "animate__animated animate__fadeInUp animate__faster"
        )}
      >
        {!props.isBribes ? (
          <Link href={"/"}>
            <Image src={plentyIcon} height={"22.47px"} width="100%" />
          </Link>
        ) : (
          <Image src={plentyIcon} height={"60px"} width="100%" />
        )}

        {!props.isBribes && (
          <div className="flex gap-3 items-center">
            <span className="relative top-0.5 " onClick={() => setShowEpoch(true)}>
              <Image src={epoch} />
            </span>
            {userAddress && (
              <Link href={"/myportfolio"}>
                <Image src={portfolio} />
              </Link>
            )}
            {userAddress && (
              <NotificationIcon
                className="cursor-pointer hover:opacity-90"
                onClick={props.setShowNotification}
              />
            )}
            <ConnectWalletBtnMobile
              setNodeSelector={props.setNodeSelector}
              isBanner={props.isBanner}
              setShowFiat={props.setShowFiat}
              setShowToast={props.setShowToast}
            />
          </div>
        )}
      </div>
      {<EpochMobile show={showEpoch} setShow={setShowEpoch} />}
    </>
  );
}
