import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { searchTag } from "../../../redux/actions/projects";
import { Button } from "../../../Styles/buttons";
import style from '../../../Styles/modules/components/Project/sprintForm.module.css'
import { Thin } from "../../../Styles/typography";
import Tag from "./OneProject/tag";

			
const TagSearch = ({func}) => {
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
      const confirmTag =()=>{
        if(!tags.includes(value)&&value!==''){
           tags.push (value)
		
        }
		
        setValue('')
        console.log(tags)
      }
		useEffect(()=>{
			func(tags)
		},[tags])
    const searchTags =(e)=> {
      e.preventDefault()
      dispatch(searchTag(e.target.value, project.crypt))
      setValue(e.target.value)
    }
	
	return(
		<div className={style.taskContain}>
			<div className={style.tagTitle}><Thin >Теги для добавления {tags.length}/3:</Thin><div style={{display:'flex', marginTop:'10px'}}>{tags.map((el,i)=>{return(<Tag tagText={el} tagColor={i==0?'#C8D9E9':i==1?'#E9E3C8':'#AAF8A8'}/>)})}</div></div>
			<li style={{display:`${tags.length==3?"none":'flex'}`}}>
			<div>
			<div style={{ fontSize: "20px", marginRight: "10px", marginTop:'13px'}}></div>
			<input
				value={value}
				name='tag'
				autocomplete="off"
				onFocus={()=>setFocus(true)}
				onFucusOut={()=>setFocus(false)}
				onClick={(e)=>searchTags(e)}
				onChange={(e)=>searchTags(e)}
				placeholder="Описание задачи" // make sure to set up defaultValue
			/>
			<div className={style.searchTag}style={{display:`${focus?'block':'none'}`}}>
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
						marginTop:'11px',
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