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
  "Generate a travel plan for the location: {place}, {country}, with a related icon or emoji. The plan should cover {totalDays} days and {totalNights} nights for {traveler} with a {budget} budget. Include flight details (flight price with booking URL), a list of hotel options with hotel name  with a related icon or emoji , hotel address, price, rating, description, and nearby places to visit with related icon or emoji. For each place, provide details, price, related icon or emoji, ticket pricing, and time travel details. Also, some notes give inside travel plan not trip plan and provide the best time to visit for each of the locations in JSON format.";
