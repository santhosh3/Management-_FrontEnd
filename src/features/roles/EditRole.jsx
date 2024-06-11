import React from "react";
import { RoleCreate } from "../../FormValues";
import CreateForm from "../../../utils/FormBody";
import CreateRoleModal from "../../../utils/Modal";
import { modifyRole } from "./roleSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { selectRoleById } from "./roleSlice";


function EditRole({ role_id }) {
  const dispatch = useDispatch();
  const data = useSelector(state => selectRoleById(state, role_id))
  const { id, name, roleId } = data;
  const [editRole, setEditRole] = React.useState({ name, roleId });
  const [modalShow, setModalShow] = React.useState(false);
  function closeModal() {
    setEditRole({ name, roleId });
    setModalShow(false);
  }
  function openModal() {
    setEditRole({ name, roleId });
    setModalShow(true);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(modifyRole({ id, ...editRole })).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setEditRole({ name, roleId });
      setModalShow(false);
    }
  };
  const body = (
    <React.Fragment>
      {RoleCreate.map((item) => (
        <div key={item.id}>
          {
            <CreateForm
              form={item}
              project={editRole}
              setProject={setEditRole}
            />
          }
        </div>
      ))}
    </React.Fragment>
  );
  const createButton = (
    <CreateRoleModal
      title="Edit Role"
      variant="secondary"
      icon={[<MdEdit />, "edit-user-button"]}
      size="md"
      show={modalShow}
      open={openModal}
      body={body}
      handlesubmit={handleSubmit}
      onHide={closeModal}
    />
  );
  return createButton;
}

export default EditRole;
