import { combineReducers } from 'redux';
import auth from './auth'
import tickets from './tickets'
import users from './users'
import projects from './projects'
import news from './news'
import models from './models'
import office from './office'


export default combineReducers({
    users,
    auth,
    tickets,
    projects,
    news,
    models,
    office,

});