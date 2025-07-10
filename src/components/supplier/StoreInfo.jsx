import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Link
} from '@mui/material';
import { orange } from '@mui/material/colors';
import RegistrationSuccessModal from './RegistrationSuccessModal';

const StoreInfo = ({ onSubmit }) => {
  const { t, i18n } = useTranslation();
  const [storeName, setStoreName] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!storeName.trim()) {
      alert(t('register.storeNameRequired'));
      return;
    }
    if (!termsAccepted) {
      alert(t('register.acceptTermsError'));
      return;
    }
    setShowSuccessModal(true);
    onSubmit({ storeName });
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          bgcolor: 'background.paper',
          p: 4,
          borderRadius: 2,
          boxShadow: 1,
          textAlign: i18n.language === 'ar' ? 'right' : 'left'
        }}
      >
        <Typography 
          variant="h5" 
          component="h2" 
          gutterBottom
          sx={{ color: orange[700] }}
        >
          {t('register.storeInfo')}
        </Typography>
        
        <Typography paragraph>
          {t('register.setupStoreDetails')}
        </Typography>

        <TextField
          required
          fullWidth
          label={t('register.storeName')}
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          variant="outlined"
          sx={{ mb: 3 }}
          inputProps={{ dir: i18n.language === 'ar' ? 'rtl' : 'ltr' }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              color="primary"
            />
          }
          label={
            <Typography variant="body2">
              {t('register.agreeToTerms1')}{' '}
              <Link href="#" color={orange[700]}>
                {t('register.agreeToTerms2')}
              </Link>{' '}
              {t('register.agreeToTerms3')}
            </Typography>
          }
          sx={{ mb: 3, alignItems: 'flex-start' }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            py: 1.5,
            bgcolor: orange[700],
            '&:hover': {
              bgcolor: orange[800]
            }
          }}
        >
          {t('common.submit')}
        </Button>

        <RegistrationSuccessModal 
          open={showSuccessModal} 
          onClose={() => setShowSuccessModal(false)} 
        />
      </Box>
    </Container>
  );
};

export default StoreInfo;