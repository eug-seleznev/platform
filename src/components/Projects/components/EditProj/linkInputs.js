import { Thin } from "../../../../Styles/typography"
import style from '../../../../Styles/modules/components/Project/editproj.module.css'



const  LinkInputs = ({cusStorage,schedule,budget, onChange}) => {
    
	
    return(
		<div className={style.inputs}>
			<div className={style.titles}>
				<div className={style.titles__point}>
					<Thin className={style.one__title}>Ссылка на бюджет</Thin>
					<input 
					type='text'
					placeholder='Ссылка на бюджет'
					name='budget'
					required
					value={budget}
					onChange={onChange}/>
				</div>
				<div className={style.titles__point}>
					<Thin className={style.one__title}>Ссылка на календарный график</Thin>
					<input 
					type='text'
					placeholder='Ссылка на календарный график'
					required
					name='schedule'
					value={schedule}
					onChange={e => onChange(e)}/>
				</div>
			</div>
			<div className={style.titles}>
				<div className={style.titles__point}>
					<Thin className={style.one__title}>Ссылка на хранилище документации</Thin>
					<input 
					type='text'
					placeholder='Ссылка на хранилище документации'
					name='cusStorage'
					required
					value={cusStorage}
					onChange={onChange}/>
				</div>
			</div>
		</div>
    )
}
export default LinkInputs