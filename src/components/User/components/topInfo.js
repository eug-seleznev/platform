import { Light, Bold } from "../../../Styles/typography"
import styles from '../../../Styles/modules/components/profile.module.css'


const TopInfo = ({src, text, user, url}) =>{
	return (
		<div className={styles.row2}> 
			<img
				className={styles.small__avatar}
				src={`${url}/${
				user != null ? (user != undefined ? user.avatar : "") : ""
				}`}
			/>
			<div className={styles.gap_img}>
				<div  className={styles.change}>
					<Bold size="30" mobSize="24" className={styles.name}>
					{" "}
					{user.name} {user.lastname}
					</Bold>
				</div>
				<Light color="#4B4B4B" size="16" className={styles.pos}>
					Должность: {user.position}
				</Light>
			</div>
	
		</div>
	)
}
export default TopInfo