import styles from '../../Styles/modules/office/office.module.css'
import { useState, useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import {Reverse} from '../../redux/actions/office'
import {Card} from '../../Styles/common'
import { Bold,  Thin, Regular} from '../../Styles/typography'
import { FilterButton } from '../../Styles/buttons'
import  ProposeCard  from './proposesCard'
import  ProposeForm  from './proposeForm'



const Office = () => {
        const dispatch = useDispatch()
        const data = useSelector(state => state.office.data)

        const [form, setForm] = useState(false);

        let isInitial;


    //dispatch initial value
        useEffect(()=>{
            isInitial = true;
            dispatch(Reverse({isInitial}))
    },[])


    if(data) isInitial=false;

    return (
        <div className={styles.officeContainer}> 
            <Thin size='24' className={styles.title}>Предложения для офиса: </Thin>

            <div className={styles.filters}>
            <FilterButton onClick={() => dispatch(Reverse({data, isInitial}))} >Лайки</FilterButton>
            {/* <FilterButton onClick={() => dispatch(Reverse({data, isInitial}))} >Дата</FilterButton> */}
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
                    <ProposeCard cardContent={el} key={i} className={styles.cardsContainer}/>
                )}      
            </div>

        </div>
    )
}



export default Office