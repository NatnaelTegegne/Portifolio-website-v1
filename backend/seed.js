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
      title: "Sentinel",
      description: "An AI-powered Anti-Money Laundering (AML) compliance system that automates adverse media screening for banking customers. Built for Tartan Hacks 2026, the platform uses autonomous AI agents to retrieve customer data, search global news sources, intelligently match identities, and generate structured risk verdicts with confidence scores and citations. The project emphasizes transparency, auditability, and false-positive reduction in compliance workflows.",
      tags: ["AI Agents", "FastAPI", "Next.js", "MCP", "LLMs", "FinTech", "Compliance"],
      codeLink: "https://github.com/vijay-raghav/tart-hacks", 
      demoLink: "https://sentinel-pi-steel.vercel.app/"
    },
    {
      title: "Panther AI Club Website",
      description: "I planned, designed, and built the official website for Panther AI Club at the University of Pittsburgh. The platform manages member data, supports registration, showcases events, blogs, and resources, and provides admin access to manage member information and club activities. This project strengthened my skills in full-stack development and building end-to-end web solutions.",
      tags: ["MongoDB", "Express", "React", "Node.js"],
      codeLink: "#", 
      demoLink: "#"
    },
    {
      title: "The Best Neighborhood in Pittsburgh",
      description: "A data-driven analysis to determine the best neighborhood to live in for families in Pittsburgh using datasets from WPRDC. I worked in a team of three, handling one of the datasets and contributing to the final conclusions. This project enhanced my data analysis, visualization, and collaborative research skills.",
      tags: ["Python", "Pandas", "Matplotlib"],
      codeLink: "https://github.com/NatnaelTegegne/The-best-neighborhood-in-Pittsburgh",
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