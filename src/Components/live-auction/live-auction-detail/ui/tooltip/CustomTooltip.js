// CustomTooltip.js
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

// Styled custom tooltip component
const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  '& .MuiTooltip-tooltip': {
    maxWidth: 'none',
    padding: '10px',
    fontSize: '14px',
    borderRadius: '12px',
    color: 'white', // Default color
    backgroundColor: '#7A798A',
  },
}));

export default CustomTooltip;
