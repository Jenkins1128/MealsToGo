import React from 'react';
//import {LiteCreditCardInput} from 'react-native-credit-card-input';
import {CardField, useStripe} from '@stripe/stripe-react-native';
export const CreditCardInput = ({name}) => {
  // const onChange = formData => {
  //   const {values, status} = formData;
  //   const isIncomplete = Object.values(status).includes('incomplete');
  //   const card = {
  //     number: '42424242',
  //     expMonth: '02',
  //     expYear: '24',
  //     cvc: '244',
  //     name: 'Mo',
  //   };

  // };

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
      onCardChange={cardDetails => {
        console.log('cardDetails', cardDetails);
      }}
      onFocus={focusedField => {
        console.log('focusField', focusedField);
      }}
    />
  );
};
