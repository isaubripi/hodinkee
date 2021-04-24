/* eslint-disable no-unused-expressions */
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
                    <div>{props.name}</div>
                    <div>{props.content}</div>
                </div>
                <div className="imageContainer">
                    image goes here
                </div>
            </div>
            <button onClick={()=>editArticle(props.id)}>Edit</button>
            <button onClick={()=>deleteArticle(props.id)}>Delete</button>
        </div>
    )
}

export default Post;