import { useEffect, useState } from "react"
import style from "../../Styles/modules/components/Project/newsprint.module.css"

const AllTasks =({tasks})=>{
	const [id, setId] = useState('')
	useEffect(()=>{
		console.log(tasks)
	},[tasks])
	return(
		<div style={{display:'flex', flexDirection:'column',width:'200px'}}>
			{tasks.map((el)=>{
				return(
					<input
					style={{
						background:`${id===el._id?'white':'none'}`,
						border:`${id===el._id?'1px solid black':'1px solid transparent'}`
					}}
                    className={style.input}
                    type="text"
                    defaultValue={el.taskTitle}
                    name={el._id}
                    onClick={()=>setId(el._id)}
                    // onChange={(e)=>editHandler(e)}
                  ></input>
					
				)
			})}
		</div>
	)
}
export default AllTasks