import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HackerNews from './pages/HackerNews';
import NewsList from './pages/NewsList';
import NoPage from './pages/NoPage';

import './index.css';

export default function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HackerNews />}>
            <Route index path="top" element={<NewsList selected={"topstories"}/>} />
            <Route path="new" element={<NewsList selected={"newstories"}/>} />
            <Route path="best" element={<NewsList selected={"beststories"}/>} />
            <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}


ReactDOM.render(
  <App />, document.getElementById('root')
);

