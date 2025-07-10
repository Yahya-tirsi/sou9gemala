import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { 
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  Stack,
  Alert
} from '@mui/material';
import { orange } from '@mui/material/colors';
import {  sendVerificationCode } from '../../features/supplier/supplierSlice';

const VerificationEmailCode = ({ email, onVerificationComplete }) => {
  const { t, i18n } = useTranslation();
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Send verification code when component mounts
    handleSendVerificationCode();
    
    // Start countdown
    const timer = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    
    return () => clearInterval(timer);
  }, [email, dispatch]);

  const handleSendVerificationCode = async () => {
    setResendLoading(true);
    try {
      await dispatch(sendVerificationCode(email)).unwrap();
      setSuccess(t('register.codeSentSuccessfully'));
      setError(null);
    } catch {
      setError(t('register.codeSendingFailed'));
      setSuccess(null);
    } finally {
      setResendLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // await dispatch(verifyEmail({ email, code })).unwrap();
      setSuccess(t('register.verificationSuccessful'));
      onVerificationComplete();
    } catch {
      setError(t('register.verificationFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  const resendCode = () => {
    handleSendVerificationCode();
    setCountdown(60);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 2, boxShadow: 1 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: orange[700] }}>
          {t('register.verifyYourEmail')}
        </Typography>
        
        <Typography paragraph>
          {t('register.codeSentTo')} <strong>{email}</strong>
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label={t('register.email')}
            value={email}
            variant="outlined"
            sx={{ mb: 2 }}
            InputProps={{
              readOnly: true,
            }}
          />

          <TextField
            fullWidth
            label={t('register.verificationCode')}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            variant="outlined"
            sx={{ mb: 3 }}
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{
              py: 1.5,
              bgcolor: orange[700],
              '&:hover': {
                bgcolor: orange[800]
              }
            }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : t('common.verify')}
          </Button>
        </Box>

        <Button
          fullWidth
          onClick={resendCode}
          disabled={countdown > 0 || resendLoading}
          sx={{
            mt: 2,
            color: countdown > 0 ? 'text.disabled' : orange[700],
            textTransform: 'none'
          }}
        >
          {resendLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            <>
              {t('register.resendCode')} {countdown > 0 && `(${countdown}s)`}
            </>
          )}
        </Button>

        {/* Language Selector */}
        <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
          <Button
            size="small"
            onClick={() => i18n.changeLanguage("fr")}
            color={i18n.language === "fr" ? "primary" : "inherit"}
            sx={{
              fontWeight: i18n.language === "fr" ? "bold" : "normal",
              color: i18n.language === "fr" ? orange[700] : "inherit",
            }}
          >
            Français
          </Button>
          <Button
            size="small"
            onClick={() => i18n.changeLanguage("ar")}
            color={i18n.language === "ar" ? "primary" : "inherit"}
            sx={{
              fontWeight: i18n.language === "ar" ? "bold" : "normal",
              color: i18n.language === "ar" ? orange[700] : "inherit",
            }}
          >
            العربية
          </Button>
          <Button
            size="small"
            onClick={() => i18n.changeLanguage("en")}
            color={i18n.language === "en" ? "primary" : "inherit"}
            sx={{
              fontWeight: i18n.language === "en" ? "bold" : "normal",
              color: i18n.language === "en" ? orange[700] : "inherit",
            }}
          >
            English
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default VerificationEmailCode;