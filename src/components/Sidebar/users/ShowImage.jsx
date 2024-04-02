import { useState } from 'react';
import { Image } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function showImage({image}) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Image style={{"cursor":"pointer"}} onClick={handleShow} src={image}  width={100} height={100}/>
        <Modal centered show={show} onHide={handleClose} animation={true}>
        <Image onClick={handleShow} src={image}  width={500} height={500}/>
        </Modal>
      </>
    );
  }
  
  
  
export default showImage