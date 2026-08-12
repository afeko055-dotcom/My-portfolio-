export type ProjectStatus = 'LIVE' | 'BETA' | 'DEVELOPMENT' | 'CONCEPT' | 'ARCHIVED';

export type ProjectOrigin = 
  | 'Client Project' 
  | 'Personal Project' 
  | 'Independent Product' 
  | 'Open-Source Project' 
  | 'Experimental Project' 
  | 'Concept Project';

export type CategoryId = 
  | 'websites'
  | 'apps'
  | 'mobile'
  | 'ai'
  | 'saas'
  | 'business-systems'
  | 'games'
  | 'tools'
  | 'interactive'
  | 'services'
  | 'about'
  | 'contact'
  | 'privacy';

export interface CaseStudy {
  challenge: string;
  solution: string;
  results: string[];
  metrics?: { label: string; value: string }[];
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  category: CategoryId;
  subcategory?: string;
  description: string;
  longDescription: string;
  status: ProjectStatus;
  projectOrigin: ProjectOrigin;
  featured: boolean;
  technologies: string[];
  features: string[];
  screenshots?: string[];
  gallery?: string[];
  demoUrl?: string;
  internalRoute: string;
  downloadUrl?: string;
  platform?: string;
  version?: string;
  requirements?: string;
  caseStudy?: CaseStudy;
  createdAt?: string;
  updatedAt?: string;
  // Interactive component identifier for live embedded view inside viewer
  interactiveType?: 
    | 'automotive-platform'
    | 'law-firm-platform'
    | 'restaurant-platform'
    | 'real-estate-platform'
    | 'school-platform'
    | 'hotel-platform'
    | 'ecommerce-platform'
    | 'crm-app'
    | 'inventory-app'
    | 'appointment-app'
    | 'project-app'
    | 'invoice-app'
    | 'helpdesk-app'
    | 'ai-business-suite'
    | 'ai-developer-suite'
    | 'ai-content-studio'
    | 'ai-product-design'
    | 'ai-education'
    | 'ai-career'
    | 'ai-research-agent'
    | 'game-endless-runner'
    | 'game-space-shooter'
    | 'game-platformer'
    | 'game-tower-defense'
    | 'game-math'
    | 'game-racing'
    | 'tool-json-formatter'
    | 'tool-regex-tester'
    | 'tool-palette'
    | 'tool-password'
    | 'tool-markdown'
    | 'tool-notes-kanban'
    | 'interactive-vehicle-3d'
    | 'interactive-virtual-showroom';
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  type?: 'contact' | 'lead' | 'quote';
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

export interface AnalyticsData {
  totalViews: number;
  totalDownloads: number;
  totalLeads: number;
  projectViews: Record<string, number>;
  recentActivity: Array<{ id: string; type: string; details: string; timestamp: string }>;
}
