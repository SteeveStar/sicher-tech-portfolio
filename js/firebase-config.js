// ==========================================
// FIREBASE CONFIGURATION
// ==========================================

// TODO: Remplacez ces valeurs par vos propres identifiants Firebase
// Obtenez-les sur https://console.firebase.google.com
const firebaseConfig = {
    apiKey: "VOTRE_API_KEY",
    authDomain: "votre-projet.firebaseapp.com",
    projectId: "votre-projet-id",
    storageBucket: "votre-projet.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};

// Initialiser Firebase
let db = null;
let firebaseInitialized = false;

function initializeFirebase() {
    try {
        // Vérifier si Firebase est chargé
        if (typeof firebase === 'undefined') {
            console.warn('Firebase SDK not loaded. Using localStorage only.');
            return false;
        }

        // Initialiser Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        // Initialiser Firestore
        db = firebase.firestore();
        firebaseInitialized = true;
        
        console.log('✅ Firebase initialized successfully');
        return true;
    } catch (error) {
        console.error('Firebase initialization error:', error);
        console.warn('Falling back to localStorage');
        return false;
    }
}

// ==========================================
// SAVE SUBMISSION TO FIREBASE
// ==========================================
async function saveToFirebase(formData) {
    if (!firebaseInitialized) {
        throw new Error('Firebase not initialized');
    }

    try {
        // Ajouter un timestamp serveur
        const submission = {
            ...formData,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        // Sauvegarder dans Firestore
        const docRef = await db.collection('contact_submissions').add(submission);
        
        console.log('✅ Saved to Firebase with ID:', docRef.id);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error saving to Firebase:', error);
        throw error;
    }
}

// ==========================================
// GET ALL SUBMISSIONS FROM FIREBASE
// ==========================================
async function getAllFromFirebase() {
    if (!firebaseInitialized) {
        throw new Error('Firebase not initialized');
    }

    try {
        const snapshot = await db.collection('contact_submissions')
            .orderBy('createdAt', 'desc')
            .get();

        const submissions = [];
        snapshot.forEach(doc => {
            submissions.push({
                id: doc.id,
                ...doc.data(),
                // Convertir Timestamp en ISO string
                submittedAt: doc.data().createdAt?.toDate().toISOString() || new Date().toISOString()
            });
        });

        console.log(`✅ Retrieved ${submissions.length} submissions from Firebase`);
        return submissions;
    } catch (error) {
        console.error('Error getting submissions from Firebase:', error);
        throw error;
    }
}

// ==========================================
// DELETE SUBMISSION FROM FIREBASE
// ==========================================
async function deleteFromFirebase(docId) {
    if (!firebaseInitialized) {
        throw new Error('Firebase not initialized');
    }

    try {
        await db.collection('contact_submissions').doc(docId).delete();
        console.log('✅ Deleted document:', docId);
        return { success: true };
    } catch (error) {
        console.error('Error deleting from Firebase:', error);
        throw error;
    }
}

// ==========================================
// UPDATE SUBMISSION IN FIREBASE
// ==========================================
async function updateInFirebase(docId, data) {
    if (!firebaseInitialized) {
        throw new Error('Firebase not initialized');
    }

    try {
        await db.collection('contact_submissions').doc(docId).update({
            ...data,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('✅ Updated document:', docId);
        return { success: true };
    } catch (error) {
        console.error('Error updating Firebase:', error);
        throw error;
    }
}

// ==========================================
// SEARCH SUBMISSIONS
// ==========================================
async function searchFirebase(field, value) {
    if (!firebaseInitialized) {
        throw new Error('Firebase not initialized');
    }

    try {
        const snapshot = await db.collection('contact_submissions')
            .where(field, '==', value)
            .get();

        const results = [];
        snapshot.forEach(doc => {
            results.push({ id: doc.id, ...doc.data() });
        });

        return results;
    } catch (error) {
        console.error('Error searching Firebase:', error);
        throw error;
    }
}

// ==========================================
// LISTEN TO REAL-TIME UPDATES
// ==========================================
function listenToSubmissions(callback) {
    if (!firebaseInitialized) {
        throw new Error('Firebase not initialized');
    }

    return db.collection('contact_submissions')
        .orderBy('createdAt', 'desc')
        .onSnapshot(snapshot => {
            const submissions = [];
            snapshot.forEach(doc => {
                submissions.push({
                    id: doc.id,
                    ...doc.data(),
                    submittedAt: doc.data().createdAt?.toDate().toISOString() || new Date().toISOString()
                });
            });
            callback(submissions);
        }, error => {
            console.error('Error listening to submissions:', error);
        });
}

// ==========================================
// EXPORT FUNCTIONS
// ==========================================
window.firebaseDB = {
    initialize: initializeFirebase,
    save: saveToFirebase,
    getAll: getAllFromFirebase,
    delete: deleteFromFirebase,
    update: updateInFirebase,
    search: searchFirebase,
    listen: listenToSubmissions,
    isInitialized: () => firebaseInitialized
};
