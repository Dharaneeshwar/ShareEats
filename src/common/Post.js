import React, { useState } from "react";
import { timeSince, timeTill } from "../helper/time-helper";

export default function Post(props) {
  console.log(props.item.createdAt.toDate());
  const [showAddress, toggleAddressView] = useState(false);
  const [editAllowed, something] = useState(true);
  return (
    <div className="border-bottom py-2">
      <div className="d-flex w-100 justify-content-between">
        <h3 className="mb-1">{props.item.title}</h3>
        <h3 className="mb-1">
          {props.item.quantityleft} <i className="fas fa-users"></i>
        </h3>
      </div>
      {/* Type */}

      { props.item.foodType=='veg' && <span className="badge bg-green" style={{ marginRight: ".7rem" }}>
        Veg
      </span>}
      { props.item.foodType=='nveg' && <span className="badge bg-red" style={{marginRight:'.7rem'}}>Non-Veg</span> }
      {/* Delivery */}

      { props.item.delivery=='deliver' && <span className="badge bg-primary" style={{marginRight:'.7rem'}}>Delivery Available</span>}
      { props.item.delivery=='pickup' && <span className="badge bg-primary" style={{ marginRight: ".7rem" }}>
        Pick-up
      </span>}
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
        <div className="smooth">
          <h4>Address</h4>
          <address>
            {props.item.address}
          </address>
        </div>
      )}
      {/* Donar */}
      {props.page == "donor" && (
      <button
        className={`btn btn-darkblue btn-sm ' + ${!editAllowed && "disabled"}`}
      >
        Edit Post
      </button>
      )}
      {!editAllowed && (
        <small className="align-bottom">Food is already claimed</small>
      )}
      {/* Receiver */}
      {props.page == "receive" && (
        <div>
          <button className="btn btn-darkblue btn-sm">Claim Completely</button>
          <button
            className={`btn btn-outline-darkblue btn-sm mx-2 ' + ${
              !editAllowed && "disabled"
            }`}
          >
            Claim Partial Food
          </button>
        </div>
      )}
      <div className="d-flex w-100 justify-content-between">
        <p className="d-block mt-2 text-darkblue">
          Food fresh for <b>{timeTill(props.item.freshTill.toDate())}</b>
        </p>
        <p className="d-block mt-2 text-darkblue">{timeSince(props.item.createdAt.toDate())} ago</p>
      </div>
    </div>
  );
}
