import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import PropTypes from 'prop-types';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>{children}</Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `category-tab-${index}`,
    'aria-controls': `category-tabpanel-${index}`,
  };
}

const TabPanelContainer = ({firstTabContents, secondTabContents, mode}) => {
    const [value, setValue] = useState(0);
    const handleChange = (_event, newValue) => {
      setValue(newValue);
    };
    return <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs category">
                    <Tab label="General" {...a11yProps(0)} />
                    <Tab label="Products" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                {firstTabContents}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {secondTabContents}
            </TabPanel>
        </Box>
}

export default TabPanelContainer;
