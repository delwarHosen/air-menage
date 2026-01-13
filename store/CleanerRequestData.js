import { IMAGE_COMPONENTS } from "../assets/image.index";

/**
 * cleanerDetailsData
 * status: "Pending", "Validate", "Completed"
 */

export const cleanerDetailsData = [
  {
    id: 1,
    status: "Validate", // ১ নম্বর অপশন
    date: "Lundi 18th December",
    day: "Monday",
    city: "Berlin",
    image: IMAGE_COMPONENTS.archiveImage,
    propertyImage: IMAGE_COMPONENTS.propertyDetailsImage,
    images: [IMAGE_COMPONENTS.propertyImage],
    description: "This modern luxury house offers essential amenities including high-speed internet, premium kitchen appliances, and professional deep cleaning services for a truly comfortable living experience.",
    country: "Germany",
    area: "50–120 m²",
    beds: 3,
    bedrooms: 3,
    bathrooms: 2,
    buildingName: "Peak Residence",
    property_type: "House",
    lock_system: "Manual Key",
    password:"2r 34 fdkl f875",
    timeSlot: "09:00-15:00",
    duration: "2Hours 30Min",
    equipmentProvided: false,
    laundryIncluded: true,
    cleanerName: "Alex",
    price: 65.0,
    cleanerImage: "https://i.pravatar.cc/150?img=32",

    cleaner_request: [
      { id: 101, profile_img: "https://i.pravatar.cc/150?img=11", name: "Sophia Martinez" },
      { id: 102, profile_img: "https://i.pravatar.cc/150?img=12", name: "Emma Wilson" },
      { id: 103, profile_img: "https://i.pravatar.cc/150?img=12", name: "Jhon Doe" },
      { id: 104, profile_img: "https://i.pravatar.cc/150?img=12", name: "Emma Wilson" },
    ],

    general_types: [
      { id: 1, name: "Full Cleaning" },
      { id: 2, name: "Dust Removal" },
    ],
    bed_room: [
      { id: 1, name: "Bed Making" },
      { id: 2, name: "Sheet Changing" },
    ],
    living_room: [
      { id: 1, name: "Vacuum Cleaning" },
      { id: 2, name: "Mopping" },
    ],
    kitchen_room: [
      { id: 1, name: "Dish Washing" },
      { id: 2, name: "Appliance Cleaning" },
    ],

    completed_tasks: [
      {
        id: "ct5",
        property_name: "Colosseum View",
        task_title: "Balcony and Living Area Deep Clean",
        task_image: IMAGE_COMPONENTS.propertyDetailsImage,
        status: "Validate",
      },
    ],
  },

  {
    id: 2,
    status: "Validate", // ২ নম্বর অপশন
    date: "Vendredi 22nd December",
    day: "Friday",
    city: "Madrid",
    image: IMAGE_COMPONENTS.archiveImage,
    propertyImage: IMAGE_COMPONENTS.propertyDetailsImage,
    images: [IMAGE_COMPONENTS.propertyImage],
    description: "Experience a premium luxury villa cleaning service featuring professional equipment, eco-friendly supplies, and detailed attention to every corner to ensure a spotless environment.",
    country: "Spain",
    area: "60–150 m²",
    beds: 4,
    bedrooms: 4,
    bathrooms: 3,
    buildingName: "Sunset Villa",
    property_type: "Villa",
    lock_system: "Keypad",
    password:"2r 34 fdkl f875",
    timeSlot: "08:00-17:00",
    duration: "2Hours 30Min",
    equipmentProvided: true,
    laundryIncluded: true,
    cleanerName: "Carlos",
    price: 90.0,
    cleanerImage: "https://i.pravatar.cc/150?img=18",

    cleaner_request: [
      { id: 101, profile_img: "https://i.pravatar.cc/150?img=11", name: "Sophia Martinez" },
      { id: 102, profile_img: "https://i.pravatar.cc/150?img=12", name: "Emma Wilson" },
      { id: 103, profile_img: "https://i.pravatar.cc/150?img=12", name: "Jhon Doe" },
      { id: 104, profile_img: "https://i.pravatar.cc/150?img=12", name: "Emma Wilson" },
    ],
    general_types: [{ id: 1, name: "Deep Cleaning" }],
    bed_room: [{ id: 1, name: "Bed Making" }],
    living_room: [{ id: 1, name: "Dusting" }],
    kitchen_room: [{ id: 1, name: "Appliance Cleaning" }],

    completed_tasks: [
      {
        id: "ct5",
        property_name: "Colosseum View",
        task_title: "Balcony and Living Area Deep Clean",
        task_image: IMAGE_COMPONENTS.propertyDetailsImage,
        status: "Completed",
      },
    ],
  },

  {
    id: 3,
    status: "Validate", // ৩ নম্বর অপশন
    date: "Mardi 26th December",
    day: "Tuesday",
    city: "Paris",
    image: IMAGE_COMPONENTS.archiveImage,
    propertyImage: IMAGE_COMPONENTS.propertyDetailsImage,
    images: [IMAGE_COMPONENTS.propertyImage],
    description: "Centrally located city apartment providing quick and efficient cleaning services, vacuuming, and trash removal, perfect for busy professionals living in the heart of Paris.",
    country: "France",
    area: "30–80 m²",
    beds: 1,
    bedrooms: 1,
    bathrooms: 1,
    buildingName: "Central Loft",
    property_type: "Studio",
    lock_system: "Smart Lock",
    password:"2r 34 fdkl f875",
    timeSlot: "11:00-14:30",
    duration: "2Hours 30Min",
    equipmentProvided: true,
    laundryIncluded: false,
    cleanerName: "Marie",
    price: 40.75,
    cleanerImage: "https://i.pravatar.cc/150?img=47",

    cleaner_request: [
      { id: 301, profile_img: "https://i.pravatar.cc/150?img=31", name: "John Doe" },
      { id: 302, profile_img: "https://i.pravatar.cc/150?img=32", name: "Alex Brown" },
      { id: 303, profile_img: "https://i.pravatar.cc/150?img=33", name: "Sara Lee" },
    ],

    general_types: [{ id: 1, name: "Quick Cleaning" }],
    bed_room: [{ id: 1, name: "Bed Making" }],
    living_room: [{ id: 1, name: "Vacuum" }],
    kitchen_room: [{ id: 1, name: "Counter Cleaning" }],

    completed_tasks: [
      {
        id: "ct5",
        property_name: "Colosseum View",
        task_title: "Balcony and Living Area Deep Clean",
        task_image: IMAGE_COMPONENTS.propertyDetailsImage,
        status: "Validate",
      },
    ],
  },

  {
    id: 4,
    status: "Pending",
    date: "Jeudi 28th December",
    day: "Thursday",
    city: "Rome",
    image: IMAGE_COMPONENTS.archiveImage,
    propertyImage: IMAGE_COMPONENTS.propertyDetailsImage,
    images: [IMAGE_COMPONENTS.propertyImage],
    description: "Historical apartment cleaning featuring specialized care for antique floors, delicate wall paintings, and thorough sanitize services to maintain the beauty of this classical property.",
    country: "Italy",
    area: "40–100 m²",
    beds: 2,
    bedrooms: 2,
    bathrooms: 1,
    buildingName: "Colosseum View",
    property_type: "Apartment",
    password:"2r 34 fdkl f875",
    lock_system: "Keypad",
    timeSlot: "12:00-15:00",
    duration: "3Hours 00Min",
    equipmentProvided: true,
    laundryIncluded: true,
    cleanerName: "Lucia",
    price: 55.5,
    cleanerImage: "https://i.pravatar.cc/150?img=25",

    cleaner_request: [
      { id: 401, profile_img: "https://i.pravatar.cc/150?img=41", name: "Marco Rossi" },
    ],

    general_types: [{ id: 1, name: "Standard Cleaning" }],
    bed_room: [{ id: 1, name: "Bed Making" }],
    living_room: [{ id: 1, name: "Mopping" }],
    kitchen_room: [{ id: 1, name: "Trash Removal" }],

    completed_tasks: [
      {
        id: "ct5",
        property_name: "Colosseum View",
        task_title: "Balcony and Living Area Deep Clean",
        task_image: IMAGE_COMPONENTS.propertyDetailsImage,
        status: "Completed",
      },
    ],
  },
];