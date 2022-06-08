import '../styles/globals.css';
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps, router }) {
  console.log(pageProps)
  return (
    <AnimatePresence exitBeforeEnter>
      <Component {...pageProps} key={router.route} />
    </AnimatePresence>
    
  )
}

export default MyApp
