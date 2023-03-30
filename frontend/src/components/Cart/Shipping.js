import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useAlert } from "react-alert";
import { 
    FaceOutlined, 
    PinDropOutlined, 
    HomeOutlined, 
    LocationCityOutlined, 
    PublicOutlined, 
    TransferWithinAStationOutlined, 
    PhoneOutlined
} from "@mui/icons-material";
import { saveShippingInfo } from "../../store/actions/cartAction";
import { getAllAddress } from "../../store/actions/addressAction";
import CheckoutSteps from './CheckoutSteps';
import { Country, State } from 'country-state-city';
import MetaData from "../layout/MetaData";
import "./Shipping.css";

const Shipping = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const { user: userData } = useSelector(state => state.user);
    const { shippingInfo } = useSelector(state => state.cart);
    const { addresses, loading } = useSelector(state => state.addresses);
    const [ seletedAddress, setSeletedAddress ] = useState("");
    const [ firstname, setFirstname ] = useState(shippingInfo.firstname);
    const [ lastname, setLastname ] = useState(shippingInfo.lastname);
    const [ address, setAddress ] = useState(shippingInfo.address);
    const [ city, setCity ] = useState(shippingInfo.city);
    const [ state, setState ] = useState(shippingInfo.state);
    const [ country, setCountry ] = useState(shippingInfo.country);
    const [ pinCode, setPinCode ] = useState(shippingInfo.pinCode);
    const [ phoneNo, setPhoneNo ] = useState(shippingInfo.phoneNo);

    useEffect(() => {
        if(seletedAddress === 'newaddress') {
            const name = userData.name.split(" ");
            setSeletedAddress('newaddress');
            setFirstname(name[0]);
            setLastname(name[1] ? name[1] : "");
            setAddress("");
            setCity("");
            setState("");
            setCountry("");
            setPinCode("");
            setPhoneNo("");
        } else {
            if(addresses) {
                const isMatched = addresses.find(item => item._id === seletedAddress);                
                if(isMatched) {
                    setFirstname(isMatched.firstname);
                    setLastname(isMatched.lastname);
                    setAddress(isMatched.address);
                    setCity(isMatched.city);
                    setState(isMatched.state);
                    setCountry(isMatched.country);
                    setPinCode(isMatched.pinCode);
                    setPhoneNo(isMatched.phoneNo);
                }
            }
        }
    }, [addresses, seletedAddress, userData]);

    useEffect(() => {
        dispatch(getAllAddress());
    }, [dispatch]);

    const shippingSubmit = (e) => {
        e.preventDefault();
        if(phoneNo.length < 10 || phoneNo.length > 10) {
            alert.error("Phone number should be 10 digit long");
            return;
        }
        
        dispatch(saveShippingInfo({
            addressId: seletedAddress,
            firstname, 
            lastname,
            address,
            city,
            state,
            country,
            pinCode,
            phoneNo
        }));
        navigate("/order/confirm");       
    }

    if(loading) {return (<></>)}
    
    return <>
        <MetaData title="Shipping Details" />
        <CheckoutSteps activeStep={0} />
        <div className="shippingContainer">
            <div className="shippingBox">
                <div className="shippingHeading">Shipping Details</div>
                <form className="shippingForm" encType="multipart/form-data" onSubmit={shippingSubmit}>
                    <div>
                        <PublicOutlined />
                        <select onChange={(e) => setSeletedAddress(e.target.value)}>
                            <option value={""}>select Address</option>
                            <option value={"newaddress"}>Add New Address</option>
                            {
                                addresses.length > 0 && addresses.map(address => {
                                    return <option key={address._id} value={address._id}>{`${address.firstname} ${address.lastname}, ${address.address},${address.city},${address.state},${address.country} ${address.pinCode}`}</option>
                                })
                            }
                        </select>
                    </div>
                    {
                        seletedAddress !=='' && <>
                            <div>
                                <FaceOutlined />
                                <input 
                                    type={"text"} 
                                    placeholder="First Name" 
                                    required 
                                    name='firstname' 
                                    value={firstname} 
                                    onChange={(e) => setFirstname(e.target.value)} 
                                />
                            </div>
                            <div>
                                <FaceOutlined />
                                <input 
                                    type={'text'} 
                                    placeholder={"Last Name"} 
                                    required 
                                    name="lastname"
                                    value={lastname} 
                                    onChange={(e) => setLastname(e.target.value)} 
                                />
                            </div>
                            <div>
                                <HomeOutlined />
                                <input 
                                    type={"text"} 
                                    placeholder="Address" 
                                    required 
                                    value={address} 
                                    onChange={(e)=>setAddress(e.target.value)}
                                    autoComplete="off"
                                />
                            </div>
                            <div>
                                <LocationCityOutlined />
                                <input 
                                    type={"text"} 
                                    placeholder="City" 
                                    required 
                                    value={city} 
                                    onChange={(e)=>setCity(e.target.value)} 
                                />
                            </div>
                            <div>
                                <PinDropOutlined />
                                <input 
                                    type={"number"} 
                                    placeholder="Pin Code" 
                                    required 
                                    value={pinCode} 
                                    onChange={(e)=>setPinCode(e.target.value)} 
                                />
                            </div>
                            <div>
                                <PhoneOutlined />
                                <input 
                                    type={"number"} 
                                    placeholder="Phone No" 
                                    required 
                                    value={phoneNo} 
                                    onChange={(e)=>setPhoneNo(e.target.value)}
                                    size={"10"}
                                />
                            </div>
                            <div>
                                <PublicOutlined />
                                <select required value={country} onChange={(e)=> setCountry(e.target.value)}>
                                    <option>Country</option>
                                    {
                                        Country && Country.getAllCountries().map((item)=>{
                                            return <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                            {
                                country && (<div>
                                    <TransferWithinAStationOutlined />
                                    <select required value={state} onChange={(e)=>setState(e.target.value)}>
                                        {State && State.getStatesOfCountry(country).map((item) => {
                                            return <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                        })}
                                    </select>
                                </div>)
                            }
                        </>
                    }
                    <input 
                        type={"submit"} 
                        value="Continue" 
                        className="button" 
                        disabled={state ? false : true }
                    />
                </form>
            </div>
        </div>
    </>
}

export default Shipping;
