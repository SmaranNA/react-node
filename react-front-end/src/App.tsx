import React from 'react';
import { useRoutes} from 'hookrouter';
import './App.css';

import {Homepage} from './components/Homepage/Homepage';
import {Search} from './components/Search/Search';
import {ArticleFull} from './components/ArticleFull/ArticleFull';
import {NotFoundPage} from './components/NotFoundPage/NotFoundPage';
import { Query } from '@testing-library/dom';

const routes = {
  "/": () => <Homepage />,
  "/search": () => <Search />,
  "/article/:id": ({id,q}: {id?: Query,q?: Query}) => <ArticleFull id={id} q={q}/>
};

function App() {
  const routeResult = useRoutes(routes);
  return (
    <div className="App">
      <nav className="navBar">
        <a className="links" href="/">Home</a>
        <a className="links" href="/search">Search</a>
      </nav>
      {routeResult || <NotFoundPage />}
    </div>
  );
}

export default App;
