const fs = require('fs');

const replacements = {
  './RestaurantInfoCard.styles': './RestaurantInfoCardStyles',
  './Authentication.service': './authenticationService',
  './Location.service': './locationService',
  './Restaurants.service': './restaurantsService',
  './Colors': './colors',
  './Fonts': './fonts',
  './Sizes': './sizes',
  './Spacing': './spacing'
};

const files = [
  'src/features/restaurants/components/RestaurantInfoCard.tsx',
  'src/services/authentication/authenticationContext.tsx',
  'src/services/location/locationContext.tsx',
  'src/services/restaurants/restaurantsContext.tsx',
  'src/infrastructure/theme/index.ts'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  Object.keys(replacements).forEach(oldImp => {
    content = content.replace(new RegExp(`from ['"]${oldImp}['"]`, 'g'), `from '${replacements[oldImp]}'`);
  });
  fs.writeFileSync(file, content, 'utf8');
});
