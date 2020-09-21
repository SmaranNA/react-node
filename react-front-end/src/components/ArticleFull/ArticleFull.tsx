import { Query } from '@testing-library/dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Article } from '../Article/Article';
import './ArticleFull.css';

export const ArticleFull = (props: any) => {

  interface Article {
    title: string,
    source: any,
    author: string,
    url: string,
    urlToImage: string,
    publishedAt: string,
    content: string
  };

  const [currentArticle, setCurrentArticle] = useState<Article>();

  const getArticle = (input: any) => {
    axios.get<Article>('http://localhost:3000/api/news/article/' + input.id,{params:{q: input.q, page: input.page}})
      .then((res:any) => {
        setCurrentArticle(res.data);
      })
      .catch((e:any) => {
        console.log(e);
      });
  };

  useEffect(() => {
    const paths = window.location.pathname.split('/');
    const id = paths.pop();
    const params = new URLSearchParams(window.location.search)
    const q = params.get('q');
    const page = params.get('page');
    const input = {
      q: q,
      id: id,
      page: page? page: 1
    };
    
    getArticle(input);
  }, [props.article]);

  return (<div className="ArticleFull">
    {currentArticle && <Article source={currentArticle.source}  title={currentArticle.title} author={currentArticle.author} url={currentArticle.url} urlToImage={currentArticle.urlToImage} publishedAt={currentArticle.publishedAt} content={currentArticle.content}/>}
    </div>);

};