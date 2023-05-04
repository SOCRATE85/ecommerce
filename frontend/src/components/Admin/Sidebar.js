import React from "react";
import Logo from "../layout/Header/Logo/Logo";
import {
    PostAddOutlined,
    AddCircleOutline,
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
        title: "Manage Category"
    },
    {
        url: "/admin/category/new",
        font: <AddCircleOutline />,
        title: "Add Category"
    },
    {
        url: "/admin/products",
        font: <PostAddOutlined />,
        title: "Manage Products"
    },
    {
        url: "/admin/product/new",
        font: <AddCircleOutline />,
        title: "New Product"
    },
    {
        url: "/admin/attributes",
        font: <PostAddOutlined />,
        title: "Manage Attributes"
    },
    {
        url: "/admin/attribute/new",
        font: <AddCircleOutline />,
        title: "Add Attribute"
    },
    {
        url: "/admin/attributesets",
        font: <PostAddOutlined />,
        title: "Manage Attribute Set"
    },
    {
        url: "/admin/attributeset/new",
        font: <AddCircleOutline />,
        title: "Add Attribute Set"
    },
    {
        url: "/admin/orders",
        font: <ListAltOutlined />,
        title: "Orders"
    },
    {
        url: "/admin/users",
        font: <PeopleAltOutlined />,
        title: "Manage Users"
    },
    {
        url: "/admin/user/new",
        font: <AddCircleOutline />,
        title: "New User"
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
        url: "/admin/blog/category/new",
        font: <AddCircleOutline />,
        title: "Add Blog Category"
    },
    {
        url: "/admin/blogs",
        font: <PeopleAltOutlined />,
        title: "Manage Blog"
    },
    {
        url: "/admin/blog/new",
        font: <AddCircleOutline />,
        title: "Add Blog"
    },
    {
        url: "/admin/sliders",
        font: <PeopleAltOutlined />,
        title: "Manage Sliders"
    },
    {
        url: "/admin/slider/new",
        font: <AddCircleOutline />,
        title: "Add slider"
    },
    {
        url: "/admin/banners",
        font: <PeopleAltOutlined />,
        title: "Manage Banners"
    },
     {
        url: "/admin/banner/new",
        font: <AddCircleOutline />,
        title: "Add Banner"
    },
    {
        url: "/admin/settings",
        font: <SettingsOutlined />,
        title: "Settings"
    }
]

const Sidebar = () => {
    return <div className="flex flex-col bg-white border-r border-gray-300 w-[250px]">
        <Logo />
        <ul>
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
        </ul>
    </div>
}

export default Sidebar;