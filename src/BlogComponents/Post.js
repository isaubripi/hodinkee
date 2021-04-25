
import React, { useContext } from 'react';
import {Context} from '../Store';

const Post = (props) => {
    const [state, setState] = useContext(Context);

    const editArticle = (id) => {
        let newGlobalState = {...state};
        newGlobalState.currentLocalArticle = id;
        newGlobalState.newLocalArticleOpen = true;
        newGlobalState.mode = 'EDIT';
        setState(newGlobalState);
    }

    const deleteArticle = (id) => {
        let newGlobalState = {...state};
        newGlobalState.localArticles = newGlobalState.localArticles.filter((article)=>{
            return article.id !== id;
        })
        setState(newGlobalState);
    }

    return (
        <div className="postContainer">
            <div className="contentContainer">
                <div className="textContainer">
                    <h1 className="hodinkee_article_content">{props.title}</h1>
                    <div className="hodinkee_article_content">{props.content}</div>
                </div>
                <div className={ state.currentPage === "local" ? "imageContainer" : "display-none"}>
                    <img className="image" src={props.preview} alt=""/>
                </div>
            </div>
            {
                state.currentPage === "local" ? 
                <>
                <button className="hodinkee_button_form" onClick={()=>editArticle(props.id)}>Edit</button>
                <button className="hodinkee_button_form" onClick={()=>deleteArticle(props.id)}>Delete</button> 
                </>: ""
            }
            
        </div>
    )
}

export default Post;