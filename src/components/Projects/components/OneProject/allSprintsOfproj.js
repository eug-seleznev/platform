import { useDispatch } from "react-redux";
import style from '../../../../Styles/modules/components/Project/oneproj.module.css'
import {  Thin } from "../../../../Styles/typography";
import Subtitle from "./subtitle";
import { useState } from "react";
import { Path } from "../../../Layout/header";
import BoardTitleIndex from "../../Project/kanban/boardTitleIndex";
import { addNewBoard } from "../../../../redux/actions/kanban";



const AllBoardsOfProj = ({boards, crypt, history}) => { 
  const dispatch = useDispatch();
  const handleRedirect = (name) => {
    history.push(`/projects/${crypt}/board/${name}`)
  }
  const createBoard = (e) => {
    e.preventDefault()
    let title = 'Поменять название ==>'
    dispatch(addNewBoard(crypt, title))

  }
    return (
      <div className={style.sprints}>
        <div >
          <Subtitle
            title="Активные доски"
            src={Path+'image 6.png'}
            subtwidth="0%"
            buttonFunc={createBoard}
            buttonActive={true}
          ></Subtitle>
        </div>
        {boards.length === 0 ? (
          <Thin size="22">Нет созданных досок</Thin>
        ) : (
          <div className={style.sprintdescr__cont}>
            {boards
              // .filter((sprint) => !sprint.status)
              .map((board, i) => {
                return (
                  <BoardTitleIndex el={board} key={i} handleRedirect={handleRedirect}></BoardTitleIndex>
                  
                );
              })}
          </div>
        )}
        <br />
        <br />
      </div>
    );
}



export default AllBoardsOfProj

