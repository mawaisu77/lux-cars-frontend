// TooltipContent.js
import React from 'react';
import { styled } from '@mui/material/styles';

// Dynamic TooltipContent component with customizable styles
const TooltipContent = styled('div')(({ customStyles }) => ({
  color: customStyles.color || 'white',
  ...customStyles,
  '& h2': {
    fontSize: '14px',
    fontWeight: 500,
    marginBottom: '4px',
    ...customStyles.headerStyles,
  },
  '& p': {
    fontSize: '12px',
    marginBottom: '16px',
    opacity: 0.9,
    ...customStyles.paragraphStyles,
  },
  '& table': {
    width: '100%',
    borderCollapse: 'collapse',
  },
  '& th': {
    textAlign: 'left',
    fontSize: '12px',
    paddingBottom: '8px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  },
  '& td': {
    padding: '4px 0',
    fontSize: '12px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
}));

const TooltipContentComponent = ({ title, description, tableData, customStyles }) => (
    <TooltipContent customStyles={customStyles}>
      {title && <h2>{title}</h2>}
      {description && <p>{description}</p>}
      {tableData && tableData.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Bid Range $</th>
              <th style={{ textAlign: 'right' }}>Increment $</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.range}</td>
                <td style={{ textAlign: 'right' }}>{row.increment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </TooltipContent>
  );
  
  export default TooltipContentComponent;