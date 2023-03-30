import React, {useEffect} from "react";
import { useAlert } from "react-alert";
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { getAllSlider, clearErrors, deleteSlider } from '../../../../store/actions/sliderAction';
import { DELETE_SLIDER_RESET } from "../../../../store/contants/sliderContant";
import { FormContainer } from '../../../../common/components/FormContainer';
import Loader from "../../../layout/Loader/Loader";
import './ListSliders.css';

const ListSliders = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {sliders, loading, error} = useSelector(state => state.sliders);
    const {isDeleted} = useSelector(state => state.deleteSlider);
    const alert = useAlert();

    useEffect(() => {
        if(isDeleted) {
            alert.success("Slider deleted successfully");
            navigate("/admin/sliders");
            dispatch(getAllSlider());
            dispatch({ type: DELETE_SLIDER_RESET });
        }
    }, [isDeleted, alert, dispatch, sliders, navigate]);

    const deleteSliderHandler = (id) => {
        dispatch(deleteSlider(id));
    }

    let columns = [
        { field: "id", headerName: "Id", flex: 1},
        { field: "title", headerName: "Title", type: "number", flex: 1},
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
                    <Link to = {`/admin/slider/${params.row.id}`}><Edit /></Link>
                    <Button onClick={() => deleteSliderHandler(params.row.id)}><Delete /></Button>
                </>);
            }
        }    
    ];

    const rows = [];
    sliders && sliders.forEach(slider => {
        rows.push({
            id: slider._id,
            title: slider.title,
            status: slider.status
        });
    });

    useEffect(() => {
        dispatch(getAllSlider());
    },[dispatch]);

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors);
        }
    },[alert, dispatch, error]);
    if(loading) {return <Loader />}
    
    return <FormContainer pagetitle={"Mansge Slider"}>
         {loading ? <Loader /> : <>
         <div className="text-left flex justify-end">
            <Button onClick={() => navigate("/admin/slider/new")}>Add Slider</Button>
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

export default ListSliders;
