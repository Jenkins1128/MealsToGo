#!/bin/bash
cd /Users/isaiahjenkins/Documents/MealsToGo

# Feature components
git mv src/features/restaurants/components/restaurant-info-card.component.tsx src/features/restaurants/components/ric-tmp.tsx
git mv src/features/restaurants/components/ric-tmp.tsx src/features/restaurants/components/RestaurantInfoCard.component.tsx

git mv src/features/restaurants/components/restaurant-info-card.styles.ts src/features/restaurants/components/rics-tmp.ts
git mv src/features/restaurants/components/rics-tmp.ts src/features/restaurants/components/RestaurantInfoCard.styles.ts

git mv src/features/restaurants/components/restaurant-list.styles.ts src/features/restaurants/components/rls-tmp.ts
git mv src/features/restaurants/components/rls-tmp.ts src/features/restaurants/components/RestaurantList.styles.ts

git mv src/features/restaurants/components/search.component.tsx src/features/restaurants/components/sc-tmp.tsx
git mv src/features/restaurants/components/sc-tmp.tsx src/features/restaurants/components/Search.component.tsx

git mv src/features/account/components/account.styles.ts src/features/account/components/as-tmp.ts
git mv src/features/account/components/as-tmp.ts src/features/account/components/Account.styles.ts

git mv src/features/checkout/components/checkout.styles.ts src/features/checkout/components/cs-tmp.ts
git mv src/features/checkout/components/cs-tmp.ts src/features/checkout/components/Checkout.styles.ts

git mv src/features/checkout/components/credit-card.component.tsx src/features/checkout/components/cc-tmp.tsx
git mv src/features/checkout/components/cc-tmp.tsx src/features/checkout/components/CreditCard.component.tsx

git mv src/features/map/components/search.component.tsx src/features/map/components/msc-tmp.tsx
git mv src/features/map/components/msc-tmp.tsx src/features/map/components/Search.component.tsx

git mv src/features/map/components/map-callout.component.tsx src/features/map/components/mc-tmp.tsx
git mv src/features/map/components/mc-tmp.tsx src/features/map/components/MapCallout.component.tsx

# Services
git mv src/services/authentication/authentication.context.tsx src/services/authentication/ac-tmp.tsx
git mv src/services/authentication/ac-tmp.tsx src/services/authentication/Authentication.context.tsx

git mv src/services/authentication/authentication.service.ts src/services/authentication/asv-tmp.ts
git mv src/services/authentication/asv-tmp.ts src/services/authentication/Authentication.service.ts

git mv src/services/restaurants/restaurants.context.tsx src/services/restaurants/rc-tmp.tsx
git mv src/services/restaurants/rc-tmp.tsx src/services/restaurants/Restaurants.context.tsx

git mv src/services/restaurants/restaurants.service.ts src/services/restaurants/rs-tmp.ts
git mv src/services/restaurants/rs-tmp.ts src/services/restaurants/Restaurants.service.ts

git mv src/services/location/location.context.tsx src/services/location/lc-tmp.tsx
git mv src/services/location/lc-tmp.tsx src/services/location/Location.context.tsx

git mv src/services/location/location.service.ts src/services/location/ls-tmp.ts
git mv src/services/location/ls-tmp.ts src/services/location/Location.service.ts

git mv src/services/favorites/favorites.context.tsx src/services/favorites/fc-tmp.tsx
git mv src/services/favorites/fc-tmp.tsx src/services/favorites/Favorites.context.tsx

git mv src/services/cart/cart.context.tsx src/services/cart/ct-tmp.tsx
git mv src/services/cart/ct-tmp.tsx src/services/cart/Cart.context.tsx

git mv src/services/checkout/checkout.service.ts src/services/checkout/csvt-tmp.ts
git mv src/services/checkout/csvt-tmp.ts src/services/checkout/Checkout.service.ts

git mv src/services/types.ts src/services/types-tmp.ts
git mv src/services/types-tmp.ts src/services/Types.ts

# Theme
git mv src/infrastructure/theme/colors.ts src/infrastructure/theme/c-tmp.ts
git mv src/infrastructure/theme/c-tmp.ts src/infrastructure/theme/Colors.ts

git mv src/infrastructure/theme/fonts.ts src/infrastructure/theme/f-tmp.ts
git mv src/infrastructure/theme/f-tmp.ts src/infrastructure/theme/Fonts.ts

git mv src/infrastructure/theme/sizes.ts src/infrastructure/theme/sz-tmp.ts
git mv src/infrastructure/theme/sz-tmp.ts src/infrastructure/theme/Sizes.ts

git mv src/infrastructure/theme/spacing.ts src/infrastructure/theme/sp-tmp.ts
git mv src/infrastructure/theme/sp-tmp.ts src/infrastructure/theme/Spacing.ts

# Utils
git mv src/utils/env.ts src/utils/env-tmp.ts
git mv src/utils/env-tmp.ts src/utils/Env.ts

# Type declarations
mkdir -p src/types
git mv declarations.d.ts src/types/Declarations.d.ts
git mv styled.d.ts src/types/Styled.d.ts

echo "All renames complete"
