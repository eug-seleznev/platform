import { Select } from "../../../../../../../Styles/tables";
import changeSomeField from '../CardEditor'
const ChangeType = ({theme,info}) =>{
    return(
        <Select
          name="emergency"
          onChange={(e) => {
            changeSomeField(e);
          }}
          style={{
            cursor: "pointer",
            width: "120px",
            height: "35px",
            marginTop: "1px",
            transform: "translateX(-20px)",
            color: !theme ? "black" : "white",
            backgroundColor: !theme ? "white" : "#1E1E1E",
          }}
          defaultValue={info.emergency}
        >
          <option value="Обычная">Обычная</option>
          <option value="Срочная">Срочная</option>
          <option value="Критическая">Критическая</option>
          <option value="Событие">Событие</option>
        </Select> 
    )
}
export default ChangeType