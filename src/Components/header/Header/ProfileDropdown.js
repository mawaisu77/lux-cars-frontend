import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useLogout } from '../../../hooks/useLogout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export default function ProfileDropdown({user}) {
  const navigate = useNavigate(); 
  const { logout } = useLogout();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutModal = () => {
    document.getElementById("my_logout_modal").showModal();
  };

  const handleLogoout = () => {
    logout();
    navigate("/");
    document.getElementById("my_logout_modal").close();
  };


  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

        <Tooltip title="My Account">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar  sx={{ width: 32, height: 32, backgroundColor: user ? '#ca0000' : '' }}>
            {user ? user.username.charAt(0) : 'X'} 
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        disableScrollLock
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
 
   <MenuItem >
      {
        user?.profilePicture ? <Avatar src={user?.profilePicture || ''} /> : <Avatar sx={{ width: 32, height: 32 }}>
          {user?.username.charAt(0)}
        </Avatar>
      }  
     { user ? <div className='flex flex-col'>
        {user?.username}
        {/* Added user email below the username */}
        <Typography variant="body2" color="text.secondary">
          {user?.email}
        </Typography>
        </div>
        : <Link to="/login" className='text-gray-600'>{`Please login to continue`}</Link>
        }
      </MenuItem>

        <Divider />
        <MenuItem onClick={() => { handleClose(); navigate('/user/account/profile'); }}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small"  />
          </ListItemIcon>
          My Account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem sx={{ color: '#ca0000' }} onClick={handleLogoutModal}>
          <ListItemIcon>
            <Logout fontSize="small" sx={{ color: '#ca0000' }} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <dialog id="my_logout_modal" className="modal">
          <div className="modal-box dark:bg-white">
            <h3 className="text-gray-600 font-bold text-lg my-2">
              Do you want to logout your account?
            </h3>

            <div className="flex gap-x-2 justify-center  mt-6">
              <button
                className=" text-green-600 w-[70px] py-1 border border-green-600 dark:bg-white rounded-md dark:hover:bg-green-600/80 hover:text-white duration-200"
                onClick={handleLogoout}
              >
                Confirm
              </button>
              <button
                className=" text-red-600 w-[70px] py-1 border border-red-600 dark:bg-white rounded-md dark:hover:bg-red-600/80 hover:text-white duration-200"
                onClick={() =>
                  document.getElementById("my_logout_modal").close()
                }
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
    </React.Fragment>
  );
}