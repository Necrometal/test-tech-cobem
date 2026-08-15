import { VALID_CATEGORIES } from "@/constantes";
import raw from "@/data/messages.json";
import { escapeRegExp } from "./utils";

export { VALID_CATEGORIES };

// Store en mémoire : les données sont chargées depuis le fichier JSON au démarrage.
// (Pas de base de données pour ce projet — le store est réinitialisé à chaque redémarrage.)

let messages = raw.map((m) => ({ ...m }));

export function getAllMessages() {
  return messages;
}

export function getMessageById(id) {
  return messages.find((m) => m.id === id) || null;
}

export function updateMessageCategory(id, category) {
  let updated = null;
  messages = messages.map((m) => {
    if (m.id === id) {
      updated = { ...m, category };
      return updated;
    }
    return m;
  });
  return updated;
}

/**
 * mettre la recuperation de stat dans le meme store
 * la methode aura acces aux flux de changement des messages
 * et aussi pour ne pas surcharger le controller de traitement
 */
export function getStats(){
  const stats = {};

  for (const message of messages) {
    stats[message.category] = (stats[message.category] || 0) + 1;
  }

  return {
    total: messages.length,
    byCategory: stats,
  }
}

/**
 * mettre le filtre dans une autre methode de traitement
 * pour eviter que le controller sois surcharger quand le filtre va augmenter en traitement
 **/ 
export function filterMail(messages, category){
  const pattern = new RegExp(`^${escapeRegExp(category)}$`, "i");
  return messages.filter((m) => pattern.test(m.category));
}

/**
 * mettre le sort dans une autre methode de traitement
 * pour eviter que le controller sois surcharger quand le sort va augmenter en traitement
 */
export function sortMail(messages){
  return [...messages].sort(
    (a, b) => new Date(b.receivedAt) - new Date(a.receivedAt)
  );
}

