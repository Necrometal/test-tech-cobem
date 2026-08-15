/**
 * change l'input du requet en text sure pour eviter les changement faitent par des attaques
 */
export function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}