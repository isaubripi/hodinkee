
import React, { useContext, useEffect,useState } from 'react';
import {Context} from '../Store';
import {base64ImageToBlob} from '../Helpers/Helpers'

const Post = (props) => {
    const [state, setState] = useContext(Context);
    const [localState, setLocalState] = useState({
        imagePreview: null
    })

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
        localStorage.setItem("localArticles",JSON.stringify(newGlobalState.localArticles));
    }

    const generatePreview = () => {
        let reader = new FileReader();
        const file = base64ImageToBlob(props.image);
    
        reader.onloadend = () => {
            let newLocalState = {...localState}
            newLocalState.imagePreview = reader.result;
            setLocalState(newLocalState);
        }
        reader.readAsDataURL(file)
      }

    useEffect(() => {
        if(state.currentPage === "local" && state.localArticles)
            generatePreview(); 
     },[state.mode, state.localArticles]);

    return (
        <div className="postContainer">
            <div className="contentContainer">
                <div className="textContainer">
                    <h1 className="hodinkee_article_content">{props.title}</h1>
                    <div className="hodinkee_article_content">{props.content}</div>
                </div>
                <div className={ state.currentPage === "local" ? "imageContainer" : "display-none"}>
                    <img className="image" src={localState.imagePreview} alt=""/>
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