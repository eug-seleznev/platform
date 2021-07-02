
import { useDispatch } from 'react-redux'
import { finishAllTasks } from '../../redux/actions/user'
import styles from '../../Styles/modules/main/main.module.css'
import { Bold } from '../../Styles/typography'
import { Path } from '../Layout/header'
import getCurrentMonth from '../MyTasks/getCurrentMonth'
import ProjTasks from '../MyTasks/projTasks'
import SprintCard from './sprintCard'

const SprintBlock = ({user, history}) => {
  const dispatch = useDispatch()
  const onChange = (e) => {
    let taskid = e.target.value;
    dispatch(finishAllTasks({ taskid }));
    };
    const pushToProject =(link)=>{
      history.push(`./projects/${link}/main`)
    }
    return(
		<div className={styles.my_sprints} style={{marginTop:'30px'}}>
        <div className={styles.create__news}>
          <img className={styles.create__news__img}alt='star' src={Path+'starr.png'}></img>
            <Bold color="black" size="18">
              Избранные задачи
            </Bold>

          </div>
        <ProjTasks mainPage={true} tasks={user.tasks}month={getCurrentMonth(Date.now())} onChange={onChange} pushToProject={pushToProject}history={history}></ProjTasks>
        </div>
    )
}

export default SprintBlock 