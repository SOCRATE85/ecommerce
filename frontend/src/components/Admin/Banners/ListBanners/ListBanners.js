import React, {useEffect} from "react";
import { useAlert } from "react-alert";
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { getAllBanner, clearErrors, deleteBanner } from '../../../../store/actions/bannerAction';
import { DELETE_BANNER_RESET } from "../../../../store/contants/bannerContant";
import { FormContainer } from '../../../../common/components/FormContainer';
import Loader from "../../../layout/Loader/Loader";
import './ListBanners.css';

const ListBanners = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {banners, loading, error} = useSelector(state => state.banners);
    const {isDeleted} = useSelector(state => state.deleteBanner);
    const alert = useAlert();

    useEffect(() => {
        if(isDeleted) {
            alert.success("Banner deleted successfully");
            navigate("/admin/banners");
            dispatch(getAllBanner());
            dispatch({ type: DELETE_BANNER_RESET });
        }
    }, [isDeleted, alert, dispatch, banners, navigate]);

    const deleteBannerHandler = (id) => {
        dispatch(deleteBanner(id));
    }

    let columns = [
        { field: "id", headerName: "Id", flex: 1},
        { field: "name", headerName: "Name", type: "number", flex: 1},
        { field: "status", headerName: "Status", renderCell: (params) => {
            return params.row.status === true ? "Enabled" : "Disabled";
        }, flex: 1},
        {
            field: "actions", 
            headerName: "Actions",
            type: "number",
            flex: 1,
            sortable: false,
            renderCell: (params) => {
                return (<>
                    <Link to = {`/admin/banner/${params.row.id}`}><Edit /></Link>
                    <Button onClick={() => deleteBannerHandler(params.row.id)}><Delete /></Button>
                </>);
            }
        }    
    ];

    const rows = [];
    banners && banners.forEach(banner => {
        rows.push({
            id: banner._id,
            name: banner.name,
            status: banner.status
        });
    });

    useEffect(() => {
        dispatch(getAllBanner());
    },[dispatch]);

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors);
        }
    },[alert, dispatch, error]);
    if(loading) {return <Loader />}
    
    return <FormContainer pagetitle={"Manage Banner"}>
         {loading ? <Loader /> : <>
         <div className="text-left flex justify-end">
            <Button onClick={() => navigate("/admin/banner/new")}>Add Banner</Button>
        </div>
        <DataGrid
            columns={columns} 
            rows={rows} 
            pageSize={10} 
            disableSelectionOnClick
            className='productListTable'
            autoHeight
            rowsPerPageOptions={[5, 10, 15, 20, 25]}
        /></>}
    </FormContainer>
}

export default ListBanners;
