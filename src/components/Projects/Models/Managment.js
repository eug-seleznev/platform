


const Managment = ({submited}) => {
    return (
      <div style={{display: "flex"}}>
        <p onClick={() => submited()}> Load new model</p>
        <p> Edit</p>
        <p> Delete</p>
      </div>
    );
}

export default Managment