import React from "react";
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";
class MyComponent extends React.Component {
  state = {
    listUsers: [
      { id: 1, name: "Huy Hoàng", age: "35" },
      { id: 2, name: "Hoàng Long", age: "22" },
      { id: 3, name: "Hoàng Hùng", age: "10" },
    ],
  };
  render() {
    return (
      <div>
        <UserInfor />
        <br /> <br />
        <DisplayInfor listUsers={this.state.listUsers} />
      </div>
    );
  }
}
export default MyComponent;
