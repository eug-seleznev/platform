


const Managment = ({submited, focusRow, location, history, urnArr, setUpdate, updateModel}) => {
    return (
      <div style={{ display: "flex" }}>
        <p onClick={() => submited()}>
          <b>Загрузить новую модель</b> 
        </p>
        {focusRow && (
          <>
            <p
              onClick={() => history.push(`${location.pathname}/${focusRow}`)}>
              Открыть 
            </p>
            <p onClick={() => setUpdate(!updateModel)}> Обновить </p>
            <p> Удалить </p>
          </>
        )}
      </div>
    );
}

export default Managment