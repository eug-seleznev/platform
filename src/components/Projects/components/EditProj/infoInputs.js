import { Thin } from "../../../../Styles/typography"
import style from '../../../../Styles/modules/components/Project/editproj.module.css'
import create from '../../../../Styles/modules/components/Project/createPr.module.css'
import { Select } from "../../../../Styles/tables"
import { useEffect } from "react"


const InfoInputs = ({onChange,project,offTitle, title, dateFinish, dateStart, city, customer, about}) => {
    
	useEffect(()=>{
		console.log(city)	
	})
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
					<Thin className={style.one__title}>Заказчик</Thin>
					<input 
					type='text'
					placeholder='Заказчик'
					required
					name='customer'
					value={customer}
					onChange={e => onChange(e)}/>
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
						<option value="ЖК">ЖК</option>
						<option value="Общественное пространство">Общественное пространство</option>
						<option value="Частный дом">Частный дом</option>
						<option value="Визуализация">Визуализации</option>
						<option value="Интерьер">Интерьер</option>
						<option value="Другое">Другое</option>
					</select>
				</div>
				<div className={style.titles__point}>
					<Thin className={style.one__title}>Фаза</Thin>
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
		</div>
    )
}
export default InfoInputs