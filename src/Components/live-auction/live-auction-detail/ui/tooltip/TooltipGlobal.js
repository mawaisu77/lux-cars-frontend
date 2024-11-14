// TooltipGlobal.js
import React from 'react';
import CustomTooltip from './CustomTooltip';
import TooltipContentComponent from './TooltipContent';

const TooltipGlobal = ({
  title = "Default Title",
  description = "Default description text.",
  tableData = [],
  customStyles = {},
  placement = "left",
  hoverComponent = <span>Hover</span>,
}) => {
  const content = (
    <TooltipContentComponent 
      title={title} 
      description={description} 
      tableData={tableData} 
      customStyles={customStyles} 
    />
  );

  return (
    <div>
      <CustomTooltip title={content} placement={placement} arrow>
        {hoverComponent}
      </CustomTooltip>
    </div>
  );
};

export default TooltipGlobal;
