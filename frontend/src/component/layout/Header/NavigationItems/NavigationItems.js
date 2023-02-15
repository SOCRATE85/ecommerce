import React, { Fragment } from "react";
import NavigationItem from './NavigationItem/NavigationItem';
import { ExpandMore} from '@mui/icons-material';
import UserOption from '../UserOption';
import { useSelector } from 'react-redux';
import './NavigationItems.css';

const NavigationItems = (props) => {
    const { isAuthenticated, user } = useSelector(state => state.user);
    const { loading, error, categories } = useSelector(state => state.categoryTree);

    if(loading || error) {
        return <></>
    }
   
    return <>
         <div className="nav-links">
            <ul>
                <NavigationItem className="nav-link" title={"Home"} url={"/"} />
                {
                    categories.map((category) => {
                        return <NavigationItem key={category._id} icon={ category.children.length > 0 ? <ExpandMore color="#666" /> : <></>} className="nav-link" childNumber="first" title={category.name} url={category.slug}>
                            {
                                category.children.length > 0 && category.children.map(_category => {
                                        return (<Fragment key={_category._id}>
                                            <NavigationItem icon={ _category.children.length > 0 ? <ExpandMore color="#666" /> : <></>} className="dropdown-link" childNumber="second" title={_category.name} url={_category.slug}>
                                                {
                                                _category.children.length > 0 && _category.children.map(subcategory => {
                                                    return <NavigationItem key={subcategory._id} icon={<></>} className="dropdown-link" title={subcategory.name} url={subcategory.slug} />
                                                })
                                                }
                                            </NavigationItem>
                                        </Fragment>)
                                    })
                            }
                        </NavigationItem>
                    })
                }
                {
                    props.items.map((item, index) => {
                        return <NavigationItem className="nav-link" key={index} title={item.title} url={item.url} />
                    })
                }
                {isAuthenticated ? <li><UserOption user={user} /></li> : ""}
            </ul>
        </div>
    </>
}

export default NavigationItems;
