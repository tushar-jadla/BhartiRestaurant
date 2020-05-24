import { observable } from "mobx";
import { Demidata } from "./data.js";
export const Model = observable({
  source_data: [],
  orderDetails: [],
  quantity: 0,
  LoginStatus: "",
  EmailAddress: "",
  Password: "",
  UpdateID: 0,
  UpadatePrice: 0,
  UpdateDescription: "",
  DeleteID: 0,
});

//This function getting data from server
Model.getData = async function () {
  // Define the API endpoint (what server and what service are we going to call?).
  // CURRENTLY API ENDPOINT IS CLOSED temporarily(::so many user request),In meantime use Demi data
  // const endpoint =
  //   " http://bvc-p.singh817-collegeproject.s3.ca-central-1.amazonaws.com/data.json";

  // const FetchData = {
  //   method: "GET",
  //   mode: "cors",
  //   cache: "no-cache",
  //   credentials: "omit",
  //   headers: { "Content-Type": "application/json" },
  //   body: null,
  // };
  // // Send a GET request to the API endpoint, including the API request data.  This starts
  // // a "promise" -- which is a guarantee to return later with some information.  The promise
  // // is complete when the API call finishes (or when it hits an error).
  // let FetchReply = await fetch(endpoint, FetchData);
  // let result = await FetchReply.json();
  // console.log(result);
  // this.source_data = result;

  this.source_data = Demidata;
}; // end of getdata function

Model.GetSourceData = function () {
  return this.source_data;
};
Model.SetOrderDetails = function (array) {
  this.orderDetails = array;
};

Model.setQuantity = function (value) {
  // Filtering and sanitize the value

  let FilteredValue = parseInt(value); // ParseInt convert the string value into integer value
  // Checking the value is not zero and not a negetive value
  if (FilteredValue !== 0 && Math.sign(FilteredValue) !== -1) {
    this.quantity = FilteredValue;
  } else {
    alert("Please enter the valid Quantity");
  }
};
Model.getOrderDetails = function () {
  return this.orderDetails;
};
Model.getQuantity = function () {
  return this.quantity;
};
Model.PlaceOrder = async function () {
  /**
   // CURRENTLY API ENDPOINT IS OFF temporarily(::so many user request)
   */

  // checking the OrderDetails array  is not empty
  if (this.orderDetails.length !== 0) {
    alert("Your order place successfully");
    // Define the API endpoint (what server and what service are we going to call?).
    //   const PutUrl =
    //     "http://bvc-p.singh817-collegeproject.s3.ca-central-1.amazonaws.com/OrderDetails.json";

    //   const ObjectToStoreInJSON = JSON.stringify(this.orderDetails);

    //   let FetchData = {
    //     method: "PUT",
    //     mode: "cors",
    //     cache: "no-cache",
    //     credentials: "omit",
    //     headers: {
    //       "Content-Type": "application/octet-stream",
    //       "Content-Length": ObjectToStoreInJSON.length,
    //       "x-amz-date": new Date().toUTCString(),
    //       "x-amz-acl": "public-read",
    //     },
    //     body: ObjectToStoreInJSON,
    //   };
    //   let FetchReply = await fetch(PutUrl, FetchData);
    //   console.log(FetchReply);
    //   if (FetchReply.statusText === "OK" ) {
    //     // If the API success showing the alert message
    //     alert("Your order place successfully");
    //   } // end of if statement
    // } // end of main  if statement
    // else {
    //   alert("Please select the items");
  } // end of else statement
};

Model.Login = async function () {
  try {
    const Endpoint = "http://s28.ca/rest/bowspace/login";
    // Convert the payload to JSON.
    const ApiRequest = JSON.stringify({
      EmailAddress: this.EmailAddress,
      Password: this.Password,
    });
    // Build out the request body.  The x-amz-* headers are required by AWS.
    let FetchData = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/octet-stream",
        "Content-Length": ApiRequest.length,
      },
      body: ApiRequest,
    };

    // Send a POST request to the API endpoint, including the API request data.  This starts
    // a "promise" -- which is a guarantee to return later with some information.  The promise
    // is complete when the API call finishes (or when it hits an error).
    let FetchReply = await fetch(Endpoint, FetchData);
    let ApiReply = await FetchReply.json();
    console.log(ApiReply);
    // Giving value to status in the model
    this.status = ApiReply.Status;
    if (ApiReply.Status === "success") {
      // Converting  the JWT
      const encryptedPayload = ApiReply.Jwt.split(".")[1];
      const ObjectPayload = window.atob(encryptedPayload);
      // Storing in local storage
      localStorage.setItem("user", ObjectPayload);
    }
    return FetchReply.status === 200;
  } catch (e) {
    // end of try block
    console.log(e);
  } // end of catch block
};
Model.Reset = function () {
  this.EmailAddress = "";
  this.Password = "";
};
Model.SetEmailAddress = function (newvalue) {
  this.EmailAddress = newvalue;
};
Model.SetPassword = function (newvalue) {
  this.Password = newvalue;
};
Model.SetUpdateID = function (value) {
  this.UpdateID = value;
};
Model.SetUpdatePrice = function (value) {
  this.UpadatePrice = value;
};
Model.SetUpdateDescription = function (value) {
  this.UpdateDescription = value;
};
Model.SetDeleteID = function (value) {
  if (value > 0 && value < 20) {
    this.DeleteID = value;
  }
};

// This function send the Total Price of item (with GST)
Model.CalculatingTotalPrice = function (price) {
  let TotalPrice = price * this.quantity;
  let GST = (TotalPrice * 5) / 100;
  let finalPrice = TotalPrice + GST;
  return finalPrice;
};

// This function Update the item by first fetching the data from server and then Update the respective item and then send back to  server
Model.UpdateItem = async function () {
  /*
  // CURRENTLY API ENDPOINT IS CLOSED temporarily(::so many user request)
  */
  const Url =
    " http://bvc-p.singh817-collegeproject.s3.ca-central-1.amazonaws.com/data.json";

  const FetchData = {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "omit",
    headers: { "Content-Type": "application/json" },
    body: null,
  };
  // Send a GET request to the API endpoint, including the API request data.  This starts
  // a "promise" -- which is a guarantee to return later with some information.  The promise
  // is complete when the API call finishes (or when it hits an error).
  let FetchReply = await fetch(Url, FetchData);
  let result = await FetchReply.json();

  /// Update the item

  if (
    // checking  the values
    this.UpadatePrice !== 0 &&
    Math.sign(this.UpadatePrice) !== -1 &&
    this.UpdateID > 0 &&
    this.UpdateID < 20 &&
    this.UpdateDescription !== ""
  ) {
    result.forEach((value) => {
      if (value.ID === this.UpdateID) {
        value.Price = this.UpadatePrice;
        value.decription = this.UpdateDescription;
      }
    });

    // Sending back to server
    const ObjectToStoreInJSON = JSON.stringify(result);

    let FetchData = {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Length": ObjectToStoreInJSON.length,
        "x-amz-date": new Date().toUTCString(),
        "x-amz-acl": "public-read",
      },
      body: ObjectToStoreInJSON,
    };
    let FetchReply = await fetch(Url, FetchData);

    if (FetchReply.statusText === "OK") {
      // API success show the alert message.
      alert("Item is updated");
    } // end of if statemnt
  } // end of main if statement
}; // end of update function

/// delete the item
// This function Update the item by first fetching the data from server and then delete the respective item  from data and then send back to  server
Model.DeleteItem = async function () {
  /*
  // CURRENTLY API ENDPOINT IS  CLOSED temporarily(::so many user request)
  */
  const Url =
    " http://bvc-p.singh817-collegeproject.s3.ca-central-1.amazonaws.com/data.json";

  const FetchData = {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "omit",
    headers: { "Content-Type": "application/json" },
    body: null,
  };

  let FetchReply = await fetch(Url, FetchData);
  let result = await FetchReply.json();

  /// Update the item
  if (this.DeleteID !== 0) {
    result = result.filter((value, index) => {
      // filter method return new array after deleting the respective item.
      return value.ID !== this.DeleteID;
    });

    const ObjectToStoreInJSON = JSON.stringify(result);

    let FetchData = {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Length": ObjectToStoreInJSON.length,
        "x-amz-date": new Date().toUTCString(),
        "x-amz-acl": "public-read",
      },
      body: ObjectToStoreInJSON,
    };
    let FetchReply = await fetch(Url, FetchData);

    if (FetchReply.statusText === "OK") {
      // if successed show alert message
      alert("Item is deleted");
    }
  } // end of if statement
  else {
    alert("Please enter the valid value");
  } // end of else statement
}; // end of delete item function
