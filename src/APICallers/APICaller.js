import axios from 'axios';

export const retrieveArticles = (key) => {
    const apiUrl = `https://newsapi.org/v2/everything?q=${key}&from=2021-04-18&sortBy=popularity&apiKey=55dd9d5616a24baf81d20197e29ea39b`;
    //let allArticles = [];
    axios.get(apiUrl).then((articles) => {
     return articles.data.articles ? articles.data.articles : [];
    });
    //return allArticles;
}