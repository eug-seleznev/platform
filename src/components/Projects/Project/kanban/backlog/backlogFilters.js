import { Path } from '../../../../Layout/header'
import { KanbanSearchInput, } from '../../../../../Styles/Forms'
import Select from 'react-select'

const BacklogFilters = ({setFilterByBoard, setFilterByUser, setFilterByName, project, boardId}) => {

    const boards1 = project.boards.map((el,i)=>{
                        return {value: el._id, label: el.name,}
                    })
    const boards = [{value:false, label: 'Все доски'}, ...boards1]
    const curBoard = boards.findIndex(el=>el.value===boardId)

    const team2 = project.team2.map((el,i)=>{
                        return {value: el.user._id, label: el.user.fullname,}
                    })
    const team =  [{value:false, label: 'Все исполнители'}, ...team2]

    const selectStyles = {
        option: (provided, state)=> ({...provided, backgroundColor:'transparent',color:'#CACACA',}),
        menu: (provided, state) => ({...provided, backgroundColor:'#3F4659',}),
        dropdownIndicator: (provided, state) => ({...provided, backgroundColor:'transparent',}),
        control: (provided, state) => ({...provided, backgroundColor:'transparent', border: 'none', color:'#CACACA', padding: 0, }),
        singleValue: (provided, state) => ({...provided,  color:'#CACACA', }),
        valueContainer: (provided, state) => ({...provided,  padding:0, }),
        indicatorSeparator: (provided, state) => ({...provided, display:'none'}),
    }

    const inputHandler = (e) => {
        const regex = new RegExp(regexEscape(e.target.value), 'gi')
        setFilterByName(regex)
    }
    function regexEscape(str) {
        return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      }

    return(
        <div onClick={e=>e.stopPropagation()} style={{paddingLeft:'15px',paddingRight:'15px',width:'100%', boxSizing: 'border-box', }}>
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
                placeholder='Поиск по названию'
            />
        </div>
    )
}
export default BacklogFilters