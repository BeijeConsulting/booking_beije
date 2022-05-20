import React from "react";


import { faPencil } from '@fortawesome/free-solid-svg-icons';

import './profileMenuCSS/Account.less'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




const Account = () => {
  return (
    <div className="Account_container">

      <div className="header_container">
        <h1>Hi, guest.name</h1>
        <div>
          <button className="acc_logout">logout</button>
        </div>
      </div>

      <div className="edit">
        <div>
          <button className="penIcon"><FontAwesomeIcon icon={faPencil}/></button>
        </div>
        <div className="update_cont">
          <button className="update" type="submit">Update</button>
        </div>
      </div>

      <form>
        <div className="i">
          <label className="L"><FontAwesomeIcon icon={faPencil}/> Change Name</label>
          <input type="text"  id="name" />
        </div>
        <div className="i">
          <label  className="L"><FontAwesomeIcon icon={faPencil}/> Change Surname</label>
          <input type="text"  id="surname" />
        </div>
        <div className="i">
          <label  className="L"><FontAwesomeIcon icon={faPencil}/> Change Mail</label>
          <input type="email"  id="email" />
        </div>
        <div className="i">
          <label  className="L"><FontAwesomeIcon icon={faPencil}/> Change Password</label>
          <input type="password"  id="password" />
        </div>
        <div className="i">
          <label className="L" ><FontAwesomeIcon icon={faPencil}/> Confirm Password</label>
          <input type="password" id="confirmPassword" />
        </div>
      </form>
    </div>

  );
};

export default Account
