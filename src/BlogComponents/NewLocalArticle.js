import React, { useContext, useState } from 'react';
import ImageUploader from 'react-images-upload';
import '../App.css';
import {Context} from '../Store';

const NewLocalArticle = () => {
    const [state, setState] = useContext(Context); 

    const [localState, setLocalState] = useState({
        title: '',
        content: '',
        image: null
    }) 

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

    const createArticle = () => {
        let newGlobalState = {...state};
        let newArticle = {
            title: localState.title,
            content: localState.content,
            image: localState.image
        }
        newGlobalState.localArticles.push(newArticle);
        setState(newGlobalState);
        console.log(state)
        localStorage.setItem("localArticles",JSON.stringify(state.localArticles));
    }

    let showModal = state.newLocalArticleOpen;
    return (
        <div className={"subModal" + (showModal ? " subModal_oppened" : "")}>
            <div className="subModal__box">
                <p className="subModal__close" onClick={closeModal}></p>
                <div className="subModal__content">
                    <label>Title</label>
                    <input id="title" type="text" onChange={(e)=>handleChange(e)} value={localState.title} />
                    <label>Content</label>
                    <textarea id="content" onChange={(e)=>handleChange(e)} value={localState.content} />
                    {/* <ImageUploader
                        withIcon={true}
                        buttonText='Choose images'
                        onChange={onChangeImage}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                    /> */}
                    <label>Image</label>
                    <input id="image" type="file" onChange={(e)=>onChangeImage(e)} value={localState.image} />
                </div>
                <button onClick={createArticle}>Create</button>
            </div>
        </div>
    )
}

export default NewLocalArticle;