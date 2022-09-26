import React from 'react';
import { ChainId, Currency, currencyEquals, ETHER, Token } from '@uniswap/sdk';
import { Box } from '@material-ui/core';
import { CurrencyLogo, QuestionHelper } from 'components';
import { useTranslation } from 'react-i18next';
import { SUGGESTED_BASES } from 'constants/v3/addresses';

interface CommonBasesProps {
  chainId?: ChainId;
  selectedCurrency?: Currency | null;
  onSelect: (currency: Currency) => void;
}

const CommonBases: React.FC<CommonBasesProps> = ({
  chainId,
  onSelect,
  selectedCurrency,
}) => {
  const { t } = useTranslation();

  const chainIdToUse = chainId ? chainId : ChainId.MATIC;
  const nativeCurrency = ETHER[chainIdToUse];
  return (
    <Box mb={2}>
      <Box display='flex' my={1.5}>
        <Box mr='6px'>
          <span>{t('commonBase')}</span>
        </Box>
        <QuestionHelper text={t('commonBaseHelper')} />
      </Box>
      <Box className='flex flex-wrap'>
        <Box
          className='baseWrapper'
          onClick={() => {
            if (
              !selectedCurrency ||
              !currencyEquals(selectedCurrency, nativeCurrency)
            ) {
              onSelect(nativeCurrency);
            }
          }}
        >
          <CurrencyLogo
            currency={nativeCurrency}
            size='24px'
            chainId={chainId}
          />
          <small>{nativeCurrency.name}</small>
        </Box>
        {(chainId ? SUGGESTED_BASES[chainId] : []).map((token: Token) => {
          const selected = Boolean(
            selectedCurrency && currencyEquals(selectedCurrency, token),
          );
          return (
            <Box
              className='baseWrapper'
              key={token.address}
              onClick={() => {
                if (!selected) {
                  onSelect(token);
                }
              }}
            >
              <CurrencyLogo currency={token} size='24px' chainId={chainId} />
              <small>{token.symbol}</small>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default CommonBases;
