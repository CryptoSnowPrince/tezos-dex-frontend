import * as React from 'react';
import { PopUpModal } from '../Modal/popupModal';
import { VideoModal } from '../Modal/videoModal';
import { InfoIconToolTip } from '../Tooltip/InfoIconTooltip';

export interface IManageLiquidityProps {
    closeFn:Function;
}

export function ManageLiquidity (props: IManageLiquidityProps) {
  const [showVideoModal,setShowVideoModal]=React.useState(false);

  return (
      <>
    
    <PopUpModal 
    onhide={props.closeFn}
    className='w-[620px] max-w-none'
    headerChild={
    <div className='flex gap-1'>
      <p>Manage Liquidity </p>
      <InfoIconToolTip message='Hello world' />
    </div>} 
    footerChild={
    <svg onClick={()=>setShowVideoModal(true)}  width={445} height={38} viewBox="0 0 445 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.904 22.729H3.248L2.448 25.001H0.544L4.528 13.865H6.64L10.624 25.001H8.704L7.904 22.729ZM7.392 21.241L5.584 16.073L3.76 21.241H7.392ZM11.7483 20.553C11.7483 19.6676 11.9296 18.8836 12.2923 18.201C12.6656 17.5183 13.1669 16.9903 13.7963 16.617C14.4363 16.233 15.1456 16.041 15.9243 16.041C16.5003 16.041 17.0656 16.169 17.6203 16.425C18.1856 16.6703 18.6336 17.001 18.9643 17.417V13.161H20.8043V25.001H18.9643V23.673C18.6656 24.0996 18.2496 24.4516 17.7163 24.729C17.1936 25.0063 16.5909 25.145 15.9083 25.145C15.1403 25.145 14.4363 24.953 13.7963 24.569C13.1669 24.1743 12.6656 23.6303 12.2923 22.937C11.9296 22.233 11.7483 21.4383 11.7483 20.553ZM18.9643 20.585C18.9643 19.977 18.8363 19.449 18.5803 19.001C18.3349 18.553 18.0096 18.2116 17.6043 17.977C17.1989 17.7423 16.7616 17.625 16.2923 17.625C15.8229 17.625 15.3856 17.7423 14.9803 17.977C14.5749 18.201 14.2443 18.537 13.9883 18.985C13.7429 19.4223 13.6203 19.945 13.6203 20.553C13.6203 21.161 13.7429 21.6943 13.9883 22.153C14.2443 22.6116 14.5749 22.9636 14.9803 23.209C15.3963 23.4436 15.8336 23.561 16.2923 23.561C16.7616 23.561 17.1989 23.4436 17.6043 23.209C18.0096 22.9743 18.3349 22.633 18.5803 22.185C18.8363 21.7263 18.9643 21.193 18.9643 20.585ZM22.592 20.553C22.592 19.6676 22.7733 18.8836 23.136 18.201C23.5093 17.5183 24.0107 16.9903 24.64 16.617C25.28 16.233 25.9893 16.041 26.768 16.041C27.344 16.041 27.9093 16.169 28.464 16.425C29.0293 16.6703 29.4773 17.001 29.808 17.417V13.161H31.648V25.001H29.808V23.673C29.5093 24.0996 29.0933 24.4516 28.56 24.729C28.0373 25.0063 27.4347 25.145 26.752 25.145C25.984 25.145 25.28 24.953 24.64 24.569C24.0107 24.1743 23.5093 23.6303 23.136 22.937C22.7733 22.233 22.592 21.4383 22.592 20.553ZM29.808 20.585C29.808 19.977 29.68 19.449 29.424 19.001C29.1787 18.553 28.8533 18.2116 28.448 17.977C28.0427 17.7423 27.6053 17.625 27.136 17.625C26.6667 17.625 26.2293 17.7423 25.824 17.977C25.4187 18.201 25.088 18.537 24.832 18.985C24.5867 19.4223 24.464 19.945 24.464 20.553C24.464 21.161 24.5867 21.6943 24.832 22.153C25.088 22.6116 25.4187 22.9636 25.824 23.209C26.24 23.4436 26.6773 23.561 27.136 23.561C27.6053 23.561 28.0427 23.4436 28.448 23.209C28.8533 22.9743 29.1787 22.633 29.424 22.185C29.68 21.7263 29.808 21.193 29.808 20.585ZM40.024 13.161V25.001H38.2V13.161H40.024ZM43.3468 15.017C43.0161 15.017 42.7388 14.905 42.5148 14.681C42.2908 14.457 42.1788 14.1796 42.1788 13.849C42.1788 13.5183 42.2908 13.241 42.5148 13.017C42.7388 12.793 43.0161 12.681 43.3468 12.681C43.6668 12.681 43.9388 12.793 44.1628 13.017C44.3868 13.241 44.4988 13.5183 44.4988 13.849C44.4988 14.1796 44.3868 14.457 44.1628 14.681C43.9388 14.905 43.6668 15.017 43.3468 15.017ZM44.2428 16.185V25.001H42.4188V16.185H44.2428ZM46.0295 20.553C46.0295 19.6676 46.2108 18.8836 46.5735 18.201C46.9468 17.5183 47.4482 16.9903 48.0775 16.617C48.7175 16.233 49.4268 16.041 50.2055 16.041C50.8882 16.041 51.4908 16.1796 52.0135 16.457C52.5468 16.7343 52.9575 17.0703 53.2455 17.465V16.185H55.0855V29.193H53.2455V23.721C52.9575 24.1156 52.5415 24.4516 51.9975 24.729C51.4535 25.0063 50.8348 25.145 50.1415 25.145C49.3842 25.145 48.6908 24.953 48.0615 24.569C47.4428 24.1743 46.9468 23.6303 46.5735 22.937C46.2108 22.233 46.0295 21.4383 46.0295 20.553ZM53.2455 20.585C53.2455 19.977 53.1175 19.449 52.8615 19.001C52.6162 18.553 52.2908 18.2116 51.8855 17.977C51.4802 17.7423 51.0428 17.625 50.5735 17.625C50.1042 17.625 49.6668 17.7423 49.2615 17.977C48.8562 18.201 48.5255 18.537 48.2695 18.985C48.0242 19.4223 47.9015 19.945 47.9015 20.553C47.9015 21.161 48.0242 21.6943 48.2695 22.153C48.5255 22.6116 48.8562 22.9636 49.2615 23.209C49.6775 23.4436 50.1148 23.561 50.5735 23.561C51.0428 23.561 51.4802 23.4436 51.8855 23.209C52.2908 22.9743 52.6162 22.633 52.8615 22.185C53.1175 21.7263 53.2455 21.193 53.2455 20.585ZM65.4653 16.185V25.001H63.6413V23.961C63.3533 24.3236 62.9746 24.6116 62.5053 24.825C62.0466 25.0276 61.5559 25.129 61.0333 25.129C60.3399 25.129 59.7159 24.985 59.1613 24.697C58.6173 24.409 58.1853 23.9823 57.8653 23.417C57.5559 22.8516 57.4013 22.169 57.4013 21.369V16.185H59.2093V21.097C59.2093 21.8863 59.4066 22.4943 59.8013 22.921C60.1959 23.337 60.7346 23.545 61.4173 23.545C62.0999 23.545 62.6386 23.337 63.0333 22.921C63.4386 22.4943 63.6413 21.8863 63.6413 21.097V16.185H65.4653ZM68.7999 15.017C68.4692 15.017 68.1919 14.905 67.9679 14.681C67.7439 14.457 67.6319 14.1796 67.6319 13.849C67.6319 13.5183 67.7439 13.241 67.9679 13.017C68.1919 12.793 68.4692 12.681 68.7999 12.681C69.1199 12.681 69.3919 12.793 69.6159 13.017C69.8399 13.241 69.9519 13.5183 69.9519 13.849C69.9519 14.1796 69.8399 14.457 69.6159 14.681C69.3919 14.905 69.1199 15.017 68.7999 15.017ZM69.6959 16.185V25.001H67.8719V16.185H69.6959ZM71.4826 20.553C71.4826 19.6676 71.664 18.8836 72.0266 18.201C72.4 17.5183 72.9013 16.9903 73.5306 16.617C74.1706 16.233 74.88 16.041 75.6586 16.041C76.2346 16.041 76.8 16.169 77.3546 16.425C77.92 16.6703 78.368 17.001 78.6986 17.417V13.161H80.5386V25.001H78.6986V23.673C78.4 24.0996 77.984 24.4516 77.4506 24.729C76.928 25.0063 76.3253 25.145 75.6426 25.145C74.8746 25.145 74.1706 24.953 73.5306 24.569C72.9013 24.1743 72.4 23.6303 72.0266 22.937C71.664 22.233 71.4826 21.4383 71.4826 20.553ZM78.6986 20.585C78.6986 19.977 78.5706 19.449 78.3146 19.001C78.0693 18.553 77.744 18.2116 77.3386 17.977C76.9333 17.7423 76.496 17.625 76.0266 17.625C75.5573 17.625 75.12 17.7423 74.7146 17.977C74.3093 18.201 73.9786 18.537 73.7226 18.985C73.4773 19.4223 73.3546 19.945 73.3546 20.553C73.3546 21.161 73.4773 21.6943 73.7226 22.153C73.9786 22.6116 74.3093 22.9636 74.7146 23.209C75.1306 23.4436 75.568 23.561 76.0266 23.561C76.496 23.561 76.9333 23.4436 77.3386 23.209C77.744 22.9743 78.0693 22.633 78.3146 22.185C78.5706 21.7263 78.6986 21.193 78.6986 20.585ZM83.8624 15.017C83.5317 15.017 83.2544 14.905 83.0304 14.681C82.8064 14.457 82.6944 14.1796 82.6944 13.849C82.6944 13.5183 82.8064 13.241 83.0304 13.017C83.2544 12.793 83.5317 12.681 83.8624 12.681C84.1824 12.681 84.4544 12.793 84.6784 13.017C84.9024 13.241 85.0144 13.5183 85.0144 13.849C85.0144 14.1796 84.9024 14.457 84.6784 14.681C84.4544 14.905 84.1824 15.017 83.8624 15.017ZM84.7584 16.185V25.001H82.9344V16.185H84.7584ZM89.2811 17.673V22.553C89.2811 22.8836 89.3558 23.1236 89.5051 23.273C89.6651 23.4116 89.9318 23.481 90.3051 23.481H91.4251V25.001H89.9851C89.1638 25.001 88.5345 24.809 88.0971 24.425C87.6598 24.041 87.4411 23.417 87.4411 22.553V17.673H86.4011V16.185H87.4411V13.993H89.2811V16.185H91.4251V17.673H89.2811ZM101.042 16.185L95.6343 29.145H93.7463L95.5383 24.857L92.0663 16.185H94.0983L96.5783 22.905L99.1543 16.185H101.042ZM104.419 22.809L102.483 27.225H101.299L102.435 22.809H104.419ZM113.369 25.145C112.675 25.145 112.051 25.0223 111.497 24.777C110.953 24.521 110.521 24.1796 110.201 23.753C109.881 23.3156 109.71 22.8303 109.689 22.297H111.577C111.609 22.6703 111.785 22.985 112.105 23.241C112.435 23.4863 112.846 23.609 113.337 23.609C113.849 23.609 114.243 23.513 114.521 23.321C114.809 23.1183 114.953 22.8623 114.953 22.553C114.953 22.2223 114.793 21.977 114.473 21.817C114.163 21.657 113.667 21.481 112.985 21.289C112.323 21.1076 111.785 20.9316 111.369 20.761C110.953 20.5903 110.59 20.329 110.281 19.977C109.982 19.625 109.833 19.161 109.833 18.585C109.833 18.1156 109.971 17.689 110.249 17.305C110.526 16.9103 110.921 16.601 111.433 16.377C111.955 16.153 112.553 16.041 113.225 16.041C114.227 16.041 115.033 16.297 115.641 16.809C116.259 17.3103 116.59 17.9983 116.633 18.873H114.809C114.777 18.4783 114.617 18.1636 114.329 17.929C114.041 17.6943 113.651 17.577 113.161 17.577C112.681 17.577 112.313 17.6676 112.057 17.849C111.801 18.0303 111.673 18.2703 111.673 18.569C111.673 18.8036 111.758 19.001 111.929 19.161C112.099 19.321 112.307 19.449 112.553 19.545C112.798 19.6303 113.161 19.7423 113.641 19.881C114.281 20.0516 114.803 20.2276 115.209 20.409C115.625 20.5796 115.982 20.8356 116.281 21.177C116.579 21.5183 116.734 21.9716 116.745 22.537C116.745 23.0383 116.606 23.4863 116.329 23.881C116.051 24.2756 115.657 24.585 115.145 24.809C114.643 25.033 114.051 25.145 113.369 25.145ZM120.844 17.673V22.553C120.844 22.8836 120.918 23.1236 121.068 23.273C121.228 23.4116 121.494 23.481 121.868 23.481H122.988V25.001H121.548C120.726 25.001 120.097 24.809 119.66 24.425C119.222 24.041 119.004 23.417 119.004 22.553V17.673H117.964V16.185H119.004V13.993H120.844V16.185H122.988V17.673H120.844ZM124.061 20.553C124.061 19.6676 124.242 18.8836 124.605 18.201C124.978 17.5183 125.479 16.9903 126.109 16.617C126.749 16.233 127.453 16.041 128.221 16.041C128.914 16.041 129.517 16.1796 130.029 16.457C130.551 16.7236 130.967 17.0596 131.277 17.465V16.185H133.117V25.001H131.277V23.689C130.967 24.105 130.546 24.4516 130.013 24.729C129.479 25.0063 128.871 25.145 128.189 25.145C127.431 25.145 126.738 24.953 126.109 24.569C125.479 24.1743 124.978 23.6303 124.605 22.937C124.242 22.233 124.061 21.4383 124.061 20.553ZM131.277 20.585C131.277 19.977 131.149 19.449 130.893 19.001C130.647 18.553 130.322 18.2116 129.917 17.977C129.511 17.7423 129.074 17.625 128.605 17.625C128.135 17.625 127.698 17.7423 127.293 17.977C126.887 18.201 126.557 18.537 126.301 18.985C126.055 19.4223 125.933 19.945 125.933 20.553C125.933 21.161 126.055 21.6943 126.301 22.153C126.557 22.6116 126.887 22.9636 127.293 23.209C127.709 23.4436 128.146 23.561 128.605 23.561C129.074 23.561 129.511 23.4436 129.917 23.209C130.322 22.9743 130.647 22.633 130.893 22.185C131.149 21.7263 131.277 21.193 131.277 20.585ZM139.001 20.601L143.065 25.001H140.601L137.337 21.209V25.001H135.513V13.161H137.337V20.041L140.537 16.185H143.065L139.001 20.601ZM152.452 20.377C152.452 20.7076 152.431 21.0063 152.388 21.273H145.652C145.705 21.977 145.967 22.5423 146.436 22.969C146.905 23.3956 147.481 23.609 148.164 23.609C149.145 23.609 149.839 23.1983 150.244 22.377H152.212C151.945 23.1876 151.46 23.8543 150.756 24.377C150.063 24.889 149.199 25.145 148.164 25.145C147.321 25.145 146.564 24.9583 145.892 24.585C145.231 24.201 144.708 23.6676 144.324 22.985C143.951 22.2916 143.764 21.4916 143.764 20.585C143.764 19.6783 143.945 18.8836 144.308 18.201C144.681 17.5076 145.199 16.9743 145.86 16.601C146.532 16.2276 147.3 16.041 148.164 16.041C148.996 16.041 149.737 16.2223 150.388 16.585C151.039 16.9476 151.545 17.4596 151.908 18.121C152.271 18.7716 152.452 19.5236 152.452 20.377ZM150.548 19.801C150.537 19.129 150.297 18.5903 149.828 18.185C149.359 17.7796 148.777 17.577 148.084 17.577C147.455 17.577 146.916 17.7796 146.468 18.185C146.02 18.5796 145.753 19.1183 145.668 19.801H150.548ZM156.247 22.809L154.311 27.225H153.127L154.263 22.809H156.247ZM161.389 20.553C161.389 19.6676 161.57 18.8836 161.933 18.201C162.306 17.5183 162.808 16.9903 163.437 16.617C164.077 16.233 164.781 16.041 165.549 16.041C166.242 16.041 166.845 16.1796 167.357 16.457C167.88 16.7236 168.296 17.0596 168.605 17.465V16.185H170.445V25.001H168.605V23.689C168.296 24.105 167.874 24.4516 167.341 24.729C166.808 25.0063 166.2 25.145 165.517 25.145C164.76 25.145 164.066 24.953 163.437 24.569C162.808 24.1743 162.306 23.6303 161.933 22.937C161.57 22.233 161.389 21.4383 161.389 20.553ZM168.605 20.585C168.605 19.977 168.477 19.449 168.221 19.001C167.976 18.553 167.65 18.2116 167.245 17.977C166.84 17.7423 166.402 17.625 165.933 17.625C165.464 17.625 165.026 17.7423 164.621 17.977C164.216 18.201 163.885 18.537 163.629 18.985C163.384 19.4223 163.261 19.945 163.261 20.553C163.261 21.161 163.384 21.6943 163.629 22.153C163.885 22.6116 164.216 22.9636 164.621 23.209C165.037 23.4436 165.474 23.561 165.933 23.561C166.402 23.561 166.84 23.4436 167.245 23.209C167.65 22.9743 167.976 22.633 168.221 22.185C168.477 21.7263 168.605 21.193 168.605 20.585ZM177.289 16.041C177.982 16.041 178.601 16.185 179.145 16.473C179.699 16.761 180.131 17.1876 180.441 17.753C180.75 18.3183 180.905 19.001 180.905 19.801V25.001H179.097V20.073C179.097 19.2836 178.899 18.681 178.505 18.265C178.11 17.8383 177.571 17.625 176.889 17.625C176.206 17.625 175.662 17.8383 175.257 18.265C174.862 18.681 174.665 19.2836 174.665 20.073V25.001H172.841V16.185H174.665V17.193C174.963 16.8303 175.342 16.5476 175.801 16.345C176.27 16.1423 176.766 16.041 177.289 16.041ZM182.623 20.553C182.623 19.6676 182.805 18.8836 183.167 18.201C183.541 17.5183 184.042 16.9903 184.671 16.617C185.311 16.233 186.021 16.041 186.799 16.041C187.375 16.041 187.941 16.169 188.495 16.425C189.061 16.6703 189.509 17.001 189.839 17.417V13.161H191.679V25.001H189.839V23.673C189.541 24.0996 189.125 24.4516 188.591 24.729C188.069 25.0063 187.466 25.145 186.783 25.145C186.015 25.145 185.311 24.953 184.671 24.569C184.042 24.1743 183.541 23.6303 183.167 22.937C182.805 22.233 182.623 21.4383 182.623 20.553ZM189.839 20.585C189.839 19.977 189.711 19.449 189.455 19.001C189.21 18.553 188.885 18.2116 188.479 17.977C188.074 17.7423 187.637 17.625 187.167 17.625C186.698 17.625 186.261 17.7423 185.855 17.977C185.45 18.201 185.119 18.537 184.863 18.985C184.618 19.4223 184.495 19.945 184.495 20.553C184.495 21.161 184.618 21.6943 184.863 22.153C185.119 22.6116 185.45 22.9636 185.855 23.209C186.271 23.4436 186.709 23.561 187.167 23.561C187.637 23.561 188.074 23.4436 188.479 23.209C188.885 22.9743 189.21 22.633 189.455 22.185C189.711 21.7263 189.839 21.193 189.839 20.585ZM206.311 20.377C206.311 20.7076 206.29 21.0063 206.247 21.273H199.511C199.565 21.977 199.826 22.5423 200.295 22.969C200.765 23.3956 201.341 23.609 202.023 23.609C203.005 23.609 203.698 23.1983 204.103 22.377H206.071C205.805 23.1876 205.319 23.8543 204.615 24.377C203.922 24.889 203.058 25.145 202.023 25.145C201.181 25.145 200.423 24.9583 199.751 24.585C199.09 24.201 198.567 23.6676 198.183 22.985C197.81 22.2916 197.623 21.4916 197.623 20.585C197.623 19.6783 197.805 18.8836 198.167 18.201C198.541 17.5076 199.058 16.9743 199.719 16.601C200.391 16.2276 201.159 16.041 202.023 16.041C202.855 16.041 203.597 16.2223 204.247 16.585C204.898 16.9476 205.405 17.4596 205.767 18.121C206.13 18.7716 206.311 19.5236 206.311 20.377ZM204.407 19.801C204.397 19.129 204.157 18.5903 203.687 18.185C203.218 17.7796 202.637 17.577 201.943 17.577C201.314 17.577 200.775 17.7796 200.327 18.185C199.879 18.5796 199.613 19.1183 199.527 19.801H204.407ZM207.498 20.553C207.498 19.6676 207.68 18.8836 208.042 18.201C208.416 17.5183 208.917 16.9903 209.546 16.617C210.186 16.233 210.89 16.041 211.658 16.041C212.352 16.041 212.954 16.1796 213.466 16.457C213.989 16.7236 214.405 17.0596 214.714 17.465V16.185H216.554V25.001H214.714V23.689C214.405 24.105 213.984 24.4516 213.45 24.729C212.917 25.0063 212.309 25.145 211.626 25.145C210.869 25.145 210.176 24.953 209.546 24.569C208.917 24.1743 208.416 23.6303 208.042 22.937C207.68 22.233 207.498 21.4383 207.498 20.553ZM214.714 20.585C214.714 19.977 214.586 19.449 214.33 19.001C214.085 18.553 213.76 18.2116 213.354 17.977C212.949 17.7423 212.512 17.625 212.042 17.625C211.573 17.625 211.136 17.7423 210.73 17.977C210.325 18.201 209.994 18.537 209.738 18.985C209.493 19.4223 209.37 19.945 209.37 20.553C209.37 21.161 209.493 21.6943 209.738 22.153C209.994 22.6116 210.325 22.9636 210.73 23.209C211.146 23.4436 211.584 23.561 212.042 23.561C212.512 23.561 212.949 23.4436 213.354 23.209C213.76 22.9743 214.085 22.633 214.33 22.185C214.586 21.7263 214.714 21.193 214.714 20.585ZM220.774 17.465C221.041 17.017 221.393 16.6703 221.83 16.425C222.278 16.169 222.806 16.041 223.414 16.041V17.929H222.95C222.235 17.929 221.691 18.1103 221.318 18.473C220.955 18.8356 220.774 19.465 220.774 20.361V25.001H218.95V16.185H220.774V17.465ZM229.539 16.041C230.232 16.041 230.851 16.185 231.395 16.473C231.949 16.761 232.381 17.1876 232.691 17.753C233 18.3183 233.155 19.001 233.155 19.801V25.001H231.347V20.073C231.347 19.2836 231.149 18.681 230.755 18.265C230.36 17.8383 229.821 17.625 229.139 17.625C228.456 17.625 227.912 17.8383 227.507 18.265C227.112 18.681 226.915 19.2836 226.915 20.073V25.001H225.091V16.185H226.915V17.193C227.213 16.8303 227.592 16.5476 228.051 16.345C228.52 16.1423 229.016 16.041 229.539 16.041ZM247.414 17.193C247.414 17.7583 247.28 18.2916 247.014 18.793C246.747 19.2943 246.32 19.705 245.734 20.025C245.147 20.3343 244.395 20.489 243.478 20.489H241.462V25.001H239.638V13.881H243.478C244.331 13.881 245.051 14.0303 245.638 14.329C246.235 14.617 246.678 15.0116 246.966 15.513C247.264 16.0143 247.414 16.5743 247.414 17.193ZM243.478 19.001C244.171 19.001 244.688 18.8463 245.03 18.537C245.371 18.217 245.542 17.769 245.542 17.193C245.542 15.977 244.854 15.369 243.478 15.369H241.462V19.001H243.478ZM250.977 23.529H254.737V25.001H249.153V13.881H250.977V23.529ZM264.503 13.881L260.823 20.969V25.001H258.999V20.969L255.303 13.881H257.335L259.911 19.337L262.487 13.881H264.503Z" fill="#D5D5D5" />
    <rect x={275} y="0.000976562" width={170} height={38} rx={8} fill="#9D5CFF" fillOpacity="0.1" />
    <path d="M304.68 13.881L301.384 25.001H299.32L296.984 16.585L294.504 25.001L292.456 25.017L289.304 13.881H291.24L293.544 22.937L296.04 13.881H298.088L300.408 22.889L302.728 13.881H304.68ZM305.576 20.553C305.576 19.6676 305.758 18.8836 306.12 18.201C306.494 17.5183 306.995 16.9903 307.624 16.617C308.264 16.233 308.968 16.041 309.736 16.041C310.43 16.041 311.032 16.1796 311.544 16.457C312.067 16.7236 312.483 17.0596 312.792 17.465V16.185H314.632V25.001H312.792V23.689C312.483 24.105 312.062 24.4516 311.528 24.729C310.995 25.0063 310.387 25.145 309.704 25.145C308.947 25.145 308.254 24.953 307.624 24.569C306.995 24.1743 306.494 23.6303 306.12 22.937C305.758 22.233 305.576 21.4383 305.576 20.553ZM312.792 20.585C312.792 19.977 312.664 19.449 312.408 19.001C312.163 18.553 311.838 18.2116 311.432 17.977C311.027 17.7423 310.59 17.625 310.12 17.625C309.651 17.625 309.214 17.7423 308.808 17.977C308.403 18.201 308.072 18.537 307.816 18.985C307.571 19.4223 307.448 19.945 307.448 20.553C307.448 21.161 307.571 21.6943 307.816 22.153C308.072 22.6116 308.403 22.9636 308.808 23.209C309.224 23.4436 309.662 23.561 310.12 23.561C310.59 23.561 311.027 23.4436 311.432 23.209C311.838 22.9743 312.163 22.633 312.408 22.185C312.664 21.7263 312.792 21.193 312.792 20.585ZM319.156 17.673V22.553C319.156 22.8836 319.231 23.1236 319.38 23.273C319.54 23.4116 319.807 23.481 320.18 23.481H321.3V25.001H319.86C319.039 25.001 318.409 24.809 317.972 24.425C317.535 24.041 317.316 23.417 317.316 22.553V17.673H316.276V16.185H317.316V13.993H319.156V16.185H321.3V17.673H319.156ZM322.373 20.585C322.373 19.6783 322.555 18.8836 322.917 18.201C323.291 17.5076 323.803 16.9743 324.453 16.601C325.104 16.2276 325.851 16.041 326.693 16.041C327.76 16.041 328.64 16.297 329.333 16.809C330.037 17.3103 330.512 18.0303 330.757 18.969H328.789C328.629 18.5316 328.373 18.1903 328.021 17.945C327.669 17.6996 327.227 17.577 326.693 17.577C325.947 17.577 325.349 17.8436 324.901 18.377C324.464 18.8996 324.245 19.6356 324.245 20.585C324.245 21.5343 324.464 22.2756 324.901 22.809C325.349 23.3423 325.947 23.609 326.693 23.609C327.749 23.609 328.448 23.145 328.789 22.217H330.757C330.501 23.113 330.021 23.8276 329.317 24.361C328.613 24.8836 327.739 25.145 326.693 25.145C325.851 25.145 325.104 24.9583 324.453 24.585C323.803 24.201 323.291 23.6676 322.917 22.985C322.555 22.2916 322.373 21.4916 322.373 20.585ZM337.135 16.041C337.807 16.041 338.404 16.185 338.927 16.473C339.46 16.761 339.876 17.1876 340.175 17.753C340.484 18.3183 340.639 19.001 340.639 19.801V25.001H338.831V20.073C338.831 19.2836 338.634 18.681 338.239 18.265C337.844 17.8383 337.306 17.625 336.623 17.625C335.94 17.625 335.396 17.8383 334.991 18.265C334.596 18.681 334.399 19.2836 334.399 20.073V25.001H332.575V13.161H334.399V17.209C334.708 16.8356 335.098 16.5476 335.567 16.345C336.047 16.1423 336.57 16.041 337.135 16.041ZM350.53 23.369L353.026 16.185H354.962L351.602 25.001H349.426L346.082 16.185H348.034L350.53 23.369ZM357.269 15.017C356.938 15.017 356.661 14.905 356.437 14.681C356.213 14.457 356.101 14.1796 356.101 13.849C356.101 13.5183 356.213 13.241 356.437 13.017C356.661 12.793 356.938 12.681 357.269 12.681C357.589 12.681 357.861 12.793 358.085 13.017C358.309 13.241 358.421 13.5183 358.421 13.849C358.421 14.1796 358.309 14.457 358.085 14.681C357.861 14.905 357.589 15.017 357.269 15.017ZM358.165 16.185V25.001H356.341V16.185H358.165ZM359.951 20.553C359.951 19.6676 360.133 18.8836 360.495 18.201C360.869 17.5183 361.37 16.9903 361.999 16.617C362.639 16.233 363.349 16.041 364.127 16.041C364.703 16.041 365.269 16.169 365.823 16.425C366.389 16.6703 366.837 17.001 367.167 17.417V13.161H369.007V25.001H367.167V23.673C366.869 24.0996 366.453 24.4516 365.919 24.729C365.397 25.0063 364.794 25.145 364.111 25.145C363.343 25.145 362.639 24.953 361.999 24.569C361.37 24.1743 360.869 23.6303 360.495 22.937C360.133 22.233 359.951 21.4383 359.951 20.553ZM367.167 20.585C367.167 19.977 367.039 19.449 366.783 19.001C366.538 18.553 366.213 18.2116 365.807 17.977C365.402 17.7423 364.965 17.625 364.495 17.625C364.026 17.625 363.589 17.7423 363.183 17.977C362.778 18.201 362.447 18.537 362.191 18.985C361.946 19.4223 361.823 19.945 361.823 20.553C361.823 21.161 361.946 21.6943 362.191 22.153C362.447 22.6116 362.778 22.9636 363.183 23.209C363.599 23.4436 364.037 23.561 364.495 23.561C364.965 23.561 365.402 23.4436 365.807 23.209C366.213 22.9743 366.538 22.633 366.783 22.185C367.039 21.7263 367.167 21.193 367.167 20.585ZM379.483 20.377C379.483 20.7076 379.462 21.0063 379.419 21.273H372.683C372.736 21.977 372.998 22.5423 373.467 22.969C373.936 23.3956 374.512 23.609 375.195 23.609C376.176 23.609 376.87 23.1983 377.275 22.377H379.243C378.976 23.1876 378.491 23.8543 377.787 24.377C377.094 24.889 376.23 25.145 375.195 25.145C374.352 25.145 373.595 24.9583 372.923 24.585C372.262 24.201 371.739 23.6676 371.355 22.985C370.982 22.2916 370.795 21.4916 370.795 20.585C370.795 19.6783 370.976 18.8836 371.339 18.201C371.712 17.5076 372.23 16.9743 372.891 16.601C373.563 16.2276 374.331 16.041 375.195 16.041C376.027 16.041 376.768 16.2223 377.419 16.585C378.07 16.9476 378.576 17.4596 378.939 18.121C379.302 18.7716 379.483 19.5236 379.483 20.377ZM377.579 19.801C377.568 19.129 377.328 18.5903 376.859 18.185C376.39 17.7796 375.808 17.577 375.115 17.577C374.486 17.577 373.947 17.7796 373.499 18.185C373.051 18.5796 372.784 19.1183 372.699 19.801H377.579ZM385.102 25.145C384.27 25.145 383.518 24.9583 382.846 24.585C382.174 24.201 381.646 23.6676 381.262 22.985C380.878 22.2916 380.686 21.4916 380.686 20.585C380.686 19.689 380.883 18.8943 381.278 18.201C381.673 17.5076 382.211 16.9743 382.894 16.601C383.577 16.2276 384.339 16.041 385.182 16.041C386.025 16.041 386.787 16.2276 387.47 16.601C388.153 16.9743 388.691 17.5076 389.086 18.201C389.481 18.8943 389.678 19.689 389.678 20.585C389.678 21.481 389.475 22.2756 389.07 22.969C388.665 23.6623 388.11 24.201 387.406 24.585C386.713 24.9583 385.945 25.145 385.102 25.145ZM385.102 23.561C385.571 23.561 386.009 23.449 386.414 23.225C386.83 23.001 387.166 22.665 387.422 22.217C387.678 21.769 387.806 21.225 387.806 20.585C387.806 19.945 387.683 19.4063 387.438 18.969C387.193 18.521 386.867 18.185 386.462 17.961C386.057 17.737 385.619 17.625 385.15 17.625C384.681 17.625 384.243 17.737 383.838 17.961C383.443 18.185 383.129 18.521 382.894 18.969C382.659 19.4063 382.542 19.945 382.542 20.585C382.542 21.5343 382.782 22.2703 383.262 22.793C383.753 23.305 384.366 23.561 385.102 23.561Z" fill="#9D5CFF" />
    <circle cx="415.001" cy="19.0008" r="11.9989" fill="#9D5CFF" fillOpacity="0.3" />
    <path d="M419.402 19.6935C419.935 19.3856 419.935 18.6159 419.402 18.308L413.402 14.8439C412.868 14.536 412.202 14.9209 412.202 15.5367V22.4648C412.202 23.0806 412.868 23.4655 413.402 23.1576L419.402 19.6935Z" fill="#9D5CFF" />
  </svg>
  }
    >
     <div className='h-52'></div> 
     </PopUpModal>  
     {showVideoModal && <VideoModal closefn={setShowVideoModal} linkString={'Bh5zuEI4M9o'} />}
     </>
  );
}
