import styles from '../../Styles/modules/office/office.module.css'
import { useState, useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { newPropose, likedProposes, dateProposes, likePropose, deletePropose} from '../../redux/actions/office'
import {Card} from '../../Styles/common'
import { Bold, Light, Thin, Regular} from '../../Styles/typography'
import {Button, FilterButton, ButtonText } from '../../Styles/buttons'
import  ProposeCard  from './proposesCard'
import  ProposeForm  from './proposeForm'


const Office = () => {



const dispatch = useDispatch()
const liked = useSelector(state => state.office.likedProposes)
const dated = useSelector(state => state.office.dateProposes)
const loaded = useSelector(state => state.office.loaded)

    const [visibleArray, setVisibleArray] = useState({
        content:dated,
        filter:'date'
    })
    const [reverse, setReverse] = useState(false)
    const [form, setForm] = useState(false)

useEffect(()=>{
    
console.log(liked,'liked dont spin, please',visibleArray)

},[visibleArray])


const likeFIlter = () => {
    if(visibleArray.filter!='like'){
        setVisibleArray({filter: 'like', content: liked})
        setReverse(false)

    } if (visibleArray.filter=='like'){
        setVisibleArray({...visibleArray, content: visibleArray.content.reverse()})
        setReverse(!reverse)
    }

}
const dateFIlter = () => {

    if(visibleArray.filter!='date'){
        setVisibleArray({filter: 'date', content: dated})
        setReverse(false)

    } if (visibleArray.filter=='date'){
        setVisibleArray({...visibleArray, content: visibleArray.content.reverse()})
        setReverse(!reverse)
    }
}


useEffect(()=>{

    setVisibleArray({content: dated, filter:'date'})
},[liked, dated])

useEffect(()=>{
    dispatch(likedProposes())
    dispatch(dateProposes())   
},[])

    return (
        <div className={styles.officeContainer}> 
            <Thin size='24' className={styles.title}>Предложения для офиса: </Thin>

            <div className={styles.filters}>
            <FilterButton arrow={visibleArray.filter=='like'? true : false} reverse={reverse} onClick={()=>likeFIlter()}>Лайки</FilterButton>
            <FilterButton arrow={visibleArray.filter=='date'? true : false} reverse={reverse} onClick={()=>dateFIlter()}>Дата</FilterButton>
            </div>
        
        <div className={styles.formArea}>
                {!form?
                    <Card className={styles.openForm} onClick={()=>setForm(true)}>
                        <Bold size='12' color='#3F496C'>Предложить свое...</Bold>
                    </Card>
                    :
                    <ProposeForm closeForm={()=>setForm(false)} />}  
        </div>
           
      

            {/* <Button onClick={()=>console.log(liked, 'liked', dated, 'dated')}>console log proposes</Button> */}
            

            <div className={styles.cardsContainer}>
                {loaded && visibleArray.content!=null && visibleArray.content.map((el, i)=>{
                    return(
                        
                            <ProposeCard cardContent={el} className={styles.cardsContainer} filters={visibleArray.filter} reverse={reverse} />
                    )
                })}

                
            </div>

        </div>
    )
}



export default Office