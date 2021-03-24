import { useDispatch, useSelector } from "react-redux";
import style from '../../../../Styles/modules/components/Project/oneproj.module.css'

import SprintDescription from "../SprintDescrForOneProj";

import {  Thin } from "../../../../Styles/typography";
import Subtitle from "./subtitle";
import { addSprint } from "../../../../redux/actions/projects";
import { useEffect, useState } from "react";



const AllSprintsOfProj = ({hist, match, status, id, sprint, location, history}) => {
  const dispatch = useDispatch();

	const sprints = useSelector(state => state.projects.sprints) //нужно из пропсов достать, тут можно и без редакса
  
  const [sprintId, setSprintId] = useState(null)
  const [submited, setSubmited] = useState(false)

  // useEffect(() => {
  //   console.log(sprintId)
  //   if(sprintId) {
  //       history.push(`${location.pathname}/${sprintId}`);
  //   }
  // }, [sprintId])




  useEffect(() => {
    console.log(sprint, submited)
          console.log("hello");

    if(submited && sprint._id){
             return history.push(`${location.pathname}/${sprint._id}`);
    }

    // return () => setSubmited(false)
  }, [submited, sprint])




	const createSprint = () => {
    dispatch(addSprint(id));
    };


    

    return (
      <div className={style.sprints}>
        <div onClick={() => setSubmited(true)}>
          <Subtitle
            title="Активные спринты"
            src="/image 6.png"
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
                  <div>
                    <SprintDescription
                      projStatus={status}
                      dateClosePlan={sprint.dateClosePlan}
                      descr={sprint.description}
                      history={hist}
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
                    ></SprintDescription>
                  </div>
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

