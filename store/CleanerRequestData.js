import { IMAGE_COMPONENTS } from "../assets/image.index";

export const cleanerDetailsData = [
    {
        id: 1,
        date: "Vendredi 15th December",
        day: "Friday",
        city: "San Francisco",
        image: IMAGE_COMPONENTS.archiveImage,
        country: "France",
        area: "20–500 m²",
        beds: 2,
        bedrooms: 2,
        bathrooms: 2,
        buildingName: "B. Berlin / Peak Fit",
        property_type: "Apartment",
        lock_system: "Keypad",
        timeSlot: "10:00-16:00",
        duration: "1h30",
        equipmentProvided: true,
        laundryIncluded: true,
        cleanerName: "Rushna",
        price: 50.25,
        cleanerImage: "https://i.pravatar.cc/150?img=12",
        general_types: [
            { id: 1, name: "Living Room Cleaning" },
            { id: 2, name: "Window Cleaning" }
        ],
        bed_room: [
            { id: 1, name: "Bed Making" },
            { id: 2, name: "Wardrobe Organization" }
        ],
        kitchen_room: [
            { id: 1, name: "Dishwashing" },
            { id: 2, name: "Cabinet Cleaning" }
        ],
        living_room: [
            { id: 1, name: "Dusting" },
            { id: 2, name: "Vacuum" }
        ]
    },
    {
        id: 2,
        date: "Lundi 18th December",
        day: "Monday",
        city: "Berlin",
        image: IMAGE_COMPONENTS.archiveImage,
        country: "Germany",
        area: "50–120 m²",
        beds: 3,
        bedrooms: 3,
        bathrooms: 2,
        buildingName: "Peak Residence",
        property_type: "House",
        lock_system: "Manual Key",
        timeSlot: "09:00-15:00",
        duration: "2h",
        equipmentProvided: false,
        laundryIncluded: true,
        cleanerName: "Alex",
        price: 65.0,
        cleanerImage: "https://i.pravatar.cc/150?img=32",
        general_types: [
            { id: 1, name: "Full Cleaning" },
            { id: 2, name: "Floor Cleaning" }
        ],
        bed_room: [
            { id: 1, name: "Bed Making" },
            { id: 2, name: "Closet Organization" }
        ],
        kitchen_room: [
            { id: 1, name: "Appliance Cleaning" },
            { id: 2, name: "Countertops" }
        ],
        living_room: [
            { id: 1, name: "Vacuum" },
            { id: 2, name: "Dusting" }
        ]
    },
    {
        id: 3,
        date: "Mercredi 20th December",
        day: "Wednesday",
        city: "Paris",
        image: IMAGE_COMPONENTS.archiveImage,
        country: "France",
        area: "30–80 m²",
        beds: 1,
        bedrooms: 1,
        bathrooms: 1,
        buildingName: "Central Loft",
        property_type: "Studio",
        lock_system: "Smart Lock",
        timeSlot: "11:00-14:30",
        duration: "1h",
        equipmentProvided: true,
        laundryIncluded: false,
        cleanerName: "Marie",
        price: 40.75,
        cleanerImage: "https://i.pravatar.cc/150?img=47",
        general_types: [
            { id: 1, name: "Quick Cleaning" },
            { id: 2, name: "Window Cleaning" }
        ],
        bed_room: [
            { id: 1, name: "Bed Making" }
        ],
        kitchen_room: [
            { id: 1, name: "Counter Cleaning" }
        ],
        living_room: [
            { id: 1, name: "Vacuum" }
        ]
    },
    {
        id: 4,
        date: "Vendredi 22nd December",
        day: "Friday",
        city: "Madrid",
        image: IMAGE_COMPONENTS.archiveImage,
        country: "Spain",
        area: "60–150 m²",
        beds: 4,
        bedrooms: 4,
        bathrooms: 3,
        buildingName: "Sunset Villa",
        property_type: "Villa",
        lock_system: "Keypad",
        timeSlot: "08:00-17:00",
        duration: "3h",
        equipmentProvided: true,
        laundryIncluded: true,
        cleanerName: "Carlos",
        price: 90.0,
        cleanerImage: "https://i.pravatar.cc/150?img=18",
        general_types: [
            { id: 1, name: "Deep Cleaning" },
            { id: 2, name: "Window Cleaning" }
        ],
        bed_room: [
            { id: 1, name: "Bed Making" },
            { id: 2, name: "Closet Organization" }
        ],
        kitchen_room: [
            { id: 1, name: "Appliance Cleaning" },
            { id: 2, name: "Floor Cleaning" }
        ],
        living_room: [
            { id: 1, name: "Dusting" },
            { id: 2, name: "Vacuum" }
        ]
    }
];
