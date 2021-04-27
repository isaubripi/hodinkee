import React, { useEffect, useContext } from 'react';
import './App.css';
import {Context} from './Store';
import { retrieveArticles, mockRemoteArticles } from '../src/APICallers/APICaller';
import Header from './BlogComponents/Header';
import Post from './BlogComponents/Post';
import NewLocalArticle from './BlogComponents/NewLocalArticle';

function App() {

  const [state, setState] = useContext(Context);

  useEffect(() => { //to get Remote Articles
    if(state.currentPage === "remote")
      retrieveArticles('watches', state, setState);
 },[state.currentPage]);


 useEffect(() => { //to get Local Articles, from store (if exists)
    let localArticles = JSON.parse(localStorage.getItem("localArticles")) ? JSON.parse(localStorage.getItem("localArticles")) : [];
    localArticles.sort((a, b) => (a.id > b.id) ? 1 : -1);
    if(localArticles.length && state.currentPage === "local"){
      let newGlobalState = {...state};
      newGlobalState.localArticles = localArticles;
      newGlobalState.initialID = localArticles[localArticles.length-1].id;
      setState(newGlobalState)
    }
 },[state.currentPage]);

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
