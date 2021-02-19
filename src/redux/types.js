//auth types
export const REGISTER = 'register';
export const LOGIN = 'login';
export const USER_LOADED = 'user_loaded'
export const CHANGE_USERDATA = 'change_user_data';
export const CHANGE_AVATAR = 'change_avatar'
export const CHANGE_LOADED = 'change_loaded'
//auth errors
export const AUTH_ERROR ='auth_error';
/////////////////////////////


//USERES
export const ALL_USERS = 'users';
export const GET_EMPLOYE = 'get_users';
export const CHANGE_PERMISSION = 'change_permission';
export const ONE_USER = 'get_one'

//user errors
export const USER_ERR = 'get_all_users_error'
//search user 
export const SEARCH_USER = 'search_user'
//PROJECTS
export const EDIT_PROJECT = 'edit_project';
export const ALL_PROJECTS = 'all_projects';
export const CREATE_PROJECT = 'create_project';
export const GET_PROJECT = 'get_project';
export const CLEAR_URN = 'clear_urn'
export const SORT_PROJECTS = 'sort_projects' //PROJECTS SORT

export const UPDATE_PROJECT = 'project_updated';
export const PROJECT_ID = 'project_updated';
export const DELETE_PROJECT = 'delete_project'
export const FINISH_PROJECT = 'finish_project'
    //sprints
export const CREATE_SPRINT = "create_sprint";
export const ADD_SPRINT = 'crate_new_sprint';
export const ADD_INFO_SPRINT = 'add_info_sprint'
export const GET_SPRINT = 'get_sprint';
export const ADD_TASKS = 'add_tasks_to_sprint';
export const FINISH_TASK = 'finish_task';
export const EDIT_TASK = 'edit_task';
export const SPRINT_ERROR = 'sprint_error';
export const ALL_SPRINT = 'get_project_sprints'
export const FINISH_SPRINT = 'finish_sprint' 
export const ADD_SPRINT_TO_CHOSEN = 'add_sprint_to_chosen' 
export const DELETE_SPRINT = 'delete_sprint'
//teams
export const JOIN_TEAM = 'join_to_team'
//projects errors
export const CREATE_FAIL= 'error_on_project_create';
//contractors
export const ADD_CONTRACTOR = 'add_contractor';
export const ALL_CONTRACTORS = 'all_contractors';
//news
export const CREATE_NEWS = 'create_news';
export const ALL_NEWS = 'all_news'
export const GET_NEWS = 'get_news'
export const DELETE_NEWS = 'delete_news'
export const UPDATE_NEWS = 'update_news'
export const NEWS_FAIL = 'fail_on_news'


/////SYSTEM ADMIN
export const NEW_TICKET = 'new_ticket';
export const ALL_TICKETS = 'all_tickets';
export const GET_TICKET = 'get_ticket'
export const PERM_RETURN = 'permission_return'

///ERRORS with tickets
export const NEW_ERROR = 'server_error'



//////// proposes

export const NEW_PROPOSE = 'new_propose'
export const LIKED_PROPOSES = 'liked_proposes'
export const DATE_PROPOSES = 'date_proposes'
export const LIKE_PROPOSE = 'like_propose'
export const DELETE_PROPOSE = 'delete_propose'
export const PROPOSE_FAIL = 'propose_fail'
export const IN_WORK = 'in_work'

// departments
export const NEW_DEPARTMENT = 'new_department'
export const ALL_DEPARTMENTS = 'all_departments'
export const FIND_DEPARTMENT = 'find_department'
export const JOIN_DEPARTMENT = 'join_department'
export const LEAVE_DEPARTMENT = 'leave_department'
export const DEPARTMENT_FAIL = 'department_fail'

// msg catch
export const CLEAR_MSG = 'clear_msg_field'
//error handler
export const CLEAR_ERROR = 'clear_error_field'

//REVERSE
export const REVERSE_ARR = 'reverse';
export const REVERSE_ARRDATE = 'revarrdate'



///autodesk forge @ MODELS 
export const GET_TOKEN = 'get_oauth_token'
export const GET_URN = 'get_urn'
export const GET_STATUS = 'loading_status'
export const CLEAR_MODEL_DATA = 'clear_model_data'




///errors

export const ERROR_MSG ='error_msg'