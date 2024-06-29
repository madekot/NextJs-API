import type { AppProps } from 'next/app'
import Provider from './Provider';

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <Provider>
            <Component {...pageProps} />
        </Provider>
    );
}

export default App;