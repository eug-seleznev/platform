import { useState } from "react"
import { useSelector } from "react-redux"









const Form = () => {
    const user = useSelector(state => state.auth.user)
    const [formData, setFormData]  = useState({
        title: '',
        description: '',
        user: user._id,
        
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    

    const handleSubmit = (e) => {
        e.preventDefault();
        //server requast
    }

    return (
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            

          }}
        >
          <input
            style={{
                marginBottom: "10px"
            }}
            required
            type="text"
            name="title"
            placeholder="Название идеи"
            onChange={handleChange}
          />
          <textarea
            rows="5"
            cols="35"
            name="description"
            placeholder="Описание идеи"
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit"> Отправить</button>
      </form>
    );
}


export default Form