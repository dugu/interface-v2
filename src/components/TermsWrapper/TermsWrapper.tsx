import React, { ReactNode, useEffect, useState } from 'react';
import { CustomModal } from 'components';
import { Trans, useTranslation } from 'react-i18next';
import 'components/styles/TermsWrapper.scss';
import { Box, Button, Checkbox } from '@material-ui/core';

export default function TermsWrapper({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const [readTerms, setReadTerms] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const currentTOSVersion = process.env.REACT_APP_TOS_VERSION;

  useEffect(() => {
    const savedTermsVersion = localStorage.getItem('tosVersion');
    if (
      !savedTermsVersion ||
      !currentTOSVersion ||
      savedTermsVersion !== currentTOSVersion
    ) {
      setShowTerms(true);
    }
  }, [currentTOSVersion]);

  const confirmTOS = () => {
    localStorage.setItem('tosVersion', currentTOSVersion ?? '');
    setShowTerms(false);
  };

  if (showTerms)
    return (
      <CustomModal open={showTerms}>
        <div className='termsConditionsWrapper'>
          <h5>{t('disclaimer')}</h5>
          <Box my={2}>
            <p>
              <Trans
                i18nKey='disclaimerText1'
                components={{
                  alink: (
                    <a
                      className='text-primary'
                      href='https://docs.google.com/document/d/1Gglh43oxUZHdgrS2L9lZfsI4f6HYNF6MbBDsDPJVFkM/edit'
                      rel='noreferrer'
                      target='_blank'
                    />
                  ),
                }}
              />
            </p>
          </Box>
          <Box className='flex items-start'>
            <Checkbox
              checked={readTerms}
              onClick={() => setReadTerms(!readTerms)}
            />
            <p>{t('disclaimerText2')}</p>
          </Box>
          <Box className='flex items-start' my={2}>
            <Checkbox
              checked={agreeTerms}
              onClick={() => setAgreeTerms(!agreeTerms)}
            />
            <p>{t('disclaimerText2')}</p>
          </Box>
          <Button
            fullWidth
            disabled={!readTerms || !agreeTerms}
            onClick={confirmTOS}
          >
            {t('confirm')}
          </Button>
        </div>
      </CustomModal>
    );

  return <>{children}</>;
}
