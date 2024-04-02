import {Spinner} from 'react-bootstrap';

function Loader() {
  return (
   <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
     <Spinner size='xl' animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
   </div>
  );
}

export default Loader;