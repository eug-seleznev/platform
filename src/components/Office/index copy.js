import styles from '../../Styles/modules/office/office.module.css'
import { useState, useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import {Reverse, ReverseDate} from '../../redux/actions/office'
import {Card} from '../../Styles/common'
import { Bold,  Thin, Regular} from '../../Styles/typography'
import { FilterButton } from '../../Styles/buttons'
import  ProposeCard  from './proposesCard'
import  ProposeForm  from './proposeForm'



const Office = () => {
        const dispatch = useDispatch()
        const data = useSelector(state => state.office.data)
        const reload = useSelector(state => state.office.reload)
        const user = useSelector(state => state.auth.user)

        const [form, setForm] = useState(false);
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


useEffect(()=>{


    if (filter=='like'){
        isInitial = true
        
        return dispatch(Reverse({isInitial}))
    } if (filter=='date'){
        isInitial = true

        return dispatch(ReverseDate({isInitial}))
    }


},[reload])



    if(data) isInitial=false;

    return (
        <div className={styles.officeContainer}> 
            <Thin size='24' className={styles.title}>Предложения для офиса: </Thin>

            <div className={styles.filters}>
            <FilterButton arrow={filter=='like'? true : false} reverse={arrowReverse} onClick={() => likeButton()} >Лайки</FilterButton>
            <FilterButton arrow={filter=='date'? true : false} reverse={arrowReverse} onClick={() => dateButton()} >Дата</FilterButton>
            </div>
        
        <div className={styles.formArea}>
                {!form?
                    <Card className={styles.openForm} onClick={()=>setForm(true)}>
                        <Bold size='12' color='#3F496C'>Предложить свое...</Bold>
                    </Card>
                    :
                    <ProposeForm closeForm={()=>setForm(false)} />}  
        </div>
           
                  

            <div className={styles.cardsContainer}>
                {data && data.map((el, i) =>                  
                    <ProposeCard cardContent={el} key={i} className={styles.cardsContainer} user={user}/>
                )}      
            </div>


            

        </div>
    )
}



export default Office