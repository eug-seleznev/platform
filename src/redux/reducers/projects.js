
import { ADD_SPRINT, ALL_PROJECTS,EDIT_PROJECT, CREATE_FAIL,CREATE_PROJECT, GET_PROJECT, SPRINT_ERROR, ALL_SPRINT, UPDATE_PROJECT, GET_SPRINT, GET_TOKEN, ADD_TASKS, FINISH_TASK, DELETE_PROJECT, FINISH_SPRINT, JOIN_TEAM,ADD_SPRINT_TO_CHOSEN,FINISH_PROJECT, ADD_INFO_SPRINT, CLEAR_MSG, CLEAR_ERROR, GET_URN } from '../types'



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
    outh: null,
    msg:'',
    sprint_msg:'',
    hey:''
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
                    // project: payload,
                    loadedAllProj: false,
                    loadProject: true,
                    sprint_load: false,
                    sprintLoad: false,
                    reload: true,
                    error: '',
                    msg: payload.msg
                }
                case CLEAR_ERROR:
                    return {
                        ...state,
                       error:''
                       
                    }
                case CLEAR_MSG:
                    return {
                        ...state,
                        msg:'',
                        sprint_msg:'',
                        hey:''
                    }
                case EDIT_PROJECT:
                    return {
                        ...state,
                        loadProject: false,
                        msg: payload.msg
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
                console.log(payload)
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

                case GET_TOKEN:
                    return {
                        ...state,
                        oauth: payload
                    }
                case ADD_TASKS:
                return {
                    ...state,
                    tasks: payload,
                    error: '',
                    msg:payload.msg
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
                    project: payload.sprint,
                    error: ''
                }
            case GET_URN:
                return {
                    ...state,
                    project: payload.project,
                    msg: payload.msg
                }
                case FINISH_PROJECT:
                    return {
                        ...state,
                        msg: payload.msg,
                        loadedAllProj: false,
                    }
            case FINISH_SPRINT:
                return {
                    ...state,
                    msg: payload.msg,
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
                    // loadProject: false,
                    // loadedAllProj: false
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
                    loadedAllProj: false,
                    msg: payload.msg
                }


            
            default: 
                return state;
    }

} 
