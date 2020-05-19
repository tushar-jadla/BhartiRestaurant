import React, { Component } from "react";
import "./resturant.css";
import { observer } from "mobx-react";

export const MainPage = observer(
  class MainPageClass extends Component {
    // This function invoke when  we click on  the Vegetarian  button
    onchangeFunction = () => {
      this.props.history.push("/Vegetarian");
    };
    // This function invoke when  we click on  the Non Vegetarian button
    OnchangeNonvegetarian = () => {
      this.props.history.push("/NonVegetarian");
    };
    // This function invoke when  we click on  the AdminSetting button
    AdminSetting = () => {
      this.props.history.push("/Admin");
    };

    render() {
      // Getting value from local storage
      var x = JSON.parse(localStorage.getItem("user"));
      return (
        <div className="main_div">
          <h1 className="logo"> Bharti Restaurant</h1>
          <div className="Login_btn">
            <i className="fas fa-user-circle"></i>
            <div className="Vegetarian_Nav">
              <i>User:-</i>
              <i className="fas fa-user-tie"> {x.sub}</i>

              {x.sub.includes("Admin") && ( // conditionl statement , sub is coming from local storage which have user name .This condition check if sub have Admin then show div statemnt
                <div>
                  {" "}
                  <button className="SettingBtn" onClick={this.AdminSetting}>
                    Admin Settings
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="content">
            <span className="label_food">Pick your Food</span>
            <div>
              <div className="div_button">
                {" "}
                <button
                  onClick={this.onchangeFunction}
                  className="click_button"
                >
                  Vegetarian{" "}
                </button>
              </div>
              <div className="div_button" onClick={this.OnchangeNonvegetarian}>
                <button className="click_button">Non_vegetarian</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
); // end of observer
