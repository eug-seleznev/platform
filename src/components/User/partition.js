import {useRef, useState } from "react"
import {  useSelector } from "react-redux";

import style from '../../Styles/modules/components/Project/createPr.module.css'


//todo checklist for edit
    let partitionList = ["ПЗ", "ПЗУ", "АР", "КР", "ИОС1", "ИОС2-В", "ИОС3-К", "ИОС4-ОВиК","ИОС5-СС","ИОС7-Газ","НСС","НЭС","НВК", "ПОС", "ПОД", "ООС", "ПБ", "АУПТ", "АПС", "СОУЭ", "ОДИ", "ЭЭ", ];



const Partition = ({subcontr, partition}) => {
 
    const partitionDefault = useSelector(state => state.auth.user.partition) // [] for new user
    const [list] = useState(subcontr?[]:partitionDefault)
    const [val, setVal]= useState(false)
    const check = useRef()
 

    const onSubcChange = (e) => {
      setVal(!val)
      if(partition.includes(e.target.value)){
        partition.map((el, index) => 
            {
              if(el===e.target.value) 
              partition.splice(index, 1)
             
              
            })

      } else {
        
         partition.push(e.target.value)
      
      }
    //  console.log(partition)
  }
    const onChange = (e) => {
     
        if(list.includes(e.target.value)){
            list.map((el, index) => 
              {
                if(el===e.target.value) 
                  list.splice(index, 1)
              })

        } else {
            list.push(e.target.value)
        }
        
       
    }

    // const onSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(list)
    //     dispatch(usersPartition(list))    
    // }

     return (

         <div style={{display:'flex', flexWrap:'wrap'}}>
          
          {partition!==undefined?partitionList.map((el,i) => (
            <div className={style.partition} key={i}>
              <input
                type="checkbox"
                key={el}
                ref={check}
                
                 checked={partition.includes(el)?true:false}
                value={el}
                onChange={(e) => {subcontr? onSubcChange(e):onChange(e)}}
              />
              <label htmlFor="subscribeNews">{el}</label>
            </div>
          )):''}

         {/* <button style={{display:`${subcontr?'none':'block'}`}} type="submit">Submit</button> */}
       </div>
      
     );
}


export default Partition