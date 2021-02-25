import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { usersPartition } from "../../redux/actions/user";



//todo checklist for edit
    let partitionList = ["ПЗ", "ПЗУ", "АР", "КР", "ИОС1", "ЭМ1", "ЭМ2", "ЭМ3", "ЭОМ", "ЭН", "ИОС2", "ИОС3", "ИОС4", "ИОС5", "СКУД", "ИОС7", "ПОС", "ПОД", "ООС", "ПБ", "АГПТ", "САПС", "СОУЭ", "ОДИ", "ЭЭ", ];



const Partition = () => {
    const dispatch = useDispatch();
    const partitionDefault = useSelector(state => state.auth.user.partition) // [] for new user
    const [list, setList] = useState(partitionDefault)



    const onChange = (e) => {

        if(list.includes(e.target.value)){
            list.map((el, index) => {if(el==e.target.value) list.splice(index, 1)})

        } else {
            list.push(e.target.value)
        }
        console.log(list)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(list)
        dispatch(usersPartition(list))    
    }

     return (
       <form onSubmit={onSubmit}>
         {partitionList.map(el => (
           <div>
             <input
               type="checkbox"
               key={el}
               defaultChecked={partitionDefault.includes(el)}
               value={el}
               onChange={(e) => onChange(e)}
             />
             <label for="subscribeNews">{el}</label>
           </div>
         ))}

         <button type="submit">Submit</button>
       </form>
     );
}


export default Partition