import { useEffect, useRef, useState } from "react"
import styles from './kanban.module.css'
import { Path } from "../../../Layout/header";
import { ButtonTextLight } from "../../../../Styles/buttons";
import { CSSTransition } from 'react-transition-group'

// to use <ModalMenu buttons={[{title, icon, handler}]}> <icon/> </ModalMenu>


const useClickOutside = (callback) => {
    let domNode = useRef()
    useEffect(()=>{
      let handler = (e) => {
        if (domNode && domNode.current && !domNode.current.contains(e.target)){
          callback()
        }
      }
      document.addEventListener('mousedown',handler)
      return () => document.removeEventListener('mousedown', handler)
    })
  
  return domNode
  }
  

  const ModalMenu = (props) => {


    const [open, setOpen] = useState({
        visible:false,
        x:0,
        y:0,
    })


    const outclick = useClickOutside(()=>setOpen({...open, visible:false}))
    
    const openModal = (e) => {
      e.stopPropagation()
      setOpen({visible: true, x:e.clientX, y:e.clientY})
    }
    
      return(
          <>

        <div onClick={(e)=>openModal(e)} style={{display:'flex', height: '100%', alignItems: "center"}}>
            {props.children}
        </div>

        <CSSTransition 
          in={open.visible}
          timeout={500}
          classNames={{
              enter: styles.formEnter,
              enterActive: styles.formEnterActive,
              exit: styles.formExit,
              exitActive: styles.formExitActive,
          }}
          unmountOnExit
        >
          
              <div ref={outclick} style={{position: 'absolute', backgroundColor: "white", border: '1px solid lightgrey', left: open.x+10+'px', top: open.y+10+'px', padding:'10px', zIndex:'9999'}}>
                {props.buttons && props.buttons.map((el,i)=>{
                  return(
                    <div style={{height:'30px', display: 'flex', alignItems: 'center'}} onClick={()=>el.handler()}>
                      <img alt='plus' src={Path+el.icon} style={{width:'12px',marginRight:'5px',}} />
                      <ButtonTextLight color='black'style={{fontStyle:'italic'}}>{el.title}</ButtonTextLight>
                    </div> 
                  )
                })}
              </div>
        </CSSTransition>
        </>
      )
    } 
    export default ModalMenu


//   const PopUpMenu = ({open, buttons, close}) => {


//     const [visible, setVisible] = useState(false)

//     const outclick = useClickOutside(()=>close())
    
    
//       return(
//         <CSSTransition 
//           in={open.visible}
//           timeout={500}
//           classNames={{
//               enter: styles.formEnter,
//               enterActive: styles.formEnterActive,
//               exit: styles.formExit,
//               exitActive: styles.formExitActive,
//           }}
//           unmountOnExit
//         >
          
//               <div ref={outclick} style={{position: 'absolute', backgroundColor: "white", border: '1px solid lightgrey', left: open.x+10+'px', top: open.y+10+'px', padding:'10px',}}>
//                 {buttons.map((el,i)=>{
//                   return(
//                     <div style={{height:'30px'}} onClick={()=>el.func()}>
//                       <img alt='plus' src={Path+el.icon} style={{width:'12px',marginRight:'5px',}} />
//                       <ButtonTextLight color='black'style={{fontStyle:'italic'}}>{el.title}</ButtonTextLight>
//                     </div> 
//                   )
//                 })}
//               </div>
//         </CSSTransition>
//       )
//     } 
//     export default PopUpMenu