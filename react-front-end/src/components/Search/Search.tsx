import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

import './Search.css';
import { Article } from '../Article/Article';



type Inputs = {
  searchTerm: string
};

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
    console.log(input.searchTerm);
    axios.get<Article[]>('http://localhost:3000/api/news/search/',{params:{q: input.searchTerm}})
      .then((res:any) => {
        setSearchResults(res.data.articles);
      })
      .catch((e:any) => {
        console.log(e);
      });
  };

  return (<div className="search">
    <form onSubmit={handleSubmit(getArticles)}>
      <label>Search:</label>
      <input type="textbox" name="searchTerm" className="searchTerm" ref={register}/>
      <input type="submit"/>
    </form>
    {/* {JSON.stringify(currentArticles)} */}
    {searchResults && searchResults.map((article:Article) => (
        <Article source={article.source}  title={article.title} author={article.author} url={article.url} urlToImage={article.urlToImage} publishedAt={article.publishedAt} content={article.content}/>
    ))}
    </div>);
};

