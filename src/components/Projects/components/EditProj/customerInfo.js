import { Bold, Thin } from "../../../../Styles/typography"
import style from '../../../../Styles/modules/components/Project/editproj.module.css'
import { useRef, useState } from "react"
import { Button, ButtonText, ButtonTextDiv } from "../../../../Styles/buttons"



const CustomerInfo = ({onCustomerChange,customerNew}) => {
	const firstInput = useRef()
	const secondInput = useRef()
	const [rerender, setRerender] =useState (false)
	const addInfo =()=>{
		setRerender (!rerender)
		customerNew.other.push(firstInput.current.value+': '+secondInput.current.value)
		firstInput.current.value=''
		secondInput.current.value=''
	}
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
						placeholder='phone'
						name='phone'
						value={customerNew.phone}
						onChange={e => onCustomerChange(e)}/>
				</div>
		
			</div>
			<div className={style.titles}>
				<div  className={style.titles__point}>
				
				{customerNew.other.map((el,i)=>{
					return(
						<div className={style.new__title__point} key={i}>
							<Bold style={{marginBottom:'20px'}}>{el}</Bold>
						</div>
					)
				})}
				</div>
			</div>
			<div className={style.titles}>
				<div  className={style.titles__point}>
				<Thin className={style.one__title}>Добавить новый контакт</Thin>
				<div className={style.new__title__point} >
					<input ref={firstInput} placeholder='Платформа'></input>
					<input  ref={secondInput} style={{marginLeft:'15px'}} placeholder='Контакт'></input>
					<ButtonTextDiv style={{marginTop:'15px', cursor:'pointer'}} onClick={addInfo}>Добавить</ButtonTextDiv>
				</div>
					
			
				</div>
			</div>
			
		</div>
    )
}
export default CustomerInfo