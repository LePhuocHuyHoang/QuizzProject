import React, { useEffect, useState } from "react";
import "./DisplayInfor.scss";

const DisplayInfor = (props) => {
  const { listUsers } = props;
  const [isShowHideListUsers, setShowHideListUser] = useState(true);
  const handleShowHideListUser = () => {
    setShowHideListUser(!isShowHideListUsers);
  };
  console.log(">>> call me render");
  useEffect(() => {
    if (listUsers.length === 0) {
      alert("You deleted all users");
    }
    console.log(">>> call me effect");
  }, [listUsers]);
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
