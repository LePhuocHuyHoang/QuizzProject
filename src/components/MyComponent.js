import React from "react";
import AddUserInfor from "./AddUserInfor";
import DisplayInfor from "./DisplayInfor";
class MyComponent extends React.Component {
  state = {
    listUsers: [
      { id: 1, name: "Huy Hoàng", age: "35" },
      { id: 2, name: "Hoàng Long", age: "22" },
      { id: 3, name: "Hoàng Hùng", age: "10" },
    ],
  };
  handleAddNewUser = (userObj) => {
    this.setState({ listUsers: [userObj, ...this.state.listUsers] });
  };
  handleDeleteUser = (userId) => {
    let listUsersClone = [...this.state.listUsers];
    listUsersClone = listUsersClone.filter((item) => item.id !== userId);
    this.setState({ listUsers: listUsersClone });
  };
  render() {
    return (
      <>
        <div className="a">
          <AddUserInfor handleAddNewUser={this.handleAddNewUser} />
          <br /> <br />
          <DisplayInfor
            listUsers={this.state.listUsers}
            handleDeleteUser={this.handleDeleteUser}
          />
        </div>
        <div className="b"></div>
      </>
    );
  }
}
export default MyComponent;
