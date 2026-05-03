import React, { useState, useContext } from "react";
import { ScrollView } from "react-native";
import { List, Divider } from "react-native-paper";
import { useRouter } from "expo-router";

import { RestaurantInfoCard } from "@/features/restaurants/components/RestaurantInfoCard";
import { SafeArea } from "@/components/utility/SafeArea";
import { Spacer } from "@/components/spacer/Spacer";
import { OrderButton } from "@/features/restaurants/components/RestaurantListStyles";
import { CartContext } from "@/services/cart/cartContext";
import { colors } from "../../infrastructure/theme/Colors";
import { Restaurant } from "@/services/types";

interface RestaurantDetailScreenProps {
  restaurant: Restaurant;
}

export const RestaurantDetailScreen = ({
  restaurant,
}: RestaurantDetailScreenProps) => {
  const router = useRouter();
  const { addToCart } = useContext(CartContext);
  const [breakfastExpanded, setBreakfastExpanded] = useState(false);
  const [lunchExpanded, setLunchExpanded] = useState(false);
  const [dinnerExpanded, setDinnerExpanded] = useState(false);
  const [drinksExpanded, setDrinksExpanded] = useState(false);

  return (
    <SafeArea>
      <Spacer position="top" size="large">
        <RestaurantInfoCard restaurant={restaurant} />
      </Spacer>
      <Spacer size="large" />
      <ScrollView>
        <List.Accordion
          title="Breakfast"
          left={(props) => <List.Icon {...props} icon="bread-slice" />}
          expanded={breakfastExpanded}
          onPress={() => setBreakfastExpanded(!breakfastExpanded)}
        >
          <List.Item title="Eggs Benedict" />
          <Divider />
          <List.Item title="Classic Breakfast" />
        </List.Accordion>
        <Divider />
        <List.Accordion
          title="Lunch"
          left={(props) => <List.Icon {...props} icon="hamburger" />}
          expanded={lunchExpanded}
          onPress={() => setLunchExpanded(!lunchExpanded)}
        >
          <List.Item title="Burger w/ Fries" />
          <Divider />
          <List.Item title="Steak Sandwich" />
          <Divider />
          <List.Item title="Mushroom Soup" />
        </List.Accordion>
        <Divider />
        <List.Accordion
          title="Dinner"
          left={(props) => <List.Icon {...props} icon="food" />}
          expanded={dinnerExpanded}
          onPress={() => setDinnerExpanded(!dinnerExpanded)}
        >
          <List.Item title="Spaghetti Bolognese" />
          <Divider />
          <List.Item title="Veal Cutlet with Chicken Mushroom Rotini" />
          <Divider />
          <List.Item title="Steak Frites" />
        </List.Accordion>
        <Divider />
        <List.Accordion
          title="Drinks"
          left={(props) => <List.Icon {...props} icon="cup" />}
          expanded={drinksExpanded}
          onPress={() => setDrinksExpanded(!drinksExpanded)}
        >
          <List.Item title="Coffee" />
          <Divider />
          <List.Item title="Tea" />
          <Divider />
          <List.Item title="Modelo" />
          <Divider />
          <List.Item title="Coke" />
          <Divider />
          <List.Item title="Fanta" />
        </List.Accordion>
      </ScrollView>
      <Spacer position="bottom" size="large">
        <OrderButton
          icon="currency-usd"
          mode="contained"
          buttonColor={colors.brand.primary}
          onPress={() => {
            addToCart({ item: "special", price: 1299 }, restaurant);
            router.dismiss();
            router.navigate("/checkout");
          }}
        >
          Order Special Only 12.99
        </OrderButton>
      </Spacer>
    </SafeArea>
  );
};
