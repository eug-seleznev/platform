import { innerBackend, instance } from "../../components/utils/axios";
import { ADD_SPRINT, SORT_PROJECTS, ADD_TASKS,CLEAR_URN,GREEN_MSG, ALL_PROJECTS, ALL_SPRINT, EDIT_TASK, CREATE_FAIL, DELETE_PROJECT,EDIT_PROJECT, FINISH_SPRINT, FINISH_TASK, GET_PROJECT,CREATE_PROJECT, GET_SPRINT, JOIN_TEAM, PROJECT_ID, SPRINT_ERROR, FINISH_PROJECT,ADD_INFO_SPRINT,CLEAR_MSG, CLEAR_ERROR, DELETE_SPRINT, PROJECTS_SORT, ERROR_MSG, CHANGE_DESCRIPTION, ADD_USER_TO_TASK, SEARCH_TAG  } from "../types";





export const newProject = (formData) => async dispatch  => {
    console.log (formData)
    try {
   
        const res = await innerBackend.post('/projects/add', formData)
        dispatch({
            type: CREATE_PROJECT,
            payload: res.data
        })
        dispatch({
            type: GREEN_MSG,
            payload: res.data
        })
        }
      catch (err) {
          console.log(err.response.data.err)
        const errors = err.response.data.err
        errors.map(error => {
           return dispatch({
            type: ERROR_MSG,
            payload: error.msg
        })
        })            
      
    }

}

export const sortProjects = ({ query, orderSort }) => async (dispatch) => {
  try {
    const res = await innerBackend.get(
      `/projects?field=${query}&order=${orderSort}`
    );
    dispatch({
      type: SORT_PROJECTS,
      payload: res.data,
    });
  } catch (err) {
    alert("hahaha classic");
  }
};


export const clearUrn = () => async dispatch => {
    try {
        dispatch({
            type: CLEAR_URN
        })
    } catch (error) {
    }
}


export const allProjects = () => async dispatch  => {
    
    try {
        const res = await innerBackend.get('/projects?field=title&order=true')
        dispatch({
            type: ALL_PROJECTS,
            payload: res.data
        })
        }
      catch (err) {
        const errors = err.response.data.err;
        errors.map(error => {
           return dispatch({
            type: ERROR_MSG,
            payload: error.msg
        })
        })            
      
    }

}
export const searchTag = (tag, crypt) => async dispatch  => {
    
  try {
      const res = await innerBackend.get(`/projects/tag/find?crypt=${crypt}&tag=${tag}`)
      dispatch({
          type: SEARCH_TAG,
          payload: res.data
      })

      }
    catch (err) {
      const errors = err.response.data.err;
      errors.map(error => {
         return dispatch({
          type: ERROR_MSG,
          payload: error.msg
      })
      })            
    
  }

}

export const getProject = (id) => async dispatch  => {
    
    try {
        const res = await innerBackend.get(`/projects/${id}`)
        dispatch({
            type: GET_PROJECT,
            payload: res.data
        })

        }
      catch (err) {
        const errors = err.response.data.err;
        errors.map(error => {
           return dispatch({
            type: ERROR_MSG,
            payload: error.msg
        })
        })            
      
    }

}


export const addSprint = (id,formData,data, tags) => async dispatch  => {
    try {
    

        let body = {
            description: formData.description,
            date: formData.date,
            tasks: data.tasks[0].taskTitle==""?[]:data.tasks,
            tags: tags
        }
        // console.log(data)
        const res = await innerBackend.post(`/projects/sprints/new/${id}`,body)
        dispatch({
            type: ADD_SPRINT,
            payload: res.data
        })
        dispatch({
            type: GREEN_MSG,
            payload: res.data
        })
        }
      catch (err) {
        const errors = err.response.data.err;
        errors.map(error => {
           return dispatch({
            type: ERROR_MSG,
            payload: error.msg
        })
        })            
      
    }
   
}

export const EditTask = ({ taskTitle, id, focusRow }) => async (dispatch) => {
  try {

    let body = {
      taskTitle: taskTitle,
      taskid: focusRow,
    };

    const res = await innerBackend.put(`projects/sprints/taskedit/${id}`, body);
    dispatch({
      type: EDIT_TASK,
      payload: res.data,
    });
  } catch (err) {
      console.log(err.response.data)
  }
}; 

export const addUserToTask = ({ userid, id, focusRow }) => async (dispatch) => {
  try {
    let body = {
      userid: userid,
      taskid: focusRow,
    };

    const res = await innerBackend.put(`projects/sprints/task/adduser/${id}`, body);
    dispatch({
      type: ADD_USER_TO_TASK,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response.data);
  }
}; 










export const DeleteTask = ({ id, focusRow }) => async (dispatch) => {
  try {
    let body = {
      taskid: focusRow,
    };
    console.log(id)

    console.log(body)
    const res = await innerBackend.put(
      `projects/sprints/deltask/${id}`, body
    );
    console.log(res.data)
    dispatch({
      type: EDIT_TASK,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response.data);
  }
}; 

///projects/sprints/task/adduser/🇮🇩













export const editProject = (formData, id) => async dispatch  => {
    try {
        // console.log('hello edit', formData)
        const res = await innerBackend.put(`/projects/${id}`, formData)
        dispatch({
            type: EDIT_PROJECT,
            payload: res.data
        })
    
  
      }
      catch (err) {
        const errors = err.response.data.err;
        errors.map(error => {
           return dispatch({
            type: ERROR_MSG,
            payload: error.msg
        })
        })
            
      } 
  
  }

export const allSprints = (id) => async dispatch  => {
    try {

        const res = await innerBackend.get(`/projects/sprints/${id}`)
        dispatch({
            type: ALL_SPRINT,
            payload: res.data.sprints
        })
        // console.log(res.data, 'my data')

        }
      catch (err) {
        const errors = err.response.data.err;
        errors.map(error => {
           return dispatch({
            type: ERROR_MSG,
            payload: error.msg
        })
        })            
      
    }

}



export const getSprint = (id) => async dispatch  => {
    try {
        console.log(id, 'my sprint id')
        const res = await innerBackend.get(`/projects/getsprint/${id}`)
        dispatch({
            type: GET_SPRINT,
            payload: res.data
        })

        }
      catch (err) {
        console.log(err.response)
        // errors.map(error => {
        //    return dispatch({
        //     type: SPRINT_ERROR,
        //     payload: error.msg
        // })
        }            
      
    }




export const deleteSprint = (id) => async dispatch => {
    try {
        console.log(id, 'sprint id')
        const res = await innerBackend.delete(`/projects/sprints/${id}`);
        dispatch({
            type: DELETE_SPRINT,
            payload: res.data
        })
        dispatch({
            type: GREEN_MSG,
            payload: res.data
        })
    } catch (err) {
        console.log(err)
    }
}



export const addTasks = ({ sprintId,tasks}) => async dispatch  => {
    // console.log(tasks, sprintId, 'retuuuuuuuuuuuurd')
    
    try {
        // console.log(tasks, 'tasks', id, 'id')
        const res = await innerBackend.post(`/projects/sprints/addtask/${sprintId}`, tasks)
        dispatch({
            type: ADD_TASKS,
            payload: res.data
        })
        dispatch({
            type: GREEN_MSG,
            payload: res.data
        })
        }
      catch (err) {
        const errors = err.response.data.err;
        errors.map(error => {
           return dispatch({
            type: ERROR_MSG,
            payload: error.msg
        })
        })            
      
    }

}



export const addTask = ({ id, task }) => async (dispatch) => {

  try {
    let tasks = {
      taskTitle: task,
      workVolume: 0,
      taskState: false,
    };


    console.log(tasks)
    const res = await innerBackend.post(
      `/projects/sprints/task/${id}`,
      tasks
    );
    dispatch({
      type: ADD_TASKS,
      payload: res.data,
    });

    console.log(res.data)

  } catch (err) {
    const errors = err.response.data.err;
   
      return dispatch({
        type: SPRINT_ERROR,
        payload: errors.msg,
      });
    
  }
};





export const EditDescription = (descript, id) => async (dispatch) => {
  try {

    let body = {
        description: descript
    }
    console.log(body)
    const res = await innerBackend.put(
      `/projects/sprints/description/${id}`,
      body
    );

    dispatch({
      type: CHANGE_DESCRIPTION,
      payload: res.data,
    });
  } catch (err) {}
};














export const finishTask = ({taskid, id}) => async dispatch  => {
    let body = {
        taskid: taskid 
    }
    try {
        // console.log(tasks, 'tasks', id, 'id')
        const res = await innerBackend.put(`projects/sprints/DAtask/${id}`, body)
        dispatch({
            type: FINISH_TASK,
            payload: res.data
        })
        dispatch({
            type: GREEN_MSG,
            payload: res.data
        })
        }
      catch (err) {
        const errors = err.response.data.err;
        errors.map(error => {
           return dispatch({
            type: ERROR_MSG,
            payload: error.msg
        })
        })            
      
    }

}


export const finishSprint = (id) => async dispatch  => {
    try {
        const res = await innerBackend.put(`projects/sprints/${id}`)
        dispatch({
            type: FINISH_SPRINT,
            payload: res.data
        })
        dispatch({
            type: GREEN_MSG,
            payload: res.data
        })
        }
      catch (err) {
        const errors = err.response.data.err;
        errors.map(error => {
           return dispatch({
            type: ERROR_MSG,
            payload: error.msg
        })
        })            
      
    }

}
export const addInfoSprint = (id, form) => async dispatch  => {
    // console.log (form.description, form.date, id)
    let body = {
        description: form.description,
        date: form.date,
    }
    try {
        const res = await innerBackend.put(`projects/sprints/dd/${id}`, body)
        dispatch({
            type: ADD_INFO_SPRINT,
            payload: res.data
        })
        }
      catch (err) {
        const errors = err.response.data.err;
        errors.map(error => {
           return dispatch({
            type: ERROR_MSG,
            payload: error.msg
        })
        })            
      
    }

}

// export const addToChosen = (id) => async dispatch  => {
//     console.log ('hi sprint', id)
//     try {
//         const res = await innerBackend.put(`projects/favsprint/${id}`)
//         dispatch({
//             type: ADD_SPRINT_TO_CHOSEN,
//             payload: res.data
//         })
//         }
//       catch (err) {
//         const errors = err.response.data.errors;
//         errors.map(error => {
//            return dispatch({
//             type: SPRINT_ERROR,
//             payload: error.msg
//         })
//         })            
      
//     }

// }

export const finishProject = (id) => async dispatch  => {
   
    try {
        const res = await innerBackend.put(`projects/finish/${id}`)
        dispatch({
            type: FINISH_PROJECT,
            payload: res.data
        })
        dispatch({
            type: GREEN_MSG,
            payload: res.data
        })
        }
      catch (err) {
        const errors = err.response.data.err;
        errors.map(error => {
           return dispatch({
            type:ERROR_MSG,
            payload: error.msg
        })
        })            
      
    }

}

export const deleteProject = (crypt) => async dispatch  => {

    try {
        // console.log(tasks, 'tasks', id, 'id')
        const res = await innerBackend.delete(`projects/${crypt}`)
        dispatch({
            type: DELETE_PROJECT,
            payload: res.data
        })
        dispatch({
            type: GREEN_MSG,
            payload: res.data
        })
        }
      catch (err) {
        const errors = err.response.data.err;
        errors.map(error => {
           return dispatch({
            type: ERROR_MSG,
            payload: error.msg
        })
        })            
      
    }

}




export const joinTeam = (id,formData) => async dispatch  => {
console.log(formData,id)
    try {

        const res = await innerBackend.put(`/projects/join2/${id}`, formData)
        dispatch({
            type: JOIN_TEAM,
            payload: res.data
        })

        }
      catch (err) {
        const errors = err.response.data.err;
        errors.map(error => {
           return dispatch({
            type: ERROR_MSG,
            payload: error.msg
        })
        })            
      
    }

}