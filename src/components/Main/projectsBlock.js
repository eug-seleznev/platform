import { useState } from 'react'
import styles from '../../Styles/modules/main/main.module.css'
import { Bold, Regular } from '../../Styles/typography'
import ProjectsCard from './projectsCard'

const ProjectsBlock = ({user, history}) => {
	const [showProj, setShowProj] = useState (1)

    return(
		<div className={styles.projects}>
		<div style={{display:'flex'}}>
		  <img alt='myproj' src="/proj.png" style={{height:'34px'}}></img>
		  <Regular color="#3F496C" size="18" className={styles.myProj}>
			Мои проекты
		  </Regular>
		  <Bold color={showProj===1?'#3F496C':'#959595'} size="18" onClick={()=>{setShowProj(1)}} className={styles.myProjButton}>
			активные
		  </Bold>
		  <Bold color={showProj===2?'#3F496C':'#959595'} size="18" onClick={()=>{setShowProj(2)}} className={styles.myProjButton}>
			все
		  </Bold>
		</div>
		

		{showProj===1?user.projects.filter(proj=>!proj.status).map((el, i) => 
			<ProjectsCard
			  project={el}
			  key={i}
			  sprints={user.sprints}
			  history={history}
			/>
	  
		):
		showProj===2?user.projects.map((el, i) => 
		<ProjectsCard
		  project={el}
		  key={i}
		  sprints={user.sprints}
		  history={history}
		/>
  
	):''}
	  </div>
    )
}

export default ProjectsBlock 