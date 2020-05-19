import React, { Component } from "react";
import "./resturant.css";

export class Cart extends Component {
  onChangeInput = e => {
    let value = e.target.value;
    this.props.model_cart.setQuantity(value);
  };
  // This function invoke when click on Ok button
  Order = () => {
    let name = this.props.itemName;
    let price = parseFloat(this.props.itemPrice);
    let quantity = this.props.model_cart.getQuantity();
    let newArray = this.props.model_cart.getOrderDetails();
    let finalPrice = this.props.model_cart.CalculatingTotalPrice(price);

    newArray.push({
      Name: name,
      Price: "$" + price,
      Quantity: quantity,
      TotalCost: "$" + finalPrice.toFixed(2) + " (with GST)" // tofixed allow exactly 2 digits after decimal place
    });

    this.props.model_cart.SetOrderDetails(newArray);
  };

  render() {
    return (
      <div className="content_cart">
        <button onClick={this.ChangeValue} className="Cart_Button">
          Add to Cart
        </button>
        <div className="hidden_div">
          {" "}
          Quantity :-
          <div>
            <input
              type="number"
              placeholder="Quantity"
              className="InputQuantity"
              onChange={this.onChangeInput}
              min="1"
            ></input>
            <div>
              {" "}
              <button className="Order_Button" onClick={this.Order}>
                OK
              </button>
            </div>
          </div>
        </div>
      </div> // end of main div
    );
  }
}
