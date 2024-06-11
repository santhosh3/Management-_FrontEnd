import React from "react";
import { MdEdit } from "react-icons/md";
import EditModal from "../../../utils/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { UserCreate } from "../../FormValues";
import CreateForm from "../../../utils/FormBody";
import { selectUserById } from "./userSlice";
import {
  selectAllRoles,
  getRoleError,
  getRoleStatus,
  fetchRoles,
} from "../roles/roleSlice";
function EditUser({ userId }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => selectUserById(state, userId));
  const [modalShow, setModalShow] = React.useState(false);
  const roles = useSelector(selectAllRoles);
  const roleStatus = useSelector(getRoleStatus);
  const [user, setUser] = React.useState(null);
  function closeModal() {
    setUser(data);
    setModalShow(false);
  }
  function openModal() {
    setUser({
      name: data.name,
      email: data.email,
      role: data.roleId,
      image: null,
    });
    setModalShow(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      console.log(user);
    } catch (error) {
      console.log(error);
    } finally {
      setModalShow(false);
    }
  };

  React.useEffect(() => {
    if (roleStatus === "idle") {
      dispatch(fetchRoles());
    }
  }, [roleStatus, dispatch]);

  let roleOptions = roles?.map((role) => ({
    value: role.id,
    label: role.name,
  }));

  const body = (
    <React.Fragment>
      {UserCreate(roleOptions).slice()
        .filter(x => x.type !== 'password')
        .map((item,index) => (
          <div key={index}>
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

  const createModal = (
    <EditModal
      icon={[<MdEdit />, "edit-user-button"]}
      title="Edit User"
      size="md"
      show={modalShow}
      open={openModal}
      body={body}
      handlesubmit={handleSubmit}
      onHide={closeModal}
    />
  );

  return createModal;
}

export default EditUser;
