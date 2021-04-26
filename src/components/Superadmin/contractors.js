import { useSelector } from "react-redux"

import { Bold, Regular, Thin} from '../../Styles/typography'
import style from '../../Styles/modules/components/Project/allproj.module.css'
import { useEffect, useState } from "react"
import {useDispatch} from "react-redux"
import { allContractors, background, deleteContractor, findContractorName } from "../../redux/actions/user"
import { SearchInput } from "../../Styles/Forms"
import ConfirmSubDel from "./confirm"
import { Path } from "../Layout/header"
const { NEW_TD, NEW_TR, NEW_TBODY, NEW_TH, NEW_THEAD, NEW_TABLE, Select } = require("../../Styles/tables")






const Contractors = ({history}) => {
	const dispatch = useDispatch ()
    const permission = useSelector(state => state.auth.user.permission)
    const contractors = useSelector(state => state.users.contractors)
    const [sortOrder, setOrder] = useState(false)
    const [chosenContractor, setChosenContractor] = useState({

    })
    const [modal, setModal] = useState(false)

	useEffect (()=>{
        let query = 'name'
		dispatch(allContractors({query, sortOrder}))
	},[])
    const sortFunction = (query) => {
        setOrder(!sortOrder)
        dispatch(allContractors({query, sortOrder}))
    }
    useEffect(()=>{ 
        dispatch(background('white'))
        return () => {
          dispatch(background('#ECECEC'))
        }
      }, [])
    const pushToEdit =(id)=>{
        history.push(`/contractors/${id}`)
    }
    const findContractor =(e)=>{
        let field = e.target.name
        let value = e.target.value
        dispatch (findContractorName({value,field}))
    }
    const delMenu =(contractor)=>{
        setChosenContractor(contractor)
        setModal(true)
    }
    const delInfo = (id) =>{
        dispatch(deleteContractor(id))
        setModal(false)
    }
    return (
        <div className={style.main}>
            <div className={style.row}>
                <div className={style.row__in}>
                        <img src={Path + 'lupa.png'} alt='lupa' className={style.row__img}></img>
                        <SearchInput size='14px' onChange={findContractor} name='name' placeholder='Поиск субподрядчика'  ></SearchInput>
                    </div>
                    <div className={style.row__in}>
                        <img src={Path + 'lupa.png'}alt='lupa' className={style.row__img}></img>
                        <SearchInput size='14' onChange={findContractor} name='partition' placeholder='По разделу'></SearchInput>
                    </div>
                    <div className={style.row__in}>
                        <Thin size='14'>
                            Всего субподрядчиков: {contractors.length}
                        </Thin>
                    </div>
                </div>
            {!contractors ? <p> проектов нет  </p>: (

            <NEW_TABLE>
                <NEW_THEAD>
                    <NEW_TR className={style.first} top='top'> 
                    <NEW_TH onClick={() => sortFunction("name")}>Имя &#8597;</NEW_TH>
                    <NEW_TH>Разделы</NEW_TH>
                    <NEW_TH>Телефон</NEW_TH>
                    <NEW_TH
                    onClick={() => sortFunction("email")}
                    className={style.turn__off}
                    >email &#8597;</NEW_TH>
                        {/* <Td>Спринты</Td> */}
                    </NEW_TR>
                </NEW_THEAD>
                
                <NEW_TBODY>
                    {contractors.map((contractor,index) => {
                    return(  
                    <NEW_TR className={style.contractors} key={index}  >
                    
                        <NEW_TD>{contractor.fullname}</NEW_TD>
                        <NEW_TD style={{display:'flex',flexWrap:'wrap',alignItems:'center', maxWidth:'200px'}}>{contractor.partition.map((el,i)=>{
                            return(<Bold key={i} style={{marginRight:'15px'}}>
                                {el}
                            </Bold>)
                        })}</NEW_TD>
                        <NEW_TD>{contractor.phone}</NEW_TD>
                        <NEW_TD className={style.turn__off}>{contractor.email}</NEW_TD>
                        <NEW_TD style={{display:`${permission==='admin'?'block':'none'}`}}  className={style.editContractor}>
                           <Select value='опции' onChange={(e)=>
                               permission==='admin'&&e.target.value==="изменить"?pushToEdit(contractor._id):
                               permission==='admin'&&e.target.value==="удалить"?delMenu(contractor):''
                                                }>
                                <option style={{display:'none'}} disabled>опции</option>
                               <option >изменить</option>
                               <option>удалить</option>
                            </Select>
                           
                        </NEW_TD>
                    </NEW_TR>
                    )
                })}
                <div style={{display:`${modal?'block':'none'}`}}>
                     <ConfirmSubDel accept={delInfo} contractor={chosenContractor} decline={setModal}></ConfirmSubDel> 
                </div>
                
                </NEW_TBODY>
               
                
           
            </NEW_TABLE>
                        )}
           
        </div> 
    )
}
export default Contractors