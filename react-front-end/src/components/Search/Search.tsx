import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

import './Search.css';
import { Article } from '../Article/Article';



type Inputs = {
  searchTerm: string
};
// export const Search = ({}) => <div>
//     <form>
//         <label>Search:</label>
//         <input type="textbox" name="q" />
//         <input type="submit"/>
//     </form>
// <Article title="Bitcoin price volatility expected as 47% of BTC options expire next Friday" author="Cointelegraph By Marcel Pechman" url="https://cointelegraph.com/news/bitcoin-price-volatility-expected-as-47-of-btc-options-expire-next-friday" urlToImage="https://s3.cointelegraph.com/storage/uploads/view/1bbb929925f2481af8382bfbb5ae9c43.jpg" publishedAt="2020-09-20T01:15:00Z" content="The open interest on Bitcoin (BTC) options is just 5% short of their all-time high, but nearly half of this amount will be terminated in the upcoming September expiry. \r\nAlthough the current $1.9 bil… [+4162 chars]" source={source} />
// <Article title="Bitcoin price volatility expected as 47% of BTC options expire next Friday" author="Cointelegraph By Marcel Pechman" url="https://cointelegraph.com/news/bitcoin-price-volatility-expected-as-47-of-btc-options-expire-next-friday" urlToImage="https://s3.cointelegraph.com/storage/uploads/view/1bbb929925f2481af8382bfbb5ae9c43.jpg" publishedAt="2020-09-20T01:15:00Z" content="The open interest on Bitcoin (BTC) options is just 5% short of their all-time high, but nearly half of this amount will be terminated in the upcoming September expiry. \r\nAlthough the current $1.9 bil… [+4162 chars]" source={source} />
// <Article title="Bitcoin price volatility expected as 47% of BTC options expire next Friday" author="Cointelegraph By Marcel Pechman" url="https://cointelegraph.com/news/bitcoin-price-volatility-expected-as-47-of-btc-options-expire-next-friday" urlToImage="https://s3.cointelegraph.com/storage/uploads/view/1bbb929925f2481af8382bfbb5ae9c43.jpg" publishedAt="2020-09-20T01:15:00Z" content="The open interest on Bitcoin (BTC) options is just 5% short of their all-time high, but nearly half of this amount will be terminated in the upcoming September expiry. \r\nAlthough the current $1.9 bil… [+4162 chars]" source={source} />
// </div>
export const Search = (props:any) => {
  const {register, handleSubmit} = useForm<Inputs>();
  const [searchResults, setSearchResults] = React.useState([]);

  interface Article {
    title: string,
    source: any,
    author: string,
    url: string,
    urlToImage: string,
    publishedAt: string,
    content: string
  };

  const getArticles = (input:any) => {
    console.log(input);
    axios.get<Article[]>('http://localhost:3000/api/news/search/',{params:{q: input.searchTerm}})
      .then((res:any) => {
        setSearchResults(res.data.articles);
      })
      .catch((e:any) => {
        console.log(e);
      });
  };

  return (<div>
    <form onSubmit={handleSubmit(getArticles)}>
      <label>Search:</label>
      <input type="textbox" name="searchTerm" ref={register}/>
      <input type="submit"/>
    </form>
    {/* {JSON.stringify(currentArticles)} */}
    {searchResults && searchResults.map((article:Article) => (
        <Article source={article.source}  title={article.title} author={article.author} url={article.url} urlToImage={article.urlToImage} publishedAt={article.publishedAt} content={article.content}/>
    ))}
    </div>);
};

