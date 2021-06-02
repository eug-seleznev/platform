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

//kanban
export const CHANGE_CARD_INFO='CHANGE_CARD_INFO'
export const ADD_NEW_BOARD ='ADD_NEW_BOARD'
export const ADD_NEW_ROW ='ADD_NEW_ROW'
export const ADD_NEW_COLUMN ='ADD_NEW_COLUMN'
export const ADD_NEW_CARD ='ADD_NEW_CARD'
export const MOVE_CARD ='MOVE_CARD'
export const CHANGE_CARD_TITLE ='CHANGE_CARD_TITLE'
export const CHANGE_CARD_DESCRIPTION ='CHANGE_CARD_DESCRIPTION'
export const CHANGE_CARD = 'CHANGE_CARD'
export const ADD_COMMENT = 'ADD_COMMENT'
export const ADD_TAG_CARD = 'ADD_TAG_CARD'
export const COMMON_KANBAN_RELOAD='COMMON_KANBAN_RELOAD'
export const ADD_USER_TO_TASK_NEW = ' ADD_USER_TO_TASK_NEW '
export const ADD_CARD_TO_CHOSEN = 'ADD_CARD_TO_CHOSEN'
export const DELETE_CARD = 'DELETE_CARD'
export const DELETE_CARD_BACKLOG = 'DELETE_CARD'
export const CHOSEN_BOARD = 'CHOSEN_BOARD'
export const REMOVE_TAG_CARD = 'REMOVE_TAG_CARD'
export const LOAD_BOARD = 'LOAD_BOARD'
export const UNEXPIRED = 'UNEXPIRED'
export const CHANGE_CARD_REGULAR = 'CHANGE_CARD_REGULARD'
//USERES
export const ALL_USERS = 'users';
export const GET_EMPLOYE = 'get_users';
export const CHANGE_PERMISSION = 'change_permission';
export const ONE_USER = 'get_one'
export const FIND_CONTRACTOR ='FIND_CONTRACTOR'
export const PARTITION_UPDATE = 'update_user_partition';
export const SEARCH_TABLE_USER ='SEARCH_TABLE_USER'
export const ADD_USER_TASK='ADD_USER_TASK'
export const FINISH_USER_TASK='FINISH_USER_TASK'
export const EDIT_USER_TASK='EDIT_USER_TASK'
export const USER_TASKS='USER_TASKS'
export const SORT_USER_TASKS ='SORT_USER_TASKS'
export const MY_TASK_DELITE ="MY_TASK_DELITE"
export const CHANGE_CONTAINER ="CHANGE_CONTAINER"
export const CHANGE_TASKS_STATUS ="CHANGE_TASKS_STATUS"
export const CHANGE_CURSOR_STATUS ="CHANGE_CURSOR_STATUS"
//user errors
export const USER_ERR = 'get_all_users_error'
//search user 
export const SEARCH_USER = 'search_user'
//PROJECTS
export const ADD_PROJ_TO_CHOSEN= 'ADD_PROJ_TO_CHOSEN';
export const EDIT_PROJECT = 'edit_project';
export const ALL_PROJECTS = 'all_projects';
export const CREATE_PROJECT = 'create_project';
export const GET_PROJECT = 'get_project';
export const CLEAR_URN = 'clear_urn'
export const SORT_PROJECTS = 'sort_projects' 
export const CHANGE_ROCKET = 'CHANGE_ROCKET'
export const SORT_TITLE = 'SORT_TITLE';
export const CHANGE_USER_PROJ = 'CHANGE_USER_PROJ'
//PROJECTS SORT

export const UPDATE_PROJECT = 'project_updated';
export const PROJECT_ID = 'project_updated';
export const DELETE_PROJECT = 'delete_project'
export const FINISH_PROJECT = 'finish_project'
export const ADD_USER_TO_TEAM = 'add_user_to_team'
export const SEARCH_OBJECT ='SEARCH_OBJECT  '
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
export const CHANGE_DESCRIPTION = 'change_sprint_description'
export const ADD_USER_TO_TASK = 'add_user_to_task'
export const SEARCH_TAG = 'search_tag'
export const ADD_TAG = 'add_tag'
export const DELITE_TAG = 'del_tag'
export const DELITE_USER = 'delite_user'
export const SORT_BY_TAGS ='sort_by_tags'
export const CLEAR_SPRINT = 'clear_sprint'
//teams
export const JOIN_TEAM = 'join_to_team'
//projects errors
export const CREATE_FAIL= 'error_on_project_create';
//contractors
export const ADD_CONTRACTOR = 'add_contractor';
export const ALL_CONTRACTORS = 'all_contractors';
export const ONE_CONTRACTOR = 'one_contractor';
export const EDIT_CONTRACTOR = 'edit_contractor'
export const DELETE_CONTRACTOR = 'DELETE_CONTRACTOR'
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
export const GREEN_MSG = 'some_msg'
export const BACK_WHITE ='backgr_white'

//////// proposes

export const NEW_PROPOSE = 'new_propose'
export const LIKED_PROPOSES = 'liked_proposes'
export const DATE_PROPOSES = 'date_proposes'
export const LIKE_PROPOSE = 'like_propose'
export const DELETE_PROPOSE = 'delete_propose'
export const PROPOSE_FAIL = 'propose_fail'
export const IN_WORK = 'in_work'
export const END_PROPOSE = 'end_work'
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

//IDEA
export const DELETE_IDEA= 'DELETE_IDEA'

///autodesk forge @ MODELS 
export const GET_TOKEN = 'get_oauth_token'
export const GET_URN = 'get_urn'
export const GET_STATUS = 'loading_status'
export const CLEAR_MODEL_DATA = 'clear_model_data'
export const CLEAR_DEPS = 'clear_deps'



///errors

export const ERROR_MSG ='error_msg'



export const GET_IDEAS = 'get_all_ideas'; //all arrays
export const GET_NEW_IDEAS = 'get_new_ideas'; //new array
export const GET_WORK_IDEAS = 'get_ideas_in_progress'; // work array
export const GET_DONE_IDEAS = 'get_done_ideas'; //done array

export const LIKE_IDEA = 'like_new_idea'; //new array and msg 
export const POST_IDEA = 'create_new_idea'; //all arrays

export const MOVE_IDEA = 'change_idea_status' //тут можно сделать одним роутом.
//я буду отправлять в квери куда именно передвинуть её - в work или done; 
//если говно идея то отдельно 2 роута new => work => done
//второй вариант логичнее, потому что понятно что отправлять обратно на фронт. 
//типа двинули идею с new => work - нужны новые массивы new / work



//statistic


export const GET_STAT = 'get_user_stat';

export const GET_WEEKLY_TASK = 'get_all_tasks_of_week'