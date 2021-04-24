import { retrieveArticles } from '../src/APICallers/APICaller';

export const initialState = {
    currentPage: 'local',
    remoteArticles : [],
    localArticles: [],
    newLocalArticleOpen: false,
    initialID : 1,
    currentLocalArticle: 0,
    mode: 'CREATE'
}