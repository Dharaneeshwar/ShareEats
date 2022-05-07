import React from 'react';
import {addPost, submitPost} from '../helper/postHelper';
import { auth } from '../firebase-config';
import { useNavigate } from "react-router-dom";

export default function SubmitForm() {

  const navigate = useNavigate();

  const [name,updateName] = React.useState('');
  const [type,updateType] = React.useState('veg');
  const [quantity,updateQuantity] = React.useState('');
  const [freshFor,updateFreshFor] = React.useState('');
  const [address,updateAddress] = React.useState('');
  const [delivery,updateDelivery] = React.useState('deliver');
  
  // (
  //   () => {
  //     console.log('data',auth.currentUser.uid);
  //   }
  // )()

  const submitPost = (e) => {
    // submitPost(name,type,quantity,freshFor,address,delivery);
    addPost(name,type,quantity,freshFor,address,delivery,auth.currentUser.uid);
    navigate('/receivers')
  }

  return (<div className="mx-auto round-c bg-lightblue px-4 py-3">
              <div className="form-group">
                <h3 className="text-center">Share Food</h3>
                <label className="text-darkblue py-1 font">Your Name:</label>
                <input type="text" className="form-control" onChange={e => updateName(e.target.value)} name="name"></input>
                <small>Your name or Organisation name.</small>
                <br />
                <label className="text-darkblue py-2 font">Food Type:</label>
                <select id='type' onChange={e => updateType(e.target.value)} className="form-select">
                  <option value="veg" selected>
                    Veg
                  </option>
                  <option value="nveg">Non-Veg</option>
                </select>
                <label class Name="text-darkblue py-2 font">
                  Quantity of food: (No. of People)
                </label>
                <input
                  id="quantity"
                  type="number"
                  onChange={e => updateQuantity(e.target.value)}
                  className="form-control"
                  name="quantity"
                ></input>
                <small>
                    Number of persons that can be fed   
                </small>
                <br />
                <label className="text-darkblue py-2 font">Fresh For:</label>
                <input
                  id="freshfor"
                  type="number"
                  onChange={e => updateFreshFor(e.target.value)}
                  className="form-control"
                  name="freshfor"
                ></input>
                <small>Enter the number in hours.</small>
                <br />
              </div>
              <div className="form-group py-2">
                <label for="location" className="text-darkblue font py-2">
                  Address
                </label>
                <textarea
                  id="address"
                  onChange={e => updateAddress(e.target.value)}
                  className="form-control font"
                  name="message"
                  rows="5"
                ></textarea>
              </div>
              <div className="form-group">
                <label className="text-darkblue font py-2">Delivery:</label>
                <select id='delivery' onChange={e => updateDelivery(e.target.value)} className="form-select">
                  <option value="pickup">Pickup</option>
                  <option value="deliver" selected>
                    I will deliver myself
                  </option>
                </select>
              </div>
              <button onClick={submitPost} className="btn btn-darkblue my-3">
                Post Availability
              </button>
            </div>)
}
