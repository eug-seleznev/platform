import style from '../../../../Styles/modules/components/Project/oneproj.module.css'
import { useDispatch, useSelector } from "react-redux";
import {Button} from '../../../../Styles/buttons'
import { Bold, H1} from '../../../../Styles/typography'
import ProjTeam from './oneTeammate'
import { joinTeam } from '../../../../redux/actions/projects';
import { useEffect, useState } from 'react';
import Subtitle from './subtitle';
import { Card} from '../../../../Styles/common';
import { Table } from '../../../../Styles/tables';


const ProjectTeam = ({id, hist}) => {
	const dispatch = useDispatch();
  const [idArray] = useState([])
  const [button,setButton] = useState(false)
  const [open,setOpen] = useState(false)
    const user = useSelector(state => state.auth.user) 
   	const project = useSelector(state => state.projects.project)
    useEffect(()=>{
      if(project!=undefined) {
        console.log(project.team)
        console.log(user)
        project.team.map((el)=>{
          idArray.push(el._id)
        })
      }
    },[project])
    useEffect (()=>{
      if(idArray.includes(user.id)) {
        setButton(true)
      }
      else{
        setButton(false)
      }
    },[idArray])
    const hadleTeam = () => {
        dispatch(joinTeam(id))
  
          setButton(!button)
        
        
    }
    const openfunc=()=>{
      setOpen(!open)
    }
    return (
      <div style={{height:`${!open?'65px':'auto'}`, overflowY:'hidden'}}>    
            <div style={{display:'flex', alignItems:'center'}}>
              <Subtitle title='Команда проекта' isopen={open} openfunc={openfunc} src='/team.png' open={true} srcplus={button} buttonFunc={hadleTeam} subtwidth='40%' buttonActive={true}></Subtitle> 
              
            </div>   
                  <div className={style.sprintdescr__cont}>
                    <Card >
                     
                      {project.team.map((user, i) => {
                            return (
                              <ProjTeam key={i} histProp={hist} userId={user._id} userName={user.fullname} lastName={user.lastname} userAvatar={user.avatar} userPos={user.position}></ProjTeam>
                            );
                          })}
                          
                        
                        <br />
                      
{/*                     
                           {  
                                    <button
                                      fontSize={'20px'}
                                      onClick={hadleTeam}
                                      className={style.team__button}
                                      style={{
                                        outline:'none',
                                        color:'black',
                                        display: `${project.status||button? "none" : "block"}`,
                                      }}
                                    >
                                      Вступить в команду проекта
                                    </button>
                           } */}
                         
                        </Card>      
                         
                    </div>

	  </div>
  
    )
}



export default ProjectTeam
