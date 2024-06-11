import React from "react";
import CreateUserModal from "../../../utils/Modal";
import CreateForm from "../../../utils/FormBody";
import { useDispatch, useSelector } from "react-redux";
import { UserCreate } from "../../FormValues";
import { createUser } from "./userSlice";
import {
  selectAllRoles,
  getRoleError,
  getRoleStatus,
  fetchRoles,
} from "../roles/roleSlice";

function CreateUser() {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = React.useState(false);
  const roles = useSelector(selectAllRoles);
  const roleStatus = useSelector(getRoleStatus);

  React.useEffect(() => {
    if (roleStatus === "idle") {
      dispatch(fetchRoles());
    }
  }, [roleStatus, dispatch]);

  let roleOptions = roles?.map((role) => ({
    value: role.id,
    label: role.name,
  }));

  const [user, setUser] = React.useState({
    name: "",
    email: "",
    password: "",
    role: "",
    image: null,
  });

  function closeModal() {
    setUser({ name: "", email: "", password: "", role: "", image: null });
    setModalShow(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("password", user.password);
      formData.append("roleId", user.role);
      if (user.image !== null) {
        formData.append("file", user.image);
      }
      dispatch(createUser(formData)).unwrap();
      setUser({ name: "", email: "", password: "", role: "", image: null });
    } catch (error) {
      console.log(error);
    } finally {
      setModalShow(false);
      setAddRequestStatus("idle");
    }
  };

  const body = (
    <React.Fragment>
      {UserCreate(roleOptions).map((item) => (
        <div key={item.id}>
          {
            <CreateForm
              form={item}
              project={user}
              setProject={setUser}
            />
          }
        </div>
      ))}
    </React.Fragment>
  );

  const createButton = (
    <CreateUserModal
      title="Create User"
      size="md"
      show={modalShow}
      open={() => setModalShow(true)}
      body={body}
      handlesubmit={handleSubmit}
      onHide={closeModal}
    />
  );

  return (
    <div className="container-create-Project">
      <div className="fs-3">Create User</div>
      <div>{createButton}</div>
    </div>
  );
}

export default CreateUser;
