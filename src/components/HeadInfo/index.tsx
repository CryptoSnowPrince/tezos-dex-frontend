import Image from 'next/image';
import * as React from 'react';
import playIcon from '../../assets/icon/pools/playIcon.svg';
import { VideoModal } from '../Modal/videoModal';
import Tooltip from '../Tooltip/Tooltip';
import { Position, ToolTip, TooltipType } from '../Tooltip/TooltipAdvanced';
export interface IHeadInfoProps {
  className?: string;
  title: string;
  toolTipContent: string;
  handleCreateLock?: () => void;
}

export default function HeadInfo(props: IHeadInfoProps) {
  const [showVideoModal, setShowVideoModal] = React.useState(false);
  return (
    <>
      <div
        className={`${props.className} flex gap-2 items-center border-b border-b-borderCommon py-2 bg-cardBackGround`}
      >
        <div className="flex">
          <div className="p-2 text-f18 font-medium text-white">
            {props.title}
          </div>
          <ToolTip
            message={props.toolTipContent}
            classNameAncorToolTip="pushtoCenter"
          >
            <Image
              src={playIcon}
              onClick={() => setShowVideoModal(true)}
              height={'28px'}
              width={'28px'}
              className="cursor-pointer hover:opacity-90"
            />
          </ToolTip>
          {showVideoModal && (
            <VideoModal
              closefn={setShowVideoModal}
              linkString={'Bh5zuEI4M9o'}
            />
          )}
        </div>
        {props.title === 'Vote' && (
          <div
            className="ml-auto h-[52px] flex items-center px-[32px] text-primary-500 rounded-lg bg-primary-500/[0.1] mr-[32px]"
            onClick={props.handleCreateLock}
          >
            Create Lock
          </div>
        )}
      </div>
    </>
  );
}
