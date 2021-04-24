import axios from 'axios';

export const retrieveArticles = (key) => {
    const apiUrl = `https://newsapi.org/v2/everything?q=${key}&from=2021-04-18&sortBy=popularity&apiKey=55dd9d5616a24baf81d20197e29ea39b`;
    axios.get(apiUrl).then((articles) => {
     return articles.data.status === "ok" ? articles.data.articles : [];
    });
}

export const mockRemoteArticles = () => {
    return [
        {
            title: 'Article 1',
            content: 'Content 1'
        },
        {
            title: 'Article 2',
            content: 'Content 2'
        },
        {
            title: 'Article 3',
            content: 'Content 3'
        }
    ]
}