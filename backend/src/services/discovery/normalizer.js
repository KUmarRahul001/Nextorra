/**
 * RAHNOXA Business Data Normalization & Validation Utility
 */

export function normalizeBusinessName(name) {
  if (!name || typeof name !== 'string') return '';
  return name.trim().replace(/\s+/g, ' ');
}

export function normalizePhone(rawPhone) {
  if (!rawPhone || typeof rawPhone !== 'string') return null;
  const digits = rawPhone.replace(/\D/g, '');
  if (!digits) return null;
  
  if (digits.length === 10) {
    return `+91${digits}`;
  } else if (digits.length === 11 && digits.startsWith('0')) {
    return `+91${digits.slice(1)}`;
  } else if (digits.length === 12 && digits.startsWith('91')) {
    return `+${digits}`;
  }
  return rawPhone.trim();
}

export function normalizeEmail(email) {
  if (!email || typeof email !== 'string') return null;
  const cleaned = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(cleaned) ? cleaned : null;
}

export function extractCanonicalDomain(url) {
  if (!url || typeof url !== 'string') return null;
  try {
    const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
    return parsed.hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    return url.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0].toLowerCase();
  }
}

export function normalizeCity(city) {
  if (!city || typeof city !== 'string') return 'Jamshedpur';
  return city.trim().charAt(0).toUpperCase() + city.trim().slice(1).toLowerCase();
}
