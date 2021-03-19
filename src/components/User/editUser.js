import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {changeAvatar } from "../../redux/actions/auth";


import styles from "../../Styles/modules/components/user/edit.module.css";
//styled components
import { Button, CancelButton } from "../../Styles/buttons";
import { Card} from "../../Styles/common";
import { Input} from "../../Styles/Forms";

import { allDepartments } from "../../redux/actions/department";
import { Thin } from "../../Styles/typography";

import { changeUserProfile } from "../../redux/actions/user";

const EditUser = ({ match, history }) => {
    const {id} = match.params;
  const loaded = useSelector((state) => state.auth.loaded);
  const user = useSelector((state) => state.users.user);

  // const select = user.division.divname==el.divname && selected
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: user.name ? user.name : "",
    lastname: user.lastname ? user.lastname : "",
    position: user.position ? user.position : "",
    email: user.email ? user.email : "",
    report: user.report ? user.report : "",
    bday: user.bday ? user.bday : "",
    phone: user.phone ? user.phone : "",
    partition: user.partition ? user.partition : [],
  });

  

  const {
    name,
    lastname,
    position,
    email,
    report,
    bday,
    phone,
   
  } = formData;




  const [file, setFile] = useState(null);


  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    dispatch(allDepartments());
  }, []);


  
if (!user) {
  return <Redirect to="/" />;
}
  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const changeMsg = () => {
    // setText ('Данные были изменены')
    // setTimeout(() => {
    // 	setText ('')
    // }, 4000);
  };
  const Redirect = () => {
    return history.replace(`/users/me`);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(changeUserProfile({formData, id}));

    if (file != null && file != undefined) {
      dispatch(changeAvatar(file));
    }
    setTimeout(() => {
      history.replace(`/users/me`);
    }, 200);
  };

  return (
    <div>
      <Card style={{ paddingBottom: "75px" }}>
        {!loaded ? (
          <div>loaded...</div>
        ) : (
          <div /*style={{display:'flex', flexDirection:'column', alignItems:'center'}}*/
          >
            <Card className={styles.editForm} onSubmit={onSubmit}>
              <Thin className={styles.p}>Имя</Thin>
              <Input
                required
                type="text"
                placeholder={user.name}
                name="name"
                value={name}
                onChange={(e) => onChange(e)}
              ></Input>

              <Thin className={styles.p}>Фамилия</Thin>
              <Input
                required
                type="text"
                placeholder={user.lastname}
                name="lastname"
                value={lastname}
                onChange={(e) => onChange(e)}
              ></Input>
            

              <Thin className={styles.p}>Сменить должность</Thin>
              <Input
                required
                type="text"
                placeholder={user.position}
                name="position"
                value={position}
                onChange={(e) => onChange(e)}
              ></Input>
              <Thin className={styles.p}>Сменить e-mail</Thin>
              <Input
                required
                type="text"
                placeholder={user.email}
                value={email}
                name="email"
                onChange={(e) => onChange(e)}
              ></Input>
              <Thin className={styles.p}>Ссылка на отчетность</Thin>
              <Input
                required
                type="text"
                placeholder={user.report}
                value={report}
                name="report"
                onChange={(e) => onChange(e)}
              ></Input>
              <Thin className={styles.p}>Телефон</Thin>
              <Input
                type="text"
                placeholder={user.phone}
                value={phone}
                name="phone"
                onChange={(e) => onChange(e)}
              ></Input>
              <Thin className={styles.p}>День рождения</Thin>
              <Input
                type="date"
                placeholder={user.report}
                value={bday}
                name="bday"
                onChange={(e) => onChange(e)}
              ></Input>
              
              <CancelButton fontSize="16px" grey onClick={Redirect}>
                Ничего не менять
              </CancelButton>
              <Button
                fontSize="16px"
                onClick={changeMsg}
                type="submit"
                value="Submit"
              >
                Сохранить
              </Button>
            </Card>
          </div>
        )}
      </Card>
    </div>
  );
};

export default EditUser;
