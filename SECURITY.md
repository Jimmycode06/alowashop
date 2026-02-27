# Audit de sécurité — ALOWA

Dernière révision : février 2025.

## Résumé

- **Secrets** : bien protégés (`.env` ignoré, clés Stripe côté serveur uniquement).
- **Checkout** : les prix sont désormais validés côté serveur (catalogue produit) pour éviter la manipulation du panier.
- **En-têtes de sécurité** : activés dans `next.config.js`.
- **Dépendances** : `npm audit` signale une vulnérabilité Next.js ; mise à jour majeure recommandée quand possible.

---

## 1. Secrets et variables d’environnement

| Élément | Statut |
|--------|--------|
| `.env`, `.env*.local` dans `.gitignore` | OK |
| Clé Stripe secrète (`STRIPE_SECRET_KEY`) | Utilisée uniquement dans l’API route `/api/checkout` (côté serveur) |
| `NEXT_PUBLIC_*` | Seulement `NEXT_PUBLIC_BASE_URL` (et optionnellement la clé publishable Stripe) — pas de secret exposé |
| Meta Pixel ID | Dans le layout (public par nature, acceptable pour le tracking) |

**Recommandation** : Ne jamais committer de fichier `.env` ou `.env.local`. Utiliser les variables d’environnement Vercel en production.

---

## 2. API Checkout (Stripe)

| Risque | Mesure |
|--------|--------|
| Manipulation des prix par le client | Catalogue produit côté serveur dans `/api/checkout/route.ts` : seuls les IDs et prix définis en dur sont acceptés. Les prix envoyés par le client sont ignorés. |
| Panier vide / corps invalide | Vérification de `items` (tableau non vide, champs requis). |
| Quantité abusive | Quantité bornée entre 1 et 10. |
| Produit inconnu | Rejet si l’ID ne correspond pas au catalogue serveur. |

**Recommandation** : Si vous ajoutez des produits ou changez les prix, mettre à jour le catalogue `PRODUCT_CATALOG` (et la fonction `getServerPrice`) dans `app/api/checkout/route.ts`.

---

## 3. En-têtes HTTP de sécurité

Configurés dans `next.config.js` pour toutes les routes :

- **X-Frame-Options: DENY** — limite le clickjacking.
- **X-Content-Type-Options: nosniff** — évite le MIME sniffing.
- **Referrer-Policy: strict-origin-when-cross-origin** — contrôle l’envoi du Referer.

**Optionnel** : Pour renforcer encore, vous pouvez ajouter une Content-Security-Policy (CSP) après avoir vérifié que Meta Pixel et Stripe sont autorisés.

---

## 4. XSS et injection

- Pas d’utilisation de `dangerouslySetInnerHTML`, `eval`, ou `innerHTML` repérée.
- Les données utilisateur (nom produit, couleur) sont utilisées pour le libellé Stripe ; les champs sont contrôlés (IDs/options connus côté client). Le catalogue serveur limite les noms aux produits connus.

---

## 5. Dépendances

Exécuter régulièrement :

```bash
npm audit
```

Actuellement, une vulnérabilité **high** sur Next.js (DoS Image Optimizer / RSC) est signalée. La correction proposée peut imposer une mise à jour majeure (`npm audit fix --force`). À traiter lors d’une montée de version planifiée (tests complets avant déploiement).

---

## 6. Bonnes pratiques à conserver

- Stripe Checkout : pas de carte traitée sur votre site, tout passe par Stripe (PCI-DSS délégué à Stripe).
- Pas de webhook Stripe pour l’instant : si vous en ajoutez plus tard, **vérifier la signature** avec `STRIPE_WEBHOOK_SECRET` avant de traiter l’événement.
- Page de succès : le `session_id` dans l’URL pourrait être vérifié côté serveur en récupérant la session Stripe pour confirmer le paiement (renforcement optionnel).

---

## Checklist rapide

- [x] Secrets hors du dépôt
- [x] Prix checkout validés côté serveur
- [x] En-têtes de sécurité (X-Frame-Options, X-Content-Type-Options, Referrer-Policy)
- [x] Pas de XSS évident (pas de dangerouslySetInnerHTML / eval)
- [ ] `npm audit` à traiter (mise à jour Next.js)
- [ ] Si webhook Stripe : vérification de la signature
