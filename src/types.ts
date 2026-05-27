export type ThemeType = 'light' | 'dark';

export interface PortfolioProject {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  imageUrl: string;
  description: string;
  details: {
    discipline: string;
    precision: string;
    luxury: string;
  };
  gridAspect: string;
}

export interface InquiryFormState {
  fullName: string;
  emailAddress: string;
  companyName: string;
  projectDescription: string;
  interestArea: 'layouts' | 'accents' | 'layering' | 'general';
}
