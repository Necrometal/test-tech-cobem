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
- Le provider AuthGuard me permet de checker si le token existe en localstorage pour rediriger l'utilisateur vers la page attendu. Ex: si on est en login et qu'il y a un token, on va dans dashboard, vice versa. Pour ce qui est la verification exacte du token, notre intercepetor dans `apiFetch` nous permet de resoudre cela en verifiant le status et l'existence du token, car notre api renvoi deja si le token est invalid; il suffit juste de le traiter et de renvoyer dans le login si invalid.
- J'ai utilisé Zustand pour mettre en global la gestion d'erreur, pour le moment c'est un erreur à la fois mais avec l'implementation on peut le changer facilement en multi erreur. Ce store global nous permet d'utiliser un seul composant pour afficher les erreurs des apis.
- Tanstack Query pour consommer les apis, ce package permet de mieux gerer les caches (si besoin), facile a declencher un refetch lors d'une manipulation, ex dans la classification de mail, pas besoin de trigger manuellement les fetchs des stats et mail, avec le `onSuccess` de la mutation on réussi a redeclencher ces fetchs sans utiliser des contexts ou variable globales.
- Un composant `PageLoader` pour afficher un loader de recuperation de la liste des messages

environ 6h pour mettre en place le dashboard fonctionnel et 1h de plus pour la verification de refactor et fix potentiel
    

## Question architecture

- Pour le versioning, vu que la mise à jour depend de l'utilisateur, faudrait un endpoint pour checker s'il y a une mise à jour et versioner les endpoints. Ex: /api/v1 , /api/v2. Cela permet au l'ancienne version de toujours marcher. 
- L'endpoint de checking permettra aussi d'indiquer à l'utilisateur que sa version sera obselète et qu'il faut qu'il met à jours son application
- Pour l'auth, le system JWT et Bearer token marche sur tout plateforme que ce soit mobile, web, desktop. le seul hic c'est la durée, dans une application desktop etre déconnecté toutes les 2h n'est pas user friendly, il y a deux options:
  * mettre la durée tres longue, mais aura une faille de sécurité. 
  * mettre un system de `refresh token`, qui est le plus plausible, l'utilisateur ne sera pas déconnecté alors que son token change tous les 2h
- Pour le `CORS`, c'est plustôt spécifique au navigateur qui utilise Js, dont une application d'un origine A appel un api d'origine B, `CORS` est un règle qui permet au navigateur qui fetch l'api s'il a le droit ou pas. Par contre sur un application desktop native qui n'utilise pas de `browser engine`, ca ne s'appliquera pas. Mais vu que notre api est possible d'être consummer par un navigateur, il faudra toujours mettre des CORS permissives qui donnera permission sur certains domaines qui le consommera
- Actuellement notre api n'a pas de limitation dans les call api, avec le web l'api reste dans notre serveur mais pour les desktop, quiconque qui s'y connait en reverse enginering ou quelqu'un qui possède le endpoint peut en abuser. Donc il faudra mettre des `throttle` et des `limites` d'appelle api par token, ip ou autre forme d'identification d'un appel api
- En ce moment notre gestion erreur retourne different type d'erreur qui n'a pas de generalisation des codes, qui provoquera un traitement compliqué des erreurs. En utilisant des codes, par exemple '`INVALID_TOKEN`', le consommateur verifira juste ce code pour qu'il sache quel genre d'erreur il doit traiter. Sur le web on peut mettre à jour manuellement même s'il n'y a pas ce code mais sur desktop, on ne peut pas controler la mise à jour, l'erreur pourra changer qui va faire crash l'application. Avec le code on peut juste generaliser le traitement d'erreur qui ne bloquera pas les applications.