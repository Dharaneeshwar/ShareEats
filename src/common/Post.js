import React, { useEffect, useState } from "react";
import { timeSince, timeTill } from "../helper/time-helper";
import { addlog, updateQuantityOnDB } from "../helper/postHelper"; 

export default function Post(props) {
  console.log(props);
  const [showAddress, toggleAddressView] = useState(false);
  const [editAllowed, togggleEditAllowed] = useState(true);
  const [quantity, updateQuantity] = useState(props.item.quantityleft);

  const [selectedPartialQuantity, updatePartialQuantity] = useState(0);
  const [showSelectQuantity, toggleSelectQuantityView] = useState(false);

  useEffect(() => {
    if (props.item.quantity != props.item.quantityleft || props.item.freshTill.toDate() < new Date()) {
      togggleEditAllowed(false);
    }
  },[]);

  async function claimFood() {
    updateQuantity(0); 
    await updateQuantityOnDB(props.item.id,0); 
    addlog("claimed", quantity, JSON.parse(localStorage.getItem("authObj")).displayName);
  }

  async function claimPartialFood() {
    console.log(props);
    updateQuantity(quantity - selectedPartialQuantity);
    await updateQuantityOnDB(props.item.id, quantity - selectedPartialQuantity);
    addlog(false, selectedPartialQuantity);
    addlog("claimedfully", selectedPartialQuantity, JSON.parse(localStorage.getItem("authObj")).displayName);
  }

  return (
    <div>
      {(quantity > 0 || props.page == "donor") && (
        <div className="border-bottom py-2">
          <div className="d-flex w-100 justify-content-between">
            <h3 className="mb-1">{props.item.title}</h3>
            <h3 className="mb-1">
              {quantity} <i className="fas fa-users"></i>
            </h3>
          </div>
          {/* Type */}
          {props.item.foodType == "veg" && (
            <span className="badge bg-green" style={{ marginRight: ".7rem" }}>
              Veg
            </span>
          )}
          {props.item.foodType == "nveg" && (
            <span className="badge bg-red" style={{ marginRight: ".7rem" }}>
              Non-Veg
            </span>
          )}
          {/* Delivery */}
          {props.item.delivery == "deliver" && (
            <span className="badge bg-primary" style={{ marginRight: ".7rem" }}>
              Delivery Available
            </span>
          )}
          {props.item.delivery == "pickup" && (
            <span className="badge bg-primary" style={{ marginRight: ".7rem" }}>
              Pick-up
            </span>
          )}
          <br />
          <p
            className="mt-3 noselect link"
            onClick={() => toggleAddressView(!showAddress)}
          >
            {showAddress ? (
              <p>
                Hide Details <i className="fas fa-angle-up px-1"></i>
              </p>
            ) : (
              <p>
                Show Details <i className="fas fa-angle-down px-1"></i>
              </p>
            )}
          </p>
          {showAddress && (
            <div>
              <h4>Address</h4>
              <address>{props.item.address}</address>
            </div>
          )}
          {showSelectQuantity && (
            <div className="row my-3">
              <div className="col-12 col-md-6 col-lg-4">
                <input 
                  type="text"
                  onChange={(e) => updatePartialQuantity(e.target.value)}
                  className=" form-control"
                  placeholder="Number of plates?"
                />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <button onClick={claimPartialFood} className="btn btn-darkblue">
                  Submit
                </button>
              </div>
            </div>
          )}
          {/* Donar */}
          {/* {props.page == "donor" && (
            <button
              className={`btn btn-darkblue btn-sm ' + ${
                !editAllowed && "disabled"
              }`}
            >
              Edit Post
            </button>
          )} */}
          {/* TODO Add a claim boolean to post or compare quantity and quantity remaining */}
          {/* {!editAllowed && (
            <small className="align-bottom">Food is already claimed</small>
          )} */}
          {/* Receiver */}
          {props.page == "receive" && (
            <div>
              <button onClick={claimFood} className={`btn btn-darkblue btn-sm ' + ${
                  !(props.item.freshTill.toDate() > new Date() && props.item.quantityleft > 0) && "disabled"
                }`}>
                Claim Completely
              </button>
              <button
                onClick={() => {
                  toggleSelectQuantityView(!showSelectQuantity);
                }}
                className={`btn btn-outline-darkblue btn-sm mx-2 ' + ${
                  !(props.item.freshTill.toDate() > new Date() && props.item.quantityleft > 0) && "disabled"
                }`}
              >
                Claim Partial Food
              </button>
            </div>
          )}
          <div className="d-flex w-100 justify-content-between">
            {(props.item.freshTill.toDate() > new Date() && props.item.quantityleft > 0) && (
              <p className="d-block mt-2 text-darkblue">
                Food fresh for <b>{timeTill(props.item.freshTill.toDate())}</b>
              </p>
            )}

            {props.item.freshTill.toDate() < new Date() && props.item.quantityleft > 0 && (
              <b className="d-block mt-2 text-red">
                Food Expired
              </b>
            )}

            {props.item.quantityleft == 0 && (
              <b className="d-block mt-2 text-red">
                Food Claimed
              </b>
            )}

            <p className="d-block mt-2 text-darkblue">
              {timeSince(props.item.createdAt.toDate())} ago
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
