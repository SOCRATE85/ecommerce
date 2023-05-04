import React, { useMemo } from "react";
import { Typography, Button } from "@mui/material";
import { Edit, Delete } from '@mui/icons-material';
//import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import AddressCard from '../AddressCard';
import DataListing from "../../../../common/components/DataListing";

const Addresses = ({ addresses }) => {
    //const alert = useAlert();
    const columns = [
        { field: "id", headerName: "ID"},
        { field: "firstname", headerName: "First Name",},
        { field: "lastname", headerName: "Last Name"},
        { field: "address", headerName: "Street Address"},
        { field: "city", headerName: "City"},
        { field: "state", headerName: "State"},
        { field: "zipcode", headerName: "Zip/Postal Code"},
        { field: "phone", headerName: "Phone"},
        { 
            field: "actions", 
            headerName: "Actions", 
            minWidth: 150, 
            flex: 0.3, 
            type: "number", 
            sortable: false,
            renderCell: (params) => {
                return (<>
                    <Link to = {`/admin/address/${params.row.id}`}><Edit /></Link>
                    <Button onClick={() => deleteUserHandler(params.row.id)}><Delete /></Button>
                </>);
            }
        }
    ];
    const rows = useMemo(() => {
        let _rows = [];
        addresses && addresses.forEach(address =>{
            _rows.push({
                id: address._id,
                firstname: address.firstname,
                lastname: address.lastname,
                address: address.address,
                city: address.city,
                state: address.state,
                zipcode: address.pinCode,
                phone: address.phoneNo,
            });
        });
        return _rows;
    }, [addresses]);
    const deleteUserHandler = () => {

    }
    return (
        <div className="flex-row">
            <Typography className="w-full p-3 bottom-1" component={'div'}>Addresses</Typography>
            <div className="flex w-full">
                {addresses && addresses.map((address) => <AddressCard key={address._id} address={address}/>)}
            </div>
            <div className="w-full">
               <DataListing columns={columns} rows={rows} />
            </div>
        </div>
    );
}

export default Addresses;
