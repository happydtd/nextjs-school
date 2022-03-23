import '../styles/globals.css'
import {StoreProvider} from '../Utils/Store'

function MyApp({ Component, pageProps }) {
  return(
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  ) 
}

export default MyApp
