import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FormContainer } from "../../../../common/components/FormContainer";
import VerticalTabs from '../../../../common/components/VerticalTabs';
import UserView from '../UserView';
import UserComponent from '../UserComponent';
import Addresses from '../Addresses'
import { clearErrors, getUserDetails } from "../../../../store";

const UpdateUser = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const alert = useAlert(); 
    const { loading: userDetailsLoading, error: userDetailsError, user, addresses } = useSelector( state => state.userDetails );

    useEffect(() => {
        if(user && user._id !== params.id) {
            dispatch(getUserDetails(params.id));
        }        
    }, [dispatch, params.id, user]);

    useEffect(() => {
        if(userDetailsError) {
            alert.error(userDetailsError.error);
            dispatch(clearErrors());
        }
    },[alert, dispatch, userDetailsError, params.id]);

    return (<FormContainer pagetitle={"Update User"}>
            {userDetailsLoading ? <></> : <VerticalTabs tabsItems={[
            {
                id: 0,
                title: "Customer View",
                contents: <UserView user={user}  addresses={addresses} />
            },
            {
                id: 1,
                title: "Account Information",
                contents: <UserComponent user={user} />
            },
            {
                id: 2,
                title: "Addresses",
                contents: <Addresses addresses={addresses}/>
            },
            {
                id: 3,
                title: "Orders",
                contents: <>All ORders</>
            },
            {
                id: 4,
                title: "Product Review",
                contents: <>Product Review</>
            }
        ]}/>}
    </FormContainer>)
}

export default UpdateUser;