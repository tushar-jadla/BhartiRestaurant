import React, { Component } from "react";
import "./resturant.css";
import { observer } from "mobx-react";

export const LoginPage = observer(
  class LoginPageClass extends Component {
    login = e => {
      if (this.props.model.status === "success") {
        this.props.history.replace("/Main");
        alert("successfully Logged Into MainPage");
      } else {
        alert("Please Enter Valid Email or Password");
      }
    };

    OnChangeEmailAddress = e => {
      // Extract value from the event object.
      const NewValue = e.target.value;

      // Update the model *directly* using a model method.
      this.props.model.SetEmailAddress(NewValue);
    };

    OnChangePassword = e => {
      // Extract value from the event object.
      const NewValue = e.target.value;

      // Update the model *directly* using a model method.
      this.props.model.SetPassword(NewValue);
      this.props.model.Login();
    };

    render() {
      return (
        <div className="main_div">
          <h1 className="logo"> Bharti Resturant</h1>
          <div>
            <div>
              <div className="main_login_content">
                <div className="Logo_name">Login:</div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="Email_Input"
                    onChange={this.OnChangeEmailAddress}
                  ></input>
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  className="Password_Input"
                  onChange={this.OnChangePassword}
                ></input>
                <div>
                  <button className="Submit_login" onClick={this.login}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
); // end of observer
