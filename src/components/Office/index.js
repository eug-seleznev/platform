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
let revLiked;
const revDated = dated!=null && dated.reverse()
const loaded = useSelector(state => state.office.loaded)

    const [show, setShow] = useState(dated)
    const [reverse, setReverse] = useState(false)
    const [form, setForm] = useState(false)
    const [filters, setFilters] = useState()


  useEffect(()=>{
//    show!=null && setShow(show.reverse()) 
console.log(liked, 'liked')
console.log(revLiked, 'revLiked')


},[reverse])

const likeFIlter = () => {
    if(show!=liked){
        setReverse(false)
        setShow(liked)
        setFilters('по лайкам')
        console.log(show,reverse, 'function !=')
    } else if (show==liked ) {
        setReverse(true)
        setShow(revLiked)
        console.log(show,reverse,revLiked, 'function ==')

    } else if (show==revLiked){
        setReverse(false)
        setShow(liked)
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
useEffect(()=>{

},[liked, dated])



useEffect(() => {
 
}, [])


useEffect(()=>{
    dispatch(likedProposes())
    dispatch(dateProposes())
    setTimeout(()=>{setShow(dated)},200)
   
},[])

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
                {loaded && show!=null && show.map((el, i)=>{
                    return(
                        
                            <ProposeCard cardContent={el} className={styles.cardsContainer} filters={filters} reverse={reverse} />
                    )
                })}

                
            </div>

        </div>
    )
}



export default Office