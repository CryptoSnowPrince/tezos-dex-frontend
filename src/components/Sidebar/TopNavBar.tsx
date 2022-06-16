import Image from 'next/image';
import * as React from 'react';
import { OutlineBtn } from '../Button/OutlineButton';

export interface ITopNavBarProps {
}
export interface IIconBTNProps {
    isVerticalline:boolean
}

export function IconBTN (props: IIconBTNProps) {
  return (
    <div className='flex items-center'>
       <Image src={props.isVerticalline?'/assets/icon/verticalline.svg':'/assets/icon/bellicon.svg'} height={'26px'}  width={'26px'} />
    </div>
  );
}

export function TopNavBar (props: ITopNavBarProps) {
  return (
  <nav className="bg-topBar  w-screen fixed h-16 items-center shadow flex justify-between px-10 topNavblurEffect ">
   <div>
   <Image src='/assets/icon/plentyIcon.svg' height={'22.47px'}  width='100%' />
   </div>
   <div className='flex flex-row gap-7 '>
    <div className='flex flex-row gap-3.5 '>
    <IconBTN isVerticalline={false}/>
    <div className='my-1 flex items-center'>
    <IconBTN isVerticalline={true}/>
    </div>
    <IconBTN isVerticalline={false}/>
    </div>
    <OutlineBtn />
   </div>
</nav>
  );
}
