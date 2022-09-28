import Image from "next/image";
import * as React from "react";
import { ConnectWalletBtnDeskTop } from "../Button/ConnectWalletDesktop";
import myportfolionav from "../../assets/icon/myPortfolio/myportfolionav.svg";
import plentyIcon from "../../assets/icon/common/plentyIcon.svg";
import { Epoch } from "../Epoch";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { NotificationIcon, NotiFicationType } from "../NotificationIcon";
import { store } from "../../redux";
export interface ITopNavBarProps {
  setShowNotification: Function;
}
export interface IIconBTNProps {
  onClick?: Function;
  image: string;
  className?: string;
}

export function IconBTN(props: IIconBTNProps) {
  return (
    <div
      className={`flex items-center ${props.className}`}
      onClick={() => {
        props.onClick && props.onClick();
      }}
    >
      <Image alt={"alt"} src={`/assets/icon/${props.image}`} height={"26px"} width={"26px"} />
    </div>
  );
}

export function TopNavBar(props: ITopNavBarProps) {
  const [selectedDropDown, setSelectedDropDown] = useState("");
  const userAddress = store.getState().wallet.address;
  return (
    <nav className="hidden md:flex border-b border-border-500/50 w-screen fixed h-16 items-center shadow   px-10 pl-0 topNavblurEffect z-50">
      <div className="h-full w-[240px] border-border-500/50 border-r flex items-center pl-[26px]">
        <Image alt={"alt"} src={plentyIcon} />
      </div>
      <div className="flex justify-between flex-1 h-full">
        <Epoch />
        <div className="flex flex-row gap-7 ">
          <div className="flex flex-row gap-3.5 ">
            {userAddress && (
              <Link className={`cursor-pointer hover:opacity-90 `} href={"/MyPortfolio"}>
                <span className="cursor-pointer hover:opacity-90 flex items-center border border-primary-750 bg-primary-850 px-[14px] h-[44px] rounded-xl mt-[14px]">
                  <Image alt={"alt"} src={myportfolionav} />
                  <span className="text-primary-500 font-body4 ml-1">My portfolio</span>
                </span>
              </Link>
            )}
            <div className="my-1 flex items-center">
              <IconBTN image={"verticalline.svg"} />
            </div>
            <NotificationIcon
              className="cursor-pointer hover:opacity-90"
              type={NotiFicationType.haveNotification}
              onClick={props.setShowNotification}
            />
          </div>
          <ConnectWalletBtnDeskTop />
        </div>
      </div>
    </nav>
  );
}
