"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.geocodeRequest = void 0;
const geocode_mock_1 = require("./geocode.mock");
const geocodeRequest = async (request, response, client, googleKey) => {
    const { city, mock } = request.query;
    if (typeof city !== "string") {
        response.status(400).send("City is required");
        return;
    }
    if (mock === "true") {
        const locationMock = geocode_mock_1.locations[city.toLowerCase()];
        response.json(locationMock);
        return;
    }
    try {
        const res = await client.geocode({
            params: {
                address: city,
                key: googleKey,
            },
            timeout: 1000,
        });
        response.json(res.data);
        return;
    }
    catch (e) {
        response.status(400);
        response.send(e.response?.data?.error_message || "Geocoding error");
        return;
    }
};
exports.geocodeRequest = geocodeRequest;
//# sourceMappingURL=index.js.map