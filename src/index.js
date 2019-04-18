import React from "react";
import ReactDOM from "react-dom";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.id = 0;
    this.state = {
      userForm: {
        name: "",
        address: ""
      },
      userList: [],
      isToggleOn: true
    };
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({
      userForm: Object.assign({}, this.state.userForm, {
        [e.target.name]: [e.target.value]
      })
    });
  };
  handleSub = e => {
    e.preventDefault();
    this.id += 1;
    const user = {
      id: this.id,
      name: this.state.userForm.name,
      address: this.state.userForm.address
    };
    this.setState({
      userForm: {
        name: "",
        address: ""
      },
      userList: [].concat(this.state.userList, user)
    });
  };
  handelDel = id => {
    console.log(id);
    this.setState({
      userList: this.state.userList.filter(item => item.id !== id)
    });
  };
  handelEdit = id => {
    console.log(id);
    const user = this.state.userList.find(item => item.id === id);
    this.setState({
      isToggleOn: false,
      userForm: {
        name: user.name,
        address: user.address
      }
    });
    console.log(user);
  };
  handleUpdate = e => {
    e.preventDefault();
    const user = {
      name: this.state.userForm.name,
      address: this.state.userForm.address
    };
    this.setState({
      isToggleOn: true
    });
  };
  render() {
    console.log(this.state.userForm.name);
    const List = this.state.userList.map(item => {
      return (
        <ul key={item.id}>
          <li>{item.id}</li>
          <li>{item.name}</li>
          <li>{item.address}</li>
          <li onClick={() => this.handelDel(item.id)}>del</li>
          <li onClick={() => this.handelEdit(item.id)}>
            edit
            {/* {this.state.isToggleOn ? "Add" : "Update"} */}
          </li>
        </ul>
      );
    });
    return (
      <form>
        <p>
          name:
          <input
            name="name"
            value={this.state.userForm.name}
            onChange={this.handleChange}
          />
        </p>
        <p>
          address:
          <input
            name="address"
            value={this.state.userForm.address}
            onChange={this.handleChange}
          />
        </p>
        <button
          onClick={this.state.isToggleOn ? this.handleSub : this.handleUpdate}
        >
          {this.state.isToggleOn ? "Add" : "Update"}
        </button>
        {List}
      </form>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
