// cleaners.js
export const cleaners = [
  // {
  //   id: 1,
  //   profileImg: "https://randomuser.me/api/portraits/women/45.jpg",
  //   name: "Sophia Martinez",
  //   email: "sophia.martinez@example.com",
  //   workManage: 40,
  //   evaluation: 4.8,
  //   overallScore: 9.5,
  //   location: { city: "Los Angeles", country: "USA" },
  //   workType: [{ type: "Home Cleaning" }, { type: "Move-in/Move-out" }],
  //   serviceDescription: [
  //     { details: "Thorough cleaning of kitchens, bathrooms, and living areas." },
  //     { details: "Organizing closets, cabinets, and living spaces." },
  //   ],
  //   reviews: [
  //     {
  //       customer: "Emily R.",
  //       comment:
  //         "Sophia was extremely professional and detail oriented. She cleaned every room carefully and ensured nothing was missed. The kitchen and bathroom looked spotless, and the entire house felt fresh and welcoming after her service.",
  //       rating: 5,
  //       date: "2025-12-01",
  //       image: "https://randomuser.me/api/portraits/women/50.jpg",
  //     },
  //     {
  //       customer: "James K.",
  //       comment:
  //         "Sophia arrived on time and worked with great dedication. She focused on small details that are usually ignored by others. Her cleaning quality was excellent, and I felt very comfortable trusting her with my home.",
  //       rating: 4.5,
  //       date: "2025-11-20",
  //       image: "https://randomuser.me/api/portraits/men/30.jpg",
  //     },
  //     {
  //       customer: "Laura M.",
  //       comment:
  //         "I was impressed by Sophia’s professionalism and polite behavior. She organized my living space beautifully and cleaned all surfaces thoroughly. The house felt brighter and more comfortable after she finished.",
  //       rating: 4.8,
  //       date: "2025-11-15",
  //       image: "https://randomuser.me/api/portraits/women/41.jpg",
  //     },
  //     {
  //       customer: "Daniel S.",
  //       comment:
  //         "Sophia did an outstanding job with my move out cleaning. She handled everything carefully and left the apartment in perfect condition. The landlord was very satisfied with the final result.",
  //       rating: 5,
  //       date: "2025-11-10",
  //       image: "https://randomuser.me/api/portraits/men/44.jpg",
  //     },
  //     {
  //       customer: "Rachel T.",
  //       comment:
  //         "Very friendly and trustworthy cleaner. Sophia listened to my requests and followed instructions perfectly. Her attention to detail and positive attitude really made a difference in the final outcome.",
  //       rating: 4.7,
  //       date: "2025-11-05",
  //       image: "https://randomuser.me/api/portraits/women/38.jpg",
  //     },
  //   ],
  // },
  // {
  //   id: 2,
  //   profileImg: "https://randomuser.me/api/portraits/men/32.jpg",
  //   name: "Liam Johnson",
  //   email: "liam.johnson@example.com",
  //   workManage: 25,
  //   evaluation: 4.6,
  //   overallScore: 9.0,
  //   location: { city: "Toronto", country: "Canada" },
  //   workType: [{ type: "Home Cleaning" }, { type: "Office Cleaning" }],
  //   serviceDescription: [
  //     { details: "Wiping and sanitizing desks, keyboards, and phones." },
  //     { details: "Vacuuming, mopping, and polishing floors." },
  //   ],
  //   reviews: [
  //     {
  //       customer: "Olivia P.",
  //       comment:
  //         "Liam was very efficient and organized while cleaning our office. He completed the work within time and left everything neat and fresh. His calm attitude and professional behavior made the experience stress free.",
  //       rating: 4.5,
  //       date: "2025-12-05",
  //       image: "https://randomuser.me/api/portraits/women/60.jpg",
  //     },
  //     {
  //       customer: "Michael S.",
  //       comment:
  //         "Our office has never looked better. Liam cleaned desks, floors, and common areas thoroughly. He worked quietly and focused on quality. I would definitely recommend his service to others.",
  //       rating: 5,
  //       date: "2025-11-28",
  //       image: "https://randomuser.me/api/portraits/men/35.jpg",
  //     },
  //     {
  //       customer: "Sarah L.",
  //       comment:
  //         "Liam was punctual and very respectful. He paid attention to details and ensured every corner was clean. The workspace felt healthier and more organized after his cleaning session.",
  //       rating: 4.6,
  //       date: "2025-11-18",
  //       image: "https://randomuser.me/api/portraits/women/45.jpg",
  //     },
  //     {
  //       customer: "David R.",
  //       comment:
  //         "Professional and reliable cleaner. Liam followed all instructions carefully and completed the job efficiently. The floors and desks looked spotless, and the office smelled fresh.",
  //       rating: 4.7,
  //       date: "2025-11-12",
  //       image: "https://randomuser.me/api/portraits/men/47.jpg",
  //     },
  //     {
  //       customer: "Anna W.",
  //       comment:
  //         "Very satisfied with Liam’s service. He handled our office cleaning with care and responsibility. His polite communication and attention to cleanliness really stood out.",
  //       rating: 4.5,
  //       date: "2025-11-07",
  //       image: "https://randomuser.me/api/portraits/women/39.jpg",
  //     },
  //   ],
  // },
  // {
  //   id: 3,
  //   profileImg: "https://randomuser.me/api/portraits/women/68.jpg",
  //   name: "Ava Smith",
  //   email: "ava.smith@example.com",
  //   workManage: 30,
  //   evaluation: 4.9,
  //   overallScore: 9.8,
  //   location: { city: "London", country: "UK" },
  //   workType: [{ type: "Home Cleaning" }, { type: "Deep Cleaning" }],
  //   serviceDescription: [
  //     { details: "Deep cleaning of all bathroom surfaces." },
  //     { details: "Cleaning countertops, sinks, appliances, and cabinets." },
  //   ],
  //   reviews: [
  //     {
  //       customer: "Charlotte W.",
  //       comment:
  //         "Ava delivered outstanding service and cleaned every surface perfectly. She was polite, professional, and very careful with furniture. The house looked brand new after her deep cleaning work.",
  //       rating: 5,
  //       date: "2025-12-03",
  //       image: "https://randomuser.me/api/portraits/women/65.jpg",
  //     },
  //     {
  //       customer: "Henry T.",
  //       comment:
  //         "Always on time and extremely reliable. Ava pays attention to every detail and ensures customer satisfaction before leaving. Her cleaning quality is consistently excellent.",
  //       rating: 4.8,
  //       date: "2025-11-30",
  //       image: "https://randomuser.me/api/portraits/men/40.jpg",
  //     },
  //     {
  //       customer: "Emma D.",
  //       comment:
  //         "Ava’s deep cleaning service exceeded my expectations. She cleaned hard to reach areas thoroughly and handled everything with care. I felt very comfortable trusting her work.",
  //       rating: 5,
  //       date: "2025-11-22",
  //       image: "https://randomuser.me/api/portraits/women/52.jpg",
  //     },
  //     {
  //       customer: "Oliver B.",
  //       comment:
  //         "Very professional and friendly cleaner. Ava explained her process clearly and worked efficiently. The kitchen and bathroom were spotless after she finished.",
  //       rating: 4.9,
  //       date: "2025-11-16",
  //       image: "https://randomuser.me/api/portraits/men/46.jpg",
  //     },
  //     {
  //       customer: "Sophia H.",
  //       comment:
  //         "Ava is incredibly detail oriented and hardworking. She ensured everything was cleaned properly and left the house smelling fresh and organized.",
  //       rating: 5,
  //       date: "2025-11-09",
  //       image: "https://randomuser.me/api/portraits/women/49.jpg",
  //     },
  //   ],
  // },
  // {
  //   id: 4,
  //   profileImg: "https://randomuser.me/api/portraits/men/55.jpg",
  //   name: "Noah Williams",
  //   email: "noah.williams@example.com",
  //   workManage: 35,
  //   evaluation: 4.7,
  //   overallScore: 9.3,
  //   location: { city: "Sydney", country: "Australia" },
  //   workType: [{ type: "Home Cleaning" }, { type: "Deep Cleaning" }],
  //   serviceDescription: [
  //     { details: "Detailed cleaning of living rooms and bedrooms." },
  //     { details: "Removing stains and dust from all surfaces." },
  //   ],
  //   reviews: [
  //     {
  //       customer: "Daniel M.",
  //       comment:
  //         "Noah cleaned my apartment very thoroughly and professionally. He arrived on time and focused on every corner of the house. The bathroom and kitchen were sparkling clean.",
  //       rating: 4.7,
  //       date: "2025-12-02",
  //       image: "https://randomuser.me/api/portraits/men/52.jpg",
  //     },
  //     {
  //       customer: "Sophia L.",
  //       comment:
  //         "Very friendly and hardworking cleaner. Noah organized everything neatly and made sure I was satisfied before leaving. His dedication really impressed me.",
  //       rating: 4.8,
  //       date: "2025-11-25",
  //       image: "https://randomuser.me/api/portraits/women/48.jpg",
  //     },
  //     {
  //       customer: "Jack R.",
  //       comment:
  //         "Noah provided excellent deep cleaning service. He removed stains and dust effectively and left the home feeling fresh and comfortable.",
  //       rating: 4.6,
  //       date: "2025-11-18",
  //       image: "https://randomuser.me/api/portraits/men/50.jpg",
  //     },
  //     {
  //       customer: "Isabella K.",
  //       comment:
  //         "Professional and polite cleaner. Noah listened carefully to my instructions and delivered exactly what I expected. Very satisfied with his work.",
  //       rating: 4.7,
  //       date: "2025-11-12",
  //       image: "https://randomuser.me/api/portraits/women/44.jpg",
  //     },
  //     {
  //       customer: "Ethan P.",
  //       comment:
  //         "Great attention to detail and very reliable service. Noah made sure every room was cleaned properly before finishing.",
  //       rating: 4.8,
  //       date: "2025-11-06",
  //       image: "https://randomuser.me/api/portraits/men/41.jpg",
  //     },
  //   ],
  // },
  // {
  //   id: 5,
  //   profileImg: "https://randomuser.me/api/portraits/men/55.jpg",
  //   name: "Noah Williams",
  //   email: "noah.williams@example.com",
  //   workManage: 35,
  //   evaluation: 4.7,
  //   overallScore: 9.3,
  //   location: { city: "Sydney", country: "Australia" },
  //   workType: [{ type: "Home Cleaning" }, { type: "Deep Cleaning" }],
  //   serviceDescription: [
  //     { details: "Detailed cleaning of living rooms and bedrooms." },
  //     { details: "Removing stains and dust from all surfaces." },
  //   ],
  //   reviews: [
  //     {
  //       customer: "Daniel M.",
  //       comment:
  //         "Noah cleaned my apartment very thoroughly and professionally. He arrived on time and focused on every corner of the house. The bathroom and kitchen were sparkling clean.",
  //       rating: 4.7,
  //       date: "2025-12-02",
  //       image: "https://randomuser.me/api/portraits/men/52.jpg",
  //     },
  //     {
  //       customer: "Sophia L.",
  //       comment:
  //         "Very friendly and hardworking cleaner. Noah organized everything neatly and made sure I was satisfied before leaving. His dedication really impressed me.",
  //       rating: 4.8,
  //       date: "2025-11-25",
  //       image: "https://randomuser.me/api/portraits/women/48.jpg",
  //     },
  //     {
  //       customer: "Jack R.",
  //       comment:
  //         "Noah provided excellent deep cleaning service. He removed stains and dust effectively and left the home feeling fresh and comfortable.",
  //       rating: 4.6,
  //       date: "2025-11-18",
  //       image: "https://randomuser.me/api/portraits/men/50.jpg",
  //     },
  //     {
  //       customer: "Isabella K.",
  //       comment:
  //         "Professional and polite cleaner. Noah listened carefully to my instructions and delivered exactly what I expected. Very satisfied with his work.",
  //       rating: 4.7,
  //       date: "2025-11-12",
  //       image: "https://randomuser.me/api/portraits/women/44.jpg",
  //     },
  //     {
  //       customer: "Ethan P.",
  //       comment:
  //         "Great attention to detail and very reliable service. Noah made sure every room was cleaned properly before finishing.",
  //       rating: 4.8,
  //       date: "2025-11-06",
  //       image: "https://randomuser.me/api/portraits/men/41.jpg",
  //     },
  //   ],
  // },
  // {
  //   id: 6,
  //   profileImg: "https://randomuser.me/api/portraits/men/55.jpg",
  //   name: "Noah Williams",
  //   email: "noah.williams@example.com",
  //   workManage: 35,
  //   evaluation: 4.7,
  //   overallScore: 9.3,
  //   location: { city: "Sydney", country: "Australia" },
  //   workType: [{ type: "Home Cleaning" }, { type: "Deep Cleaning" }],
  //   serviceDescription: [
  //     { details: "Detailed cleaning of living rooms and bedrooms." },
  //     { details: "Removing stains and dust from all surfaces." },
  //   ],
  //   reviews: [
  //     {
  //       customer: "Daniel M.",
  //       comment:
  //         "Noah cleaned my apartment very thoroughly and professionally. He arrived on time and focused on every corner of the house. The bathroom and kitchen were sparkling clean.",
  //       rating: 4.7,
  //       date: "2025-12-02",
  //       image: "https://randomuser.me/api/portraits/men/52.jpg",
  //     },
  //     {
  //       customer: "Sophia L.",
  //       comment:
  //         "Very friendly and hardworking cleaner. Noah organized everything neatly and made sure I was satisfied before leaving. His dedication really impressed me.",
  //       rating: 4.8,
  //       date: "2025-11-25",
  //       image: "https://randomuser.me/api/portraits/women/48.jpg",
  //     },
  //     {
  //       customer: "Jack R.",
  //       comment:
  //         "Noah provided excellent deep cleaning service. He removed stains and dust effectively and left the home feeling fresh and comfortable.",
  //       rating: 4.6,
  //       date: "2025-11-18",
  //       image: "https://randomuser.me/api/portraits/men/50.jpg",
  //     },
  //     {
  //       customer: "Isabella K.",
  //       comment:
  //         "Professional and polite cleaner. Noah listened carefully to my instructions and delivered exactly what I expected. Very satisfied with his work.",
  //       rating: 4.7,
  //       date: "2025-11-12",
  //       image: "https://randomuser.me/api/portraits/women/44.jpg",
  //     },
  //     {
  //       customer: "Ethan P.",
  //       comment:
  //         "Great attention to detail and very reliable service. Noah made sure every room was cleaned properly before finishing.",
  //       rating: 4.8,
  //       date: "2025-11-06",
  //       image: "https://randomuser.me/api/portraits/men/41.jpg",
  //     },
  //   ],
  // },
  // {
  //   id: 7,
  //   profileImg: "https://randomuser.me/api/portraits/men/55.jpg",
  //   name: "Noah Williams",
  //   email: "noah.williams@example.com",
  //   workManage: 35,
  //   evaluation: 4.7,
  //   overallScore: 9.3,
  //   location: { city: "Sydney", country: "Australia" },
  //   workType: [{ type: "Home Cleaning" }, { type: "Deep Cleaning" }],
  //   serviceDescription: [
  //     { details: "Detailed cleaning of living rooms and bedrooms." },
  //     { details: "Removing stains and dust from all surfaces." },
  //   ],
  //   reviews: [
  //     {
  //       customer: "Daniel M.",
  //       comment:
  //         "Noah cleaned my apartment very thoroughly and professionally. He arrived on time and focused on every corner of the house. The bathroom and kitchen were sparkling clean.",
  //       rating: 4.7,
  //       date: "2025-12-02",
  //       image: "https://randomuser.me/api/portraits/men/52.jpg",
  //     },
  //     {
  //       customer: "Sophia L.",
  //       comment:
  //         "Very friendly and hardworking cleaner. Noah organized everything neatly and made sure I was satisfied before leaving. His dedication really impressed me.",
  //       rating: 4.8,
  //       date: "2025-11-25",
  //       image: "https://randomuser.me/api/portraits/women/48.jpg",
  //     },
  //     {
  //       customer: "Jack R.",
  //       comment:
  //         "Noah provided excellent deep cleaning service. He removed stains and dust effectively and left the home feeling fresh and comfortable.",
  //       rating: 4.6,
  //       date: "2025-11-18",
  //       image: "https://randomuser.me/api/portraits/men/50.jpg",
  //     },
  //     {
  //       customer: "Isabella K.",
  //       comment:
  //         "Professional and polite cleaner. Noah listened carefully to my instructions and delivered exactly what I expected. Very satisfied with his work.",
  //       rating: 4.7,
  //       date: "2025-11-12",
  //       image: "https://randomuser.me/api/portraits/women/44.jpg",
  //     },
  //     {
  //       customer: "Ethan P.",
  //       comment:
  //         "Great attention to detail and very reliable service. Noah made sure every room was cleaned properly before finishing.",
  //       rating: 4.8,
  //       date: "2025-11-06",
  //       image: "https://randomuser.me/api/portraits/men/41.jpg",
  //     },
  //   ],
  // },

  //  {
  //   id: 8,
  //   profileImg: "https://randomuser.me/api/portraits/men/55.jpg",
  //   name: "Noah Williams",
  //   email: "noah.williams@example.com",
  //   workManage: 35,
  //   evaluation: 4.7,
  //   overallScore: 9.3,
  //   location: { city: "Sydney", country: "Australia" },
  //   workType: [{ type: "Home Cleaning" }, { type: "Deep Cleaning" }],
  //   serviceDescription: [
  //     { details: "Detailed cleaning of living rooms and bedrooms." },
  //     { details: "Removing stains and dust from all surfaces." },
  //   ],
  //   reviews: [
  //     {
  //       customer: "Daniel M.",
  //       comment:
  //         "Noah cleaned my apartment very thoroughly and professionally. He arrived on time and focused on every corner of the house. The bathroom and kitchen were sparkling clean.",
  //       rating: 4.7,
  //       date: "2025-12-02",
  //       image: "https://randomuser.me/api/portraits/men/52.jpg",
  //     },
  //     {
  //       customer: "Sophia L.",
  //       comment:
  //         "Very friendly and hardworking cleaner. Noah organized everything neatly and made sure I was satisfied before leaving. His dedication really impressed me.",
  //       rating: 4.8,
  //       date: "2025-11-25",
  //       image: "https://randomuser.me/api/portraits/women/48.jpg",
  //     },
  //     {
  //       customer: "Jack R.",
  //       comment:
  //         "Noah provided excellent deep cleaning service. He removed stains and dust effectively and left the home feeling fresh and comfortable.",
  //       rating: 4.6,
  //       date: "2025-11-18",
  //       image: "https://randomuser.me/api/portraits/men/50.jpg",
  //     },
  //     {
  //       customer: "Isabella K.",
  //       comment:
  //         "Professional and polite cleaner. Noah listened carefully to my instructions and delivered exactly what I expected. Very satisfied with his work.",
  //       rating: 4.7,
  //       date: "2025-11-12",
  //       image: "https://randomuser.me/api/portraits/women/44.jpg",
  //     },
  //     {
  //       customer: "Ethan P.",
  //       comment:
  //         "Great attention to detail and very reliable service. Noah made sure every room was cleaned properly before finishing.",
  //       rating: 4.8,
  //       date: "2025-11-06",
  //       image: "https://randomuser.me/api/portraits/men/41.jpg",
  //     },
  //   ],
  // },
  //  {
  //   id: 9,
  //   profileImg: "https://randomuser.me/api/portraits/men/55.jpg",
  //   name: "Noah Williams",
  //   email: "noah.williams@example.com",
  //   workManage: 35,
  //   evaluation: 4.7,
  //   overallScore: 9.3,
  //   location: { city: "Sydney", country: "Australia" },
  //   workType: [{ type: "Home Cleaning" }, { type: "Deep Cleaning" }],
  //   serviceDescription: [
  //     { details: "Detailed cleaning of living rooms and bedrooms." },
  //     { details: "Removing stains and dust from all surfaces." },
  //   ],
  //   reviews: [
  //     {
  //       customer: "Daniel M.",
  //       comment:
  //         "Noah cleaned my apartment very thoroughly and professionally. He arrived on time and focused on every corner of the house. The bathroom and kitchen were sparkling clean.",
  //       rating: 4.7,
  //       date: "2025-12-02",
  //       image: "https://randomuser.me/api/portraits/men/52.jpg",
  //     },
  //     {
  //       customer: "Sophia L.",
  //       comment:
  //         "Very friendly and hardworking cleaner. Noah organized everything neatly and made sure I was satisfied before leaving. His dedication really impressed me.",
  //       rating: 4.8,
  //       date: "2025-11-25",
  //       image: "https://randomuser.me/api/portraits/women/48.jpg",
  //     },
  //     {
  //       customer: "Jack R.",
  //       comment:
  //         "Noah provided excellent deep cleaning service. He removed stains and dust effectively and left the home feeling fresh and comfortable.",
  //       rating: 4.6,
  //       date: "2025-11-18",
  //       image: "https://randomuser.me/api/portraits/men/50.jpg",
  //     },
  //     {
  //       customer: "Isabella K.",
  //       comment:
  //         "Professional and polite cleaner. Noah listened carefully to my instructions and delivered exactly what I expected. Very satisfied with his work.",
  //       rating: 4.7,
  //       date: "2025-11-12",
  //       image: "https://randomuser.me/api/portraits/women/44.jpg",
  //     },
  //     {
  //       customer: "Ethan P.",
  //       comment:
  //         "Great attention to detail and very reliable service. Noah made sure every room was cleaned properly before finishing.",
  //       rating: 4.8,
  //       date: "2025-11-06",
  //       image: "https://randomuser.me/api/portraits/men/41.jpg",
  //     },
  //   ],
  // },
  //  {
  //   id: 10,
  //   profileImg: "https://randomuser.me/api/portraits/men/55.jpg",
  //   name: "Noah Williams",
  //   email: "noah.williams@example.com",
  //   workManage: 35,
  //   evaluation: 4.7,
  //   overallScore: 9.3,
  //   location: { city: "Sydney", country: "Australia" },
  //   workType: [{ type: "Home Cleaning" }, { type: "Deep Cleaning" }],
  //   serviceDescription: [
  //     { details: "Detailed cleaning of living rooms and bedrooms." },
  //     { details: "Removing stains and dust from all surfaces." },
  //   ],
  //   reviews: [
  //     {
  //       customer: "Daniel M.",
  //       comment:
  //         "Noah cleaned my apartment very thoroughly and professionally. He arrived on time and focused on every corner of the house. The bathroom and kitchen were sparkling clean.",
  //       rating: 4.7,
  //       date: "2025-12-02",
  //       image: "https://randomuser.me/api/portraits/men/52.jpg",
  //     },
  //     {
  //       customer: "Sophia L.",
  //       comment:
  //         "Very friendly and hardworking cleaner. Noah organized everything neatly and made sure I was satisfied before leaving. His dedication really impressed me.",
  //       rating: 4.8,
  //       date: "2025-11-25",
  //       image: "https://randomuser.me/api/portraits/women/48.jpg",
  //     },
  //     {
  //       customer: "Jack R.",
  //       comment:
  //         "Noah provided excellent deep cleaning service. He removed stains and dust effectively and left the home feeling fresh and comfortable.",
  //       rating: 4.6,
  //       date: "2025-11-18",
  //       image: "https://randomuser.me/api/portraits/men/50.jpg",
  //     },
  //     {
  //       customer: "Isabella K.",
  //       comment:
  //         "Professional and polite cleaner. Noah listened carefully to my instructions and delivered exactly what I expected. Very satisfied with his work.",
  //       rating: 4.7,
  //       date: "2025-11-12",
  //       image: "https://randomuser.me/api/portraits/women/44.jpg",
  //     },
  //     {
  //       customer: "Ethan P.",
  //       comment:
  //         "Great attention to detail and very reliable service. Noah made sure every room was cleaned properly before finishing.",
  //       rating: 4.8,
  //       date: "2025-11-06",
  //       image: "https://randomuser.me/api/portraits/men/41.jpg",
  //     },
  //   ],
  // },
  //  {
  //   id: 11,
  //   profileImg: "https://randomuser.me/api/portraits/men/55.jpg",
  //   name: "Noah Williams",
  //   email: "noah.williams@example.com",
  //   workManage: 35,
  //   evaluation: 4.7,
  //   overallScore: 9.3,
  //   location: { city: "Sydney", country: "Australia" },
  //   workType: [{ type: "Home Cleaning" }, { type: "Deep Cleaning" }],
  //   serviceDescription: [
  //     { details: "Detailed cleaning of living rooms and bedrooms." },
  //     { details: "Removing stains and dust from all surfaces." },
  //   ],
  //   reviews: [
  //     {
  //       customer: "Daniel M.",
  //       comment:
  //         "Noah cleaned my apartment very thoroughly and professionally. He arrived on time and focused on every corner of the house. The bathroom and kitchen were sparkling clean.",
  //       rating: 4.7,
  //       date: "2025-12-02",
  //       image: "https://randomuser.me/api/portraits/men/52.jpg",
  //     },
  //     {
  //       customer: "Sophia L.",
  //       comment:
  //         "Very friendly and hardworking cleaner. Noah organized everything neatly and made sure I was satisfied before leaving. His dedication really impressed me.",
  //       rating: 4.8,
  //       date: "2025-11-25",
  //       image: "https://randomuser.me/api/portraits/women/48.jpg",
  //     },
  //     {
  //       customer: "Jack R.",
  //       comment:
  //         "Noah provided excellent deep cleaning service. He removed stains and dust effectively and left the home feeling fresh and comfortable.",
  //       rating: 4.6,
  //       date: "2025-11-18",
  //       image: "https://randomuser.me/api/portraits/men/50.jpg",
  //     },
  //     {
  //       customer: "Isabella K.",
  //       comment:
  //         "Professional and polite cleaner. Noah listened carefully to my instructions and delivered exactly what I expected. Very satisfied with his work.",
  //       rating: 4.7,
  //       date: "2025-11-12",
  //       image: "https://randomuser.me/api/portraits/women/44.jpg",
  //     },
  //     {
  //       customer: "Ethan P.",
  //       comment:
  //         "Great attention to detail and very reliable service. Noah made sure every room was cleaned properly before finishing.",
  //       rating: 4.8,
  //       date: "2025-11-06",
  //       image: "https://randomuser.me/api/portraits/men/41.jpg",
  //     },
  //   ],
  // },
  //  {
  //   id: 12,
  //   profileImg: "https://randomuser.me/api/portraits/men/55.jpg",
  //   name: "Noah Williams",
  //   email: "noah.williams@example.com",
  //   workManage: 35,
  //   evaluation: 4.7,
  //   overallScore: 9.3,
  //   location: { city: "Sydney", country: "Australia" },
  //   workType: [{ type: "Home Cleaning" }, { type: "Deep Cleaning" }],
  //   serviceDescription: [
  //     { details: "Detailed cleaning of living rooms and bedrooms." },
  //     { details: "Removing stains and dust from all surfaces." },
  //   ],
  //   reviews: [
  //     {
  //       customer: "Daniel M.",
  //       comment:
  //         "Noah cleaned my apartment very thoroughly and professionally. He arrived on time and focused on every corner of the house. The bathroom and kitchen were sparkling clean.",
  //       rating: 4.7,
  //       date: "2025-12-02",
  //       image: "https://randomuser.me/api/portraits/men/52.jpg",
  //     },
  //     {
  //       customer: "Sophia L.",
  //       comment:
  //         "Very friendly and hardworking cleaner. Noah organized everything neatly and made sure I was satisfied before leaving. His dedication really impressed me.",
  //       rating: 4.8,
  //       date: "2025-11-25",
  //       image: "https://randomuser.me/api/portraits/women/48.jpg",
  //     },
  //     {
  //       customer: "Jack R.",
  //       comment:
  //         "Noah provided excellent deep cleaning service. He removed stains and dust effectively and left the home feeling fresh and comfortable.",
  //       rating: 4.6,
  //       date: "2025-11-18",
  //       image: "https://randomuser.me/api/portraits/men/50.jpg",
  //     },
  //     {
  //       customer: "Isabella K.",
  //       comment:
  //         "Professional and polite cleaner. Noah listened carefully to my instructions and delivered exactly what I expected. Very satisfied with his work.",
  //       rating: 4.7,
  //       date: "2025-11-12",
  //       image: "https://randomuser.me/api/portraits/women/44.jpg",
  //     },
  //     {
  //       customer: "Ethan P.",
  //       comment:
  //         "Great attention to detail and very reliable service. Noah made sure every room was cleaned properly before finishing.",
  //       rating: 4.8,
  //       date: "2025-11-06",
  //       image: "https://randomuser.me/api/portraits/men/41.jpg",
  //     },
  //   ],
  // },
  // …continue in same format for id 5 → 17
];
