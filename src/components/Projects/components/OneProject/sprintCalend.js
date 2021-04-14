import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";

import style from '../../../../Styles/modules/components/Project/oneproj.module.css'
import { allSprints} from "../../../../redux/actions/projects";
import Subtitle from "./subtitle";
let months = ['янв','фев',"мар","апр","май","июн","июл","авг","сен","окт","ноя","дек"]
let count = [1,2,3,4]

const CalendSprint = ({id}) => {

    const dispatch = useDispatch();
    const loaded = useSelector(state => state.projects.loadProject);
    const sprintsLoad = useSelector(state => state.projects.loadSprints)
 

    const project = useSelector(state => state.projects.project)
    const sprints = useSelector(state => state.projects.sprints)
    const trick = useSelector(state => state.projects.trick)


    const [sprintDays, setSprintDays] = useState([]);
    const [calendLoader, setCalendLoader] = useState (false);
    const [paint, setPaint] = useState(false);
    const [pr, setpr] = useState (false) 


    // эт массивы для календаря
    const[conditionalWeeks] =useState([]) 
    const[sprintPaint, setPaintSprint] = useState ([])
    const [open,setOpen] = useState(false)


 
   
    useEffect(() => {
    
    if (loaded && sprintsLoad && trick){
     
    // dispatch(Oauth(project.crypt));
      const Calendar = () => {return new Promise((resolve, reject) =>  {
        
        //  Вот это все короче собирает инфу с бекенда, 
        // режет в нужный мне формат и пушит в массив
        // с отрисовкой пока беда работает ток на f5

         sprints.filter((sprint)=>sprint.dateClosePlan!=null).map ((body, i) => {
          let month = body.dateClosePlan.slice(5,7)
          let day = body.dateClosePlan.slice(8,10)
          let sprintStatusDone = body.tasks.length - body.tasks.filter((task) => !task.taskStatus).length
          let sprintStatusFull = body.tasks.length
          let monthInt = Number(month)
          let dayInt = Number(day)
          setSprintDays(state => [...state, [dayInt,monthInt,sprintStatusDone,sprintStatusFull]])
         })

         
         setCalendLoader(true)
         resolve()
         
      
      })}

      Calendar().then(() =>   setCalendLoader(true)
      )  
    }
   
}, [sprintsLoad, loaded, trick])
        


    useEffect (()=>{  

            if(calendLoader){
              // console.log('STAGE 4')
              setpr(false)
              const MapCheck = () =>  new Promise((resolve, reject) => {
				//console.log('STAGE 5')
                for (let i = 0; i <= 47; i++) {
			
                  if (project.crypt === id){
                    let yu = project.dateStart.slice(5,7)
                    let index = Number(yu)
                    if ((index+i/4) <13){
						// console.log('hi')
                      conditionalWeeks.push([i, Math.trunc((i/4)+index),
                        i%4===1?2:
                        i%4===2?3:
                        i%4===3?4:
                        i%4===4?0:1])
                     
                    }
              // елс иф для адекватной отрисовки первого месяца как стартового для проекта  
                    else if (index+i/4>=13){
						// console.log('hi')
                      conditionalWeeks.push([i, Math.trunc((i/4)+index-12),
                        i%4===1?2:
                        i%4===2?3:
                        i%4===3?4:
                        i%4===4?0:1])}}
              }

               resolve()

             })

              MapCheck().then(() =>{
				// console.log('stage7')
              let sprintArray = [];
             
              conditionalWeeks.map ((body, i) => {
				// console.log('stage7')
                    let int = 0
                     sprintDays.filter((sprintday)=>Math.trunc(sprintday[0]/7.75)+1===body[2])
                     .filter((sprintday)=>sprintday[1]===body[1]).filter((sprintday)=>sprintday[2]<sprintday[3]/ 100 * 50)
                     .map (() => {
                       int = 1
                         })

                     sprintDays.filter((sprintday)=>Math.trunc(sprintday[0]/7.75)+1===body[2])
                     .filter((sprintday)=>sprintday[1]===body[1])
                     .filter((sprintday)=>sprintday[2]>=sprintday[3]/ 100 * 50).map (() => { 
                         int = 2
                         })

                     sprintDays.filter((sprintday)=>Math.trunc(sprintday[0]/7.75)+1===body[2])
                       .filter((sprintday)=>sprintday[1]===body[1]).filter((sprintday)=>sprintday[2]===sprintday[3])
                       .map (() => {
                         int = 3
                           })

                        sprintArray.push ([body[0],body[1],body[2],int])  
          
                        setpr(true)
                           return(body)
               })
               
                setPaintSprint(sprintArray)

                setTimeout(() => {
                  setPaint(true)

                }, 50)

              
              } 
              )
            }
         },[calendLoader])
       
    

    useEffect(() => {
        if(loaded){
            // dispatch(allSprints(project.crypt))
        }
    
    }, [loaded])
    
   
  
  
 const openfunc=()=>{
  setOpen(!open)
}

    return (
      <div style={{height:`${!open?'65px':'auto'}`, overflowY:'hidden'}} className={style.calend__contain}>
				<div className={style.border__calend}></div>
					<Subtitle title='Календарь проекта' src='/history.png' openfunc={openfunc} isopen={open} open={true} subtwidth='90%' buttonActive={false}></Subtitle> 
					{!paint?<div>loading...</div>:(
					//календарь со спринтами
					<> 

					<div className={style.calend} >
					
					<div className={style.weeks}>
						{count.map ((body, i) => {
						
						return <div key={i} className={style.count}>{i+1}</div>
						})}
						{!pr?<div>loading..</div>:(<>
						{sprintPaint.map ((body, i) => {
						
						return <div 
							style = {{
								backgroundColor:`${body[3]===1?'red':body[3]===2?'rgba(0,255,0,0.5)':body[3]===3 ?'green':'gray'}`
							}}
							key={i} className={style.one__week}>
								<div className={style.months}> 
								{body[0]%4===0&&body[1]<=12?months[body[1]-1]: //это отрисовка месяцев
								body[0]===0?months[1]:
								''}</div></div>
						
						})}
						</>)}
						
					
					</div>

					</div>
            {/* <Bold className={style.hist__sprint} onClick={openModHistory}>Подробная история спринтов</Bold> */}
            {/* <SprintHistory hist={hist} status={status} openModHistory={openModHistory} id={id}></SprintHistory> */}
					</>)}
	  </div>
  
    )
}



export default CalendSprint

