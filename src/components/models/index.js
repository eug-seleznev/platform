import { useState } from "react";



const Viewer = () => {


    const [formData, setFormData] = useState({
      crypt: "8633",
      sprintId: "600ffe9e68bdeb0022fb47db",
      file: null
    });

    const onChange =() => {
        
    }

    const onSubmit =(e) => {
        e.preventDefault();


        console.log('hello')
    }
    return (
      <div>
        <p> hello world</p>
        <form onSubmit={onSubmit}>
            <input type="file" onChange={onChange}/>
          <button type="submit"> hey</button>
        </form>
      </div>
    );
}



export default Viewer