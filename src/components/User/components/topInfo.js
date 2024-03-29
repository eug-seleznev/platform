import { Light, Bold } from "../../../Styles/typography"
import styles from '../../../Styles/modules/components/profile.module.css'
import { ButtonText } from "../../../Styles/buttons"


const TopInfo = ({ user, url, change, history, enter}) =>{
	return (
		<div className={styles.row2}> 
			<img
			alt='ava' 
				style={{opacity:enter?0.5:1}}
				className={styles.small__avatar}
				src={`${url}/${
				user !== null ? (user !== undefined ? user.avatar : "") : ""
				}`}
			/>
			<div className={styles.gap_img}>
				<div  className={styles.change}>
					<Bold size="30" mobSize="24" className={styles.name}>
					{" "}
					{user.name} {user.lastname}
					</Bold>
					{!change ? (
                ''
              ) : (
                <ButtonText
                  color="#445AAA"
                  fontSize="12"
				style={{transform:'translateY(-7px)'}}
                  onClick={() => history.push(`/edit`)}
                >
                  изменить
                </ButtonText>
              )}
				</div>
				<Light color="#4B4B4B" size="16" className={styles.pos}>
					Должность: {user.position}
				</Light>
			</div>
	
		</div>
	)
}
export default TopInfo