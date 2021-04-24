import React, { useEffect, useContext } from 'react';
import './App.css';
import {Context} from './Store';
import { retrieveArticles } from '../src/APICallers/APICaller';
import Header from './BlogComponents/Header';
import Post from './BlogComponents/Post';
import NewLocalArticle from './BlogComponents/NewLocalArticle';

function App() {

  const [state, setState] = useContext(Context);

  useEffect(() => {
    let articles = retrieveArticles('watches');

    let newGlobalState = {...state};
    newGlobalState.remoteArticles = articles ? articles : [];
    setState(newGlobalState);
    console.log(state);
 }, []);


 const openModal = () => {
   let newGlobalState = {...state};
   newGlobalState.newLocalArticleOpen = true;
   setState(newGlobalState);
 }

 let articlesToShow = state.currentPage === "local" ? state.localArticles : state.remoteArticles;

  return (
    <div className="App">
      <NewLocalArticle/>
      <Header/>
      <div>
          <button className="newAticle_button" onClick={openModal}>New Article</button>
      </div>
      <div className="articles">
      {
        articlesToShow.map((article) => {
          return (
            <Post name={article.name} content={article.content} id={article.id}/>
          )
        })
      }
      </div>
      
    </div>
  );
}

export default App;
