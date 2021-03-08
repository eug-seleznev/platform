import { Thin } from "../../../../Styles/typography"
import style from '../../../../Styles/modules/components/Project/editproj.module.css'



const CustomerInfo = ({onCustomerChange,customerNew}) => {
    
	
    return(
		<div className={style.inputs}>
			<div className={style.titles}>
				<div className={style.titles__point}>
					<Thin className={style.one__title}>Заказчик</Thin>
					<input 
					type='text'
					placeholder='заказчик'
					name='name'
					value={customerNew.name}
					onChange={e => onCustomerChange(e)}/>
				</div>
				<div className={style.titles__point}>
					<Thin className={style.one__title}>Почта заказчика</Thin>
					<input 
					type='text'
					placeholder='почта'
					name='email'
					value={customerNew.email}
					onChange={e => onCustomerChange(e)}/>
				</div>
			</div>
			<div className={style.titles}>
				<div className={style.titles__point}>
					<Thin className={style.one__title}>Телефон заказчика</Thin>
					<input 
						type='text'
						placeholder='date'
						name='phone'
						value={customerNew.phone}
						onChange={e => onCustomerChange(e)}/>
				</div>
			</div>
		</div>
    )
}
export default CustomerInfo