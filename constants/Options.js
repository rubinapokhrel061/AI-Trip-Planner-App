export const SelectTravelesList = [
  {
    id: 1,
    title: "Just Me",
    icon: "🧑",
    people: "1",
  },
  {
    id: 2,
    title: "A Couple",
    icon: "💑",
    people: "2",
  },
  {
    id: 3,
    title: "Family",
    icon: "👨‍👩‍👧‍👦",
    people: "4",
  },
  {
    id: 4,
    title: "Friends",
    icon: "👯‍♂️",
    people: "3 to 5",
  },
];

export const selectBudgeOptions = [
  {
    title: "Cheap",
    icon: "💸",
    id: 1,
  },
  {
    title: "Moderate",
    icon: "💰",
    id: 2,
  },
  {
    title: "Luxury",
    icon: "💎",
    id: 3,
  },
];
export const AI_PROMPT =
  "Generate a Travel Plan for location: {place}, {country} and provide a {place} image URL as imageUrl. The plan should cover {totalDays} Days and {totalNights} Nights for {traveler} with a {budget} budget. Include flight details (flight price with booking URL), a list of hotel options with hotelName, hotel address, price, hotel image URL, geo coordinates, rating, description, and nearby places to visit. Each place should have place details, price, image URL, ticket pricing, and time travel details. Provide the best time to visit for each of the locations in JSON format.";
