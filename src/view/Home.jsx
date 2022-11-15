import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, Box, DialogContent, DialogTitle, IconButton, Link, Typography } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';
import LogInForm from '../components/login';
import Notification from '../components/notify';
import RegistrationSuccess from '../components/registration-success';
import SignUpForm from '../components/signup';
import { registerUser, userLogin } from '../services/user';

const Home = () => {
  const navigate = useNavigate()
  const [openAuthModal, setOpenAuthModal] = useState(false)
  const [showForm, setShowForm] = useState('login')
  const [notify, setNotify] = useState({ isOpen: false, type: 'info', message: '' })

  const handleUserRegistration = async (values) => {
    try {
      const userRegistrationRes = await registerUser(values)
      if (userRegistrationRes && userRegistrationRes.status) {
        setShowForm('success')
      }
    } catch (error) {
      if (error.response) {
        setNotify({ isOpen: true, type: 'error', message: error.response.data.msg })
      }
      setNotify({ isOpen: true, type: 'error', message: 'Something went wrong' })
    }
  }

  const handleLogin = async (values) => {
    try {
      const logInResponse = await userLogin(values)
      if (logInResponse) {
        localStorage.setItem('access_token', logInResponse.token)
        localStorage.setItem('live-weather', JSON.stringify(logInResponse.liveWeather))
        navigate('/dashboard')
      }

    } catch (error) {
      if (error.response) {
        setNotify({ isOpen: true, type: 'error', message: error.response.data.msg })
      }
      setNotify({ isOpen: true, type: 'error', message: 'Something went wrong' })

    }
  }
  return (
    <>
      <Notification notify={notify} setNotify={setNotify} />
      <Box sx={{ textAlign: 'center' }}>
        <Button variant='contained' sx={{
          position: 'absolute',
          top: '50%'
        }} onClick={() => setOpenAuthModal(true)}>Start Now</Button>
      </Box>
      <Dialog
        open={openAuthModal}
        keepMounted
        onClose={() => setOpenAuthModal(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'flex-end', padding: '0 16px' }}>
          <IconButton onClick={() => setOpenAuthModal(false)}>
            <CloseIcon fontSize='large' />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {
            showForm === 'login' && <LogInForm onSubmit={handleLogin} />
          }
          {
            showForm === 'singup' && <SignUpForm handleSubmit={handleUserRegistration} />
          }
          {
            showForm === 'success' && <RegistrationSuccess />
          }
        </DialogContent>
        {showForm === 'singup' && <Typography sx={{ margin: 'auto 120px' }}>By registering you agree to the Forcasting. <Link onClick={() => setShowForm('login')}>Terms of Use</Link> and <Link onClick={() => setShowForm('login')}>Privacy Policy.</Link></Typography>}
        <DialogActions sx={{ display: 'flex', justifyContent: 'center', padding: '30px' }}>
          {showForm === 'login' && <Typography>Dont have and account? <Link onClick={() => setShowForm('singup')}>SignUp</Link></Typography>}
          {showForm === 'singup' && <Typography>Already have an Account? <Link onClick={() => setShowForm('login')}>Login</Link></Typography>}
          {showForm === 'success' && <Button sx={{ fontWeight: 500, fontSize: '16px' }} onClick={() => setShowForm('singup')} startIcon={<ArrowBackIosIcon />}>Back to Signup</Button>}
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Home