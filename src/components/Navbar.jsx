// import { Button } from "react-bootstrap";
// import Sidebar from "./Sidebar";

// function Header({setCheckToken}) {
//  async function logout(){
//     localStorage.clear();
//     setCheckToken(false)
//  }

//   return (
//     <div className="navContainer">
//       <div className="childNav">
//       <div className="fs-4"><Sidebar/></div>
//       <div className="fs-3">HELLO</div>
//       </div>
//       <Button className="fs-3" onClick={logout}>Logout</Button>
//     </div>
//   );
// }

// export default Header;


import { Button } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { useContext } from "react";
import { Trello } from "../context/Context";

function Header() {
  const {login,loginDispatch} = useContext(Trello);
 
  return (
    <div className="navContainer">
      <div className="childNav">
      <div className="fs-4"><Sidebar/></div>
      <div className="fs-3">HELLO</div>
      </div>
      <Button className="fs-3" onClick={() => loginDispatch({type : "LOGOUT_USER"})}>Logout</Button>
    </div>
  );
}

export default Header;














   // <Navbar
    //   sticky="top"
    //   expand="lg"
    //   bg="dark"
    //   data-bs-theme="dark"
    //   className="bg-body-tertiary"
    // >
    //   <Container>
    //     <Navbar.Brand><Sidebar/></Navbar.Brand>
    //     <Navbar.Brand>Management</Navbar.Brand>
    //     <Navbar.Brand>SignIn</Navbar.Brand>
    //     <Navbar.Brand>SignOut</Navbar.Brand>
    //   </Container>
    // </Navbar>