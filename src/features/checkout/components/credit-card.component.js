import React from 'react';
//import {LiteCreditCardInput} from 'react-native-credit-card-input';
import {CardField} from '@stripe/stripe-react-native';
export const CreditCardInput = ({name, onSuccess}) => {
  const onCardChange = cardDetails => {
    console.log('cardDetails', cardDetails);
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
      }}
      style={{
        width: '100%',
        height: 50,
        marginVertical: 30,
      }}
      onCardChange={onCardChange}
      onFocus={focusedField => {
        console.log('focusField', focusedField);
      }}
    />
  );
};
