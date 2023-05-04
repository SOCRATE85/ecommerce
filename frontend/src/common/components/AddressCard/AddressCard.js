import React from "react";
import { Country, State } from 'country-state-city';
import ControlContainer from "../ControlContainer/ControlContainer";

const AddressCard = ({ formData, setFormData }) => {
    return <>
        <ControlContainer label={'First Name'}>
            <input 
                type={"text"} 
                placeholder="First Name" 
                required 
                name='firstname' 
                value={formData.firstname} 
                onChange={(e) => setFormData({...formData, firstname: e.target.value})} 
            />
        </ControlContainer>
        <ControlContainer label="Last Name">
            <input 
                type={'text'} 
                placeholder={"Last Name"} 
                required 
                name="lastname"
                value={formData.lastname} 
                onChange={(e) => setFormData({...formData, lastname: e.target.value})}
            />
        </ControlContainer>
        <ControlContainer label="Address">
            <input 
                type={"text"} 
                placeholder="Address" 
                required 
                value={formData.address} 
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                autoComplete="off"
            />
        </ControlContainer>
        <ControlContainer label="City">
            <input 
                type={"text"} 
                placeholder="City" 
                required 
                value={formData.city} 
               onChange={(e) => setFormData({...formData, city: e.target.value})}
            />
        </ControlContainer>
        <ControlContainer label="Pin Code">
            <input 
                type={"number"} 
                placeholder="Pin Code" 
                required 
                value={formData.pinCode} 
                onChange={(e) => setFormData({...formData, pinCode: e.target.value})}
            />
        </ControlContainer>
        <ControlContainer label="Phone No">
            <input 
                type={"number"} 
                placeholder="Phone No" 
                required 
                value={formData.phoneNo} 
                onChange={(e) => setFormData({...formData, phoneNo: e.target.value})}
                size={"10"}
            />
        </ControlContainer>
        <ControlContainer label="Country">
            <select required value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})}>
                <option>Country</option>
                {
                    Country && Country.getAllCountries().map((item)=>{
                        return <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                    })
                }
            </select>
        </ControlContainer>
        {
            formData.country && (<ControlContainer label="State">
                <select required value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})}>
                    {State && State.getStatesOfCountry(formData.country).map((item) => {
                        return <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                    })}
                </select>
            </ControlContainer>)
        }
    </>
}

export default AddressCard;
