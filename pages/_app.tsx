import '../styles/globals.css'
//import {StoreProvider} from '../Utils/Store'
import {store} from '../Store/configureStore'
import {Provider} from 'react-redux'


function MyApp({ Component, pageProps }) {
  return(
    //<StoreProvider>
      <Provider store = {store}>
        <Component {...pageProps} />
      </Provider>
    //</StoreProvider>
  ) 
}

export default MyApp
