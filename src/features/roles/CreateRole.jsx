import React from "react";
import CreateRoleModal from "../../../utils/Modal";
import CreateForm from "../../../utils/FormBody";
import { useDispatch, useSelector } from "react-redux";
import { createRole } from "./roleSlice";
import { RoleCreate } from "../../FormValues";

function CreateRole() {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = React.useState(false);
  const [role, setRole] = React.useState({ name: "", roleId: "" });

  function closeModal() {
    setRole({ name: "", roleId: "" });
    setModalShow(false);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(createRole(role)).unwrap();
      setRole({ name: "", roleId: "" });
    } catch (error) {
      console.log(error);
    } finally {
      setModalShow(false);
    }
  };

  const body = (
    <React.Fragment>
      {RoleCreate.map((item) => (
        <div key={item.id}>
          {<CreateForm form={item} project={role} setProject={setRole} />}
        </div>
      ))}
    </React.Fragment>
  );

  const createButton = (
    <CreateRoleModal
      title="Create Role"
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
      <div className="fs-3">Create Role</div>
      <div>{createButton}</div>
    </div>
  );
}

export default CreateRole;
