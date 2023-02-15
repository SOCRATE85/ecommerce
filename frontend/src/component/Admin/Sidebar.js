import React from "react";
import Logo from "../layout/Header/Logo/Logo";
import {
    PostAddOutlined,
    AddOutlined,
    ListAltOutlined,
    PeopleAltOutlined,
    SettingsOutlined
} from "@mui/icons-material";
import { SiderbarLinkContainer } from "../../common/components/SiderbarLinkContainer";

const siderbarItems = [
    {
        url: `/admin/dashboard`,
        font: "",
        title: "Dashboard"
    },
    {
        url: `/admin/categories`, 
        font: <PostAddOutlined />,
        title: "Categories"
    },
    {
        url: "/admin/category/new",
        font: <AddOutlined />,
        title: "Add Category"
    },
    {
        url: "/admin/products",
        font: <PostAddOutlined />,
        title: "Products"
    },
    {
        url: "/admin/product/new",
        font: <AddOutlined />,
        title: "New Product"
    },
    {
        url: "/admin/attributes",
        font: <PostAddOutlined />,
        title: "Attributes"
    },
    {
        url: "/admin/attribute/new",
        font: <AddOutlined />,
        title: "Add Attribute"
    },
    {
        url: "/admin/attributesets",
        font: <PostAddOutlined />,
        title: "Attribute Set"
    },
    {
        url: "/admin/orders",
        font: <ListAltOutlined />,
        title: "Orders"
    },
    {
        url: "/admin/users",
        font: <PeopleAltOutlined />,
        title: "Users"
    },
    {
        url: "/admin/reviews",
        font: <PeopleAltOutlined />,
        title: "Reviews"
    },
    {
        url: "/admin/blog/categories",
        font: <PeopleAltOutlined />,
        title: "Blog Categories"
    },
    {
        url: "/admin/blogs",
        font: <PeopleAltOutlined />,
        title: "Manage Blog"
    },
    {
        url: "/admin/settings",
        font: <SettingsOutlined />,
        title: "Settings"
    }
]

const Sidebar = () => {
    return <div className="flex flex-col bg-white border-r border-gray-300 w-full">
        <Logo />
        {
           siderbarItems.map((item, index) => {
            return <SiderbarLinkContainer
                key={index}
                url={item.url} 
                font={item.font} 
                title={item.title}
            />
           }) 
        }
    </div>
}

export default Sidebar;