import { ButtonTextLight } from "../../../../../../Styles/buttons"
import { Light } from "../../../../../../Styles/typography"
import style from './cardOpen.module.css'


const Comments =()=>{
    let comms = [
        {
            text:'fock you',
            create:'16 апр 14.44'
        },
        {
            text:'no fock you',
            create:'16 апр 14.44'
        },
        {
            text:'leatherman',
            create:'20 апр 14.45'
        },
    ]
    return (
        <div>
           <div className={style.comments__array}>
            {comms.map((comm,i)=>{
                return(
                    <div key={i} className={style.comments__one} >
                        <img src="/starr.png"></img>
                        <Light size='14' color='#878787'className={style.comments__date}>{comm.create}</Light>
                        <Light size='14' color='#878787'className={style.comments__text}>{comm.text}</Light>
                    </div>
                )
            })}
            </div> 
            <textarea className={style.comments__area}
                 placeholder='Добавить комментарий, @упомянуть человека'></textarea>
                 <div className={style.comments__button__area}>
                    <ButtonTextLight>Добавить комментарий</ButtonTextLight>
                 </div>
        </div>
        
    )
}
export default Comments