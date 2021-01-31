import { useEffect, useState } from "react"
import { Button } from "../../../Styles/buttons"
import { Card } from "../../../Styles/common"
import './sprintdescr.css'
import style from '../../../Styles/modules/components/Project/oneproj.module.css'
import { Thin, Bold, Light,Regular } from "../../../Styles/typography"
import { useSelector,useDispatch} from "react-redux"
import { addToChosen } from '../../../redux/actions/auth'
const SprintDescription = ({sprintname, index, dateOpen,taskcomplite, alltasks, history, id, params,descr, dateClosePlan}) => {
	const dispatch = useDispatch();
	const [loaded, setLoaded] = useState (0)
	const [diff, setDiff] = useState (0)
	const [actualClose, setActualClose] = useState (0)
	const [status, setStatus] = useState (false)
	const chosenSprints = useSelector(state => state.auth.user.sprints)
	useEffect (()=> {

			if (actualClose!=null){
				let d1 = new Date ()
				console.log(actualClose, d1)
				setDiff (Math.abs(actualClose-d1)/86400000)
				
				setTimeout (()=>{
					{chosenSprints.filter(sprint => sprint._id===id).map(()=>{
						setStatus(true)
					})}
					setLoaded (true)
				},500)
			}
			
		
	},[actualClose])
	useEffect (()=> {
		if (dateClosePlan!=null) {
			let d2 = new Date (dateClosePlan.slice(0, 10).replace(/-/g, "/"))
			
			setActualClose (d2)
		}
		else if(dateClosePlan==null) {
			let noData = new Date (dateOpen.slice(0, 10).replace(/-/g, "/"))
			setActualClose (noData)
		}	
	},[])	

		const chosenSprint = () => {
			setStatus(!status)
			dispatch(addToChosen(id));
		
		   
		}


	return (
	<>
		{!loaded?<div>loading...</div>:(
		<div>
		
			<Card className={style.card}style={{border:`${!status?'5px solid transparent':'5px solid green'}`}}>
				<div>
					<div className={style.card__date1}>
						<Light size='20'>{dateOpen.slice(5,10).replace(/-/g, ".")}-{dateClosePlan === null?'??': dateClosePlan.slice(5,10).replace(/-/g, ".")}
						</Light>
					</div>
					<div className={style.card__title}>
						<Regular size='30'>Спринт {dateOpen.slice(5,10).replace(/-/g, ".")}
						</Regular>
					</div>
					<div className={style.card__descr}>
						<Light size='16'>{descr}</Light>
					</div>
				</div>
				<div>
					<div className={style.card__date2}> <Light size='16'>Дней до дедлайна: {diff.toString().slice(0,2)}</Light></div>
					<div className={style.card__tasks}> 
						<Regular>Задачи</Regular> 
						<div className={style.card__tasks}> 
							<div className={style.card__thing}><div style={{width:`${Math.trunc(taskcomplite/alltasks*100)}%`}} className={style.card__thing__full}></div></div>
							<Regular>{taskcomplite}/{alltasks}</Regular>
						</div>
						
						
					</div>
					<div className={style.card__buttons}>
						
						<Button fontSize={'16px'}padd={'5px'} onClick={chosenSprint} grey>{!status? 'Добавить в избранное': 'Убрать из избранного'}</Button>
						<Button fontSize={'16px'} onClick={() => history.push(`/projects/${params.id}/${id}`)}>Подробнее</Button>
					</div>
				</div>
				</Card>
			</div>
			
		)}
		</>
	)
}
export default SprintDescription