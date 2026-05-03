import React, { useContext, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { useConfirmPayment } from "@stripe/stripe-react-native";
import { useRouter } from "expo-router";

import { Text } from "@/components/typography/Text";
import { Spacer } from "@/components/spacer/Spacer";
import { SafeArea } from "@/components/utility/SafeArea";

import { CartContext } from "@/services/cart/cartContext";
import { CreditCardInput } from "@/features/checkout/components/CreditCard";
import {
  CartIconContainer,
  CartIcon,
  NameInput,
  PayButton,
  ClearButton,
  PaymentProcessing,
} from "@/features/checkout/components/CheckoutStyles";
import { RestaurantInfoCard } from "@/features/restaurants/components/RestaurantInfoCard";
import { List, Divider } from "react-native-paper";
import { payRequest } from "@/services/checkout/checkoutService";

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
    } catch (error: any) {
      router.push({
        pathname: "/(tabs)/checkout/Error",
        params: { error: error.message || error.toString() || "Something went wrong processing your credit card" },
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
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/(tabs)/restaurants/[id]",
            params: {
              id: restaurant.placeId,
              restaurant: JSON.stringify(restaurant),
            },
          })
        }
      >
        <RestaurantInfoCard restaurant={restaurant} />
      </TouchableOpacity>
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
