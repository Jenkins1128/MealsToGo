import { Box } from "@/components/ui/box";
import React, { useContext, useState } from "react";
import { ScrollView, TouchableOpacity} from "react-native";
import { useConfirmPayment } from "@stripe/stripe-react-native";
import { useRouter } from "expo-router";

import { Text } from "@/components/typography/Text";
import { SafeArea } from "@/components/utility/SafeArea";

import { CartContext } from "@/services/cart/cartContext";
import { CreditCardInput } from "@/features/checkout/components/CreditCard";
import { RestaurantInfoCard } from "@/features/restaurants/components/RestaurantInfoCard";
import { List, Divider, Avatar, TextInput, Button, ActivityIndicator, MD2Colors } from "react-native-paper";
import { payRequest } from "@/services/checkout/checkoutService";
import { colors } from "@/infrastructure/theme/colors";

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
        <Box className="items-center justify-center flex-1">
          <Avatar.Icon size={128} icon="cart-off" className="bg-brand-primary" />
          <Text>Your cart is empty</Text>
        </Box>
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
      {loading && (
        <ActivityIndicator 
          size={128} 
          animating={true} 
          color={MD2Colors.blue300} 
          className="absolute top-1/2 left-[35%] z-50" 
        />
      )}
      <ScrollView>
        <Box className="ml-4">
          <Box className="mt-6">
            <Text>Your Order</Text>
          </Box>
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
        </Box>
        <Box className="mt-6" />
        <Divider />
        <TextInput
          label="Name"
          value={name}
          onChangeText={(t: string) => {
            setName(t);
          }}
          className="m-4"
        />
        {name.length > 0 && <CreditCardInput name={name} onSuccess={setCard} />}
        <Box className="mt-10" />
        <Button
          disabled={loading}
          icon="currency-usd"
          mode="contained"
          buttonColor={colors.brand.primary}
          className="w-[80%] self-center p-2"
          onPress={onPay}
        >
          Pay
        </Button>
        <Box className="mt-6 mb-8">
          <Button
            disabled={loading}
            icon="cart-off"
            mode="contained"
            buttonColor={colors.ui.error}
            className="w-[80%] self-center p-2"
            onPress={clearCart}
          >
            Clear Cart
          </Button>
        </Box>
      </ScrollView>
    </SafeArea>
  );
};
