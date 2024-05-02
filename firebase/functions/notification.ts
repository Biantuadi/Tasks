import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

exports.sendTaskNotification = functions.firestore
  .document("tasks/{taskId}")
  .onCreate(async (snapshot, context) => {
    const newTask = snapshot.data();

    // Récupérer tous les tokens d'appareil des utilisateurs depuis Firestore
    const usersSnapshot = await admin.firestore().collection("users").get();
    const tokens = usersSnapshot.docs.map((doc) => doc.data().token);

    // Envoyer la notification push à tous les appareils
    const payload = {
      notification: {
        title: "Nouveau task créé",
        body: `Un nouveau task a été créé : ${newTask.title}`,
      },
    };

    try {
      await admin.messaging().sendToDevice(tokens, payload);
      console.log("Notification push envoyée avec succès");
    } catch (error) {
      console.error("Erreur lors de l'envoi de la notification push:", error);
    }
  });
