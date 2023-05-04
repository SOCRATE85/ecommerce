import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import './VerticalTabs.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs({ tabsItems }) {
  const [value, setValue] = React.useState(0);
  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', padding: '20px', height: '100vh' }}>
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs"
        sx={{ borderRight: 1, borderColor: 'divider' }}
        className='w-[20%] h-[100%]'
      >
        {tabsItems && tabsItems.map((item) => <Tab label={item.title} key={item.id} {...a11yProps(item.id)} />)}
      </Tabs>
      {tabsItems && tabsItems.map((item) => <TabPanel className='w-[79%]' key={item.id + item.title} value={value} index={item.id}>{item.contents}</TabPanel>)}
    </Box>
  );
}