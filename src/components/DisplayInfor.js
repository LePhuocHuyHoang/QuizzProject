import React, { useState } from "react";
import "./DisplayInfor.scss";
import logo from "./../logo.svg";
// class AddDisplayInfor extends React.Component {
//   render() {
//     console.log(">>> call me render");
//     const { listUsers } = this.props;
//     return (
//       <div className="display-infor-container">
//         {true && (
//           <div>
//             {listUsers.map((user) => {
//               return (
//                 <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
//                   <div>My name's {user.name}</div>
//                   <div>My age's {user.age} </div>
//                   <div>
//                     <button
//                       onClick={() => this.props.handleDeleteUser(user.id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                   <hr />
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     );
//   }
// }
const DisplayInfor = (props) => {
  const { listUsers } = props;
  const [isShowHideListUsers, setShowHideListUser] = useState(true);
  const handleShowHideListUser = () => {
    setShowHideListUser(!isShowHideListUsers);
  };
  return (
    <div className="display-infor-container">
      <div onClick={() => handleShowHideListUser()}>
        {isShowHideListUsers === true ? "Hide List Users" : "Show List Users"}
      </div>
      {isShowHideListUsers && (
        <div>
          {listUsers.map((user) => {
            return (
              <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
                <div>My name's {user.name}</div>
                <div>My age's {user.age} </div>
                <div>
                  <button onClick={() => props.handleDeleteUser(user.id)}>
                    Delete
                  </button>
                </div>
                <hr />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default DisplayInfor;
