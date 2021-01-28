
import { ADD_SPRINT, ALL_PROJECTS,EDIT_PROJECT, CREATE_FAIL,CREATE_PROJECT, GET_PROJECT, SPRINT_ERROR, ALL_SPRINT, UPDATE_PROJECT, GET_SPRINT, ADD_TASKS, FINISH_TASK, DELETE_PROJECT, FINISH_SPRINT, JOIN_TEAM,ADD_SPRINT_TO_CHOSEN,FINISH_PROJECT, ADD_INFO_SPRINT } from '../types'



const initialState = {
    projects: null,
    project: null,
    loadProject: false,
    loadedAllProj: false,
    sprints: [],
    loadSprints: false,
    sprint: [],
    tasks: [],
    tasksLoad: false,
    error: '',
    reload: false,
    trick: false,
    sprintLoad: false,
    msg:'',
    sprint_msg:'',
}

export default function(state = initialState, action) {
    const {
        type, payload
    } = action;

    switch(type){
       

            case ALL_PROJECTS:
                return {
                    ...state,
                    loadedAllProj: true,
                    projects: payload,
                    loadProject: false,
                    sprint_load: false,
                    sprintLoad: false,
                    sprints: [],
                    trick: false,

                    error: ''
                }
                case CREATE_PROJECT:
                return {
                    ...state,
                    project: payload,
                    loadedAllProj: false,
                    loadProject: true,
                    sprint_load: false,
                    sprintLoad: false,
                    reload: false,
                    error: '',
                    msg: payload.msg
                }
                case EDIT_PROJECT:
                    return {
                        ...state,
                        loadProject: false,
                     
                    }
            case GET_PROJECT:
                return {
                    ...state,
                    project: payload,
                    loadedAllProj: false,
                    loadProject: true,
                    sprint_load: false,
                    sprintLoad: false,
                    reload: false,
                    error: ''
                }
            case ADD_SPRINT:
                return {
                    ...state,
                    sprint: payload,
                    sprint_load: true,
                    loadProject: false,
                    reload: true,
                    error: '',
                    sprint_msg:payload.msg,
                }
            case ADD_INFO_SPRINT: 
                return {
                    ...state,
                    sprint: payload,
                    sprintLoad: false,
                }
                case ADD_TASKS:
                return {
                    ...state,
                    tasks: payload,
                    error: ''
                }
                case JOIN_TEAM:
                    return {
                        ...state,
                        project: payload,
                        msg: payload.msg,
                        error: ''
                    }
            case ALL_SPRINT:
                return {
                    ...state,
                    sprints: payload,
                    trick: true,
                    loadSprints: true,
                    sprintLoad: false,
                    sprint: null,
                    error: ''
                }
            case GET_SPRINT:
                return {
                    ...state,
                    sprint: payload,
                    reload: false,
                    loadProject: false,
                    sprintLoad: true,
                    loadSprints: true,
                    error: ''
                }
            case UPDATE_PROJECT:
                return {
                    ...state,
                    loadedAllProj: true,
                    project: payload,
                    error: ''
                }
                case FINISH_PROJECT:
                    return {
                        ...state,
                        msg: payload,
                        loadedAllProj: false,
                    }
            case FINISH_SPRINT:
                return {
                    ...state,
                    msg: payload,
                    error: ''
                }
                // case ADD_SPRINT_TO_CHOSEN:
                //     return {
                //         ...state,
                    
                //         msg: payload
                //     }
            case CREATE_FAIL:
                return {
                    ...state,
                    error: payload,
                    loadProject: false,
                    loadedAllProj: false
                }
                case FINISH_TASK:
                    return {
                    ...state,
                    hey: payload
                }   
            case SPRINT_ERROR:
                return {
                    ...state,
                    error: payload,
                    loadProject: false,
                    loadedAllProj: false
                }
            case DELETE_PROJECT: 
                return {
                    ...state,
                    msg: payload
                }


            
            default: 
                return state;
    }

} 
