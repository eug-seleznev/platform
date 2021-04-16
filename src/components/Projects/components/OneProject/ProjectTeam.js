import style from '../../../../Styles/modules/components/Project/oneproj.module.css'
import { useDispatch, useSelector } from "react-redux";
import {CancelButton} from '../../../../Styles/buttons'
import ProjTeam from './oneTeammate'
import { joinTeam } from '../../../../redux/actions/projects';
import { useEffect, useState } from 'react';
import Subtitle from './subtitle';
import UserForm from './infoForm';




const ProjectTeam = ({history}) => {
	const dispatch = useDispatch();

  const [idArray] = useState([])
  const [button,setButton] = useState(false)
  const [open,setOpen] = useState(true)
  const [modal,setModal] = useState(false)
  const project = useSelector(state => state.projects.project)
  const userId = useSelector(state => state.auth.user._id)
  const id = useSelector(state => state.projects.project.crypt)

    useEffect(()=>{

   
    
        
        project.team2.map((el)=>{
          // console.log(el.user._id,userId)
          setButton(el.user._id===userId)
          idArray.push(el._id)
        })
      
    },[])

    const hadleTeam =()=>{
      if(button) { 
        dispatch(joinTeam(id))
        setButton(!button)
      }
      
      if(!button) {
       setModal(true)
      }
    }
    const teamInfo = (formData) => {
        dispatch(joinTeam(id,formData))
        setModal(false)
        setButton(!button)  
    }

    const openfunc=()=>{
      setOpen(!open)
    }

    return (
      <div className={style.team} style={{ overflowY:'hidden'}}>    
      <div style={{display:'flex', alignItems:'center'}}>
        <Subtitle title='Команда проекта' isopen={open}
            openfunc={openfunc} 
            src='/team.png'
            open={true} 
            srcplus={button} 
            buttonFunc={hadleTeam} 
            subtwidth='90%' 
        >
        </Subtitle> 
        <div style={{display:`${modal?'block':'none'}`}}>
          <UserForm setModal={setModal} teamInfo={teamInfo}/>
        </div> 
      </div>   
            <div className={style.sprintdescr__cont}>
              <div >
                {project.team2!==undefined ? project.team2.map((user, i) => {
                      return (
                        <ProjTeam key={i} id={id}
                          histProp={history}
                          userMail={user.user.email}
                          userId={user.user._id} 
                          userName={user.user.fullname}
                          lastName={user.user.lastname} 
                          userAvatar={user.user.avatar} 
                          userPos={user.position}
                          userTask={user.task}
                          >
                        </ProjTeam>
                      );
                    }):<p> В комнаде проекта никого нет</p>}
                    </div> 
                  
                    <CancelButton onClick={hadleTeam} fontSize='14px' style={{paddingBottom:'10px',paddingTop:'10px',backgroundColor:'white', color:'#397BB8', border:'none',marginTop:'10px',textAlign:'right'}}>{button?'Выйти из команды':'Вступить в команду'} </CancelButton>
                

                   
                       
                   
              </div>

</div>
  
    )
}



export default ProjectTeam
