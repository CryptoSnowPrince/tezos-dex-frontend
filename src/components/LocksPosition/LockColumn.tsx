import * as React from "react";
import { BigNumber } from "bignumber.js";
import { Position, ToolTip } from "../Tooltip/TooltipAdvanced";
import { ILocksColumnProps } from "./types";
import Image from "next/image";
import veNFT from "../../assets/icon/myPortfolio/veNFT.svg";

import link from "../../assets/icon/myPortfolio/link.svg";

export function LocksCloumn(props: ILocksColumnProps) {
  return (
    <>
      <ToolTip
        position={Position.top}
        disable={true}
        toolTipChild={<div className="flex gap-1"></div>}
      >
        <div className="flex  justify-center items-center">
          <p>
            <Image src={veNFT} />
          </p>
          <p className="ml-2">
            <div className="text-white font-subtitle3">#6748783</div>
            <div className="flex mt-0.5">
              <p className="font-subtitle1 text-text-500 mr-1">vePLY</p>
              <Image src={link} />
            </div>
          </p>
        </div>
      </ToolTip>
    </>
  );
}
