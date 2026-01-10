import { IMAGE_COMPONENTS } from "../assets/image.index";

export const propertiesData = [
  {
    id: 1,
    img: IMAGE_COMPONENTS.propertyImage,
    title: "Flower Apartment",
    location: "Dhaka, Bangladesh",
    description:
      "Flower Apartment is a modern and comfortable residential property located in the heart of Dhaka. This apartment is designed for families and professionals who value convenience, safety, and a peaceful living environment. The building is well-maintained and offers easy access to schools, hospitals, shopping malls, and public transportation. Natural light flows through spacious rooms, creating a warm and welcoming atmosphere. The property includes essential furniture, reliable utilities, and secure access systems. It is ideal for long-term living, offering a balanced lifestyle with both privacy and community living in a prime urban location.",
    propertyType: "Provided",
    propertySize: "1200 sq ft",
    bedrooms: 3,
    bedroomElements: ["Bed", "Wardrobe", "AC", "Study Table"],
    lockType: "Smart Digital Lock",
    meetkeyType: "Meet the cleaner to give keys",
    cleaner_request: [
      { id: 101, profile_img: "https://i.pravatar.cc/150?img=11", name: "Sophia Martinez",location:"France" },
      { id: 102, profile_img: "https://i.pravatar.cc/150?img=12", name: "Emma Wilson" ,location:"France"},
      { id: 103, profile_img: "https://i.pravatar.cc/150?img=13", name: "John Doe" ,location:"France"},
    ]
  },
  {
    id: 2,
    img: IMAGE_COMPONENTS.propertyImage,
    title: "Luxury Villa",
    location: "Gulshan, Dhaka",
    description:
      "Luxury Villa offers an exclusive living experience in one of Dhaka’s most prestigious areas. This property is designed with premium materials and elegant interiors to ensure maximum comfort and style. The villa features spacious bedrooms, a large living area, and modern kitchen facilities. It is fully furnished and suitable for high-end residential living. Security is a top priority with advanced locking systems and controlled access. The calm surroundings and well-planned layout make it perfect for families who want privacy, luxury, and convenience in one complete package.",
    propertyType: "Provided",
    propertySize: "2500 sq ft",
    bedrooms: 4,
    bedroomElements: ["King Bed", "Wardrobe", "AC", "Attached Bathroom"],
    lockType: "Biometric Lock",
    meetkeyType: "Meet the cleaner to give keys",
    cleaner_request: [
      { id: 201, profile_img: "https://i.pravatar.cc/150?img=14", name: "Alex Brown",location:"France" },
      { id: 202, profile_img: "https://i.pravatar.cc/150?img=15", name: "Marie Claire",location:"France" },
    ]
  },
  {
    id: 3,
    img: IMAGE_COMPONENTS.propertyImage,
    title: "Studio Flat",
    location: "Banani, Dhaka",
    description:
      "This Studio Flat is a compact and efficient living space ideal for single professionals or students. Located in Banani, it provides excellent connectivity to offices, restaurants, and entertainment zones. The flat is well-organized with smart storage solutions and modern furniture. Despite its smaller size, it offers a comfortable lifestyle with all essential facilities included. The secure entry system ensures safety, while the minimal design keeps maintenance easy. It is a perfect choice for those who prefer simplicity and urban convenience.",
    propertyType: "Provided",
    propertySize: "550 sq ft",
    bedrooms: 1,
    bedroomElements: ["Single Bed", "Wardrobe", "AC"],
    lockType: "Key Lock",
    meetkeyType: "Meet the cleaner to give keys",
    cleaner_request: [
      { id: 301, profile_img: "https://i.pravatar.cc/150?img=16", name: "Sara Lee",location:"France",location:"France" },
      { id: 302, profile_img: "https://i.pravatar.cc/150?img=17", name: "John Smith", location:"France",location:"France"},
    ]
  },
  {
    id: 4,
    img: IMAGE_COMPONENTS.propertyImage,
    title: "Family House",
    location: "Dhanmondi, Dhaka",
    description:
      "Family House is a spacious and practical property designed for comfortable family living. Situated in Dhanmondi, it offers a friendly neighborhood with nearby parks, schools, and healthcare facilities. The house features well-sized bedrooms, ample storage, and a functional layout that supports daily family activities. Natural ventilation and lighting enhance the overall living experience. Security features include durable locks and controlled access. This property is suitable for families seeking long-term residence in a reliable and well-connected area.",
    propertyType: "Provided",
    propertySize: "1800 sq ft",
    bedrooms: 3,
    bedroomElements: ["Bed", "Wardrobe", "Fan"],
    lockType: "Manual Deadbolt Lock",
    meetkeyType: "Meet the cleaner to give keys",
    cleaner_request: [
      { id: 401, profile_img: "https://i.pravatar.cc/150?img=18", name: "Marco Rossi" },
    ]
  }
];
