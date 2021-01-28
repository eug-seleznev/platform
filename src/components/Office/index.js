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

useEffect(()=>{
        dispatch(likedProposes())
        dispatch(dateProposes())
        console.log('liked',liked)
        console.log('dated',dated)
},[])

const dispatch = useDispatch()
const liked = useSelector(state => state.office.likedProposes)
const dated = useSelector(state => state.office.dateProposes)
    
    const [show, setShow] = useState(dated)
    const [reverse, setReverse] = useState(false)
    const [form, setForm] = useState(false)
    const [filters, setFilters] = useState()

const reverseFunc = () =>{
  } 

  useEffect(()=>{
   show!=null && setShow(show.reverse()) 


},[reverse])

const likeFIlter = () => {
    if(show!=liked){
        setReverse(false)
        setShow(liked)
        setFilters('по лайкам')
        console.log(show,reverse, 'function !=')
    } else if (show==liked || show==liked.reverse()) {
        setReverse(!reverse)
        console.log(show,reverse, 'function ==')

    }
    
  
    
}
const dateFIlter = () => {
    if(show!=dated){
        setReverse(false)
        setShow(dated)
        setFilters('по дате')
    } else if (show==dated) {
        setReverse(!reverse)
    }
}


    return (
        <div className={styles.officeContainer}> 
            <Thin size='24' className={styles.title}>Предложения для офиса: </Thin>

            <div className={styles.filters}>
            <FilterButton arrow={show==liked? true : false} reverse={reverse} onClick={()=>likeFIlter()}>Лайки</FilterButton>
            <FilterButton arrow={show==dated? true : false} reverse={reverse} onClick={()=>dateFIlter()}>Дата</FilterButton>
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
                {show!=null && show.map((el, i)=>{
                    return(
                        
                            <ProposeCard cardContent={el} className={styles.cardsContainer} filters={filters} reverse={reverse} />
                    )
                })}

                
            </div>

        </div>
    )
}



export default Office