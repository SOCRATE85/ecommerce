import React from 'react';

const Title = ({title, selectedAttributeGroup, selected}) => {
    return (<div className={`title ${selected ? "selected" : ""}`} onClick={selectedAttributeGroup}>{title}</div>);    
}
export default Title;
