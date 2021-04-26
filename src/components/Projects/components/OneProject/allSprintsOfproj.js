import { useDispatch } from "react-redux";
import style from '../../../../Styles/modules/components/Project/oneproj.module.css'

import SprintDescription from "../SprintDescrForOneProj";

import {  Thin } from "../../../../Styles/typography";
import Subtitle from "./subtitle";
import { addSprint } from "../../../../redux/actions/projects";
import { useEffect, useState } from "react";
import { Path } from "../../../Layout/header";



const AllSprintsOfProj = ({hist, sprints, match, status, crypt, sprint, location, history}) => {
  
  const dispatch = useDispatch();
  const [submited, setSubmited] = useState(false)



  useEffect(() => {

    if(submited && sprint._id){
             return history.push(`tasks/${sprint._id}`);
    }
  }, [submited, sprint])





	const createSprint = () => {
    dispatch(addSprint(crypt));
    };


    

    return (
      <div className={style.sprints}>
        <div onClick={() => setSubmited(true)}>
          <Subtitle
            title="Активные спринты"
            src={Path+'image 6.png'}
            subtwidth="0%"
            buttonFunc={createSprint}
            buttonActive={true}
          ></Subtitle>
        </div>
        {sprints.length == 0 ? (
          <Thin size="22">Нет активных спринтов</Thin>
        ) : (
          <div className={style.sprintdescr__cont}>
            {sprints
              .filter((sprint) => !sprint.status)
              .map((sprint, i) => {
                return (
                    <SprintDescription
                      projStatus={status}
                      dateClosePlan={sprint.dateClosePlan}
                      descr={sprint.description}
                      history={hist}
                      crypt={crypt}
                      params={match.params}
                      id={sprint._id}
                      key={i}
                      taskcomplite={
                        sprint.tasks.filter((task) => task.taskStatus).length
                      }
                      alltasks={sprint.tasks.length}
                      title={sprint.title}
                      tags={sprint.tags}
                      index={i + 1}
                      key={i}
                      sprintname={sprint.name}
                      dateOpen={sprint.dateOpen}
                    />
                  
                );
              })}
          </div>
        )}
        <br />
        <br />
      </div>
    );
}



export default AllSprintsOfProj

