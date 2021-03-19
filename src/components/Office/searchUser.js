import { useDispatch, useSelector } from 'react-redux'
import { searchUser } from '../../redux/actions/user'
import { CancelButton } from '../../Styles/buttons'
import { Card } from '../../Styles/common'
import styles from '../../Styles/modules/office/office.module.css'
import { Thin } from '../../Styles/typography'
import form from '../../Styles/modules/components/proposesForm.module.css'

const SearchUser = ({func}) => {
	const dispatch = useDispatch ()
	const searchResult = useSelector(state => state.users.searchResult)
	const PeopleList = (e) => {

		let request = e.target.value
		if(request.length>=3){
		
		//  console.log(e.target.value)
		  dispatch(searchUser(request))
		}
		
		
		
   }
   
    return(
		<Card className={form.formCard2}>
                    <Thin size='28' className={form.title2}>Ответственный сотрудник</Thin>
					          <div>
                     <input placeholder='введите имя' className={form.input__long} onChange={(e) => PeopleList(e)}/>
                     <div className={form.searchMenu} >
                       {searchResult.map((user,i)=>{
                       
                        //  console.log(searchResult)
                         return (
                          <div className={form.selector}>
                             <div  key={i}>{user.fullname}</div>
                             <CancelButton fontSize={"12px"} padd={"20px"} onClick={()=>func(user._id)}>Добавить</CancelButton>
                           </div>
                         )
                       })}
                      </div>
                     </div>
					 <CancelButton fontSize={"16px"} padd={"20px"} grey onClick={()=>func(null)} className={form.skip}>Пропустить</CancelButton>
					 
                    </Card>
    )
}
export default SearchUser