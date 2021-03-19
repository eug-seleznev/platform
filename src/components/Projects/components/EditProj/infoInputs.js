import { Thin } from "../../../../Styles/typography"
import style from '../../../../Styles/modules/components/Project/editproj.module.css'
import create from '../../../../Styles/modules/components/Project/createPr.module.css'
import { useState } from "react"
import {  ButtonTextDiv } from "../../../../Styles/buttons"
import { useDispatch } from "react-redux"
import { changeRocket } from "../../../../redux/actions/projects"


const InfoInputs = ({onChange,project,offTitle, title, dateFinish, dateStart,object, city, about, crypter}) => {
  	const [oldRocket, setOldRocket] = useState (false)
	const [currentRocket, setCurrentRocket] = useState ('')
	const dispatch = useDispatch() 
	const onRocketChange =(e)=>{
		setCurrentRocket(e.target.value)
	}
	const addOldRocket =()=>{
		dispatch(changeRocket(project.crypt, currentRocket))
		setOldRocket (false)
	}

    return(
		<div className={style.inputs}>
			<div className={style.titles}>
				<div className={style.titles__point}>
					<Thin className={style.one__title}>Название</Thin>
					<input 
					type='text'
					placeholder={project.title}
					name='title'
					value={title}
					required
					onChange={e => onChange(e)}/>
				</div>
				<div className={style.titles__point}>
					<Thin className={style.one__title}>Официальное название</Thin>
					<input 
					type='text'
					placeholder={project.offTitle}
					name='offTitle'
					value={offTitle}
					required
					onChange={e => onChange(e)}/>
				</div>
			</div>
			<div className={style.titles}>
				<div className={style.titles__point}>
					<Thin className={style.one__title}>Дата начала</Thin>
					<input 
					type='date'
					placeholder='date'
					name='dateStart'
					value={dateStart}
					onChange={e => onChange(e)}/>
				</div>
				<div className={style.titles__point}>
					<Thin className={style.one__title}>Дата окончания</Thin>
					<input 
						type='date'
						placeholder='date'
						name='dateFinish'
						value={dateFinish}
						onChange={e => onChange(e)}/>
				</div>
			</div>
			<div className={style.titles}>
				<div className={style.titles__point}>
					<Thin className={style.one__title}>Город</Thin>
					<input 
					type='text'
					placeholder='Город'
					name='city'
					required
					value={city}
					onChange={onChange}/>
				</div>
				<div className={style.titles__point}>
					<Thin className={style.one__title}>Шифр</Thin>
					<input 
					type='text'
					placeholder='Шифр'
					name='crypter'
					required
					value={crypter}
					onChange={onChange}/>
				</div>
			</div>
			<div className={style.titles}>
				<div className={style.titles__point}>
					<Thin className={style.one__title}>Тип проекта</Thin>
					<select
						defaultValue={project.type}
						name="type"
						onChange={(e) => onChange(e)}
						className={create.select}
						
					>
						
						<option value="Архитектура">Архитектура</option>
						<option value="Сети">Сети</option>
						<option value="Экстерьер">Экстерьер</option>
						<option value="Визуализация">Визуализация</option>
						<option value="Ландшафт">Ландшафт</option>
						<option value="Конструкции">Конструкции</option>
						<option value="Интерьер">Интерьер</option>
						<option value="Другое">Другое</option>
					</select>
				</div>
				<div className={style.titles__point}>
					<Thin className={style.one__title}>Стадия</Thin>
					<select
                     defaultValue={project.stage}
                     name="stage"
                     onChange={(e) => onChange(e)}
                     className={create.select}
                   >
                     <option value="Концепт">Концепт</option>
                     <option value="Эскиз">Эскиз</option>
                     <option value="Проект">Проект</option>
                     <option value="Рабочая">Рабочая</option>
                   </select>
				</div>
			</div>
			<div className={style.titles}>
				<div className={style.titles__point}>
					<Thin className={style.one__title} style={{marginTop:'20px'}}>Объект</Thin>
					<input 
					type='text'
					placeholder='Объект'
					name='object'
					required
					value={object}
					onChange={onChange}/>
				</div>
			</div>
			<div>
				<div style={{marginRight:'50px'}}>
					<Thin className={style.one__title}style={{marginTop:'20px', marginBottom:'5px'}}>Описание</Thin>
					<textarea
						type='text'
						placeholder='описание'
						name='about'
						className={style.about}
						value={about}
						onChange={(e) => onChange(e)}/>
				</div>
			</div>
			<ButtonTextDiv style={{display:`${!oldRocket?'block':'none'}`}} onClick={()=>setOldRocket(true)} >Изменить комнату рокетчата</ButtonTextDiv>
			<input placeholder='Введите название комнаты' style={{display:`${oldRocket?'block':'none'}`}} onChange={(e)=>onRocketChange(e)} onKeyPress={(e)=>e.key==='Enter'?addOldRocket(e):''} />
			<ButtonTextDiv style={{display:`${oldRocket?'block':'none'}`}}  onClick={(e)=>addOldRocket(e)}>Сохранить</ButtonTextDiv>
		</div>
    )
}
export default InfoInputs