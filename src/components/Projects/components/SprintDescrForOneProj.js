import { useEffect, useState } from "react" 
import style from '../../../Styles/modules/components/Project/oneproj.module.css'
import { Light, Thin } from "../../../Styles/typography"
import { useSelector,useDispatch} from "react-redux"
import { addToChosen } from '../../../redux/actions/auth'
import Tag from "./OneProject/tag"
const SprintDescription = ({tags, dateOpen,taskcomplite, alltasks, history, crypt, id, title, dateClosePlan}) => {
	
	const dispatch = useDispatch();
	const [loaded, setLoaded] = useState (0)
	// const [diff, setDiff] = useState (0)
	const [actualClose, setActualClose] = useState (0)
	const [status, setStatus] = useState (false)
	const chosenSprints = useSelector(state => state.auth.user.sprints)



	useEffect (()=> {


					chosenSprints
          .filter(sprint => sprint._id===id)
          .map(()=>setStatus(true))

          


		

	},  [actualClose])




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
      <div>
        <div className={style.card}>
          <div className={style.first__row}>
            <div className={style.card__title}>
              <Light
                size="16"
                color="#3F496C"
                className={style.link}
                onClick={() => history.push(`tasks/${id}`)}
              >
                {title !== "" && title !== "" ? title : "Нет названия"}
              </Light>
            </div>

            <img
              src="/star.png"
              alt="star"
              onClick={chosenSprint}
              style={{
                cursor: "pointer",
                marginTop: "-5px",
                backgroundColor: `${status ? "#ff9800" : "white"}`,
              }}
              className={style.chosen}
            />
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
              <Thin
                style={{
                  marginTop: "-4px",
                }}
                size="14"
              >
                {taskcomplite}/{alltasks}
              </Thin>
            </div>

            <div className={style.tags}>
              {tags.length !== 0 && (
                tags.map((el, i) => {
                  if (el !== null) {
                    return (
                      <Tag
                        size="13"
                        tagText={el}
                        tagColor={
                          i === 0 ? "#C8D9E9" : i === 1 ? "#E9E3C8" : "#AAF8A8"
                        }
                        key={i}
                      />
                    );
                  }
                })
              ) 
              }
            </div>
          </div>

       
        </div>
      </div>
    </>
  );
}
export default SprintDescription