import React from 'react';
import ReactHtmlParser from 'react-html-parser';

import './Article.css';

type Article = {
  title: string,
  source: any,
  author: string,
  url: string,
  urlToImage: string,
  publishedAt: string,
  content: string
}

function nl2br(str: string){
  if(str)
    return str.replace(/(?:\\r\\n|\\r|\\n)/g, '<br/>');
  else
    return '';
}

export const Article = ({ title,author,url,urlToImage,publishedAt,content,source }: Article) => 
<article>
    <h3>{title} by <i className="source">{source.name}</i></h3>
    <p className="grey"> Author: {author}<span className="publishedAt">Published On: {publishedAt}</span></p>
    <p> { ReactHtmlParser (nl2br(content)) } </p>
    <img src={urlToImage} alt="Article image" className="responsive"/>
    <p> <a href={url} target="_blank" rel="noopener noreferrer">More info</a></p>
</article>
