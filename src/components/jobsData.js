import company from '../assets/companyLogo.png'
const jobsData = [
  {
    id: 1,
    title: "Technical Support Specialist",
    type: "PART-TIME",
    salary: "$ 20,000 - $ 25,000",
    company: "Google Inc.",
    location: "Lahore, PAK",
    applicants: 10,
    logo: { company },
  },
  {
    id: 2,
    title: "Senior UI/UX Designer",
    type: "FULL-TIME",
    salary: "$ 30,000 - $ 55,000",
    company: "Apple",
    location: "Lahore, PAK",
    applicants: 9,
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
  {
    id: 3,
    title: "Marketing Officer",
    type: "PART-TIME",
    salary: "$ 15,000 - $ 35,000",
    company: "Intel Corp",
    location: "Lahore, PAK",
    applicants: 30,
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Intel-logo.svg",
  },
];

export default jobsData;
