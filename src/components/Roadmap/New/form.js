import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { postNew } from "../../../redux/actions/ideas"
import { Button } from "../../../Styles/buttons"









const Form = () => {
  const dispatch = useDispatch()
    const [formData, setFormData]  = useState({
        title: '',
        description: ''        
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    

    const handleSubmit = (e) => {
      e.preventDefault();
      //server requast

      dispatch(postNew(formData));
      setFormData({ title: "", description: "" });
    }

    return (
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            flexDirection: "column"
          }}
        >
          <input
            style={{
                marginBottom: "10px"
            }}
            required
            type="text"
            name="title"
            value={formData.title}
            placeholder="Я хочу..."
            onChange={handleChange}
          />
          
          <textarea
            required
            rows="5"
            style={{resize:'none'}}
            cols="35"
            value={formData.description}
            name="description"
            placeholder="Описание функционала.."
            onChange={handleChange}
          />
        </div>
        <div style={{width:"100%",display:'flex',justifyContent:'flex-end'}}>
          <Button style={{
          zIndex: '20',
          marginTop: "-38px"
        }} type="submit">Отправить</Button>
        </div>
        
      </form>
    );
}


export default Form