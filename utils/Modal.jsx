import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function MyVerticallyCenteredModal({
  icon,
  variant,
  saveButton,
  showButton,
  show,
  onHide,
  open,
  size,
  handlesubmit,
  title,
  body,
}) {
  return (
    <>
      {icon ? (
        <div className={icon[1]} onClick={open}>
          {icon[0]}
        </div>
      ) : (
        <Button variant={variant ?? "primary"} onClick={open}>
          {showButton ? showButton : title}
        </Button>
      )}
      <Modal
        show={show}
        onHide={onHide}
        size={size}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Form autoComplete="off" onSubmit={handlesubmit}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>{body}</Modal.Body>
          <Modal.Footer>
            <Button onClick={onHide}>Close</Button>
            <Button variant="success" type="submit">
              {saveButton ? saveButton : "Save"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default MyVerticallyCenteredModal;
