# 📞 Guide du Formulaire de Contact - Sicher Tech

## Informations de Contact

### 📱 WhatsApp
- **Numéro**: 407-393-7460
- **Lien direct**: https://wa.me/14073937460
- **Usage**: Chat instantané, support rapide

### ☎️ Téléphone
- **Numéro**: 407-225-4688
- **Lien direct**: tel:+14072254688
- **Usage**: Appels directs, consultations

### 📧 Email
- **Adresse**: info@sichertech.com
- **Usage**: Demandes détaillées, documents

### 📍 Localisation
- **Ville**: Orlando, Florida
- **Pays**: États-Unis

---

## 📋 Formulaire de Contact

### Champs du Formulaire

#### Informations Personnelles (Obligatoires)
1. **Prénom** - Minimum 2 caractères
2. **Nom** - Minimum 2 caractères
3. **Email** - Format email valide
4. **Téléphone** - Format téléphone valide (10+ chiffres)

#### Informations Projet (Obligatoires)
5. **Service Intéressé**:
   - Web Development
   - App Development
   - AI Chatbots
   - Automation & CRM
   - Digital Marketing
   - Consulting
   - Other

6. **Budget du Projet**:
   - Under $5,000
   - $5,000 - $10,000
   - $10,000 - $25,000
   - $25,000 - $50,000
   - Over $50,000

7. **Délai du Projet**:
   - Urgent (1-2 weeks)
   - Normal (1-2 months)
   - Flexible (3+ months)
   - Just Planning

8. **Détails du Projet** - Minimum 10 caractères

#### Informations Optionnelles
9. **Nom de l'Entreprise** - Optionnel
10. **Newsletter** - Checkbox optionnel
11. **Conditions d'utilisation** - Checkbox obligatoire

---

## 💾 Système de Sauvegarde

### LocalStorage
Les soumissions sont **automatiquement sauvegardées** dans le navigateur (localStorage):
- ✅ Stockage local sécurisé
- ✅ Pas besoin de serveur
- ✅ Accessible hors ligne
- ✅ Conservation jusqu'à 50 soumissions

### Structure des Données
```javascript
{
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  phone: "407-123-4567",
  company: "Example Inc",
  service: "web-development",
  budget: "10k-25k",
  timeline: "normal",
  message: "Description du projet...",
  newsletter: true,
  terms: true,
  submittedAt: "2026-02-05T10:30:00.000Z"
}
```

---

## 🔐 Page Admin

### Accès
- **URL**: http://localhost:8080/admin.html
- **Pas de mot de passe requis** (version locale)

### Fonctionnalités

#### 📊 Statistiques
- Total des soumissions
- Soumissions aujourd'hui
- Soumissions cette semaine
- Soumissions ce mois

#### 🔍 Filtres
- **Recherche**: Par nom, email, téléphone, entreprise
- **Service**: Filtrer par type de service
- **Budget**: Filtrer par gamme de budget

#### ⚙️ Actions
1. **Rafraîchir** - Recharger les données
2. **Exporter CSV** - Télécharger toutes les soumissions en CSV
3. **Supprimer Tout** - Effacer toutes les soumissions (confirmation requise)

#### 📝 Actions par Soumission
- **👁️ Voir Détails** - Afficher toutes les informations
- **🗑️ Supprimer** - Effacer une soumission spécifique

---

## 🛠️ Commandes Console

### Accès aux Fonctions Admin
Ouvrez la console du navigateur (F12) et utilisez:

```javascript
// Voir toutes les soumissions
sichertechAdmin.getAllSubmissions()

// Exporter en CSV
sichertechAdmin.exportSubmissionsToCSV()

// Effacer toutes les soumissions
sichertechAdmin.clearAllSubmissions()
```

### Exemples d'Utilisation

```javascript
// Compter les soumissions
const submissions = sichertechAdmin.getAllSubmissions();
console.log(`Total: ${submissions.length} soumissions`);

// Filtrer par service
const webDev = submissions.filter(s => s.service === 'web-development');
console.log(`Web Dev: ${webDev.length}`);

// Trouver les budgets élevés
const highBudget = submissions.filter(s => s.budget === 'over-50k');
console.log(`Budget > 50K: ${highBudget.length}`);
```

---

## 📤 Export CSV

### Colonnes Exportées
1. Date
2. First Name
3. Last Name
4. Email
5. Phone
6. Company
7. Service
8. Budget
9. Timeline
10. Message
11. Newsletter

### Format du Fichier
- **Nom**: `sichertech_submissions_YYYY-MM-DD.csv`
- **Encodage**: UTF-8
- **Séparateur**: Virgule (,)
- **Messages**: Échappés avec guillemets doubles

---

## ✅ Validation du Formulaire

### Validation en Temps Réel
- ❌ Email invalide → Bordure rouge
- ❌ Téléphone invalide → Bordure rouge
- ✅ Champs valides → Bordure verte

### Validation à la Soumission
- Vérification de tous les champs obligatoires
- Messages d'erreur détaillés
- Notification de succès/échec

### Règles de Validation
```javascript
// Email
Format: xxx@xxx.xxx

// Téléphone
Minimum: 10 chiffres
Accepte: espaces, tirets, +, parenthèses

// Texte
Prénom/Nom: Minimum 2 caractères
Message: Minimum 10 caractères

// Cases à cocher
Conditions: Obligatoire
Newsletter: Optionnel
```

---

## 🔄 Intégration Backend (Optionnel)

### Pour Envoyer au Serveur
Modifiez `js/main.js` - fonction `contactForm.addEventListener`:

```javascript
if (isValid) {
    // Sauvegarder localement
    saveFormSubmission(formData);
    
    // Envoyer au serveur
    fetch('https://votre-api.com/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        showNotification('Message envoyé!', 'success');
        contactForm.reset();
    })
    .catch(error => {
        console.error('Erreur:', error);
        showNotification('Erreur d\'envoi', 'error');
    });
}
```

### Services d'Email Recommandés
- **Formspree** - https://formspree.io
- **EmailJS** - https://www.emailjs.com
- **SendGrid** - https://sendgrid.com
- **Netlify Forms** - Gratuit avec Netlify
- **GetForm** - https://getform.io

---

## 📧 Configuration EmailJS (Exemple)

### 1. Créer un Compte
Inscrivez-vous sur https://www.emailjs.com

### 2. Configurer le Service
- Ajoutez votre service email (Gmail, Outlook, etc.)
- Créez un template d'email
- Obtenez vos clés API

### 3. Intégrer dans le Code
```html
<!-- Ajouter avant </body> -->
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
  emailjs.init("VOTRE_PUBLIC_KEY");
</script>
```

```javascript
// Dans le formulaire
if (isValid) {
    emailjs.send("SERVICE_ID", "TEMPLATE_ID", {
        from_name: formData.firstName + ' ' + formData.lastName,
        from_email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service: formData.service,
        budget: formData.budget,
        message: formData.message
    })
    .then(() => {
        showNotification('Message envoyé!', 'success');
        contactForm.reset();
    })
    .catch((error) => {
        showNotification('Erreur d\'envoi', 'error');
    });
}
```

---

## 🔒 Sécurité

### Protection Côté Client
✅ Validation des entrées
✅ Échappement des données
✅ Limite de soumissions (50 max)

### Recommandations Production
- ⚠️ Ajouter un CAPTCHA (Google reCAPTCHA)
- ⚠️ Implémenter une limitation de débit (rate limiting)
- ⚠️ Valider côté serveur
- ⚠️ Protéger contre les injections XSS/SQL
- ⚠️ Utiliser HTTPS
- ⚠️ Ajouter une authentification pour /admin.html

---

## 📱 Responsive Design

### Points de Rupture
- **Desktop**: > 768px - 2 colonnes
- **Tablet**: 768px - 480px - 1 colonne
- **Mobile**: < 480px - 1 colonne

### Optimisations Mobile
- Formulaire pleine largeur
- Boutons tactiles plus grands
- Navigation simplifiée
- Téléphone/WhatsApp en évidence

---

## 🎨 Personnalisation

### Modifier les Couleurs
Dans `css/style.css`:
```css
.quick-contact-card.whatsapp i {
    color: #25D366; /* Vert WhatsApp */
}

.quick-contact-card.phone i {
    color: var(--primary-color); /* Vert Sicher Tech */
}
```

### Ajouter un Champ
Dans `contact.html`:
```html
<div class="form-group">
    <label for="website">Website (Optional)</label>
    <input type="url" id="website" name="website">
</div>
```

Dans `js/main.js` - ajouter à `formData`:
```javascript
website: this.querySelector('[name="website"]').value.trim()
```

---

## 🐛 Dépannage

### Les Soumissions ne s'Enregistrent Pas
1. Vérifier la console (F12) pour les erreurs
2. Vérifier que localStorage est activé
3. Vider le cache du navigateur

### Le Formulaire ne se Soumet Pas
1. Vérifier tous les champs obligatoires
2. Accepter les conditions d'utilisation
3. Vérifier les messages d'erreur

### La Page Admin est Vide
1. Soumettre au moins un formulaire
2. Rafraîchir la page admin
3. Vérifier localStorage dans DevTools

### Export CSV ne Fonctionne Pas
1. Vérifier qu'il y a des soumissions
2. Autoriser les téléchargements dans le navigateur
3. Essayer un autre navigateur

---

## 📞 Support

Pour toute question:
- **WhatsApp**: 407-393-7460
- **Téléphone**: 407-225-4688
- **Email**: info@sichertech.com

---

## 📝 Changelog

### Version 1.0.0 (2026-02-05)
- ✅ Formulaire de contact complet
- ✅ Validation en temps réel
- ✅ Sauvegarde localStorage
- ✅ Page admin avec dashboard
- ✅ Export CSV
- ✅ Filtres et recherche
- ✅ Statistiques
- ✅ Design responsive
- ✅ Intégration WhatsApp

---

**Développé avec ❤️ par Sicher Tech**
