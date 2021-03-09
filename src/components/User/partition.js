import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { usersPartition } from "../../redux/actions/user";
import style from '../../Styles/modules/components/Project/createPr.module.css'


//todo checklist for edit
    let partitionList = ["ПЗ", "ПЗУ", "АР", "КР", "ИОС1", "ЭМ1", "ЭМ2", "ЭМ3", "ЭОМ", "ЭН", "ИОС2", "ИОС3", "ИОС4", "ИОС5", "СКУД", "ИОС7", "ПОС", "ПОД", "ООС", "ПБ", "АГПТ", "САПС", "СОУЭ", "ОДИ", "ЭЭ", ];



const Partition = ({subcontr, partition, setPartitionList,checked}) => {
    const dispatch = useDispatch();
    const partitionDefault = useSelector(state => state.auth.user.partition) // [] for new user
    const [list, setList] = useState(subcontr?[]:partitionDefault)
    const [val, setVal]= useState(false)
    const check = useRef()
 

    const onSubcChange = (e) => {
      setVal(!val)
      if(partition.includes(e.target.value)){
        partition.map((el, index) => 
            {
              if(el==e.target.value) 
              partition.splice(index, 1)
             
              
            })

      } else {
        
         partition.push(e.target.value)
      
      }
     console.log(partition)
  }
    const onChange = (e) => {
     
        if(list.includes(e.target.value)){
            list.map((el, index) => 
              {
                if(el==e.target.value) 
                  list.splice(index, 1)
              })

        } else {
            list.push(e.target.value)
        }
        console.log(list)
       
    }

    // const onSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(list)
    //     dispatch(usersPartition(list))    
    // }

     return (

         <div style={{display:'flex', flexWrap:'wrap'}}>
          
          {partition!==undefined?partitionList.map(el => (
            <div className={style.partition} >
              <input
                type="checkbox"
                key={el}
                ref={check}
                
                 checked={partition.includes(el)?true:false}
                value={el}
                onChange={(e) => {subcontr? onSubcChange(e):onChange(e)}}
              />
              <label for="subscribeNews">{el}</label>
            </div>
          )):''}

         {/* <button style={{display:`${subcontr?'none':'block'}`}} type="submit">Submit</button> */}
       </div>
      
     );
}


export default Partition