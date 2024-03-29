
import {ADD_USER_TO_EVENT,CHANGE_CARD_DATE,CHANGE_CARD_EMERGENCY,DELETE_CARD_BACKLOG,CHANGE_CARD_REGULAR,CHANGE_CARD_DEADLINE,ADD_NEW_BOARD,CHANGE_CARD_INFO,ADD_USER_TO_TASK_NEW, ADD_SPRINT,SORT_PROJECTS,SORT_TITLE, SEARCH_OBJECT, ALL_PROJECTS,EDIT_PROJECT, CREATE_FAIL, EDIT_TASK, CREATE_PROJECT, GET_PROJECT, SPRINT_ERROR, ALL_SPRINT, UPDATE_PROJECT, GET_SPRINT, GET_TOKEN, ADD_TASKS, FINISH_TASK, DELETE_PROJECT, FINISH_SPRINT, JOIN_TEAM,FINISH_PROJECT, ADD_INFO_SPRINT, CLEAR_MSG, CLEAR_ERROR, GET_URN, DELETE_SPRINT, CLEAR_URN, CHANGE_DESCRIPTION, ADD_USER_TO_TASK, SEARCH_TAG, ADD_TAG, DELITE_USER, DELITE_TAG, ADD_USER_TO_TEAM, SORT_BY_TAGS, CHANGE_ROCKET, CLEAR_MODEL_DATA, CLEAR_SPRINT, ADD_NEW_CARD, ADD_COMMENT, CHANGE_CARD,COMMON_KANBAN_RELOAD, MOVE_CARD,ADD_TAG_CARD, DELETE_CARD, REMOVE_TAG_CARD, LOAD_BOARD, UNEXPIRED, CLEAR_BOARD, RENAME_BOARD, LIKE_CARD, KANBAN_MONITORING, ADD_CUSTOM_FIELD} from '../types'



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
    hey:'', 
    tagSearch:[],
    modelLoaded: false,
    objectList:[],
    newUrn: null,
    backlog:[],
    comments:[],
    card:null,
    kanban: null,
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
                case ADD_CUSTOM_FIELD: 
                    return {
                        project:payload
                    }
                case ADD_USER_TO_EVENT: 
                    return {
                         ...state,
                        card:payload,
                    }
                case CHANGE_CARD_DATE:
                    return {
                        ...state,
                        card:payload,
                    }
                case CHANGE_CARD_DEADLINE:
                    return {
                        ...state,
                        card:payload,
                    }
                    
                case LIKE_CARD: 
                    return {
                        ...state,
                        // card:payload,
                    }
                case CHANGE_CARD_EMERGENCY:
                    return {
                        ...state,
                        card:payload,
                    }
                case ADD_NEW_BOARD:
                    return {
                        ...state,
                        project:payload,
                    }
                case RENAME_BOARD:
                    return {
                        ...state,
                        project:payload.project,
                        kanban: payload.board
                    }
                case  DELETE_CARD_BACKLOG: 
                        return {
                            ...state,
                            backlog:payload.backlog,
                            card:null
                    }
                case DELETE_CARD:

                         return {
                        ...state,
                        backlog:payload.backlog,
                        kanban:payload.board,
                        card:null
                    }
                case ADD_TAG_CARD:
                return {
                    ...state,
                    card: payload,
                }
                case REMOVE_TAG_CARD:
                return {
                    ...state,
                    card: payload,
                }
                case ADD_USER_TO_TASK_NEW: 
                    return {
                        ...state,
                        card: payload,
                    }
                case ADD_COMMENT:
                    return {
                        ...state,
                        comments: payload,
                    };
                case CHANGE_CARD_REGULAR:
                    return {
                        ...state,
                        card:payload,
                    };
                case CHANGE_CARD_INFO:
                    return {
                        ...state,
                        card:payload,
                    };
                case CHANGE_CARD:
                    return {
                        ...state,
                        card:payload,
                        comments: payload.comments
                    };
                case ADD_NEW_CARD:
                      return {
                        ...state,
                        backlog: payload,
                      };
                case SEARCH_OBJECT: 
                    // console.log(payload)
                    return {
                        ...state,
                        objectList: payload
                    }
                case SORT_TITLE:
                    return {
                        ...state,
                        projects: payload,
                        
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
                case CHANGE_ROCKET:
                    return {
                        ...state,
                        
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
                case DELITE_TAG:
                    return {
                        ...state,
                        sprint: payload.sprint
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
                case ADD_USER_TO_TEAM:
                    return {
                        ...state,
                        project: payload,
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
                        project: payload,
                        // msg: payload.msg
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
                    backlog: payload.backlog,
                    
                }
            case SORT_BY_TAGS:
                return {
                    ...state,
                    project: payload
                }
            case ADD_SPRINT:
                // console.log(payload)
                return {
                    ...state,
                    sprint: payload.sprint,
                    sprint_load: true,
                    loadProject: true,
                    reload: true,
                    error: '',
                    // sprint_msg:payload.msg,
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
                    sprint: [],
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
            case CLEAR_SPRINT:
                return {
                    ...state,
                    sprint: []
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
                    msg: payload.msg,
                    project: payload.project,
                    newUrn: payload.urn,
                    modelLoaded: true,
                }
            case CLEAR_MODEL_DATA:
                return {
                    ...state,
                    modelLoaded: false
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
                    project: payload.project,
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
            case COMMON_KANBAN_RELOAD: 
                return {
                    ...state,
                    kanban: payload
                    
                }
            case UNEXPIRED: 
                return {
                    ...state,
                    kanban: payload.board
                    
                }
            case LOAD_BOARD: 
                return {
                    ...state,
                    kanban: payload.board,
                    backlog:payload.backlog
                }
            case MOVE_CARD: 
                return {
                    ...state,
                    kanban: payload.board,
                    backlog: payload.backlog,
                }
            case CLEAR_BOARD: 
                return {
                    ...state,
                    kanban: null,
                    backlog: null,
                }
            case KANBAN_MONITORING:
                console.log('KANBAN_MONITORING',payload)
                return {
                    ...state,
                    kanban: payload.board,
                    backlog: payload.backlog,
                }
            
            default: 
                return state;
    }

} 
