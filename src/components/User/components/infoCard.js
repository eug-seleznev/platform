
import { InfoCard } from '../../../Styles/common'
import styles from '../../../Styles/modules/components/profile.module.css'

import { Light } from '../../../Styles/typography'
import { Path } from '../../Layout/header'
import Contact from './contact'



const UserInfo = ({user, change, link, me, mainPage}) => {
	return(
		<InfoCard className={styles.info}>
			<div className={styles.row}>
				<Contact text={user.email}  src={Path + 'mail.png'}></Contact>
				
			</div>
				<Contact text={user.phone}  src={Path + 'phone.png'}></Contact>
			<Light size='14' style={{marginTop:'10px',paddingTop:'8px',borderTop:'1px solid #CECECE'}}>Отдел:  {user.division!==null&&user.division!==undefined?user.division.divname:'нет'}</Light>
			<Light size='14' style={{marginTop:'10px'}}>День рождения:  {user.bday?user.bday.slice(5,10).split('-').reverse().join('.'):''}</Light>
        	{change||me.permission==='admin'? <Light size='14' style={{marginTop:'7px'}}>Отчетность: <a target="_blank" rel="noreferrer" href={link}>google drive</a></Light>:''}
			<a	style={{display:`${mainPage?'none':'block'}`}}	className={styles.rocket}
					target="_blank"
					rel="noreferrer"
					href={`https://chat.buro82.ru/direct/${
					user ? user.rocketname : ""
					}`}
				>
					{/* {" "}
					{user.rocketname && user.rocketname}{" "} */}
					<Contact  text="Написать сообщение"  src={Path + 'rocket.png'}></Contact>
				</a>
    	</InfoCard>
	)
	
}



export default UserInfo