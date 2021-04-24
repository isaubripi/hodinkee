import React, { useContext, useState, useEffect } from 'react';
import ImageUploader from 'react-images-upload';
import '../App.css';
import {Context} from '../Store';

const NewLocalArticle = () => {
    const [state, setState] = useContext(Context); 

    const [localState, setLocalState] = useState({
        title: '',
        content: '',
        image: null,
        id: ''
    })

    const loadArticleData = (id) => {
        state.localArticles.map((article)=> {
            if(article.id === id){
                let newLocalState = {...localState};
                newLocalState.title = article.title;
                newLocalState.content = article.content;
                newLocalState.image = article.image;
                setLocalState(newLocalState);
            }
        })
    }
    
    useEffect(() => {
        if(state.mode === 'EDIT')
            loadArticleData(state.currentLocalArticle);
     }, [state.mode]);

    const closeModal = () => {
        let newGlobalState = {...state};
        newGlobalState.newLocalArticleOpen = false;
        setState(newGlobalState);
    }

    const handleChange = (e) => {
        let newLocalState = {...localState}
        newLocalState[e.target.id] = e.target.value
        setLocalState(newLocalState);
        console.log(localState);
    }

    const onChangeImage = (e) => {
        let newLocalState = {...localState}
        newLocalState.image = e.target.files[0]
        setLocalState(newLocalState);
        console.log(localState);
    }

    const cleanForm = () => {
        let newLocalState = {...localState};
        newLocalState.title = '';
        newLocalState.content = '';
        newLocalState.image = null;
        setLocalState(newLocalState);
    }

    const createArticle = () => {
        let newGlobalState = {...state};
        let newArticle = {
            title: localState.title,
            content: localState.content,
            image: localState.image,
            id: state.initialID + 1
        }
        newGlobalState.localArticles.push(newArticle);
        newGlobalState.newLocalArticleOpen = false;
        newGlobalState.initialID = newGlobalState.initialID + 1;
        setState(newGlobalState);
        console.log(state)
        localStorage.setItem("localArticles",JSON.stringify(state.localArticles));
        cleanForm();
    }

    const updateArticle = () => {
        let newGlobalState = {...state};
        newGlobalState.localArticles.map((article)=>{
            if(article.id === state.currentLocalArticle)
            {
                article.title = localState.title;
                article.content = localState.content;
                article.image =  localState.image;
            }
        });
        newGlobalState.newLocalArticleOpen = false;
        newGlobalState.mode = 'CREATE';
        setState(newGlobalState);
        localStorage.setItem("localArticles",JSON.stringify(state.localArticles));
        cleanForm();
    }

    let showModal = state.newLocalArticleOpen;
    return (
        <div className={"subModal" + (showModal ? " subModal_oppened" : "")}>
            <div className="subModal__box">
                <p className="subModal__close" onClick={closeModal}></p>
                <div className="subModal__content">
                    <label className="hodinkee_label">Title</label>
                    <input id="title" type="text" onChange={(e)=>handleChange(e)} value={localState.title} />
                    <label className="hodinkee_label">Content</label>
                    <textarea id="content" onChange={(e)=>handleChange(e)} value={localState.content} />
                    {/* <ImageUploader
                        withIcon={true}
                        buttonText='Choose images'
                        onChange={onChangeImage}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                    /> */}
                    <label className="hodinkee_label">Image</label>
                    <input id="image" type="file" onChange={(e)=>onChangeImage(e)} value={localState.image} />
                </div>
                {
                    state.mode === "CREATE" ? <button className="hodinkee_button_form" onClick={createArticle}>Create</button> : <button className="hodinkee_button_form" onClick={updateArticle}>Update</button>
                }
            </div>
        </div>
    )
}

export default NewLocalArticle;