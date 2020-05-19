import React, { Component } from "react";
import "./resturant.css";
import { observer } from "mobx-react";
export const AdminSetting = observer(
  class AdminSettingClass extends Component {
    OnChangeUpdateID = e => {
      let targetvalue = e.target.value;
      this.props.Admin_model.SetUpdateID(targetvalue);
    };
    OnChangeUpdatePrice = e => {
      let targetvalue = e.target.value;
      this.props.Admin_model.SetUpdatePrice(targetvalue);
    };
    OnChangeUpdateDescription = e => {
      let targetvalue = e.target.value;
      this.props.Admin_model.SetUpdateDescription(targetvalue);
    };
    OnChangeDeletedID = e => {
      let targetvalue = e.target.value;
      this.props.Admin_model.SetDeleteID(targetvalue);
    };
    // This function invoke when user click on UPdate item button
    UpdateSetting = () => {
      this.props.Admin_model.UpdateItem();
    };
    // This function invoke when user click on Delete item button
    DeleteSetting = () => {
      this.props.Admin_model.DeleteItem();
    };
    render() {
      return (
        <div className="main_div">
          <h1 className="logo"> Bharti Resturant</h1>
          <div>
            <div>
              <div className="main_admin_content">
                <div className="Logo_name">Admin Settings :</div>
                <div>Update the item:</div>
                <div>
                  <input
                    type="number"
                    placeholder="Enter the Id of item which you want to update"
                    className="ID_Input"
                    onChange={this.OnChangeUpdateID}
                  ></input>
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Enter the new Price of item"
                    className="ID_Input"
                    onChange={this.OnChangeUpdatePrice}
                  ></input>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Enter the new description of item"
                    className="ID_Input"
                    onChange={this.OnChangeUpdateDescription}
                  ></input>
                </div>
                <div>
                  <button
                    className="Submit_setting"
                    onClick={this.UpdateSetting}
                  >
                    {" "}
                    Update the item
                  </button>
                </div>
                <div>Delete the item : -</div>
                <div>
                  <input
                    type="number"
                    placeholder="Enter the Id of item which you want to delete"
                    className="ID_Input"
                    onChange={this.OnChangeDeletedID}
                  ></input>
                  <div>
                    <button
                      className="Submit_setting"
                      onClick={this.DeleteSetting}
                    >
                      Delete the item
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> // end of main div
      );
    }
  }
);
