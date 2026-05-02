import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';

import {Text} from '../../../components/typography/text.component';
import {SafeArea} from '../../../components/utility/safe-area.component';
import {colors} from '../../../infrastructure/theme/colors';
import {CartIconContainer, CartIcon} from '../components/checkout.styles';
import {CheckoutStackParamList} from '../../../infrastructure/navigation/checkout.navigator';

type Props = StackScreenProps<CheckoutStackParamList, 'CheckoutError'>;

export const CheckoutErrorScreen = ({route}: Props) => {
  const {error = ''} = route.params as any;
  return (
    <SafeArea>
      <CartIconContainer>
        <CartIcon icon="close" bg={colors.ui.error} />
        <Text variant="label">{error}</Text>
      </CartIconContainer>
    </SafeArea>
  );
};
