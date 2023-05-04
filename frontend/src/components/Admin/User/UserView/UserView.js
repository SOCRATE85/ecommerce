import React, { useMemo } from "react";
import { Typography } from "@mui/material";
import AddressCard from '../AddressCard';

const UserView = ({user, addresses}) => {
    const address = useMemo(() => {
        let _address = addresses.find(item => item.isDefault === true);
        if(_address) {
            return _address;
        } else {
            return addresses.length>0 && addresses[0];
        }
    }, [addresses]);

    return (<div className="flex-row">
        <Typography className="w-full p-3 bottom-1" component={'div'}>Personal Information</Typography>
        <div className="flex">
            <table className="w-[50%] m-3">
                <tbody>
                    <tr className="bg-slate-400 m-2">
                        <th className="text-left p-2">Last Logged in:</th>
                        <td className="text-left p-2">May 2, 2023 6:00:00PM (Online)</td>
                    </tr>
                    <tr className="m-2">
                        <th className="text-left p-2">Account Lock</th>
                        <td className="text-left p-2">UnLocked</td>
                    </tr>
                    <tr className="bg-slate-400 m-2">
                        <th className="text-left p-2">Confirmed email:</th>
                        <td className="text-left p-2">Confirmation Not Required</td>
                    </tr>
                    <tr className="m-2">
                        <th className="text-left p-2">Account Created</th>
                        <td className="text-left p-2">Oct 4, 2022, 1:11:11PM</td>
                    </tr>
                    <tr className="bg-slate-400 m-2">
                        <th className="text-left p-2">Account Role</th>
                        <td className="text-left p-2">Admin</td>
                    </tr>
                </tbody>
            </table>
            <AddressCard address={address}/>
        </div>
    </div>)
}

export default UserView;