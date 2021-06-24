import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ButtonTextLight, Button, KanbanButton } from '../../../../Styles/buttons'
import { Path } from '../../../Layout/header'
import KanbanCard from './card/card'
import styles from './kanban.module.css'
import { CSSTransition } from "react-transition-group";
import { moveCard } from "../../../../redux/actions/kanban";
import { Regular } from '../../../../Styles/typography'
import { KanbanSearchInput, } from '../../../../Styles/Forms'
import Select from 'react-select'
import CreateForm from './createForm'

const Backlog =({sideOpen,setCreateOpen, backlog, projectCrypt, boardId, history, project,closeBacklog})=>{

    const dispatch = useDispatch()
    const [newCardInput, setNewCardInput] = useState(false)

    const [filterByBoard, setFilterByBoard] = useState(boardId)
    const [filterByUser, setFilterByUser] = useState(false)
    const [filterByName, setFilterByName] = useState('')
    const filterredCards = backlog && 
    backlog
        .filter(el=>filterByBoard? el.board_id===filterByBoard : true)
        .filter(el=>filterByUser? el.execs.some(el=>el._id===filterByUser) : true)
        .filter(el=>el.title.match(filterByName))

    const createFromBacklog = (e)=>{
        e.stopPropagation()

        setCreateOpen ({
            status:true,
            place:'backlog'
        })
    }
    // const refBG = useRef(null)
    const [addGhost, setAddGhost] = useState(false)


    const dragFunction = (e,index) => {
        try {
            const data = JSON.parse(e.dataTransfer.getData('text'));
            dispatch(moveCard({
                cardId:data.cardId, 
                from:  data.backlog ? 'backlog' : 'timeline',
                oldPlaceId:  data.timelineId || undefined,
                to : 'backlog' ,
                newPlaceId : projectCrypt ,
                board_id : boardId,
                index: index,
            }))

        } catch (e) {
            console.log('Не получилось переместить карточку', e)
        }
    }

    const dragOver = (e) => {
        e.preventDefault()
        // refBG.current.style.backgroundColor = 'rgb(227, 225, 233)'
        setAddGhost('ghost last')
    }
    const dragOut = (e) => {
        e.preventDefault()
        // refBG.current.style.backgroundColor='white'
        setAddGhost(false)
    }
    const dropCard = (e) => {
        e.preventDefault()
        // refBG.current.style.backgroundColor='white'
        dragFunction(e, backlog.length)

        setAddGhost(false)
    
    }
    const cardDragOver = (e,i) => {
        e.preventDefault()
        e.stopPropagation()
        // console.log('he')

        setAddGhost(`ghost${i}`)
    }
    const cardDragOut = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setAddGhost(false)
    }
    const dropToCard = (e, index) => {
        e.stopPropagation()
        console.log('drop to card')
        dragFunction(e, index)
        setAddGhost(false)

      }


    ////////////// select filter states
    const boards1 = project.boards.map((el,i)=>{
        return {value: el._id, label: el.name,}
    })
    const boards = [{value:false, label: 'Все доски'}, ...boards1]
    const team2 = project.team2.map((el,i)=>{
        return {value: el.user._id, label: el.user.fullname,}
    })
    const team =  [{value:false, label: 'Все исполнители'}, ...team2]
    const curBoard = boards.findIndex(el=>el.value===boardId)

    const selectStyles = {
        option: (provided, state)=> ({...provided, backgroundColor:'transparent',color:'#CACACA',}),
        menu: (provided, state) => ({...provided, backgroundColor:'#3F4659',}),
        dropdownIndicator: (provided, state) => ({...provided, backgroundColor:'transparent',}),
        control: (provided, state) => ({...provided, backgroundColor:'transparent', border: 'none', color:'#CACACA', padding: 0, }),
        singleValue: (provided, state) => ({...provided,  color:'#CACACA', }),
        valueContainer: (provided, state) => ({...provided,  padding:0, }),
        indicatorSeparator: (provided, state) => ({...provided, display:'none'}),
    }
    ///////////////// input name filter states
    const inputHandler = (e) => {
        const regex = new RegExp(regexEscape(e.target.value), 'gi')
        setFilterByName(regex)
    }
    function regexEscape(str) {
        return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      }


    return (
        <>
        <div 
            style={{display: sideOpen? 'block' : 'none', width: '100%'}} 
            onDragOver={dragOver} 
            onDragLeave={dragOut} 
            onDrop={dropCard}
            >
                <div style={{display:'flex', margin:'8px', marginBottom:'30px'}}>
                    <Regular size='18' color='white'>
                        Задачи
                    </Regular>
                    <Regular size='12' color='black' 
                        style={{marginLeft:'10px', width:'18px',  textAlign:'center', alignSelf:'center', backgroundColor: '#E4E4E4', borderRadius:'100%', paddingTop:'3px', paddingBottom:'3px'}}
                        >
                            {filterredCards.length}
                    </Regular>
                    <img src={Path+'backlogArrow.png'} onClick={closeBacklog} style={{width: '8px', height: '16px',alignSelf: 'center',marginLeft: "auto", marginRight: '10px',cursor: 'pointer'}} />
                </div>
            
            <div onClick={e=>e.stopPropagation()} style={{paddingLeft:'15px',paddingRight:'15px',width:'100%', boxSizing: 'border-box', borderBottom: '1px solid #7F8DA1'}}>
                <Select 
                    options={boards}
                    defaultValue={boards[curBoard]}
                    onChange={e=>setFilterByBoard(e.value)}
                    styles={selectStyles}
                />
                <Select 
                    options={team}
                    defaultValue={team[0]}
                    onChange={e=>setFilterByUser(e.value)}
                    styles={selectStyles}
                />
                <img src={Path+'search-white.png'} style={{alignSelf: 'center'}} />
                <KanbanSearchInput onChange={inputHandler} 
                type='text'
                placeholder='Поиск по названию'/>
            </div>
            
            
            <div className={styles.backLogCards} >
                <div onDragOver={e=>e.stopPropagation()} >
                    {filterredCards.map((card,i)=>{
                        return(
                            <div onDragOver={(e)=>cardDragOver(e,i)} onDragLeave={(e)=>cardDragOut(e)} onDrop={(e)=>dropToCard(e,i)}>
                            
                            {addGhost===`ghost${i}`?<div className={styles.addGhost}/>
                            :
                            <KanbanCard history={history} key={i} info={card} backlog={true}/>
                            }
                            </div>
                        )
                    })

                    }
                </div>
               <CSSTransition
                    in={addGhost==='ghost last'}
                    timeout={200}
                    classNames={{
                    enter: styles.ghostEnter,
                    enterActive: styles.ghostEnterActive,
                    exit: styles.ghostExit,
                    exitActive: styles.ghostExitActive,
                }}
                unmountOnExit
                // onEntered={() => ghostEntered()}
                // onExited={() => setNext(true)}
            >
                    <div className={styles.addGhost}/>
            </CSSTransition>
            {!newCardInput 
                ? <KanbanButton color='#E4E4E4' style={{marginTop:'15px'}} onClick={()=>setNewCardInput(true)}>
                     <img src={Path+'kanban-plus-white.png'} style={{marginRight: '5px',}}/>
                     Создать карточку
                  </KanbanButton> 
                : <CreateForm backlog boardId={boardId} closeForm={()=>setNewCardInput(false)} projectCrypt={projectCrypt} />
            }
            </div>
                    
            
            
        </div>
        
        </>
        
    )
}
export default Backlog