
import styles from '../../Styles/modules/main/main.module.css'
import { Bold } from '../../Styles/typography'
import { Path } from '../Layout/header'
import SprintCard from './sprintCard'

const SprintBlock = ({user, history}) => {


    return(
		<div className={styles.my_sprints}>
        <div className={styles.create__news}>
          <img className={styles.create__news__img}alt='star' src={Path+'starr.png'}></img>
            <Bold color="black" size="18">
              Избранные спринты
            </Bold>
            
          </div>
        {user.sprints.map((sprint, i) => {

            return (<SprintCard key={i} sprint={sprint} />)
          
          })}
        </div>
    )
}

export default SprintBlock 