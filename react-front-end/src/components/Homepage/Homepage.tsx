import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Homepage.css';
import { Article } from '../Article/Article';

export const Homepage = (props:any) => {

  interface Article {
    title: string,
    source: any,
    author: string,
    url: string,
    urlToImage: string,
    publishedAt: string,
    content: string
  };

  const [currentArticles, setCurrentArticles] = useState([]);

  const getArticles = () => {
    axios.get<Article[]>('http://localhost:3000/api/news/')
      .then((res:any) => {
        setCurrentArticles(res.data.articles);
      })
      .catch((e:any) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getArticles();
  }, [props.articles]);

  return (<div className="home">
    {/* {JSON.stringify(currentArticles)} */}
    {currentArticles && currentArticles.map((article:Article,index:number) => (
        <Article key={index} source={article.source}  title={article.title} author={article.author} url={article.url} urlToImage={article.urlToImage} publishedAt={article.publishedAt} content={article.content}/>
    ))}
    </div>);
};
