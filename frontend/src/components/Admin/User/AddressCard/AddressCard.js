import React from "react";

const AddressCard = ({address}) => {
    return (<address className="w-[50%] m-3 not-italic">
            <strong>Default Billing Address</strong><br />
            {address.firstname} {address.lastname}<br />
            {address.address}<br />
            {address.city}, {address.state},{address.pinCode}<br/>
            {address.country}<br/>
            T: {address.phoneNo}
        </address>);
}

export default AddressCard;
