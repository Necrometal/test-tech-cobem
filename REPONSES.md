# Reponse au test technique

## Anomalie trouvé:

1. Donnée stats incohérent
  - Symptôme: Quand on change de category d'email, seul l'api liste message sait que l'email a été mise à jour mais l'api du stat ne sait pas
  - Cause: Etant donnée que l'api liste message et changement de category partage le même variable qui stocke les emails pour leur traitement, et que leurs api change seulement les valeurs dans ce variable, l'api de stats n'a pas accès à ce changement car notre base de données `message.json` n'a pas été update
  - Correction: J'ai fait en sorte que l'api de stat ait accès au flux du messages en utilisant le getAllMessage au lieu de reprendre via le Json
  - 40 min pour trouver et traiter l'anomalie,

2. Donnée en surplus dans le filtre de mail
  - Symptôme: Si on choisit `client` comme category de filtre, ca retourne aussi le mails avec category `client-vip` et `reclamation-client`
  - Cause: Le filtre utilisé check seulement le substring, non la valeur éxacte, car ici avec includes il verifie le text non un tableau de text ce qui entre en conflit avec la vérification
  - Correction: mettre `regex` pour checker le category
  - 30 min pour trouver, traiter l'anomalie et refactoriser le code

3. Login pas de validation
  - Symptômes: Si on ne met pas de `password` ou `email`, le retour reste `Identifiant invalides`, ce qui brise le côté UX même si c'est juste un api
  - Cause: le traitement n'a pas de traitement de validation de request pour les paramètres envoyés
  - Correction: Mettre un système de validation `email` et `password` pour l'UX
  - Techniques: utiliser `Zod` pour la validation, meme si on utilise pas typescript, l'utilisé ne changera rien en notre validation lorsqu'on switchera vers typescript
  - 20 min pour traiter l'anomalie

4. Classement mail pas de validation
  - Symptômes: Si on ne met pas de `category`, le retour reste `Catégorie invalide`, même context que dans le login
  - Cause: Le traitement check seulement si `category` existe mais ne check pas si l'user a bien envoyé une `category`
  - Correction: Mettre un système de validation `category` pour l'UX
  - Techniques: utiliser `Zod` pour la validation
  - 10min pour traiter l'anomalie

5. Pas de retour d'erreur propre si le traitement bug
  - Symptômes: Actuellement aucun mais si dans le futur le traitement change et que ca renvoi une erreur, cette erreur ne sera pas proprement traité
  - Cause: Aucun gestion d'erreur 
  - Correction: mettre en place un gestion d'erreur
  - Techniques: un `try{}catch{}` dans le controlleur pour intercepter les erreurs des traitement
  - l'anomalie est traité lors du traitement des autres

## Mise en place la protection des api

- En utilisant le middleware de next j'ai verifier si le token du `Bearer` existe
- En utilisant `jose` comme recommandé par Next.js dans sa documentation, cela me permet de verifier si le token est valide, précisement si le token a été créée avec notre clé JWT. Et vu qu'on a pas un system de mail specifique à l'utilisateur connecté, on avait pas besoin de verifier si l'utilisateur a droit sur un `api/messages` et `api/messages/:id/category` specifique

30min pour mettre en place la protection

## Mise en place dashboard

- J'ai utilisé tailwind pour faciliter la mise en forme des ui
- Le provider AuthGuard me permet de checker si le token existe en localstorage pour rediriger l'utilisateur vers la page attendu. Ex: si on est en login et qu'il y a un token, on va dans dashboard, vice versa. Pour ce qui est la verification exacte du token, notre intercepetor dans `apiFetch` nous permet de resoudre cela, car notre api renvoi deja si le token est invalid.
- J'ai utilisé Zustand pour mettre en global la gestion d'erreur, pour le moment c'est un erreur à la fois mais avec l'implementation on peut le changer facilement en multi erreur.
environ 6h pour mettre en place le dashboard fonctionnel et 1h de plus pour la verification de refactor et fix potentiel
    