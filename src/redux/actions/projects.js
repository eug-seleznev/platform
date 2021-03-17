import { innerBackend, instance } from "../../components/utils/axios";
import { ADD_SPRINT,ADD_USER_TO_TEAM,SEARCH_OBJECT,SORT_TITLE, SORT_PROJECTS,CHANGE_ROCKET, ADD_TAG,SORT_BY_TAGS, ADD_TASKS,CLEAR_URN,GREEN_MSG,DELITE_USER, ALL_PROJECTS, ALL_SPRINT, EDIT_TASK, CREATE_FAIL, DELETE_PROJECT,EDIT_PROJECT, FINISH_SPRINT, FINISH_TASK, GET_PROJECT,CREATE_PROJECT, GET_SPRINT, JOIN_TEAM, PROJECT_ID, SPRINT_ERROR, FINISH_PROJECT,ADD_INFO_SPRINT,CLEAR_MSG, CLEAR_ERROR, DELETE_SPRINT, PROJECTS_SORT, ERROR_MSG, CHANGE_DESCRIPTION, ADD_USER_TO_TASK, SEARCH_TAG, DELITE_TAG  } from "../types";





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
export const changeRocket = (crypt, rocket) => async (dispatch) => {
  console.log(crypt, rocket)
  let body = {
    rocketchat: rocket
  }
  try {
    const res = await innerBackend.put(
      `/projects/addrocket/${crypt}`, body
    );
    dispatch({
      type: CHANGE_ROCKET,
      payload: res.data,
    });
  } catch (err) {
    alert("hahaha classic");
  }
};
export const addToProject = ( crypt, userId) => async (dispatch) => {
  console.log(crypt)
  let body = {
    user: userId,
    position:"Работяга",
    task:"работать"
  }
  try {
    const res = await innerBackend.put(
      `/projects/updteam/${crypt}`, body
    );
    dispatch({
      type: DELITE_USER,
      payload: res.data,
    });
  } catch (err) {
    alert("hahaha classic");
  }
};

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



export const sorType = ({ field, value }) => async (dispatch) => {
  try {

    console.log(field, value)
    const res = await innerBackend.get(
      `/projects/q/search?field=${field}&value=${value}`
    );

    console.log(res.data)
    dispatch({
      type: SORT_PROJECTS,
      payload: res.data,
    });
  } catch (err) {
    alert("hahaha classic");
  }
};
export const sortTitle = ({ value }) => async (dispatch) => {
  console.log(value)
  try {
    const res = await innerBackend.get(
      `/projects/title/search?title=${value}`
    );
    dispatch({
      type: SORT_TITLE,
      payload: res.data,
    });
  } catch (err) {
    alert("hahaha classic");
  }
};

export const searchObject = (value) => async (dispatch) => {
  
  try {
    console.log(value)
    const res = await innerBackend.get(
      `/projects/search/objectobject/object/object?object=${value}`
    );
    dispatch({
      type: SEARCH_OBJECT,
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
export const sortByTags = (crypt, tag) => async dispatch => {
  try {
    const res = await innerBackend.get(`/projects/sprint/tagsort?crypt=${crypt}&tag=${tag}`)
    dispatch({
        type: SORT_BY_TAGS,
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


export const addSprint = (id) => async dispatch  => {
    try {
        let body = {
            description: 'ввод',
            title: 'Введите название'
        }
        
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
        const errors = err.response.data;
        console.log(errors)
        errors.map(error => {
           return dispatch({
            type: ERROR_MSG,
            payload: error.msg
        })
        })            
      
    }
   
}

export const EditTask = ({ value, id, focusRow, field }) => async (dispatch) => {
  console.log(field,value,id)
  try {

    let body = {
      // taskTitle: taskTitle!==''?taskTitle:' ',
      // deadline: deadline!==''?deadline:'',
      taskid: focusRow,
    };
    body[field] = value

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

export const addTag = ( id,tag ) => async (dispatch) => {
  let body = {
    tag: tag
  }
  try {
    console.log(tag)
    const res = await innerBackend.put(`projects/sprints/addTag/${id}`, body);
    dispatch({
      type: ADD_TAG,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response.data);
  }
}; 
export const deleteTag = ( id,tag ) => async (dispatch) => {
 
  try {
    console.log(tag, id)
    const res = await innerBackend.delete(`projects/sprints/${id}/tag?tag=${tag}`);
    dispatch({
      type: DELITE_TAG,
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
        console.log('hello edit', formData)
        const res = await innerBackend.put(`/projects/${id}`, formData)
        dispatch({
            type: EDIT_PROJECT,
            payload: res.data
        })
    
  
      }
      catch (err) {
        const errors = err.response.data.error;
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





export const EditSprint = (sprintInfo, id) => async (dispatch) => {
  try {


    const res = await innerBackend.put(
      `/projects/sprints/edit/${id}`,
      sprintInfo
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
        const res = await innerBackend.put(`projects/sprints/DAtask/test`, body)
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
export const addInfoSprint = (form, id) => async dispatch  => {
    console.log (form.date, id)
    let body = {
        // description: form.description,
        dateClosePlan: form.date,
    }
    try {
        const res = await innerBackend.put(`projects/sprints/edit/${id}`, body)
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




export const AddUserToTeam = (formData) => async dispatch => {
  try {
    let body = {
      user: formData.user,
      position: formData.position!==""?formData.position:"нет",
      task: formData.task!==""?formData.task:"нет"
    }


    console.log(body, 'body', )
    const res = await innerBackend.put(`projects/updteam/${formData.crypt}`, body)
    dispatch({
      type: ADD_USER_TO_TEAM,
      payload: res.data
  })
    console.log(res.data)
    
  
  } catch (err) {
  alert('AAAAAAAAAAAAAAAAAAAAAA')    
  }
}