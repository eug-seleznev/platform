
import { InfoCard } from '../../../Styles/common'
import styles from '../../../Styles/modules/components/profile.module.css'

import { Bold, Light } from '../../../Styles/typography'
import Contact from './contact'



const UserInfo = ({user, change, link, me}) => {
	return(
		<InfoCard className={styles.info}>
			<div className={styles.row}>
				<Contact text={user.email} src='/mail.png'></Contact>
				<a
					target="_blank"
					href={`https://chat.buro82.ru/direct/${
					user ? user.rocketname : ""
					}`}
				>
					{/* {" "}
					{user.rocketname && user.rocketname}{" "} */}
					<Contact text="Написать сообщение" src='/rocket.png'></Contact>
				</a>
			</div>
				<Contact text={user.phone} src='/phone.png'></Contact>
			<Light style={{marginTop:'10px'}}>Отдел:  {user.division!==null?user.division.divname:'нет'}</Light>
			<Light style={{marginTop:'10px'}}>День рождения:  {user.bday?user.bday.slice(5,10).split('-').reverse().join('.'):''}</Light>
        	{change||me.permission==='admin'? <div style={{marginTop:'7px'}}>Отчетность: <a target="_blank" href={link}>google drive</a></div>:''}
    	</InfoCard>
	)
	
}



export default UserInfo