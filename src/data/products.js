export const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Laptop",
    khmerName: "កុំព្យូទ័រយួរដៃ (Laptop)",
    price: 650,
    category: "Computers",
    khmerCategory: "កុំព្យូទ័រ",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80",
    description: "High performance laptop with fast processor, 16GB RAM, 512GB SSD for work and gaming.",
    rating: 4.8,
    reviews: 124,
    stock: 12
  },
  {
    id: 2,
    name: "Mouse",
    khmerName: "កណ្ដុរ (Mouse)",
    price: 15,
    category: "Accessories",
    khmerCategory: "គ្រឿងបន្លាស់",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80",
    description: "Ergonomic wireless mouse with silent clicks and high precision optical sensor.",
    rating: 4.6,
    reviews: 89,
    stock: 45
  },
  {
    id: 3,
    name: "Keyboard",
    khmerName: "ក្តារចុច (Keyboard)",
    price: 25,
    category: "Accessories",
    khmerCategory: "គ្រឿងបន្លាស់",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
    description: "RGB backlit mechanical keyboard with comfortable tactile switches and durable keycaps.",
    rating: 4.7,
    reviews: 96,
    stock: 30
  },
  {
    id: 4,
    name: "Monitor",
    khmerName: "អេក្រង់កុំព្យូទ័រ (Monitor)",
    price: 120,
    category: "Displays",
    khmerCategory: "អេក្រង់",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80",
    description: "24-inch Full HD IPS monitor with 75Hz refresh rate, ultra-slim bezels, and eye-care tech.",
    rating: 4.9,
    reviews: 158,
    stock: 18
  }
];

export const SHIPPING_METHODS = [
  {
    id: "standard",
    name: "Standard Delivery",
    khmerName: "ដឹកជញ្ជូនធម្មតា",
    price: 5.0,
    time: "3-5 Business Days",
    description: "Reliable standard postal delivery"
  },
  {
    id: "express",
    name: "Express Delivery",
    khmerName: "ដឹកជញ្ជូនរហ័ស",
    price: 15.0,
    time: "1-2 Business Days",
    description: "Fast express courier delivery to your doorstep"
  },
  {
    id: "pickup",
    name: "Store Pickup",
    khmerName: "មកយកនៅហាងផ្ទាល់",
    price: 0.0,
    time: "Same Day (Available in 2 hrs)",
    description: "Free pickup at our central showroom"
  }
];
