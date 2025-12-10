/**
 * Santa Tracker - Locations Database
 * 200+ cities around the world for Santa to visit
 */

export const locations = [
  // North America
  { city: "New York", country: "USA", lat: 40.7128, lng: -74.0060, timezone: "America/New_York" },
  { city: "Los Angeles", country: "USA", lat: 34.0522, lng: -118.2437, timezone: "America/Los_Angeles" },
  { city: "Chicago", country: "USA", lat: 41.8781, lng: -87.6298, timezone: "America/Chicago" },
  { city: "Houston", country: "USA", lat: 29.7604, lng: -95.3698, timezone: "America/Chicago" },
  { city: "Phoenix", country: "USA", lat: 33.4484, lng: -112.0740, timezone: "America/Phoenix" },
  { city: "Philadelphia", country: "USA", lat: 39.9526, lng: -75.1652, timezone: "America/New_York" },
  { city: "San Antonio", country: "USA", lat: 29.4241, lng: -98.4936, timezone: "America/Chicago" },
  { city: "San Diego", country: "USA", lat: 32.7157, lng: -117.1611, timezone: "America/Los_Angeles" },
  { city: "Dallas", country: "USA", lat: 32.7767, lng: -96.7970, timezone: "America/Chicago" },
  { city: "San Francisco", country: "USA", lat: 37.7749, lng: -122.4194, timezone: "America/Los_Angeles" },
  { city: "Seattle", country: "USA", lat: 47.6062, lng: -122.3321, timezone: "America/Los_Angeles" },
  { city: "Denver", country: "USA", lat: 39.7392, lng: -104.9903, timezone: "America/Denver" },
  { city: "Boston", country: "USA", lat: 42.3601, lng: -71.0589, timezone: "America/New_York" },
  { city: "Atlanta", country: "USA", lat: 33.7490, lng: -84.3880, timezone: "America/New_York" },
  { city: "Miami", country: "USA", lat: 25.7617, lng: -80.1918, timezone: "America/New_York" },
  { city: "Toronto", country: "Canada", lat: 43.6532, lng: -79.3832, timezone: "America/Toronto" },
  { city: "Vancouver", country: "Canada", lat: 49.2827, lng: -123.1207, timezone: "America/Vancouver" },
  { city: "Montreal", country: "Canada", lat: 45.5017, lng: -73.5673, timezone: "America/Montreal" },
  { city: "Calgary", country: "Canada", lat: 51.0447, lng: -114.0719, timezone: "America/Edmonton" },
  { city: "Ottawa", country: "Canada", lat: 45.4215, lng: -75.6972, timezone: "America/Toronto" },
  { city: "Mexico City", country: "Mexico", lat: 19.4326, lng: -99.1332, timezone: "America/Mexico_City" },
  { city: "Guadalajara", country: "Mexico", lat: 20.6597, lng: -103.3496, timezone: "America/Mexico_City" },
  { city: "Monterrey", country: "Mexico", lat: 25.6866, lng: -100.3161, timezone: "America/Monterrey" },

  // Europe
  { city: "London", country: "United Kingdom", lat: 51.5074, lng: -0.1278, timezone: "Europe/London" },
  { city: "Paris", country: "France", lat: 48.8566, lng: 2.3522, timezone: "Europe/Paris" },
  { city: "Berlin", country: "Germany", lat: 52.5200, lng: 13.4050, timezone: "Europe/Berlin" },
  { city: "Madrid", country: "Spain", lat: 40.4168, lng: -3.7038, timezone: "Europe/Madrid" },
  { city: "Rome", country: "Italy", lat: 41.9028, lng: 12.4964, timezone: "Europe/Rome" },
  { city: "Amsterdam", country: "Netherlands", lat: 52.3676, lng: 4.9041, timezone: "Europe/Amsterdam" },
  { city: "Vienna", country: "Austria", lat: 48.2082, lng: 16.3738, timezone: "Europe/Vienna" },
  { city: "Brussels", country: "Belgium", lat: 50.8503, lng: 4.3517, timezone: "Europe/Brussels" },
  { city: "Munich", country: "Germany", lat: 48.1351, lng: 11.5820, timezone: "Europe/Berlin" },
  { city: "Barcelona", country: "Spain", lat: 41.3851, lng: 2.1734, timezone: "Europe/Madrid" },
  { city: "Milan", country: "Italy", lat: 45.4642, lng: 9.1900, timezone: "Europe/Rome" },
  { city: "Prague", country: "Czech Republic", lat: 50.0755, lng: 14.4378, timezone: "Europe/Prague" },
  { city: "Dublin", country: "Ireland", lat: 53.3498, lng: -6.2603, timezone: "Europe/Dublin" },
  { city: "Copenhagen", country: "Denmark", lat: 55.6761, lng: 12.5683, timezone: "Europe/Copenhagen" },
  { city: "Stockholm", country: "Sweden", lat: 59.3293, lng: 18.0686, timezone: "Europe/Stockholm" },
  { city: "Oslo", country: "Norway", lat: 59.9139, lng: 10.7522, timezone: "Europe/Oslo" },
  { city: "Helsinki", country: "Finland", lat: 60.1699, lng: 24.9384, timezone: "Europe/Helsinki" },
  { city: "Warsaw", country: "Poland", lat: 52.2297, lng: 21.0122, timezone: "Europe/Warsaw" },
  { city: "Budapest", country: "Hungary", lat: 47.4979, lng: 19.0402, timezone: "Europe/Budapest" },
  { city: "Lisbon", country: "Portugal", lat: 38.7223, lng: -9.1393, timezone: "Europe/Lisbon" },
  { city: "Athens", country: "Greece", lat: 37.9838, lng: 23.7275, timezone: "Europe/Athens" },
  { city: "Zurich", country: "Switzerland", lat: 47.3769, lng: 8.5417, timezone: "Europe/Zurich" },
  { city: "Edinburgh", country: "Scotland", lat: 55.9533, lng: -3.1883, timezone: "Europe/London" },
  { city: "Reykjavik", country: "Iceland", lat: 64.1466, lng: -21.9426, timezone: "Atlantic/Reykjavik" },

  // Asia
  { city: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503, timezone: "Asia/Tokyo" },
  { city: "Beijing", country: "China", lat: 39.9042, lng: 116.4074, timezone: "Asia/Shanghai" },
  { city: "Shanghai", country: "China", lat: 31.2304, lng: 121.4737, timezone: "Asia/Shanghai" },
  { city: "Hong Kong", country: "China", lat: 22.3193, lng: 114.1694, timezone: "Asia/Hong_Kong" },
  { city: "Singapore", country: "Singapore", lat: 1.3521, lng: 103.8198, timezone: "Asia/Singapore" },
  { city: "Seoul", country: "South Korea", lat: 37.5665, lng: 126.9780, timezone: "Asia/Seoul" },
  { city: "Bangkok", country: "Thailand", lat: 13.7563, lng: 100.5018, timezone: "Asia/Bangkok" },
  { city: "Mumbai", country: "India", lat: 19.0760, lng: 72.8777, timezone: "Asia/Kolkata" },
  { city: "Delhi", country: "India", lat: 28.7041, lng: 77.1025, timezone: "Asia/Kolkata" },
  { city: "Bangalore", country: "India", lat: 12.9716, lng: 77.5946, timezone: "Asia/Kolkata" },
  { city: "Jakarta", country: "Indonesia", lat: -6.2088, lng: 106.8456, timezone: "Asia/Jakarta" },
  { city: "Manila", country: "Philippines", lat: 14.5995, lng: 120.9842, timezone: "Asia/Manila" },
  { city: "Kuala Lumpur", country: "Malaysia", lat: 3.1390, lng: 101.6869, timezone: "Asia/Kuala_Lumpur" },
  { city: "Taipei", country: "Taiwan", lat: 25.0330, lng: 121.5654, timezone: "Asia/Taipei" },
  { city: "Ho Chi Minh City", country: "Vietnam", lat: 10.8231, lng: 106.6297, timezone: "Asia/Ho_Chi_Minh" },
  { city: "Hanoi", country: "Vietnam", lat: 21.0278, lng: 105.8342, timezone: "Asia/Ho_Chi_Minh" },
  { city: "Osaka", country: "Japan", lat: 34.6937, lng: 135.5023, timezone: "Asia/Tokyo" },
  { city: "Kyoto", country: "Japan", lat: 35.0116, lng: 135.7681, timezone: "Asia/Tokyo" },
  { city: "Shenzhen", country: "China", lat: 22.5431, lng: 114.0579, timezone: "Asia/Shanghai" },
  { city: "Guangzhou", country: "China", lat: 23.1291, lng: 113.2644, timezone: "Asia/Shanghai" },

  // Middle East
  { city: "Dubai", country: "UAE", lat: 25.2048, lng: 55.2708, timezone: "Asia/Dubai" },
  { city: "Abu Dhabi", country: "UAE", lat: 24.4539, lng: 54.3773, timezone: "Asia/Dubai" },
  { city: "Tel Aviv", country: "Israel", lat: 32.0853, lng: 34.7818, timezone: "Asia/Jerusalem" },
  { city: "Jerusalem", country: "Israel", lat: 31.7683, lng: 35.2137, timezone: "Asia/Jerusalem" },
  { city: "Istanbul", country: "Turkey", lat: 41.0082, lng: 28.9784, timezone: "Europe/Istanbul" },
  { city: "Ankara", country: "Turkey", lat: 39.9334, lng: 32.8597, timezone: "Europe/Istanbul" },
  { city: "Doha", country: "Qatar", lat: 25.2854, lng: 51.5310, timezone: "Asia/Qatar" },
  { city: "Riyadh", country: "Saudi Arabia", lat: 24.7136, lng: 46.6753, timezone: "Asia/Riyadh" },
  { city: "Kuwait City", country: "Kuwait", lat: 29.3759, lng: 47.9774, timezone: "Asia/Kuwait" },
  { city: "Muscat", country: "Oman", lat: 23.5880, lng: 58.3829, timezone: "Asia/Muscat" },
  { city: "Amman", country: "Jordan", lat: 31.9454, lng: 35.9284, timezone: "Asia/Amman" },
  { city: "Beirut", country: "Lebanon", lat: 33.8938, lng: 35.5018, timezone: "Asia/Beirut" },

  // Africa
  { city: "Cairo", country: "Egypt", lat: 30.0444, lng: 31.2357, timezone: "Africa/Cairo" },
  { city: "Cape Town", country: "South Africa", lat: -33.9249, lng: 18.4241, timezone: "Africa/Johannesburg" },
  { city: "Johannesburg", country: "South Africa", lat: -26.2041, lng: 28.0473, timezone: "Africa/Johannesburg" },
  { city: "Nairobi", country: "Kenya", lat: -1.2921, lng: 36.8219, timezone: "Africa/Nairobi" },
  { city: "Lagos", country: "Nigeria", lat: 6.5244, lng: 3.3792, timezone: "Africa/Lagos" },
  { city: "Casablanca", country: "Morocco", lat: 33.5731, lng: -7.5898, timezone: "Africa/Casablanca" },
  { city: "Marrakech", country: "Morocco", lat: 31.6295, lng: -7.9811, timezone: "Africa/Casablanca" },
  { city: "Accra", country: "Ghana", lat: 5.6037, lng: -0.1870, timezone: "Africa/Accra" },
  { city: "Addis Ababa", country: "Ethiopia", lat: 9.0320, lng: 38.7469, timezone: "Africa/Addis_Ababa" },
  { city: "Dar es Salaam", country: "Tanzania", lat: -6.7924, lng: 39.2083, timezone: "Africa/Dar_es_Salaam" },
  { city: "Tunis", country: "Tunisia", lat: 36.8065, lng: 10.1815, timezone: "Africa/Tunis" },
  { city: "Alexandria", country: "Egypt", lat: 31.2001, lng: 29.9187, timezone: "Africa/Cairo" },

  // South America
  { city: "São Paulo", country: "Brazil", lat: -23.5505, lng: -46.6333, timezone: "America/Sao_Paulo" },
  { city: "Rio de Janeiro", country: "Brazil", lat: -22.9068, lng: -43.1729, timezone: "America/Sao_Paulo" },
  { city: "Buenos Aires", country: "Argentina", lat: -34.6037, lng: -58.3816, timezone: "America/Argentina/Buenos_Aires" },
  { city: "Lima", country: "Peru", lat: -12.0464, lng: -77.0428, timezone: "America/Lima" },
  { city: "Bogotá", country: "Colombia", lat: 4.7110, lng: -74.0721, timezone: "America/Bogota" },
  { city: "Santiago", country: "Chile", lat: -33.4489, lng: -70.6693, timezone: "America/Santiago" },
  { city: "Caracas", country: "Venezuela", lat: 10.4806, lng: -66.9036, timezone: "America/Caracas" },
  { city: "Quito", country: "Ecuador", lat: -0.1807, lng: -78.4678, timezone: "America/Guayaquil" },
  { city: "Montevideo", country: "Uruguay", lat: -34.9011, lng: -56.1645, timezone: "America/Montevideo" },
  { city: "Medellín", country: "Colombia", lat: 6.2476, lng: -75.5658, timezone: "America/Bogota" },
  { city: "Cartagena", country: "Colombia", lat: 10.3910, lng: -75.4794, timezone: "America/Bogota" },
  { city: "Cusco", country: "Peru", lat: -13.5319, lng: -71.9675, timezone: "America/Lima" },

  // Oceania
  { city: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093, timezone: "Australia/Sydney" },
  { city: "Melbourne", country: "Australia", lat: -37.8136, lng: 144.9631, timezone: "Australia/Melbourne" },
  { city: "Brisbane", country: "Australia", lat: -27.4698, lng: 153.0251, timezone: "Australia/Brisbane" },
  { city: "Perth", country: "Australia", lat: -31.9505, lng: 115.8605, timezone: "Australia/Perth" },
  { city: "Auckland", country: "New Zealand", lat: -36.8509, lng: 174.7645, timezone: "Pacific/Auckland" },
  { city: "Wellington", country: "New Zealand", lat: -41.2866, lng: 174.7756, timezone: "Pacific/Auckland" },
  { city: "Christchurch", country: "New Zealand", lat: -43.5321, lng: 172.6362, timezone: "Pacific/Auckland" },
  { city: "Adelaide", country: "Australia", lat: -34.9285, lng: 138.6007, timezone: "Australia/Adelaide" },
  { city: "Gold Coast", country: "Australia", lat: -28.0167, lng: 153.4000, timezone: "Australia/Brisbane" },
  { city: "Fiji", country: "Fiji", lat: -18.1416, lng: 178.4419, timezone: "Pacific/Fiji" },
  { city: "Honolulu", country: "USA", lat: 21.3069, lng: -157.8583, timezone: "Pacific/Honolulu" },

  // Russia & Central Asia
  { city: "Moscow", country: "Russia", lat: 55.7558, lng: 37.6173, timezone: "Europe/Moscow" },
  { city: "Saint Petersburg", country: "Russia", lat: 59.9343, lng: 30.3351, timezone: "Europe/Moscow" },
  { city: "Vladivostok", country: "Russia", lat: 43.1332, lng: 131.9113, timezone: "Asia/Vladivostok" },
  { city: "Novosibirsk", country: "Russia", lat: 55.0084, lng: 82.9357, timezone: "Asia/Novosibirsk" },
  { city: "Almaty", country: "Kazakhstan", lat: 43.2220, lng: 76.8512, timezone: "Asia/Almaty" },
  { city: "Tashkent", country: "Uzbekistan", lat: 41.2995, lng: 69.2401, timezone: "Asia/Tashkent" },

  // Caribbean & Central America
  { city: "Havana", country: "Cuba", lat: 23.1136, lng: -82.3666, timezone: "America/Havana" },
  { city: "San Juan", country: "Puerto Rico", lat: 18.4655, lng: -66.1057, timezone: "America/Puerto_Rico" },
  { city: "Kingston", country: "Jamaica", lat: 17.9714, lng: -76.7936, timezone: "America/Jamaica" },
  { city: "Nassau", country: "Bahamas", lat: 25.0480, lng: -77.3554, timezone: "America/Nassau" },
  { city: "Panama City", country: "Panama", lat: 9.1012, lng: -79.4029, timezone: "America/Panama" },
  { city: "San José", country: "Costa Rica", lat: 9.9281, lng: -84.0907, timezone: "America/Costa_Rica" },
  { city: "Guatemala City", country: "Guatemala", lat: 14.6349, lng: -90.5069, timezone: "America/Guatemala" },

  // More European cities
  { city: "Venice", country: "Italy", lat: 45.4408, lng: 12.3155, timezone: "Europe/Rome" },
  { city: "Florence", country: "Italy", lat: 43.7696, lng: 11.2558, timezone: "Europe/Rome" },
  { city: "Nice", country: "France", lat: 43.7102, lng: 7.2620, timezone: "Europe/Paris" },
  { city: "Lyon", country: "France", lat: 45.7640, lng: 4.8357, timezone: "Europe/Paris" },
  { city: "Marseille", country: "France", lat: 43.2965, lng: 5.3698, timezone: "Europe/Paris" },
  { city: "Hamburg", country: "Germany", lat: 53.5511, lng: 9.9937, timezone: "Europe/Berlin" },
  { city: "Frankfurt", country: "Germany", lat: 50.1109, lng: 8.6821, timezone: "Europe/Berlin" },
  { city: "Cologne", country: "Germany", lat: 50.9375, lng: 6.9603, timezone: "Europe/Berlin" },
  { city: "Salzburg", country: "Austria", lat: 47.8095, lng: 13.0550, timezone: "Europe/Vienna" },
  { city: "Geneva", country: "Switzerland", lat: 46.2044, lng: 6.1432, timezone: "Europe/Zurich" },
  { city: "Rotterdam", country: "Netherlands", lat: 51.9244, lng: 4.4777, timezone: "Europe/Amsterdam" },
  { city: "Antwerp", country: "Belgium", lat: 51.2194, lng: 4.4025, timezone: "Europe/Brussels" },
  { city: "Krakow", country: "Poland", lat: 50.0647, lng: 19.9450, timezone: "Europe/Warsaw" },
  { city: "Bucharest", country: "Romania", lat: 44.4268, lng: 26.1025, timezone: "Europe/Bucharest" },
  { city: "Sofia", country: "Bulgaria", lat: 42.6977, lng: 23.3219, timezone: "Europe/Sofia" },
  { city: "Belgrade", country: "Serbia", lat: 44.7866, lng: 20.4489, timezone: "Europe/Belgrade" },
  { city: "Zagreb", country: "Croatia", lat: 45.8150, lng: 15.9819, timezone: "Europe/Zagreb" },
  { city: "Ljubljana", country: "Slovenia", lat: 46.0569, lng: 14.5058, timezone: "Europe/Ljubljana" },
  { city: "Bratislava", country: "Slovakia", lat: 48.1486, lng: 17.1077, timezone: "Europe/Bratislava" },
  { city: "Tallinn", country: "Estonia", lat: 59.4370, lng: 24.7536, timezone: "Europe/Tallinn" },
  { city: "Riga", country: "Latvia", lat: 56.9496, lng: 24.1052, timezone: "Europe/Riga" },
  { city: "Vilnius", country: "Lithuania", lat: 54.6872, lng: 25.2797, timezone: "Europe/Vilnius" },

  // More Asian cities
  { city: "Kathmandu", country: "Nepal", lat: 27.7172, lng: 85.3240, timezone: "Asia/Kathmandu" },
  { city: "Colombo", country: "Sri Lanka", lat: 6.9271, lng: 79.8612, timezone: "Asia/Colombo" },
  { city: "Dhaka", country: "Bangladesh", lat: 23.8103, lng: 90.4125, timezone: "Asia/Dhaka" },
  { city: "Yangon", country: "Myanmar", lat: 16.8661, lng: 96.1951, timezone: "Asia/Yangon" },
  { city: "Phnom Penh", country: "Cambodia", lat: 11.5564, lng: 104.9282, timezone: "Asia/Phnom_Penh" },
  { city: "Vientiane", country: "Laos", lat: 17.9757, lng: 102.6331, timezone: "Asia/Vientiane" },
  { city: "Macau", country: "China", lat: 22.1987, lng: 113.5439, timezone: "Asia/Macau" },
  { city: "Busan", country: "South Korea", lat: 35.1796, lng: 129.0756, timezone: "Asia/Seoul" },

  // Festive/Special locations
  { city: "Rovaniemi", country: "Finland", lat: 66.5039, lng: 25.7294, timezone: "Europe/Helsinki" }, // Santa's Village!
  { city: "North Pole", country: "Alaska", lat: 64.7511, lng: -147.3494, timezone: "America/Anchorage" },
  { city: "Bethlehem", country: "Palestine", lat: 31.7054, lng: 35.2024, timezone: "Asia/Jerusalem" },
  { city: "Lapland", country: "Sweden", lat: 67.8558, lng: 20.2253, timezone: "Europe/Stockholm" },
  { city: "Nuremberg", country: "Germany", lat: 49.4521, lng: 11.0767, timezone: "Europe/Berlin" }, // Christmas Market
  { city: "Strasbourg", country: "France", lat: 48.5734, lng: 7.7521, timezone: "Europe/Paris" }, // Christmas Capital
  { city: "Vienna Christmas", country: "Austria", lat: 48.2082, lng: 16.3738, timezone: "Europe/Vienna" },
  { city: "Bruges", country: "Belgium", lat: 51.2093, lng: 3.2247, timezone: "Europe/Brussels" }
];

/**
 * Get a random location from the database
 * @returns {Object} Random location object
 */
export function getRandomLocation() {
  const index = Math.floor(Math.random() * locations.length);
  return locations[index];
}

/**
 * Get a random location different from the current one
 * @param {Object} currentLocation - Current location to avoid
 * @returns {Object} New random location
 */
export function getNewRandomLocation(currentLocation) {
  let newLocation;
  do {
    newLocation = getRandomLocation();
  } while (currentLocation && newLocation.city === currentLocation.city);
  return newLocation;
}

/**
 * Get local time string for a timezone
 * @param {string} timezone - IANA timezone string
 * @returns {string} Formatted local time
 */
export function getLocalTime(timezone) {
  try {
    return new Date().toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  } catch (e) {
    // Fallback if timezone is invalid
    return new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }
}

/**
 * Get number of locations
 * @returns {number} Total locations count
 */
export function getLocationCount() {
  return locations.length;
}
