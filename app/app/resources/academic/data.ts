export interface AcademicResource {
  title: string;
  authors: string;
  year: number;
  link: string;
  citations: number;
  topic: 'methodology' | 'urbanPlanning' | 'climateScience' | 'technology';
  keywords?: string[];
}

export const academicResources: AcademicResource[] = [
  {
    title: "Two decades of urban climate research: a review of turbulence, exchanges of energy and water, and the urban heat island",
    authors: "Arnfield, J.A.",
    year: 2003,
    link: "https://www.urbanheatislands.com/bibliography",
    citations: 544,
    topic: "methodology",
    keywords: ["review", "turbulence", "energy exchange"]
  },
  {
    title: "Urban heat island research from 1991 to 2015: a bibliometric analysis",
    authors: "Huang, Q. and Lu, Y.",
    year: 2018,
    link: "https://www.urbanheatislands.com/bibliography",
    citations: 137,
    topic: "methodology",
    keywords: ["bibliometric", "research trends"]
  },
  {
    title: "The energetic basis of the urban heat island",
    authors: "Oke, T.R.",
    year: 1982,
    link: "https://www.urbanheatislands.com/bibliography",
    citations: 2313,
    topic: "climateScience",
    keywords: ["energy balance", "fundamental theory"]
  },
  {
    title: "Analysis of urban heat-island effect using ASTER and ETM+ data",
    authors: "Kato, S. and Yamaguchi, Y.",
    year: 2005,
    link: "https://www.urbanheatislands.com/bibliography",
    citations: 234,
    topic: "technology",
    keywords: ["remote sensing", "satellite data"]
  },
  {
    title: "Urban form and thermal efficiency: how the design of cities influences the urban heat island",
    authors: "Stone, B. and Rodgers, M.",
    year: 2001,
    link: "https://www.urbanheatislands.com/bibliography",
    citations: 231,
    topic: "urbanPlanning",
    keywords: ["urban design", "thermal efficiency"]
  },
  {
    title: "Disproportionate exposure to urban heat island intensity across major US cities",
    authors: "Hsu, A., Sheriff, G., Chakraborty, T.",
    year: 2021,
    link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8149665/",
    citations: 54,
    topic: "urbanPlanning",
    keywords: ["environmental justice", "exposure"]
  },
  {
    title: "Urban Heat Islands during Heat Waves: A Comparative Study",
    authors: "Various",
    year: 2023,
    link: "https://journals.ametsoc.org/view/journals/apme/60/5/JAMC-D-20-0132.1.xml",
    citations: 23,
    topic: "climateScience",
    keywords: ["heat waves", "comparative analysis"]
  },
  {
    title: "The urban heat island effect, its causes, and mitigation",
    authors: "Various",
    year: 2017,
    link: "https://pubmed.ncbi.nlm.nih.gov/28412623/",
    citations: 201,
    topic: "methodology",
    keywords: ["mitigation", "causes"]
  },
  {
    title: "Monitoring patterns of urban heat islands of the fast-growing Shanghai metropolis",
    authors: "Li, Y-Y., Zhang, H. and Kainz, W.",
    year: 2012,
    link: "https://www.urbanheatislands.com/bibliography",
    citations: 106,
    topic: "technology",
    keywords: ["monitoring", "urban growth"]
  },
  {
    title: "Exploring Urban Forms Vulnerable to Urban Heat Islands",
    authors: "Kang, Seungwon, et al.",
    year: 2022,
    link: "https://www.grafiati.com/en/literature-selections/urban-heat-island/",
    citations: 17,
    topic: "urbanPlanning",
    keywords: ["urban form", "vulnerability"]
  }
];