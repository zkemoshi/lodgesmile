import { Container } from '@mui/material';
import React from 'react';
import Price from '../../clientPay/Price';

const Pricing = () => {
  const planA = {
    amount: 15000,
    scheme: '1 - 5 Outlets',
  };
  const planB = {
    amount: 60000,
    scheme: '1 - 10 Outlets',
  };
  const planC = {
    amount: 100000,
    scheme: '1 - 15 Outlets',
  };

  return (
    <Container>
      <Price amount={planA.amount} scheme={planA.scheme} />
      <Price amount={planB.amount} scheme={planB.scheme} />
      <Price amount={planC.amount} scheme={planC.scheme} />
    </Container>
  );
};

export default Pricing;
