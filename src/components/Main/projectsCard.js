import styles from '../../Styles/modules/components/projectsCard.module.css'
import { Card } from '../../Styles/common'
import { Bold,Light } from '../../Styles/typography'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Tag from '../Projects/components/OneProject/tag'
import { Circle } from '../../Styles/project'






const ProjectsCard = ({project}) => {

    const [daysLeft, setDaysLeft] = useState(null)


 
 useEffect(()=>{
     const now = new Date()
     const finish = new Date(project.dateFinish)
     const left = (finish.getTime() - now.getTime()) / (1000*60*60*24)
     const days = Math.floor(left)
    setDaysLeft(days)
 },[])


    return (
      
        <Card className={styles.projContainer}>
          <div>
          <div className={styles.end}>
            {/* {
            project.sprints.length==0?<Circle red />:<Circle green />
          } */}
          
          <Bold size="12" color="#848484" style={{marginLeft:'20px'}} >
            {" "}
            {daysLeft>0?daysLeft:'?'} {daysLeft < 0?"дней до дедлайна":daysLeft < 1 ? "день до дедлайна" : daysLeft < 5 ? "дня до дедлайна" : "дней до дедлайна"}
          </Bold>
          </div>
          <div className={styles.projtop}>
          <Link  style={{textDecoration: 'none'}}to={`../projects/${project.crypt}/main`}>
            <Light size="24" color='#3F496C' className={styles.title}>
              {project.title}
            </Light>
          </Link>
          {/* <Light size="16" className={styles.description}>
            {project.about != null
              ? project.about
              : "Короткое описание проекта"}
          </Light> */}
          
          
          </div>
          </div>
          <div className={styles.tags}>
            <Tag  tagText={project.stage} tagColor='#E9E3C8'/>   
            <Tag tagText={project.type} tagColor='#C8D9E9'/>
          </div>
         
        </Card>
      
    );
}
export default ProjectsCard
