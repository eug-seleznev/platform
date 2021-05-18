import { ButtonTextLight } from "../../../../../../Styles/buttons"
import { Light } from "../../../../../../Styles/typography"

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
           <div style={{marginTop:'10px',marginLeft:'25px'}}>
            {comms.map((comm,i)=>{
                return(
                    <div style={{display:'flex',alignItems:'center',marginTop:'10px'}} >
                        <img src="/starr.png"></img>
                        <Light size='14' color='#878787' style={{marginLeft:'15px',width:'85px'}}>{comm.create}</Light>
                        <Light size='14' color='#878787' style={{marginLeft:'15px'}}>{comm.text}</Light>
                    </div>
                )
            })}
            </div> 
            <textarea style={{
                resize:'none',padding:'10px',
                width:'90%',borderRadius:'5px',margin:'25px',
                marginBottom:'5px',
                border:'1px solid #8FA7C6',
                 fontFamily:'SuisseIntlLight'}} 
                 placeholder='Добавить комментарий, @упомянуть человека'></textarea>
                 <div style={{display:'flex',width:'97%',justifyContent:'flex-end',marginRight:'25px'}}>
                    <ButtonTextLight>Добавить комментарий</ButtonTextLight>
                 </div>
        </div>
        
    )
}
export default Comments