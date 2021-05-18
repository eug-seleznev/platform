import { useEffect, useState } from "react"
import { useSelector } from "react-redux"



import sprintCss from '../../../../Styles/modules/components/sprintCard.module.css'
import styles from './card.module.css'
import { Select, NEW_TABLE, NEW_TBODY, NEW_THEAD, NEW_TD, NEW_TH, NEW_TR } from '../../../../Styles/tables';
import { Light } from "../../../../Styles/typography";
import Tag from "../../components/OneProject/tag";
import getDate from "../../getDate";





const CardOpen = ({data, close}) => {


    
    return (
      <div className={styles.cardOpnenBackground} onClick={close}>
        <div className={styles.cardOpnenContainer} onClick={(e)=>e.stopPropagation()}>
            {data}
        </div>
      </div>
    );    
}



export default CardOpen