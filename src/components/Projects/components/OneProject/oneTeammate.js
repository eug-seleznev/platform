import { Button } from "../../../../Styles/buttons"
import { Card } from "../../../../Styles/common"
import style from '../../../../Styles/modules/components/Project/projteam.module.css'
import { Bold, Light} from "../../../../Styles/typography"
export const url = process.env.REACT_APP_IP;


const ProjTeam = ({userName,userPos,userAvatar,userId,histProp, lastName}) => {
	
	return (
	<>
		{/* {!loaded?<div>loading...</div>:( */}
			<div>
		
				<Card  className={style.card}>
					<div className={style.image_info}>
						<img  className={style.image} src={url+'/'+userAvatar}></img>
						<div className={style.info}>
							<div className={style.name}><Bold size={24}>{userName}</Bold> <Bold size={24}>{lastName}</Bold></div>
							<div className={style.position}><Light size={20}>{userPos}</Light></div>
						</div>
						
					</div>
					<div className={style.button_cont}>
						<Button className={style.button} 
							fontSize={'16px'} 
							padd={'60px'}
                          	title="Профиль сотрудника"
                         	 onClick={() => histProp.push(`/users/${userId}`)}>Профиль</Button>
					</div>
					
				</Card>
			</div>
			
		{/* )} */}
		</>
	)
}
export default ProjTeam