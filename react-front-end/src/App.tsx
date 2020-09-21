import React from 'react';
import { useRoutes} from 'hookrouter';
import './App.css';

import {Homepage} from './components/Homepage/Homepage';
import {Search} from './components/Search/Search';
import {Article} from './components/Article/Article';
import {NotFoundPage} from './components/NotFoundPage/NotFoundPage';
import { Query } from '@testing-library/dom';

let source = {
  id: null,
  name: 'Cointelegraph'
};
const routes = {
  "/": () => <Homepage />,
  "/search": () => <Search />,
  '/article/:number': ({id}: {id?: Query}) => <Article id={id} title="Bitcoin price volatility expected as 47% of BTC options expire next Friday" author="Cointelegraph By Marcel Pechman" url="https://cointelegraph.com/news/bitcoin-price-volatility-expected-as-47-of-btc-options-expire-next-friday" urlToImage="https://s3.cointelegraph.com/storage/uploads/view/1bbb929925f2481af8382bfbb5ae9c43.jpg" publishedAt="2020-09-20T01:15:00Z" content="The open interest on Bitcoin (BTC) options is just 5% short of their all-time high, but nearly half of this amount will be terminated in the upcoming September expiry. \r\nAlthough the current $1.9 bil… [+4162 chars]" source={source}/>
};

function App() {
  const routeResult = useRoutes(routes);
  return (
    <div className="App">
      <nav>
        <a href="/">Home</a> |
        <a href="/search">Search</a>
      </nav>
      {routeResult || <NotFoundPage />}
    </div>
  );
}

export default App;
