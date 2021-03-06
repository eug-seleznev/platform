import styles from '../../Styles/modules/components/projectsCard.module.css'
import { Card } from '../../Styles/common'
import { Bold,Light } from '../../Styles/typography'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'






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
          <Bold size="24" className={styles.title}>
            {project.title}
          </Bold>
          <Light size="16" className={styles.description}>
            {project.about != null
              ? project.about
              : "Короткое описание проекта"}
          </Light>
          <Light size="18" className={styles.left}>
            {" "}
            {daysLeft} {daysLeft < 1 ? "день" : daysLeft < 5 ? "дня" : "дней"}
          </Light>
          <Light size="16" className={styles.filter}>
            #{project.stage} #{project.type}
          </Light>
        </Card>
      </Link>
    );
}
export default ProjectsCard
