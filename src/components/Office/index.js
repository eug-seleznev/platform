import styles from '../../Styles/modules/office/office.module.css'
import { useState, useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { newPropose, likedProposes, dateProposes, likePropose, deletePropose} from '../../redux/actions/office'
import {Card} from '../../Styles/common'
import { Bold, Light, Thin, Regular} from '../../Styles/typography'
import {Button } from '../../Styles/buttons'
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





    return (
        <div> 
            <h1> Офис</h1>
        
            <ProposeForm />
      

            <Button onClick={()=>console.log(liked, 'liked', dated, 'dated')}>console log proposes</Button>
            <Button onClick={()=>setShow(show==dated? liked : dated)}>liked</Button>

            <div className={styles.cardsContainer}>
                {show!=null && show.map((el, i)=>{
                    return(
                        
                            <ProposeCard cardContent={el} />
                    )
                })}
            </div>

        </div>
    )
}



export default Office