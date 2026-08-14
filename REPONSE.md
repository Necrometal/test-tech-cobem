# Reponse au test technique

## Anomalie trouvé:

1. Donnée stats incohérent
  - Symptôme: Quand on chande de category d'email, seul l'api liste message sait que l'email a été mise à jour
  - Cause: Etant donnée que l'api liste message et changement de category partage le même variable qui stocke les emails pour leur traitement, et que leurs api change seulement les valeurs dans ce variable, l'api de stats n'a pas accès à ce changement car notre base de données `message.json` n'a pas été update
  - Correction: créer une variable globale pour que chaque api de traitement de message ait accès au changement de données (en se basant juste que le store sera reinitialiser à chaque redémarrage)

2. Donnée en surplus dans le filtre de mail
  - Symptôme: Si on choisit `client` comme category de filtre, ca retourne aussi le mails avec category `client-vip` et `reclamation-client`
  - Cause: Le filtre utilisé check seulement le substring, non la valeur éxacte
  - Correction: mettre `regex` pour checker le category

3. Login pas de validation
  - Symptômes: Si on ne met pas de `password` ou `email`, le retour reste `Identifiant invalides`, ce qui brise le côté UX même si c'est juste un api
  - Cause: le traitement n'a pas de traitement de request pour les paramètres envoyés
  - Correction: Mettre un système de validation `email` et `password` pour l'UX
  - Techniques: utiliser `Zod` pour la validation

4. Classement mail pas de validation
  - Symptômes: Si on ne met pas de `category`, le retour reste `Catégorie invalide`, même context que dans le login
  - Cause: Le traitement check seulement si `category` existe mais ne check pas si l'user a bien envoyé une `category`
  - Correction: Mettre un système de validation `category` pour l'UX
  - Techniques: utiliser `Zod` pour la validation

5. Pas de retour d'erreur propre si le traitement bug
  - Symptômes: Actuellement aucun mais si dans le futur le traitement change et que ca renvoi une erreur, cette erreur ne sera pas proprement traité
  - Cause: Aucun gestion d'erreur 
  - Correction: mettre en place un gestion d'erreur
  - Techniques: un `try{}catch{}` dans le controlleur pour intercepter les erreurs des traitement
    