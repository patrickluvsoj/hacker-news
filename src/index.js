import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import HackerNav from './pages/HackerNav';
import NewsList from './pages/NewsList';
import NoPage from './pages/NoPage';

import './index.css';

export default function App() {
  return(
    <div className={"container mx-auto max-w-2xl"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HackerNav />}>
              <Route index element={<NewsList selected={"topstories"}/>} />
              <Route path="new" element={<NewsList selected={"newstories"}/>} />
              <Route path="best" element={<NewsList selected={"beststories"}/>} />
              <Route path="bookmark" element={<NewsList selected={"bookmark"}/>} />
              <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
)
}


ReactDOM.render(
  <App />, document.getElementById('root')
);

