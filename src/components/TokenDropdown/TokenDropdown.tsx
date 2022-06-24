import clsx from 'clsx';
import Image from 'next/image';
import arrowDown from '../../../public/assets/icon/arrowDown.svg';

interface ITokenDropdownProps {
  tokenIcon?: any;
  onClick?: () => void | Promise<void>;
  tokenName: string;
  className?: string;
}
function TokenDropdown(props: ITokenDropdownProps) {
  if (props.tokenIcon) {
    return (
      <button
        className={clsx(
          '  p-3 rounded-xl border border-text-800 font-title3 text-white flex content-center'
        )}
        onClick={props.onClick}
        {...props}
      >
        <div>
          <Image src={props.tokenIcon} height={'26px'} width={'26px'} />
        </div>
        <div className="mx-2">
          <span>{props.tokenName}</span>
        </div>
        <div className="ml-2">
          <Image src={arrowDown} />
        </div>
      </button>
    );
  } else {
    return (
      <button
        className={clsx(
          '  p-3 rounded-xl border border-text-800 font-title3 text-primary-500 flex content-center'
        )}
        onClick={props.onClick}
        {...props}
      >
        <span>{props.tokenName}</span>
        <span className="ml-2">
          <Image src={arrowDown} />
        </span>
      </button>
    );
  }
}

export default TokenDropdown;
