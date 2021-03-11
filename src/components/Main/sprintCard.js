import styles from '../../Styles/modules/components/projectsCard.module.css'
import { Card } from '../../Styles/common'
import { Bold,Light } from '../../Styles/typography'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Tag from '../Projects/components/OneProject/tag'
import { Circle } from '../../Styles/project'






const SprintCard = ({sprint, project}) => {

  


    return (
      
        <Card className={styles.projContainer}>
          <div className={styles.projtop}>
          <Link  style={{textDecoration: 'none'}}to={`projects/${project.crypt}`}>
            <Light size="24" color='#3F496C' className={styles.title}>
              {project.title}
            </Light>
          </Link>
		  </div>
        </Card>
      
    );
}
export default SprintCard
