












const ModelsTable = ({ models, history, location, setFocus, focusRow }) => {
  return (
    <table>
      <tr>
        <th>Название</th>
        <th> Дата </th>
        <th>Версия</th>
      </tr>
      {models ? (
        models.map((model) => {
          return (
            <tr
              onClick={() => setFocus(model)}
              onDoubleClick={() =>
                history.push(`${location.pathname}/${model._id}`)
              }
              style={{ backgroundColor: focusRow && focusRow._id == model._id ? "grey" : "" }}
            >
              <td>{model.title}</td>
              <td>{model.date}</td>
              <td>{model.version}</td>
              <td>опции</td>
            </tr>
          );
        })
      ) : (
        <p> Моделей нет...</p>
      )}
    </table>
  );
};


export default ModelsTable