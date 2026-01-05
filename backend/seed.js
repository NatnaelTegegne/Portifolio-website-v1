require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project'); // Import the blueprint

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB for Seeding'))
  .catch((err) => console.log('❌ Error:', err));

// The Data we want to upload
const projects = [
    {
      title: "Polar H10 ECG Arrhythmia Detector",
      description: "A real-time ECG monitoring application that streams live cardiac data from Polar H10 chest straps.",
      tags: ["Next.js", "TypeScript", "Expo", "Python"],
      codeLink: "https://github.com/yourusername/project1", 
      demoLink: "#"
    },
    {
      title: "SOLUSDT Signal Bot",
      description: "A custom algorithmic trading system for Solana using custom signals and BTCUSDT price context.",
      tags: ["Python", "Pandas", "Matplotlib", "Crypto"],
      codeLink: "#",
      demoLink: "#"
    },
    {
      title: "GoCoachly",
      description: "GoCoachly helps high-ticket coaches scale by automating workflows and surfacing personalized insights.",
      tags: ["Next.js", "Supabase", "Tailwind CSS"],
      codeLink: "#",
      demoLink: "#"
    },
    {
      title: "MyTerminal Project",
      description: "GoCoachly helps high-ticket coaches scale by automating workflows and surfacing personalized insights.",
      tags: ["Next.js", "Supabase", "Tailwind CSS"],
      codeLink: "#",
      demoLink: "#"
    }
];

// The "Seed" Logic
const seedDB = async () => {
  try {
    // 1. Clear existing data (So we don't get duplicates if we run this twice)
    await Project.deleteMany({});
    console.log('🧹 Old data cleared...');

    // 2. Insert new data
    await Project.insertMany(projects);
    console.log('🌱 Projects Added Successfully!');
    
    // 3. Close connection
    mongoose.connection.close();
    console.log('🔌 Connection Closed');
  } catch (err) {
    console.log('❌ Error seeding:', err);
  }
};

seedDB();