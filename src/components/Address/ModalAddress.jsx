import { useState } from "react";
import { addressService, editAddressService } from "../../utilities/addressService";
import "./Address.css";
import { useAllData } from "../../context/AllDataContext";
import { useAuth } from "../../context/AuthContext";

const ModalAddress = ({ setShowModal, curAddress, setCurAddress, edit }) => {
  const {
    state: { address },
  } = useAllData();
  const {
    authStates: { eToken },
  } = useAuth();
  const { dispatch } = useAllData();
  const { userName, country, state, city, pincode, phoneNo } = curAddress;

  const addressFieldHandler = (e) => {
    setCurAddress((curAddress) => ({
      ...curAddress,
      [e.target.name]: e.target.value,
    }));
  };

  const saveAddress = (e) => {
    e.preventDefault();
    const ifAdExists = address.find(
      (item) =>
        item.phoneNo === curAddress.phoneNo &&
        item.userName === curAddress.userName
    );
    // setCurAddress(()=>({...curAddress}));
    console.log(curAddress);
    eToken && Object.values(curAddress).length >= 2
      ? edit===false && !ifAdExists
        ? addressService(curAddress, eToken, dispatch)
        : editAddressService(curAddress, eToken, dispatch)
      : console.log("error");
  };

  return (
    <div className="modal">
      <form className="modalForm-wrapper" onSubmit={(e) => saveAddress(e)}>
        <input
          type="text"
          value={userName}
          name="userName"
          onChange={addressFieldHandler}
          placeholder="user-name"
        />
        <input
          type="text"
          value={country}
          name="country"
          onChange={addressFieldHandler}
          placeholder="country"
        />
        <input
          type="text"
          value={state}
          name="state"
          onChange={addressFieldHandler}
          placeholder="state"
        />
        <input
          type="text"
          value={city}
          name="city"
          onChange={addressFieldHandler}
          placeholder="city"
        />
        <input
          type="number"
          value={pincode}
          name="pincode"
          onChange={addressFieldHandler}
          placeholder="pincode"
        />
        <input
          type="number"
          value={phoneNo}
          name="phoneNo"
          onChange={addressFieldHandler}
          placeholder="phone-number"
        />
        <button type="submit" className="add-address">
          Save
        </button>
      </form>
      <button className="modal-closeBtn" onClick={() => setShowModal(false)}>
        X
      </button>
    </div>
  );
};

export { ModalAddress };
