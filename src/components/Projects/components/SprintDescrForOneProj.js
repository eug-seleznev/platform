import { useEffect, useState } from "react"
import { Button } from "../../../Styles/buttons"
import { Card } from "../../../Styles/common"
import './sprintdescr.css' //css испортируется тут глобальный. У нас глобальный уже создан ниже, и делать новый смысла нет - тут нужны modules
import style from '../../../Styles/modules/components/Project/oneproj.module.css'
import { Bold, Light,Regular, Thin } from "../../../Styles/typography"
import { useSelector,useDispatch} from "react-redux"
import { addToChosen } from '../../../redux/actions/auth'
import Tag from "./OneProject/tag"
const SprintDescription = ({projStatus,tags, dateOpen,taskcomplite, alltasks, history, id, params,descr, title, dateClosePlan}) => {
	
	const dispatch = useDispatch();
	const [loaded, setLoaded] = useState (0)
	const [diff, setDiff] = useState (0)
	const [actualClose, setActualClose] = useState (0)
	const [status, setStatus] = useState (false)
	const chosenSprints = useSelector(state => state.auth.user.sprints)
	useEffect (()=> {

			if (actualClose!=null){
				let d1 = new Date ()
				// console.log(actualClose, d1)
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
		console.log()
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
      {!loaded ? (
        <div>loading...</div>
      ) : (
        <div>
          <div className={style.card}>
            <div className={style.first__row}>
              <div className={style.card__title}>
                <Light
                  size="24"
                  color="#3F496C"
                  className={style.link}
                  onClick={() => history.push(`/projects/${params.id}/${id}`)}
                >
				{title}
                </Light>
              </div>

              <img
                src="/star.png"
                onClick={chosenSprint}
                style={{
                  cursor: "pointer",
                  backgroundColor: `${status ? "#ff9800" : "#FFF3B6"}`,
                }}
                className={style.chosen}
              ></img>
            </div>
            <div className={style.second__row}>
              <div className={style.card__tasks}>
                <div className={style.card__thing}>
                  <div
                    style={{
                      width: `${Math.trunc((taskcomplite / alltasks) * 100)}%`,
                    }}
                    className={style.card__thing__full}
                  ></div>
                </div>
                <Thin>
                  {taskcomplite}/{alltasks}
                </Thin>
              </div>
              <div className={style.tags}>
                {tags.length !== 0 ? (
                  tags.map((el, i) => {
                    if (el !== null) {
                      return (
                        <Tag
                          tagText={el}
                          tagColor={
                            i == 0 ? "#C8D9E9" : i == 1 ? "#E9E3C8" : "#AAF8A8"
                          }
                          key={i}
                        />
                      );
                    }
                  })
                ) : (
                  <Thin>Тегов нет</Thin>
                )}
              </div>
            </div>

            <div>
              {/* <div className={style.card__date2}> <Light  size='16'>Дней до дедлайна: {diff.toString().slice(0,2)}</Light></div> */}
              {/* <div className={style.card__tasks}> 
						
						
						
						
					</div> */}
              {/* <div className={style.card__buttons} style={{display:`${projStatus?'none':'flex'}`}} >
						
						<Button fontSize={'16px'}padd={'5px'}  onClick={chosenSprint} grey>{!status? 'Добавить в избранное': 'Убрать из избранного'}</Button>
						<Button fontSize={'16px'}>Подробнее</Button>
					</div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default SprintDescription