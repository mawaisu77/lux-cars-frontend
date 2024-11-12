import React from "react"
import Modal from '@mui/material/Modal'
import Backdrop from '@mui/material/Backdrop'
import Fade from '@mui/material/Fade'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { LuxLogoWhite } from "../../utils/constant"
import { useNavigate } from "react-router-dom"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
}

export default function LoginModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login');
  }

  return (
    <Modal
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isOpen}>
        <Box sx={style}>
          <div className="flex justify-center mb-6">
            <img src={LuxLogoWhite} alt="Lux Logo" className="w-24" />
          </div>
          <Typography id="login-modal-title" variant="h6" component="h2" className="text-center font-bold mb-4">
            Login Required
          </Typography>
          <Typography id="login-modal-description" className="text-gray-600 mb-6 text-center">
            Please log in to save this vehicle to your favorites.
          </Typography>
          <div className="flex justify-center space-x-4">
            <Button
              onClick={handleLogin}
              variant="contained"
              color="primary"
            >
              Login
            </Button>
            <Button
              onClick={onClose}
              variant="outlined"
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Fade>
    </Modal>
  )
}