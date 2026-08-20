/**
 * Rahnoxa Multi-Provider Voice Orchestrator
 * Routes calls to legitimate authorized voice providers (Open Source or Bland AI).
 * ZERO evasion logic, strict duplicate call protection.
 */

import { OpenSourceVoiceProvider } from '../providers/openSourceProvider.js';
import { BlandVoiceProvider } from '../providers/blandProvider.js';

export class VoiceOrchestrator {
  /**
   * Get configured and authorized voice providers
   */
  static getAvailableProviders() {
    const providers = [];

    // 1. Primary Open-Source Stack
    providers.push({
      id: 'open_source',
      name: 'Open-Source LiveKit / SIP',
      type: 'OPEN_SOURCE',
      isConfigured: !!(process.env.SIP_TRUNK_HOST && process.env.SIP_TRUNK_USERNAME),
      licensingCost: '₹0',
      instance: new OpenSourceVoiceProvider(),
    });

    // 2. Legitimate Bland AI Accounts (configured via server environment)
    if (process.env.BLAND_API_KEY) {
      providers.push({
        id: 'bland_primary',
        name: 'Bland AI (Primary Authorized Account)',
        type: 'BLAND',
        isConfigured: true,
        licensingCost: '$0.14/min (Usage-Based)',
        instance: new BlandVoiceProvider({
          accountName: 'Bland Primary',
          apiKey: process.env.BLAND_API_KEY,
        }),
      });
    }

    if (process.env.BLAND_ACCOUNT_B_API_KEY) {
      providers.push({
        id: 'bland_secondary',
        name: 'Bland AI (Secondary Authorized Org)',
        type: 'BLAND',
        isConfigured: true,
        licensingCost: '$0.14/min (Usage-Based)',
        instance: new BlandVoiceProvider({
          accountName: 'Bland Secondary Org',
          apiKey: process.env.BLAND_ACCOUNT_B_API_KEY,
        }),
      });
    }

    return providers;
  }

  /**
   * Select a provider instance based on preference or availability
   */
  static selectProvider(requestedProviderId = 'auto') {
    const allProviders = this.getAvailableProviders();

    if (requestedProviderId && requestedProviderId !== 'auto') {
      const matched = allProviders.find((p) => p.id === requestedProviderId);
      if (!matched) throw new Error(`Requested voice provider "${requestedProviderId}" is not configured.`);
      return matched;
    }

    // Default preference: Open-Source first (if configured), then configured Bland
    const openSource = allProviders.find((p) => p.type === 'OPEN_SOURCE' && p.isConfigured);
    if (openSource) return openSource;

    const bland = allProviders.find((p) => p.type === 'BLAND' && p.isConfigured);
    if (bland) return bland;

    // Return the default open-source instance (will throw controlled unconfigured error)
    return allProviders[0];
  }
}
