












const ModelsTable = ({models, history, location}) => {
    return (
      <table>
        <tr>
          <th>Название</th>
          <th> Дата </th>
          <th>Версия</th>
        </tr>

        {/* map models here */}

        {models ? models.map(model => {
          return (
            <tr onClick={() => history.push(`${location.pathname}/${model._id}`)} >
              <td>{model.title}</td>
              <td>{model.date}</td>
              <td>{model.version}</td>
            </tr>
          );
        }) : <p> Моделей нет...</p>}
        

      
      </table>
    );
}


export default ModelsTable