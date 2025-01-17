import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Travel Plan for location:Kathmandu,nepal, for 1 DAys and 1 Naight for family with a luxury budget with a flight details,flight price with booking url, hotels options list with hotelName, Hotel address, price , hotel  image  url ,geo coordinates, rating, description and places to visit nearby with placeName,place details, price image url ,ticket pricing time travel each of the location for 1 days and 1 night with best time to visit in json format\n",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "travelPlan": {\n    "location": "Kathmandu, Nepal",\n    "duration": "1 Day 1 Night",\n    "travelers": "Family",\n    "budget": "Luxury",\n     "bestTimeToVisit": "October to November (Dry and pleasant weather) and March to April (Warm and blooming rhododendrons)",\n    "flights": {\n      "details": {\n        "exampleFlight": {\n          "airline": "Qatar Airways",\n          "departureAirport": "Your Departure Airport",\n          "arrivalAirport": "Tribhuvan International Airport (KTM)",\n          "departureTime": "Morning",\n          "arrivalTime": "Afternoon",\n            "flightPrice": "500 - 1500 USD (round trip, per person, varies greatly)",\n            "bookingUrl": "https://www.qatarairways.com"\n        }\n      },\n        "note": "Flight prices are estimates and vary significantly based on origin, booking time, and class. Check multiple aggregators for the best deals."\n    },\n\n    "hotels": [\n      {\n        "hotelName": "Dwarika\'s Hotel",\n        "hotelAddress": "Battisputali, Kathmandu 44600, Nepal",\n        "price": "500 - 1000 USD per night",\n        "hotelImageUrl": "https://media-cdn.tripadvisor.com/media/photo-m/1280/1c/8c/41/24/dwarika-s-hotel.jpg",\n          "geoCoordinates": {\n          "latitude": 27.704164,\n          "longitude": 85.353481\n        },\n        "rating": 4.8,\n        "description": "A luxurious heritage hotel showcasing traditional Newari architecture and offering exquisite dining experiences, a spa, and cultural immersion opportunities.",\n          "features": ["Heritage architecture", "Gourmet dining", "Spa", "Cultural activities", "Exemplary service"]\n\n      },\n      {\n        "hotelName": "Hyatt Regency Kathmandu",\n        "hotelAddress": "Taragaon, Boudha, Kathmandu 44600, Nepal",\n        "price": "300 - 700 USD per night",\n        "hotelImageUrl": "https://media-cdn.tripadvisor.com/media/photo-m/1280/1c/7f/bb/07/hyatt-regency-kathmandu.jpg",\n          "geoCoordinates": {\n          "latitude": 27.716051,\n          "longitude": 85.359733\n        },\n         "rating": 4.5,\n        "description": "A modern and elegant hotel with spacious rooms, multiple restaurants, a large pool, and well-manicured gardens, located near the Boudhanath Stupa.",\n         "features": ["Modern rooms", "Multiple restaurants", "Large pool", "Well-maintained gardens", "Proximity to Boudhanath"]\n\n      }\n        ,\n       {\n        "hotelName": "Hotel Yak & Yeti",\n        "hotelAddress": "Durbar Marg, Kathmandu 44600, Nepal",\n        "price": "250 - 600 USD per night",\n         "hotelImageUrl":"https://media-cdn.tripadvisor.com/media/photo-s/1c/3d/46/69/yak-and-yeti-hotel.jpg",\n            "geoCoordinates": {\n          "latitude": 27.710346,\n          "longitude": 85.319630\n        },\n         "rating": 4.3,\n          "description":"A historic and grand hotel offering a blend of modern luxury and Nepali hospitality, featuring multiple dining options, a spa, and a central location.",\n         "features": ["Historic setting", "Multiple dining options", "Spa", "Central location", "Nepali hospitality"]\n      }\n\n    ],\n       "itinerary": {\n       "day1": [\n        {\n          "time": "9:00 AM",\n           "placeName": "Pashupatinath Temple",\n            "placeDetails": "A sacred Hindu temple complex dedicated to Lord Shiva, located on the banks of the Bagmati River. Witness the cremation ghats and the religious rituals.",\n            "price": "1000 NPR per person (approx. 8 USD)",\n            "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Pashupatinath_Temple_2016.jpg/1280px-Pashupatinath_Temple_2016.jpg",\n            "ticketPricing": {\n              "adult": "1000 NPR",\n              "child": "500 NPR"\n            },\n          "timeTravel": "30 minutes from central Kathmandu (by taxi)",\n           "bestTime":"Morning"\n         },\n\n         {\n         "time": "12:00 PM",\n         "placeName":"Boudhanath Stupa",\n           "placeDetails": "One of the largest spherical stupas in Nepal and a significant center for Tibetan Buddhism. Walk around the stupa, spinning prayer wheels, and soak in the spiritual atmosphere.",\n           "price":"400 NPR per person (approx. 3 USD)",\n           "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Boudhanath_Stupa_01.jpg/1280px-Boudhanath_Stupa_01.jpg",\n          "ticketPricing": {\n              "adult": "400 NPR",\n              "child": "200 NPR"\n            },\n            "timeTravel":"30 minutes from Pashupatinath Temple (by taxi)",\n          "bestTime":"Anytime"\n         },\n\n        {\n          "time":"2:00 PM",\n          "placeName": "Lunch",\n          "placeDetails": "Enjoy a traditional Nepali lunch at a reputable restaurant. Try dal bhat tarkari (lentil soup, rice, and vegetables), momos (dumplings), or Newari cuisine.",\n          "price": "15-30 USD per person",\n           "imageUrl": "https://images.unsplash.com/photo-1560374054-159961c596e5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",\n            "timeTravel":"Varies based on the restaurant chosen",\n          "bestTime":"Afternoon"\n\n        },\n          {\n          "time": "3:30 PM",\n          "placeName": "Kathmandu Durbar Square",\n          "placeDetails": "A UNESCO World Heritage Site, this historic square is home to ancient palaces, temples, and courtyards. Explore the architecture and learn about Nepali history.",\n         "price": "1000 NPR per person (approx. 8 USD)",\n          "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Kathmandu_Durbar_Square_1.jpg/1280px-Kathmandu_Durbar_Square_1.jpg",\n             "ticketPricing": {\n              "adult": "1000 NPR",\n              "child": "500 NPR"\n            },\n           "timeTravel": "30 minutes from Boudhanath Stupa (by taxi)",\n         "bestTime":"Afternoon"\n         },\n          {\n           "time":"6:00 PM",\n             "placeName": "Thamel Exploration",\n             "placeDetails": "Stroll through Thamel, Kathmandu\'s vibrant tourist hub, known for its shops, restaurants, bars and travel agencies. Purchase souvenirs or enjoy a pre-dinner drink.",\n            "price":"Free",\n            "imageUrl":"https://media-cdn.tripadvisor.com/media/photo-s/0f/f1/3c/ff/thamel-street.jpg",\n             "timeTravel":"15 Minutes from Durbar Square by Taxi",\n            "bestTime":"Evening"\n        },\n        {\n          "time": "8:00 PM",\n           "placeName": "Dinner",\n           "placeDetails": "Experience fine dining at your hotel or a gourmet restaurant in Thamel or nearby, enjoying authentic Nepali and international cuisine.",\n            "price": "30-80 USD per person",\n             "imageUrl": "https://images.unsplash.com/photo-1517248135467-4c7ed4decb34?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",\n             "timeTravel":"Varies based on chosen location",\n          "bestTime":"Evening"\n        }\n       ],\n       "night":{\n        "time": "9:30 PM",\n        "placeName": "Relax and unwind at your Hotel",\n        "placeDetails":"Enjoy the amenities of your luxury hotel like a spa treatment or a nightcap at the lounge.",\n         "price":"Included in Hotel Price",\n         "imageUrl":"https://images.unsplash.com/photo-1520250486143-664e2c70a58a?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",\n          "timeTravel":"Located at the hotel"\n       }\n    }\n  },\n    "notes": {\n     "transportation": "Taxis are readily available but it is preferable to book a car in advance for the day for convenience",\n        "currency": "Nepalese Rupees (NPR)",\n        "visa": "Check Nepal visa requirements based on your nationality.",\n      "customization": "This plan can be adjusted to your family\'s interests and pace. Consider adding activities like cooking classes, yoga sessions or cultural performances for a more personalized experience. Also you can add Mountain flight for better experience of Himalayas",\n    "health": "Consult your doctor for any necessary vaccinations or travel advice.",\n      "shopping":"Thamel is the most popular area for shopping and bargain.",\n     "communication": "Purchase a local SIM card to stay connected during your stay"\n    }\n  }\n}\n```\n',
        },
      ],
    },
  ],
});
