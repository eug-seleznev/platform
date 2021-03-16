import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { searchTag } from "../../../redux/actions/projects";
import { Button } from "../../../Styles/buttons";
import style from '../../../Styles/modules/components/Project/sprintForm.module.css'
import { Thin } from "../../../Styles/typography";
import Tag from "./OneProject/tag";

			
const TagSearch = ({func, tagCount}) => {
	const project = useSelector(state => state.projects.project)
  	const tagArr = useSelector(state => state.projects.tagSearch)
	const dispatch = useDispatch();
	const [tags] = useState ([])
	const [value,setValue] =useState ('')
    const [focus,setFocus] =useState (false)
	const addTag =(e)=>{
        console.log(e.target.id)
        setValue(e.target.id)
      }
      const confirmTag =(e)=>{
        if(!tags.includes(value)&&value!==''&&tagCount){
           tags.push (value)
		   console.log(tags)
		   func(tags)
		   
        }
		else if(!tagCount) {
			console.log(value)
			func(value)
			setValue('')
		}
		
        setValue('')
        console.log(tags)
      }
	
		// useEffect(()=>{
		// 	console.log(tags)
		
		// 		func(tags)
			
			
		// },[tags])
    const searchTags =(e)=> {
      e.preventDefault()
      dispatch(searchTag(e.target.value, project.crypt))
      setValue(e.target.value)
    }
	
	return(
		<div className={style.tagContain}>
			<div className={style.tagTitle} style={{display:`${tagCount?'flex':'none'}`}}><Thin >Тегов для добавления {tags.length}/2:</Thin><div style={{display:'flex',flexWrap:'wrap', marginTop:'10px'}}>{tags.map((el,i)=>{return(<Tag tagText={el} key={i} tagColor={i==0?'#C8D9E9':i==1?'#E9E3C8':'#AAF8A8'}/>)})}</div></div>
			<li style={{display:`${tags.length==2?"none":'flex'}`}}>
			<div>
			<div style={{ fontSize: "20px", marginRight: "10px"}}></div>
			<input
				value={value}
				name='tag'
				autocomplete="off"
				style={{fontFamily:'SuisseIntlThin', fontSize:'16px'}}
				onFocus={()=>setFocus(true)}
				onBlur={()=>setFocus(false)}
				onClick={(e)=>searchTags(e)}
				onChange={(e)=>searchTags(e)}
				onKeyPress={(e)=>e.key=='Enter'?confirmTag(e):''}
				placeholder="Введите тег спринта" // make sure to set up defaultValue
			/>
			<div className={style.searchTag} style={{display:`${tagArr.filter(res=> !tags.includes(res)).length>0?'block':'none'}`}}>
				{tagArr.filter(res=> !tags.includes(res)).map((result,i)=>{
					return(
					<Thin id={result} className={style.searchTagRes}  onClick={(e)=>addTag(e)} key={i}>{result}</Thin>
					)
				})
				}
			</div>
			</div>
					<Button
					type="button"
					style={{
						color: "#3F496C",
						height:'10px',
						marginTop:'-5px',
						marginLeft:'10px',
						backgroundColor: "white",
						border: "none",
					}}
					onClick={() =>
						confirmTag ()
					}
					>
					Добавить тег
					</Button>
				</li>
			</div>
		
		
			  
			)
		 
	}
			
			
export default TagSearch