import styles from '../../Styles/modules/components/sprintCard.module.css'
import { SmallCard } from '../../Styles/common'
import { Bold,Light } from '../../Styles/typography'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Tag from '../Projects/components/OneProject/tag'






const SprintCard = ({sprint}) => {
  const [completeTasks,setCompleteTasks] = useState(0)
  const [allTasks, setAllTasks] = useState(1);
  useEffect(()=>{
    
    if (sprint.tasks!==undefined){
      
      setCompleteTasks(sprint.tasks.filter(task=>task.taskStatus).length)
      setAllTasks(sprint.tasks.length)
    }
    
  },[sprint.tasks])
 

    return (
      
        <SmallCard className={styles.sprintContainer}>
          <div className={styles.sprinttop}>
          <Link  style={{textDecoration: 'none'}}to={`projects/${sprint.project.crypt}/${sprint._id}`}>
            <Light size="16" color='#3F496C' className={styles.title}>
              {sprint.title}
            </Light>
          </Link>
          <Link  style={{textDecoration: 'none'}}to={`projects/${sprint.project.crypt}`}>
            <Bold size="12" color="#848484" className={styles.proj__title}>{sprint.project.title}</Bold>
          </Link>
          </div>
          
          <div className={styles.second__row}>
              <div  className={styles.tasks}>
                
                <div className={styles.card__thing}>
                  <div
                    style={{
                      width: `${Math.trunc((completeTasks / allTasks) * 100)}%`,
                    }}
                    className={styles.card__thing__full}
                  ></div>
                </div>
                <Light size='16'>
                  {completeTasks}/{allTasks}
                </Light>
              </div>
              {/* <div className={styles.tags}>
            {sprint.tags.map((el, i)=>{
              return(
                <Tag  tagText={el} key={i} tagColor={i===0?'#C8D9E9':'#E9E3C8'} />  
              )
            })}
             
          </div> */}
          </div>
        </SmallCard>
      
    );
}
export default SprintCard
