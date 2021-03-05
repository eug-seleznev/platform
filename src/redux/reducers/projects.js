
import { ADD_SPRINT,SORT_PROJECTS, ALL_PROJECTS,EDIT_PROJECT, CREATE_FAIL, EDIT_TASK, CREATE_PROJECT, GET_PROJECT, SPRINT_ERROR, ALL_SPRINT, UPDATE_PROJECT, GET_SPRINT, GET_TOKEN, ADD_TASKS, FINISH_TASK, DELETE_PROJECT, FINISH_SPRINT, JOIN_TEAM,ADD_SPRINT_TO_CHOSEN,FINISH_PROJECT, ADD_INFO_SPRINT, CLEAR_MSG, CLEAR_ERROR, GET_URN, DELETE_SPRINT, CLEAR_URN, CHANGE_DESCRIPTION, ADD_USER_TO_TASK, SEARCH_TAG, ADD_TAG, DELITE_USER } from '../types'



const initialState = {
    projects: null,
    project: {},
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
    hey:'', 
    tagSearch:[]
}

export default function(state = initialState, action) {
    const {
        type, payload
    } = action;

    switch(type){
       

            case ALL_PROJECTS:
            case SORT_PROJECTS:
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
                case SEARCH_TAG:
                        return {
                            ...state,
                            tagSearch:payload
                        }
                case DELITE_USER:
                    return {
                        ...state,
                        project: payload
                    }
                case EDIT_TASK: 
                    return {
                        ...state,
                        sprint: payload.sprint
                    }
                case CHANGE_DESCRIPTION:
                    return {
                        ...state,
                        sprint: payload 
                    }
                case CLEAR_MSG:
                    return {
                        ...state,
                        msg:'',
                        sprint_msg:'',
                        hey:''
                    }
                case ADD_USER_TO_TASK:
                    return {
                        ...state,
                        sprint: payload
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
                // console.log(payload)
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
                case CLEAR_URN: 
                    return {
                        ...state,
                        oauth: null
                    }
                case DELETE_SPRINT:
                    return {
                        ...state,
                        test: payload
                    }
                case ADD_TASKS:
                return {
                    ...state,
                    tasks: payload,
                    sprint: payload,
                    error: '',
                    msg:payload.msg
                }
                case JOIN_TEAM:
                    return {
                        ...state,
                        project: payload.project,
                        msg: payload.msg,
                        error: '',
                        reload:true
                     
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
            case ADD_TAG:
                    return {
                    ...state,
                    sprint: payload
                } 
                case FINISH_TASK:
                    return {
                    ...state,
                    hey: payload.msg,
                    sprint: payload.sprint
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
