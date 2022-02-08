import React from 'react';
import {CardField} from '@stripe/stripe-react-native';

export const CreditCardInput = ({name, onSuccess}) => {
  const onCardChange = cardDetails => {
    const isComplete = cardDetails.complete;
    if (isComplete) {
      onSuccess(cardDetails);
    }
  };

  return (
    <CardField
      postalCodeEnabled={true}
      placeholder={{
        number: '4242 4242 4242 4242',
      }}
      cardStyle={{
        backgroundColor: '#FFFFFF',
        textColor: '#000000',
        placeholderColor: '#cccccc',
      }}
      style={{
        width: '100%',
        height: 50,
        marginVertical: 30,
      }}
      onCardChange={onCardChange}
    />
  );
};
