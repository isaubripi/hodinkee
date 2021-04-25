import React, { useEffect, useContext } from 'react';
import './App.css';
import {Context} from './Store';
import { retrieveArticles, mockRemoteArticles } from '../src/APICallers/APICaller';
import Header from './BlogComponents/Header';
import Post from './BlogComponents/Post';
import NewLocalArticle from './BlogComponents/NewLocalArticle';

function App() {

  const [state, setState] = useContext(Context);

  useEffect(() => {
    //let articles = retrieveArticles('watches');
    let articles = mockRemoteArticles();
    console.log(articles);
    let newGlobalState = {...state};
    newGlobalState.remoteArticles = articles ? articles : [];
    setState(newGlobalState);
    console.log(state);
 },[]);


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
        { state.currentPage === "local" ? <button className="hodinkee_button" onClick={openModal}>New Article</button> : ""}   
      </div>
      {
        articlesToShow.length ? <div className="articles">
        { 
          articlesToShow.map((article) => {
            return (
              <Post 
              title={article.title} 
              content={article.content} 
              id={article.id} 
              image={article.image}
              preview={article.previewUrl}/>
            )
          })
        }
        </div> : <div className="articles">No Articles to show</div>
      }
    </div>
  );
}

export default App;
