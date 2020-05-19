import React, { Component } from "react";
import "./resturant.css";
import { observer } from "mobx-react";
import { Cart } from "./AddToCart.js";
export const NonVegetarian = observer(
  class NonVegetarianClass extends Component {
    async componentDidMount() {
      // Api call
      await this.props.model_state.getData();
    }
    // This function invoke when we click on PLace Order Button

    PlaceOrder = () => {
      this.props.model_state.PlaceOrder();
    };
    render() {
      // Getting array from model
      let array = this.props.model_state.GetSourceData();
      //  Get user from local storage
      let orderdetails = this.props.model_state.getOrderDetails();

      return (
        <div className="vegetarian_div">
          <div className="Login_btn">
            <i className="fas fa-user-circle"></i>
            <div className="Vegetarian_Nav">
              <i>User:-</i>
              <i className="fas fa-user-tie"> Alex</i>
              <div className="OrderDetails_div"> Order Details:-</div>
              {orderdetails.map((value, index) => {
                return (
                  <div key={index} className="OrderInfo">
                    <div className="NameItem">
                      {" "}
                      <u>{value.Name} </u>
                    </div>
                    <div>Price: {value.Price} </div>
                    <div>Quantity: {value.Quantity} </div>
                    <div>Total Price: {value.TotalCost}</div>
                  </div>
                );
              })}

              <div>
                <button className="PlaceOrder" onClick={this.PlaceOrder}>
                  Place the order
                </button>
              </div>
            </div>
          </div>
          <h1 className="logo"> Bharti Restaurant</h1>
          {array.map((value, index) => {
            if (index > 5) {
              return (
                <div key={index} className="content_vegetarian">
                  <div className="item_name">
                    {value.Name}{" "}
                    <span className="Price_span"> ${value.Price}</span>
                  </div>
                  <div className="decription_div">{value.decription}</div>
                  <div className="Cart_div">
                    <Cart
                      model_cart={this.props.model_state}
                      itemName={value.Name}
                      itemPrice={value.Price}
                    />
                  </div>
                </div>
              );
            }
            return <div key={index}></div>;
          })}
          ;
        </div>
      );
    }
  }
);
