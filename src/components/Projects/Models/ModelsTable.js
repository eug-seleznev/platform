import { NEW_TABLE, NEW_TBODY, NEW_TD, NEW_TH, NEW_THEAD, NEW_TR } from "../../../Styles/tables";
import modelsCss from '../../../Styles/modules/components/Project/models.module.css'
import getDate from "../getDate";
import Tag from "../components/OneProject/tag";
import { url } from "../../utils/axios";

const ModelsTable = ({ models, history, location, setFocus, focusRow }) => {
  
  return (
    console.log(models),
    <NEW_TABLE>
      <NEW_THEAD>
      <NEW_TR className={modelsCss.table__row}>
        <NEW_TH>Название</NEW_TH>
        <NEW_TH>Дата публикации </NEW_TH>
        <NEW_TH>Тип</NEW_TH>
        <NEW_TH>Загрузил</NEW_TH>
        <NEW_TH>Версия</NEW_TH>
      </NEW_TR>
    </NEW_THEAD>
      <NEW_TBODY>
        {models ? (
          models.map((model, i) => {
            return (
              <NEW_TR
                key={i}
                onClick={() => setFocus(model)}
                onDoubleClick={() =>
                  history.push(`${location.pathname}/${model._id}`)
                }
                style={{
                  backgroundColor:
                    focusRow && focusRow._id == model._id ? "#F1EFEF" : "",
                }}
              >
                <NEW_TD>{model.title}</NEW_TD>
                <NEW_TD>{getDate(model.date)}</NEW_TD>
                <NEW_TD style={{paddingTop:'14px'}}><Tag tagColor='#C8DDE9' tagText={model.tags[0]}/></NEW_TD>
                <NEW_TD style={{display:'flex',alignItems:'center',paddingTop:'9px'}}>{model.user ? model.user.fullname : '' }
                <img className={modelsCss.img} style={{display:`${model.user?'block':'none'}`}} 
                src={model.user ? url+'/'+model.user.avatar : '' }></img></NEW_TD>

                <NEW_TD>{model.version}</NEW_TD>
                {/* <NEW_TD>опции</NEW_TD> */}
              </NEW_TR>
            );
          })
        ) : (
          <p> Моделей нет...</p>
        )}
      </NEW_TBODY>
    </NEW_TABLE>
  );
};


export default ModelsTable