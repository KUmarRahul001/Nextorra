/**
 * RahBot Contextual Call-to-Action (CTA) Decision Engine
 * Independently chooses the optimal action based on user intent and service resolution.
 */

import { BotIntent, CTAType, ResolvedService } from './types';

export interface CTADecision {
  type: CTAType;
  label?: string;
  action: 'open_form' | 'navigate' | 'none';
  targetRoute?: string;
}

export function decideCTA(intent: BotIntent, resolvedService: ResolvedService): CTADecision {
  const service = resolvedService.service;

  switch (intent) {
    case 'submit_enquiry':
      return {
        type: 'submit_enquiry',
        label: 'Submit Project Enquiry',
        action: 'open_form',
      };

    case 'consultation':
      return {
        type: 'consultation',
        label: 'Schedule Discovery Call',
        action: 'open_form',
      };

    case 'project_requirement':
      return {
        type: 'submit_enquiry',
        label: 'Submit Project Enquiry',
        action: 'open_form',
      };

    case 'internship':
      return {
        type: 'view_internships',
        label: 'Explore Internship Tracks',
        action: 'navigate',
        targetRoute: '/internship',
      };

    case 'service_information':
    case 'service_features':
      if (service) {
        return {
          type: 'view_service',
          label: `Explore ${service.name}`,
          action: 'navigate',
          targetRoute: service.route,
        };
      }
      return {
        type: 'none',
        action: 'none',
      };

    case 'pricing':
    case 'package_information':
      if (service) {
        return {
          type: 'view_pricing',
          label: `View ${service.name} Pricing`,
          action: 'navigate',
          targetRoute: service.route,
        };
      }
      return {
        type: 'none',
        action: 'none',
      };

    case 'technology_stack':
      if (service) {
        return {
          type: 'view_service',
          label: `Learn More About ${service.name}`,
          action: 'navigate',
          targetRoute: service.route,
        };
      }
      return {
        type: 'none',
        action: 'none',
      };

    case 'service_discovery':
      return {
        type: 'navigation',
        label: 'View All Services',
        action: 'navigate',
        targetRoute: '/services',
      };

    case 'navigation':
      if (service) {
        return {
          type: 'navigation',
          label: `Go to ${service.name}`,
          action: 'navigate',
          targetRoute: service.route,
        };
      }
      return {
        type: 'navigation',
        label: 'Explore Services',
        action: 'navigate',
        targetRoute: '/services',
      };

    default:
      return {
        type: 'none',
        action: 'none',
      };
  }
}
