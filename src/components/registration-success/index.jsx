import { Box, Typography } from '@mui/material';
import A2D from "../../assets/a2glogo.png";

const RegistrationSuccess = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Box sx={{ maxWidth: '430px' }}>
            <Box sx={{ mb: "2rem" }}>
            <img src={A2D} alt="logo" />
        </Box>
                <Typography sx={{ textAlign: 'center', fontWeight: 800, fontSize: '32px' }}>Congratulations</Typography>
                <Typography sx={{ marginTop: '24px', textAlign: 'center', fontWeight: 700, fontSize: '24px' }}>Your Account Created Successfully</Typography>
            </Box>
        </Box>
    )
}

export default RegistrationSuccess