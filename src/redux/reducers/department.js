import { NEW_DEPARTMENT, ALL_DEPARTMENTS, FIND_DEPARTMENT, JOIN_DEPARTMENT, LEAVE_DEPARTMENT, DEPARTMENT_FAIL,CLEAR_DEPS} from "../types";



const initialState = {
    departments: null,
    findDep: null,
    loaded: false,
    reload: false,
    
    msg:'',
    error: '',
    
}

export default function(state = initialState, action) {
    const {
        type, payload
    } = action;

    switch(type){
       

            case NEW_DEPARTMENT:
                return {
                    ...state,
                    msg: payload,
                    reload: !state.reload,
                    
                    
                    error: ''
                }
            case CLEAR_DEPS:
                    return {
                        ...state,
                        findDep:null
                    }
        
            case ALL_DEPARTMENTS:
                return {
                    
                    ...state,
                    departments: payload,
                    loaded: true,

                    error: ''
                }

            case JOIN_DEPARTMENT:
// console.log('join4' , payload)
                
                return {
                    ...state,
                    msg: payload,
                    reload: !state.reload,

                    error: ''
                }
            case FIND_DEPARTMENT:
                return {
                    ...state,
                    findDep: payload,
                    reload: !state.reload,

                    error:''
                }

            case LEAVE_DEPARTMENT:
// console.log('leave' , payload)

                return {
                    ...state,
                    msg: payload,
                    findDep: null,
                    reload: !state.reload,


                    error: ''
                }
         
    case DEPARTMENT_FAIL:
        return {
            ...state,
            error: payload,
            loaded: false,
            
        }
            
            default: 
                return state;
    }

} 
