import { Button } from "../../../../Styles/buttons"
import { Card } from "../../../../Styles/common"
import table from '../../../../Styles/modules/components/Project/allproj.module.css'
import { Table, Td, Tr } from "../../../../Styles/tables";
import { Bold, Light} from "../../../../Styles/typography"
export const url = process.env.REACT_APP_IP;


const ProjTeam = ({userName,userPos,userAvatar,userId,histProp, lastName}) => {
	
	return (
	<>
		{/* {!loaded?<div>loading...</div>:( */}
			<div>
		
		
			
					<Tr className={table.tr__inproj}>
						<Td >ОВ</Td>
						<Td className={table.turn__off}>{userName}</Td>
						<Td className={table.turn__off}>{userPos}</Td>
						<Td >email</Td>
						<img className={table.turn__off} className={table.image} src={url+'/'+userAvatar}></img>
			  		</Tr>
					{/* <div className={style.image_info}>
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
					</div> */}
				
	
			</div>
			
		{/* )} */}
		</>
	)
}
export default ProjTeam