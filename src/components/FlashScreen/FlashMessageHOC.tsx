import * as React from "react";
import { useStateAnimate } from "../../hooks/useAnimateUseState";
import { store, useAppDispatch, useAppSelector } from "../../redux";
import { unsetFlashMessage } from "../../redux/flashMessage";
import { setNotificationMessage } from "../Notification/notificationMessageSave";
import { FlashMessage } from "./index";
const FLASH_MESSAGE_SHOW_TIME = 8000;
export interface IFlashMessageHOCProps {}

export function FlashMessageHOC(props: IFlashMessageHOCProps) {
  const dispatch = useAppDispatch();
  const { isLoading, onClick, headerText, trailingText, linkText, flashType, transactionId } =
    useAppSelector((state) => state.flashMessage);

  const walletAddress = useAppSelector((state) => state.wallet.address);
  const [isFlashVisiable, setIsFlashVisiable, animationState] = useStateAnimate(false, 300);
  let timeOutTimer: any = null;
  React.useEffect(() => {
    timeOutTimer && clearTimeout(timeOutTimer);
    if (isLoading) {
      //setting local store
      const timeinmillisec = new Date().getTime();
      setNotificationMessage(
        {
          onClick: onClick ?? undefined,
          flashType: flashType,
          headerText: headerText,
          trailingText: trailingText,
          linkText: linkText,
          currentTimeStamp: timeinmillisec,
          transactionId: transactionId,
        },
        walletAddress
      );

      timeOutTimer = setTimeout(() => {
        dispatch(unsetFlashMessage());
      }, FLASH_MESSAGE_SHOW_TIME);
    } else {
      timeOutTimer && clearTimeout(timeOutTimer);
    }
    setIsFlashVisiable(isLoading);
  }, [isLoading]);
  if (isFlashVisiable) {
    return (
      <div className="absolute mx-3 md:mx-0 md:right-10 md:bottom-10 bottom-[77px]  z-index-max-pro">
        <FlashMessage
          headerText={headerText}
          duration={FLASH_MESSAGE_SHOW_TIME}
          trailingText={trailingText}
          linkText={linkText}
          onClick={onClick ? () => onClick() : undefined}
          className={!animationState ? "slide-out-blurred-top" : ""}
          flashType={flashType}
          onCloseClick={() => {
            dispatch(unsetFlashMessage());
          }}
        />
      </div>
    );
  }
  return <></>;
}
