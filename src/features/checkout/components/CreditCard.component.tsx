import React from 'react';
import {CardField} from '@stripe/stripe-react-native';

interface CreditCardInputProps {
  name: string;
  onSuccess: (cardDetails: any) => void;
}

export const CreditCardInput = ({name, onSuccess}: CreditCardInputProps) => {
  const onCardChange = (cardDetails: any) => {
    const isComplete = cardDetails.complete;
    if (isComplete) {
      onSuccess(cardDetails);
    }
  };

  return (
    <CardField
      postalCodeEnabled={true}
      placeholders={{
        number: '4242 4242 4242 4242',
      }}
      cardStyle={{
        backgroundColor: '#FFFFFF',
        textColor: '#000000',
        placeholderColor: '#cccccc',
      } as any}
      style={{
        width: '100%',
        height: 50,
        marginVertical: 30,
      }}
      onCardChange={onCardChange}
    />
  );
};
