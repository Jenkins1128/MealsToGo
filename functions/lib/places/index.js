"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.placesRequest = void 0;
const mock_1 = require("./mock");
const addGoogleImage = (restaurant, googleKey) => {
    const ref = restaurant.photos?.[0]?.photo_reference;
    if (!ref) {
        restaurant.photos = [
            {
                height: 899,
                html_attributions: [],
                photo_reference: "",
                width: 600,
            },
            // However, the original code REPLACED the array with a string array. 
            // I'll stick to the original behavior but type it correctly.
        ];
        // Re-assigning to match original logic which turned photos into a string array
        restaurant.photos = [
            "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
        ];
        return restaurant;
    }
    restaurant.photos = [
        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${googleKey}`,
    ];
    return restaurant;
};
const placesRequest = async (request, response, client, googleKey) => {
    const { location, mock } = request.query;
    if (typeof location !== "string") {
        response.status(400).send("Location is required");
        return;
    }
    if (mock === "true") {
        const data = mock_1.mocks[location];
        if (data) {
            data.results = data.results.map(mock_1.addMockImage);
        }
        response.json(data);
        return;
    }
    try {
        const res = await client.placesNearby({
            params: {
                location: location,
                radius: 1000,
                type: "restaurant",
                key: googleKey,
            },
            timeout: 1000,
        });
        res.data.results = res.data.results.map((restaurant) => addGoogleImage(restaurant, googleKey));
        response.json(res.data);
        return;
    }
    catch (e) {
        response.status(400);
        response.send(e.response?.data?.error_message || "Places error");
        return;
    }
};
exports.placesRequest = placesRequest;
//# sourceMappingURL=index.js.map