import React, { useContext, useState } from "react";
import { ScrollView } from "react-native";
import { useConfirmPayment } from "@stripe/stripe-react-native";
import { useRouter } from "expo-router";

import { Text } from "@/components/typography/Text.component";
import { Spacer } from "@/components/spacer/Spacer.component";
import { SafeArea } from "@/components/utility/SafeArea.component";

import { CartContext } from "@/services/cart/Cart.context";
import { CreditCardInput } from "@/features/checkout/components/CreditCard.component";
import {
  CartIconContainer,
  CartIcon,
  NameInput,
  PayButton,
  ClearButton,
  PaymentProcessing,
} from "@/features/checkout/components/Checkout.styles";
import { RestaurantInfoCard } from "@/features/restaurants/components/RestaurantInfoCard.component";
import { List, Divider } from "react-native-paper";
import { payRequest } from "@/services/checkout/Checkout.service";

export const CheckoutScreen = () => {
  const router = useRouter();
  const { cart, restaurant, sum, clearCart } = useContext(CartContext);
  const [name, setName] = useState("");
  const [card, setCard] = useState<any>(null);
  const { confirmPayment, loading } = useConfirmPayment();

  const onPay = async () => {
    if (!card) {
      router.push({
        pathname: "/(tabs)/checkout/Error",
        params: { error: "Please fill in a valid credit card" },
      });
      return;
    }
    try {
      await payRequest(name, sum, confirmPayment);
      clearCart();
      router.push("/(tabs)/checkout/Success");
    } catch (error) {
      router.push({
        pathname: "/(tabs)/checkout/Error",
        params: { error: "Something went wrong processing your credit card" },
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
            {cart.map(({ item, price }, i) => {
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
          onChangeText={(t: string) => {
            setName(t);
          }}
        />
        {name.length > 0 && <CreditCardInput name={name} onSuccess={setCard} />}
        <Spacer position="top" size="xxl" />
        <PayButton
          disabled={loading}
          icon="currency-usd"
          mode="contained"
          onPress={onPay}
        >
          Pay
        </PayButton>
        <Spacer position="top" size="large">
          <ClearButton
            disabled={loading}
            icon="cart-off"
            mode="contained"
            onPress={clearCart}
          >
            Clear Cart
          </ClearButton>
        </Spacer>
      </ScrollView>
    </SafeArea>
  );
};
