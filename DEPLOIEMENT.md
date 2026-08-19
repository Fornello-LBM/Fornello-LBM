# Mettre le site Fornello en ligne (gratuit)

Ce site est déjà entièrement prêt : design, menu complet, back office inclus.
Il ne reste que la mise en ligne, en 4 étapes. Aucune ligne de code à écrire.

## 1. Créer un compte GitHub (gratuit)
- Va sur https://github.com et crée un compte.
- Crée un nouveau dépôt (bouton vert "New"), nomme-le par exemple `fornello-site`,
  laisse-le en "Public", ne coche aucune case, clique "Create repository".
- Sur la page qui s'affiche, clique "uploading an existing file" et glisse-dépose
  **tous les fichiers et dossiers** de ce projet (index.html, styles.css, script.js,
  les dossiers `content/`, `images/`, `admin/`). Valide avec "Commit changes".

## 2. Connecter le dépôt à Netlify (gratuit)
- Va sur https://app.netlify.com et crée un compte (tu peux te connecter
  directement avec ton compte GitHub, c'est le plus simple).
- Clique "Add new site" → "Import an existing project" → "GitHub" → choisis
  ton dépôt `fornello-site`.
- Laisse les réglages par défaut (aucun build nécessaire, c'est un site statique),
  clique "Deploy site".
- Après une minute, ton site est en ligne avec une adresse du type
  `fornello-xxxxx.netlify.app`. Tu peux la renommer dans "Site settings" →
  "Change site name".

## 3. Activer le back office (Netlify Identity + Git Gateway)
- Dans ton site Netlify, va dans l'onglet "Identity" → "Enable Identity".
- Toujours dans Identity, va dans "Settings" → sous "Registration",
  choisis "Invite only" (pour que seul toi puisses te connecter).
- Descends jusqu'à "Services" → "Git Gateway" → clique "Enable Git Gateway".
- Retourne dans l'onglet "Identity" → "Invite users" → entre ton adresse email.
  Tu recevras un mail pour définir ton mot de passe.

## 4. Se connecter au back office
- Va sur `tonsite.netlify.app/admin/`
- Connecte-toi avec l'email et le mot de passe définis à l'étape précédente
- Tu arrives sur l'interface du back office : tu peux modifier les plats, les prix,
  les descriptions, ajouter des photos, et remplir la section Focaccia quand tu seras prêt
- Chaque modification "publiée" met le site à jour automatiquement en 1 à 2 minutes

## Nom de domaine personnalisé (optionnel, ~10€/an)
Si tu veux `fornello-leblancmesnil.fr` au lieu de `xxxxx.netlify.app` :
1. Achète le nom de domaine chez OVH (ou un autre registrar)
2. Dans Netlify : "Domain settings" → "Add a domain" → entre ton nom de domaine
3. Netlify te donne 2-4 lignes à copier-coller dans les "zones DNS" de ton compte OVH
4. Attends quelques heures que ça se propage — aucune autre manipulation nécessaire

---
Si tu bloques à une étape, envoie-moi une capture d'écran, je t'aide à débloquer.
