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
  const [searchTerm, setSearchTerm] = React.useState([]);

  interface Article {
    title: string,
    source: any,
    author: string,
    url: string,
    urlToImage: string,
    publishedAt: string,
    content: string
  };

  const getArticles = (input:Inputs) => {
    console.log(input.searchTerm);
    axios.get<Article[]>('http://localhost:3000/api/news/search/',{params:{q: input.searchTerm}})
      .then((res:any) => {
        setSearchResults(res.data.articles);
      })
      .catch((e:any) => {
        console.log(e);
      });
  };

  const getSearchTerm = (event:any) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  }

  return (<div className="search">
    <form onSubmit={handleSubmit(getArticles)}>
      <label>Search:</label>
      <input type="textbox" name="searchTerm" className="searchTerm" ref={register} onChange={getSearchTerm}/>
      <input type="submit"/>
    </form>
    {searchResults && searchResults.map((article:Article,index:number) => (
        <a href={'/article/' + (index+1) + '?q=' + searchTerm}>
        <Article key={index} source={article.source}  title={article.title} author={article.author} url={article.url} urlToImage={article.urlToImage} publishedAt={article.publishedAt} content={article.content}/>
        </a>
    ))}
    </div>);
};

