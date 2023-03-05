// import '../styles/globals.scss'
// import type { AppProps } from 'next/app'
//
// // export default function App({ Component, pageProps }: AppProps) {
// //   return
// // }
//
// const App = function ({Component, pageProps}: AppProps) {
//   return(
//       <Component {...pageProps} />
//   );
// }
//
// export default wrapper.withRedux(App);

import '../styles/globals.scss'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
