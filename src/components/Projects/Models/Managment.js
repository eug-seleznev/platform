import { ButtonText, ButtonTextLight } from "../../../Styles/buttons";
// import { Bold } from "../../../Styles/typography";
import modelsCss from '../../../Styles/modules/components/Project/models.module.css'
import { Bold } from "../../../Styles/typography";
import Tag from "../components/OneProject/tag";

const Managment = ({submited, focusRow, location, history, setUpdate, updateModel,models}) => {

    return (
      <div className={modelsCss.managment} >
        <div className={modelsCss.managment__first}>
          <div style={{display:'flex'}} onClick={() => submited()}>
           <ButtonText fontSize='16px' >Загрузить новую модель</ButtonText> 
          </div>
          {focusRow && (
            <div className={modelsCss.managment__buttons}>
              <ButtonTextLight
              className={modelsCss.managment__one__button}
              fontSize='14px'
                onClick={() => history.push(`${location.pathname}/${focusRow._id}`)}>
                Открыть модель 
              </ButtonTextLight>
              <ButtonTextLight className={modelsCss.managment__one__button} fontSize='14px' onClick={() => setUpdate(!updateModel)}> Загрузить новую версию </ButtonTextLight>
              <ButtonTextLight className={modelsCss.managment__one__button} fontSize='14px'> Удалить модель </ButtonTextLight>
              <ButtonTextLight className={modelsCss.managment__one__button} fontSize='14px'> Публичный доступ </ButtonTextLight>
            </div>
        )}
        </div>
        
        <div className={modelsCss.managment__type}>
          <Bold size='14'>Тип модели: </Bold>
          {models && models.map((el,i)=>{
            return(<Tag key={i} tagColor='#C8DDE9' tagText={el.tags ? el.tags[0] : ''}/>)
          })}
        </div>
      </div>
    );
}

export default Managment