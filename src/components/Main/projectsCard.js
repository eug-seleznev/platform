import styles from '../../Styles/modules/components/projectsCard.module.css'
import { Card } from '../../Styles/common'
import { Bold,Light } from '../../Styles/typography'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Tag from '../Projects/components/OneProject/tag'






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
      <Link  style={{textDecoration: 'none'}}to={`projects/${project.crypt}`}>
        <Card className={styles.projContainer}>
          <Light size="24" color='#3F496C' className={styles.title}>
            {project.title}
          </Light>
          <Light size="16" className={styles.description}>
            {project.about != null
              ? project.about
              : "Короткое описание проекта"}
          </Light>
          <Light size="18" className={styles.left}>
            {" "}
            {daysLeft>0?daysLeft:'?'} {daysLeft < 0?"?":daysLeft < 1 ? "день" : daysLeft < 5 ? "дня" : "дней"}
          </Light>
          <div className={styles.filter}>
             <Tag className={styles.filter} tagText={project.stage} tagColor='#E9E3C8'/>   
              <Tag tagText={project.type} tagColor='#C8D9E9'/>
          </div>
         
        </Card>
      </Link>
    );
}
export default ProjectsCard
