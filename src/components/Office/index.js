import styles from '../../Styles/modules/office/office.module.css'
import { useState, useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import {inWork, Reverse, ReverseDate} from '../../redux/actions/office'
import {Card, ModalContainer} from '../../Styles/common'
import { Bold,  Thin, Regular, Light} from '../../Styles/typography'
import { FilterButton } from '../../Styles/buttons'
import  ProposeCard  from './proposesCard'
import  ProposeForm  from './proposeForm'
import SearchUser from './searchUser'



const Office = () => {
        const dispatch = useDispatch()
        const data = useSelector(state => state.office.data)
        const reload = useSelector(state => state.office.reload)
        const user = useSelector(state => state.auth.user)
        const [id, setId] = useState (null)
        const [form, setForm] = useState(false);
        const [modal, setModal] = useState(false);
        const [filter, setFilter] = useState('');
        const [arrowReverse, setArrowReverse] = useState('');

        let isInitial;

    //dispatch initial value
    useEffect(()=>{
        setFilter('like')
        isInitial = true;
        dispatch(Reverse({isInitial}))
},[])


const likeButton = ()=>{
    if (filter!='like'){
        isInitial = true
        setFilter('like')
        setArrowReverse(false)
        return dispatch(Reverse({isInitial}))
    }
    setArrowReverse(!arrowReverse)
    dispatch(Reverse({data, isInitial}))
   
}
const dateButton = ()=>{
    if (filter!='date'){
        isInitial = true
        setFilter('date')
        setArrowReverse(false)
        return dispatch(ReverseDate({isInitial}))
    }
    setArrowReverse(!arrowReverse)
    dispatch(ReverseDate({data, isInitial}))
   
}
const workDispatch =(user)=>{
    console.log(user)
    dispatch(inWork(id, user))
    setModal(false)
}


useEffect(()=>{


    if (filter=='like'){
        isInitial = true
        
        return dispatch(Reverse({isInitial}))
    } if (filter=='date'){
        isInitial = true

        return dispatch(ReverseDate({isInitial}))
    }


},[reload])

 const addExecutor =(id) =>{
    setModal(true) 
    setId(id)
 }

    if(data) isInitial=false;

    return (
        <div > 
            <div className={styles.row}>
                <Light size='24' className={styles.title}>Предложения для офиса </Light>
                {!form?<img src='/plus.png'style={{paddingTop:'5px', cursor:'pointer'}} onClick={()=>setForm(true)}></img>:
                    <ModalContainer><ProposeForm closeForm={()=>setForm(false)} /></ModalContainer>} 
                {!modal?'':
                    <ModalContainer>
                        <SearchUser func={workDispatch}/>
                    </ModalContainer>} 
            </div>

            <div className={styles.filters}>
                <FilterButton arrow={filter=='like'? true : false} reverse={arrowReverse} onClick={() => likeButton()} >Лайки</FilterButton>
                <FilterButton arrow={filter=='date'? true : false} reverse={arrowReverse} onClick={() => dateButton()} >Дата</FilterButton>
            </div>
        
        {/* <div className={styles.formArea}>
                 {!form?
                    <Card className={styles.openForm} onClick={()=>setForm(true)}>
                        <Bold size='12' color='#3F496C'>Предложить свое...</Bold>
                    </Card>
                    :
                    <ProposeForm closeForm={()=>setForm(false)} />}   
        </div> */}
           
                  
            <div className={styles.row__array} >
                <div className={styles.col__array}>
                    <Light size='24'className={styles.title__array} >На рассмотрении</Light>
                {data && data.filter(el=>el.status==0).map((el, i) =>                  
                    <ProposeCard addExecutor={addExecutor} cardContent={el} key={i} off={true} className={styles.cardsContainer} user={user}/>
                )}      
                </div>
                <div className={styles.col__array}>
                    <Light size='24' className={styles.title__array}>В работе</Light>
                    {data && data.filter(el=>el.status==1).map((el, i) =>                  
                        <ProposeCard cardContent={el} key={i} className={styles.cardsContainer} user={user}/>
                    )}      
               </div>
               <div className={styles.col__array}>
                    <Light size='24' className={styles.title__array}>Завершенные</Light>
                    {data && data.filter(el=>el.status==2).map((el, i) =>                  
                        <ProposeCard rip={true} cardContent={el} key={i} className={styles.cardsContainer} user={user}/>
                    )}      
               </div>
            </div>
               
          
            

            

        </div>
    )
}



export default Office