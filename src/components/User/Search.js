import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allDepartments } from "../../redux/actions/department";
import { userSearch } from "../../redux/actions/user";
import { Thin } from "../../Styles/typography";


const Search = ({project}) => {
    const dispatch = useDispatch()
    const departments = useSelector(state => state.departments.departments)
    const [submited, setSubmited] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        division: '',
        partition: '',
        crypt: project.crypt
    })




    const onChange = (e) => {
        // console.log(e.target.value)
        setFormData({...formData, [e.target.name]: e.target.value} )
        if(!submited) setSubmited(true)
    }

    useEffect(() => {
      if(submited){
        //server call

        dispatch(userSearch(formData));
      }
    }, [formData])

    return (
      <div >
        <form style={{margin:'25px'}}>
          <Thin size='16'>Поиск по имени</Thin>
          <input type="text" name="name" onChange={onChange}></input>

          <Thin size='16' style={{marginTop:'20px'}}>Поиск по отделу</Thin>
          <select
            onClick={() => dispatch(allDepartments())}
            onChange={onChange}
            name="division"
          >
            <option value="">Выбрать отдел</option>
            {!departments ? (
              <option> loading</option>
            ) : (
              departments.map((department) => {
                return (
                  <option value={department.divname}>{department.divname} </option>
                );
              })
            )}
          </select>

          <Thin size='16'>Поиск по разделу</Thin>
          <input type="text" name="partition" onChange={onChange}></input>
        </form>
        
      </div>
    );
}



export default Search





