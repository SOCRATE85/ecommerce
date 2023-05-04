import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useAlert } from "react-alert";
import { saveShippingInfo, loadShippingAndBillingAddress, getAllAddress } from "../../store";
import CheckoutSteps from './CheckoutSteps';
import MetaData from "../layout/MetaData";
import AddressCard from '../../common/components/AddressCard';
import SubmitActionButton from "../../common/components/SubmitActionButton";
import ControlContainer from "../../common/components/ControlContainer";
import "./Shipping.css";

const Shipping = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const { user: userData } = useSelector(state => state.user);
    const { shippingInfo, billingInfo, shippingSameAsBilling: _shippingSameAsBilling, loading: loadingCart } = useSelector(state => state.cart);
    const { addresses, loading } = useSelector(state => state.addresses);
    const [ selectedShippingAddress, setSelectedShippingAddress ] = useState("");
    const [ selectedBillingAddress, setSelectedBillingAddress ] = useState("");
    const [ shippingSameAsBilling, setShippingSameAsBilling ] = useState(_shippingSameAsBilling ? _shippingSameAsBilling : true);
    const [ shippingAddress, setShippingAddress ] = useState({});
    const [ billingAddress, setBillingAddress ] = useState({});

    useEffect(() => {
        if(billingInfo) {
            setSelectedBillingAddress(billingInfo.addressId);
            setBillingAddress({
                selectedBillingAddress: billingInfo.addressId,
                firstname: billingInfo.firstname,
                lastname: billingInfo.lastname,
                address: billingInfo.address,
                city: billingInfo.city,
                state: billingInfo.state,
                country: billingInfo.country,
                pinCode: billingInfo.pinCode,
                phoneNo: billingInfo.phoneNo 
            });
        }
        if(shippingInfo) {
            setSelectedShippingAddress(shippingInfo.addressId);
            setShippingAddress({
                selectedShippingAddress: shippingInfo.addressId,
                firstname: shippingInfo.firstname,
                lastname: shippingInfo.lastname,
                address: shippingInfo.address,
                city: shippingInfo.city,
                state: shippingInfo.state,
                country: shippingInfo.country,
                pinCode: shippingInfo.pinCode,
                phoneNo: shippingInfo.phoneNo 
            });
        }
        if(_shippingSameAsBilling) {
             setShippingSameAsBilling(_shippingSameAsBilling ? _shippingSameAsBilling : true);
        }
    }, [billingInfo, shippingInfo, _shippingSameAsBilling]);

    useEffect(() => {
        if(selectedShippingAddress === 'newaddress') {
            const name = userData.name.split(" ");
            setSelectedShippingAddress('newaddress');
            setShippingAddress({
                    selectedShippingAddress,
                    firstname: name[0],
                    lastname: name[1] ? name[1] : "",
                    address: "",
                    city: "",
                    state: "",
                    country: "",
                    pinCode: "",
                    phoneNo: "" 
                });
        } else {
            if(addresses) {
                const isMatched = addresses.find(item => item._id === selectedShippingAddress);                
                if(isMatched) {
                    setShippingAddress({
                        selectedShippingAddress,
                        firstname: isMatched.firstname,
                        lastname: isMatched.lastname,
                        address: isMatched.address,
                        city: isMatched.city,
                        state: isMatched.state,
                        country: isMatched.country,
                        pinCode: isMatched.pinCode,
                        phoneNo: isMatched.phoneNo 
                    });
                }
            }
        }
    }, [addresses, selectedShippingAddress, userData]);

    useEffect(() => {
        if(selectedBillingAddress === 'newaddress') {
            const name = userData.name.split(" ");
            setSelectedBillingAddress('newaddress');
            setBillingAddress({
                    selectedBillingAddress: "",
                    firstname: name[0],
                    lastname: name[1] ? name[1] : "",
                    address: "",
                    city: "",
                    state: "",
                    country: "",
                    pinCode: "",
                    phoneNo: "" 
                });
        } else {
            if(addresses) {
                const isMatched = addresses.find(item => item._id === selectedBillingAddress);                
                if(isMatched) {
                    setBillingAddress({
                        selectedBillingAddress: "",
                        firstname: isMatched.firstname,
                        lastname: isMatched.lastname,
                        address: isMatched.address,
                        city: isMatched.city,
                        state: isMatched.state,
                        country: isMatched.country,
                        pinCode: isMatched.pinCode,
                        phoneNo: isMatched.phoneNo 
                    });
                }
            }
        }
    }, [addresses, selectedBillingAddress, userData]);
    
    useEffect(() => {
        dispatch(getAllAddress());
        dispatch(loadShippingAndBillingAddress());
    }, [dispatch]);

    const shippingSubmit = (e) => {
        e.preventDefault();
        if(shippingAddress.phoneNo.length < 10 || shippingAddress.phoneNo.length > 10) {
            alert.error("Shipping Phone number should be 10 digit long");
            return;
        }
        
        if(billingAddress.phoneNo.length < 10 || billingAddress.phoneNo.length > 10) {
            alert.error("Billing Phone number should be 10 digit long");
            return;
        }

        const _billingAddress ={
                addressId: selectedBillingAddress,
                firstname: billingAddress.firstname, 
                lastname: billingAddress.lastname,
                address: billingAddress.address,
                city: billingAddress.city,
                state: billingAddress.state,
                country: billingAddress.country,
                pinCode: billingAddress.pinCode,
                phoneNo: billingAddress.phoneNo
            };

        const _shippingAddress = {
                addressId: selectedShippingAddress,
                firstname: shippingAddress.firstname, 
                lastname: shippingAddress.lastname,
                address: shippingAddress.address,
                city: shippingAddress.city,
                state: shippingAddress.state,
                country: shippingAddress.country,
                pinCode: shippingAddress.pinCode,
                phoneNo: shippingAddress.phoneNo
            };

        dispatch(saveShippingInfo(
            {
                billingAddress: !shippingSameAsBilling ? _billingAddress : _shippingAddress,
                shippingSameAsBilling: shippingSameAsBilling,
                shippingAddress: _shippingAddress
            }
        ));
        navigate("/order/confirm");       
    }

    if(loading || loadingCart) {return (<></>)}
    console.log( "shippingInfo: ", shippingInfo, "billingInfo: ", billingInfo);
    return <>
        <MetaData title="Shipping Details" />
        <CheckoutSteps activeStep={0} />
        <div className="shippingContainer">
            <div className="shippingBox">
                <div className="shippingHeading">Shipping Details</div>
                <form className="shippingForm" encType="multipart/form-data" onSubmit={shippingSubmit}>
                    <ControlContainer label={"Shipping Addresses"}>
                        <select value={selectedShippingAddress} onChange={(e) => setSelectedShippingAddress(e.target.value)}>
                            <option value={""}>Select Shipping Address</option>
                            <option value={"newaddress"}>Add New Address</option>
                            {
                                addresses.length > 0 && addresses.map(address => {
                                    return (
                                        <option key={address._id} value={address._id}>
                                            {`${address.firstname} ${address.lastname}, ${address.address},${address.city},${address.state},${address.country} ${address.pinCode}`}
                                        </option>
                                    );
                                })
                            }
                        </select>
                    </ControlContainer>
                    {
                        selectedShippingAddress !=='' && <AddressCard 
                            formData={shippingAddress}
                            setFormData={setShippingAddress} 
                        />
                    }
                    <ControlContainer label={"Billing Address same as Shipping Addresses"}>
                        <input type="checkbox" defaultChecked={shippingSameAsBilling} onClick={(e) => setShippingSameAsBilling(e.target.checked)}/>
                    </ControlContainer>
                    {!shippingSameAsBilling && <>
                            <ControlContainer label={"Billing Addresses"}>
                                <select value={selectedBillingAddress} onChange={(e) => setSelectedBillingAddress(e.target.value)}>
                                    <option value={""}>Select Billing Address</option>
                                    <option value={"newaddress"}>Add New Address</option>
                                    {
                                        addresses.length > 0 && addresses.map(address => {
                                            return (
                                                <option key={address._id} value={address._id}>
                                                    {`${address.firstname} ${address.lastname}, ${address.address},${address.city},${address.state},${address.country} ${address.pinCode}`}
                                                </option>
                                            );
                                        })
                                    }
                                </select>
                            </ControlContainer>{}
                            {
                                selectedBillingAddress !=='' && <AddressCard 
                                    formData={billingAddress}
                                    setFormData={setBillingAddress} 
                                />
                            }
                        </>
                    }
                    <SubmitActionButton disabled={shippingAddress.state ? false : true } title={"Continue"} />
                </form>
            </div>
        </div>
    </>
}

export default Shipping;
