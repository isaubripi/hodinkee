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
    //console.log(articles);
    
    let newGlobalState = {...state};
    newGlobalState.remoteArticles = articles ? articles : [];
    setState(newGlobalState);
    console.log(state);
 }, []);


 const openModal = () => {
   console.log('opening')
   let newGlobalState = {...state};
   newGlobalState.newLocalArticleOpen = true;
   setState(newGlobalState);
 }

  return (
    <div className="App">
      <NewLocalArticle/>
      <Header/>
      <div>
          <button className="newAticle_button" onClick={openModal}>New Article</button>
      </div>
      {
        state.remoteArticles && state.remoteArticles.map((article) => {
          <Post name={''} content={article.content}/>
        })
      }
    </div>
  );
}

export default App;
