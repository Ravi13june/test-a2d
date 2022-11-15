import { useState } from 'react'
import { Formik, Form } from 'formik';
import { Box, Avatar, Typography, FormControlLabel, Checkbox, Button, IconButton, InputAdornment, OutlinedInput, FormHelperText } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import A2D from '../../assets/a2glogo.png'
import { loginSchema } from '../../validationSchema';

const LogInForm = ({ onSubmit }) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Box sx={{ mb: "2rem" }}>
                <img src={A2D} alt="logo" />
            </Box>
            <Typography component="h3" sx={{ fontWeight: "500", fontSize: "16px", lineHeight: "142%", textAlign: "center", color: " #808080", opacity: "0.5", mb: "1rem" }} >
                Enter your email address and password
            </Typography>
            <Formik onSubmit={onSubmit} initialValues={{ email: '', password: '' }} validationSchema={loginSchema}>
                {({ handleSubmit, handleChange, errors, touched }) => (
                    <Form onSubmit={handleSubmit}>
                        <Box sx={{ maxWidth: '430px' }}>
                            <OutlinedInput
                                onChange={handleChange}
                                fullWidth
                                name="email"
                                placeholder='Email'
                                autoComplete="email"
                                autoFocus
                                sx={{ marginBottom: '5px', fontWeight: 600, fontSize: '14px', borderRadius: "15px" }}
                            />
                            {
                             errors.email && touched.email && <FormHelperText sx={{color:'red', marginBottom: '10px'}} >{errors.email}</FormHelperText>
                            }
                            <OutlinedInput
                                onChange={handleChange}
                                fullWidth
                                placeholder='Password'
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                endAdornment={<InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>}
                                sx={{ marginBottom: '5px', fontWeight: 600, fontSize: '14px', borderRadius: "15px" }}
                            />
                             {
                             errors.password && touched.password && <FormHelperText sx={{color:'red', marginBottom: '10px'}} >{errors.password}</FormHelperText>
                            }
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                                sx={{ fontWeight: 600, fontSize: '14px' }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ padding: '15px', borderRadius: '15px', textTransform: 'none', fontWeight: 700, fontSize: '16px', background: "linear-gradient(192.05deg, #47BFDF 0%, #4A91FF 100%)", mt: "1rem" }}
                            >
                                Login
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}

export default LogInForm