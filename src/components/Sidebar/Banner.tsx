import clsx from "clsx";
import { useState } from "react";
import { claimFaucet } from "../../operations/faucet";
import { useAppDispatch } from "../../redux";
import { setFlashMessage } from "../../redux/flashMessage";
import { setIsBanner, setIsLoadingWallet } from "../../redux/walletLoading";
import { Flashtype } from "../FlashScreen";

interface IBanner {
  isBanner: boolean;

  setIsBanner: React.Dispatch<React.SetStateAction<boolean>>;
}
function Banner(props: IBanner) {
  const dispatch = useAppDispatch();

  const handleFaucet = () => {
    claimFaucet(undefined, undefined, undefined, {
      flashType: Flashtype.Info,
      headerText: "Transaction submitted",
      trailingText: `Claim test tokens on Ghostnet `,
      linkText: "View in Explorer",
      isLoading: true,
      transactionId: "",
    }).then((res) => {
      if (res.success) {
        setTimeout(() => {
          dispatch(setIsLoadingWallet({ isLoading: false, operationSuccesful: true }));
          dispatch(
            setFlashMessage({
              flashType: Flashtype.Success,
              headerText: "Success",
              trailingText: `Claim test tokens on Ghostnet`,
              linkText: "View in Explorer",
              isLoading: true,
              transactionId: "",
            })
          );
        }, 6000);
      } else {
        dispatch(
          setFlashMessage({
            flashType: Flashtype.Rejected,
            transactionId: "",
            headerText: "Rejected",
            trailingText: `Claim test tokens on Ghostnet`,
            linkText: "",
            isLoading: true,
          })
        );
        dispatch(setIsLoadingWallet({ isLoading: false, operationSuccesful: true }));
      }
    });
  };
  const [isHover, setHover] = useState(false);
  return (
    <div
      className={clsx(
        "fixed w-full gradient h-[38px] flex items-center justify-center font-f11-500 md:font-subtitle1 text-white z-10",
        !props.isBanner && "hidden"
      )}
    >
      <p className="w-full text-center cursor-pointer">
        Voting starts from 12th Jan. Rewards starts from 19th Jan{" "}
        {/* <span className="font-[600]">LEARN MORE</span>{" "} */}
      </p>
      <p
        className="text-right mr-2 md:mr-[10px] cursor-pointer"
        onClick={() => {
          props.setIsBanner(false);
        }}
      >
        <div
          className={clsx(
            "w-[18px] h-[18px] rounded-full flex items-center justify-center ",
            isHover ? "bg-info-200 closeboxShadow" : "bg-info-100"
          )}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div className={clsx(isHover ? "closeHover" : "close")}></div>
        </div>
      </p>
    </div>
  );
}

export default Banner;
