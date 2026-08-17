/**
 * Portfolio / Projects data — Nextorra
 *
 * These are demonstration items used to showcase capabilities while real
 * client projects are being built. They are intentionally marked as demo
 * work and must NOT be presented as completed client deliverables.
 *
 * Replace with real project data as it becomes available.
 */

export type ProjectCategory =
  | 'Web App'
  | 'Mobile App'
  | 'Website'
  | 'Design'
  | 'Marketing';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  tags: string[];
  description: string;
  /** If true, this is a demonstration/capability showcase, not a real client project. */
  isDemo: boolean;
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
  year?: number;
  featured: boolean;
}

// ---------------------------------------------------------------------------
// Demo showcase items
// These are illustrative capability demonstrations, not client projects.
// ---------------------------------------------------------------------------

import projectImage from '../components/assets/image.png';
import CamepineImage from '../components/assets/campeing_.png';
import TechStartupImage from '../components/assets/Tech_Startup_Branding.png';
import FitnessTrackerImage from '../components/assets/Fitness_tracking.png';
import ResturantImage from '../components/assets/resturant.png';
import CataLogProImage from '../components/assets/catalogPro.png';

export const projects: Project[] = [
  {
    id: 'ecommerce-ui-demo',
    title: 'E-commerce Platform UI',
    category: 'Web App',
    tags: ['UI/UX', 'React', 'Node.js'],
    description: 'A demonstration of a responsive e-commerce interface with product listing and checkout flows.',
    isDemo: true,
    images: [projectImage],
    featured: true,
  },
  {
    id: 'fashion-campaign-demo',
    title: 'Fashion Brand Campaign',
    category: 'Marketing',
    tags: ['Social Media', 'Content Strategy', 'Analytics'],
    description: 'Sample social media campaign creative and strategy for a fashion retail brand.',
    isDemo: true,
    images: [CamepineImage],
    featured: false,
  },
  {
    id: 'startup-branding-demo',
    title: 'Tech Startup Branding',
    category: 'Design',
    tags: ['Branding', 'Logo Design', 'Style Guide'],
    description: 'Demonstration of a complete brand identity package for a technology startup.',
    isDemo: true,
    images: [TechStartupImage],
    featured: true,
  },
  {
    id: 'fitness-app-demo',
    title: 'Fitness Tracking App',
    category: 'Mobile App',
    tags: ['React Native', 'Firebase', 'UX Design'],
    description: 'A mobile app UI demonstration for activity and fitness tracking across Android and iOS.',
    isDemo: true,
    images: [FitnessTrackerImage],
    featured: true,
  },
  {
    id: 'restaurant-website-demo',
    title: 'Restaurant Website',
    category: 'Website',
    tags: ['Next.js', 'Tailwind CSS', 'Responsive Design'],
    description: 'Responsive website concept for a restaurant, including menu and reservation flow.',
    isDemo: true,
    images: [ResturantImage],
    featured: false,
  },
  {
    id: 'catalog-design-demo',
    title: 'Product Catalogue Design',
    category: 'Design',
    tags: ['Print Design', 'Digital', 'Brand Identity'],
    description: 'Demonstration of print and digital product catalogue design and layout.',
    isDemo: true,
    images: [CataLogProImage],
    featured: false,
  },
];

/** Projects suitable for the homepage featured section. */
export const featuredProjects = projects.filter((p) => p.featured);

/**
 * Categories available for filtering in the portfolio section.
 * 'All' is always prepended at runtime in the component.
 */
export const projectCategories: ProjectCategory[] = [
  'Web App',
  'Mobile App',
  'Website',
  'Design',
  'Marketing',
];
