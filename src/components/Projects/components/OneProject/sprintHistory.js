import { CancelButton } from "../../../../Styles/buttons";
import { ModalContainer, ModalWind } from "../../../../Styles/common";
import { Table, Td, Tr } from "../../../../Styles/tables";
import { useSelector } from "react-redux";
import { Status } from "../../../../Styles/project";
const SprintHistory = ({hist, id, openModHistory, status}) => {
	const sprints = useSelector(state => state.projects.sprints)

    return (
        		<div>
					<ModalContainer style={{display:`${!status?'none':'block'}`}}>
                        <ModalWind>
                        {sprints.length == 0 ? (
                          <p>Завершенных спринтов нет</p>
                        ) : (
                          <Table>
                            <Tr columns="1fr 1fr 1fr" top>
                              <Td> Дата </Td>
                              
                              <Td> Задачи</Td>
                              <Td style={{textAlign:'center'}}> Статус</Td>
                            </Tr>

                            {sprints
                              .filter((sprint) => sprint.status)
                              .map((sprint, i) => {
                                return (
                                  <Tr
                                    columns="1fr 1fr 1fr "
                                    key={i}
                                    title="Открыть спринт"
                                    onClick={()=> {hist.push(`/projects/${id}/${sprint._id}`)}}
                                  >
                                    <Td>
                                      {" "}
                                      {sprint.dateOpen
                                        .slice(0, 16)
                                        .replace(/T/g, "  ")}
                                    </Td>
                                    
                                    <Td>
                                      {" "}
                                      {
                                        sprint.tasks.filter((task) => task.taskStatus)
                                          .length
                                      }
                                      /{sprint.tasks.length}
                                    </Td>
                                    <Td>
                                      {sprint.tasks.length -
                                        sprint.tasks.filter((task) => task.taskStatus)
                                          .length ===
                                      0 ? (
                                        <Status green />
                                      ) : (
                                        <Status red />
                                      )}
                                    </Td>
                                  </Tr>
                                );
                              })}
                          </Table>
                        )}
                        <CancelButton padd={'55px'}grey onClick={openModHistory}>Закрыть</CancelButton>
                        </ModalWind>
					</ModalContainer>
				</div>)
				
			}
			
			
			
export default SprintHistory