import React, {useContext, useState} from 'react';
import {ScrollView} from 'react-native';
import {useConfirmPayment} from '@stripe/stripe-react-native';

import {Text} from '../../../components/typography/text.component';
import {Spacer} from '../../../components/spacer/spacer.component';
import {SafeArea} from '../../../components/utility/safe-area.component';

import {CartContext} from '../../../services/cart/cart.context';
import {CreditCardInput} from '../components/credit-card.component';
import {
  CartIconContainer,
  CartIcon,
  NameInput,
  PayButton,
  ClearButton,
  PaymentProcessing,
} from '../components/checkout.styles';
import {RestaurantInfoCard} from '../../restaurants/components/restaurant-info-card.component';
import {List, Divider} from 'react-native-paper';
import {payRequest} from '../../../services/checkout/checkout.service';

export const CheckoutScreen = ({navigation}) => {
  const {cart, restaurant, sum, clearCart} = useContext(CartContext);
  const [name, setName] = useState('');
  const [card, setCard] = useState(null);
  const {confirmPayment, loading} = useConfirmPayment();

  const onPay = async () => {
    if (!card) {
      navigation.navigate('CheckoutError', {
        error: 'Please fill in a valid credit card',
      });
      return;
    }
    try {
      await payRequest(name, sum, confirmPayment);
      clearCart();
      navigation.navigate('CheckoutSuccess', {
        error: 'Please fill in a valid credit card',
      });
    } catch (error) {
      navigation.navigate('CheckoutError', {
        error: 'Something went wrong processing your credit card',
      });
    }
  };

  if (!cart.length || !restaurant) {
    return (
      <SafeArea>
        <CartIconContainer>
          <CartIcon icon="cart-off" />
          <Text>Your cart is empty</Text>
        </CartIconContainer>
      </SafeArea>
    );
  }

  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant} />
      {loading && <PaymentProcessing />}
      <ScrollView>
        <Spacer position="left" size="medium">
          <Spacer position="top" size="large">
            <Text>Your Order</Text>
          </Spacer>
          <List.Section>
            {cart.map(({item, price}, i) => {
              return (
                <List.Item
                  key={`item-${i}`}
                  title={`${item} - ${price / 100}`}
                />
              );
            })}
          </List.Section>
          <Text>Total: {sum / 100}</Text>
        </Spacer>
        <Spacer position="top" size="large" />
        <Divider />
        <NameInput
          label="Name"
          value={name}
          onChangeText={t => {
            setName(t);
          }}
        />
        {name.length > 0 && <CreditCardInput name={name} onSuccess={setCard} />}
        <Spacer position="top" size="xxl" />
        <PayButton
          disabled={loading}
          icon="cash-usd"
          mode="contained"
          onPress={onPay}>
          Pay
        </PayButton>
        <Spacer position="top" size="large">
          <ClearButton
            disabled={loading}
            icon="cart-off"
            mode="contained"
            onPress={clearCart}>
            Clear Cart
          </ClearButton>
        </Spacer>
      </ScrollView>
    </SafeArea>
  );
};
