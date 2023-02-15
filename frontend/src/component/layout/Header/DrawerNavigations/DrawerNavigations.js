import React, { Fragment } from "react";
import { ExpandMore } from '@mui/icons-material';
import DrawerNavigationItems from './DrawerNavigationItems/DrawerNavigationItems';
import { useSelector } from 'react-redux';

const DrawerNavigations = (props) => {
    //const { isAuthenticated, user } = useSelector(state => state.user);
    const { loading, error, categories } = useSelector(state => state.categoryTree);
    
    if(loading || error) {
        return <></>
    }
    
    return <div className="drawer-links">
        <ul>
            <DrawerNavigationItems className="drawer-link" title={"Home"} url={"/"} />
            {
                categories.map((category) => {
                    return <DrawerNavigationItems 
                            key={category._id} 
                            icon={ category.children.length > 0 ? <ExpandMore color="#666" /> : <></>} 
                            className="drawer-link" 
                            childNumber="first" 
                            title={category.name} 
                            url={category.slug}
                        >
                        {
                            category.children.length > 0 && category.children.map(_category => {
                                    return (<Fragment key={_category._id}>
                                        <DrawerNavigationItems 
                                                icon={ _category.children.length > 0 ? <ExpandMore color="#666" /> : <></>} 
                                                className="drawer-child-link"
                                                childNumber="second" 
                                                title={_category.name} 
                                                url={_category.slug}
                                            >
                                            {
                                            _category.children.length > 0 && _category.children.map(subcategory => {
                                                return <DrawerNavigationItems 
                                                    key={subcategory._id} 
                                                    icon={<></>} 
                                                    className="drawer-child-link"
                                                    title={subcategory.name} 
                                                    url={subcategory.slug} 
                                                />
                                            })
                                            }
                                        </DrawerNavigationItems>
                                    </Fragment>)
                                })
                        }
                    </DrawerNavigationItems>
                })
            }
            {
                props.items.map((item, index) => {
                    return <DrawerNavigationItems 
                            className="drawer-link" 
                            key={index} 
                            title={item.title} 
                            url={item.url} 
                        />
                })
            }
        </ul>
    </div>
}

export default DrawerNavigations;
