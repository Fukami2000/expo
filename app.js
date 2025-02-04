import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, Button, TextInput, FlatList, StyleSheet, ActivityIndicator, Image, ScrollView } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import messaging from "@react-native-firebase/messaging";
import axios from "axios";
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
import { AirbnbRating } from "react-native-ratings";
import * as tf from "@tensorflow/tfjs";
import * as toxicity from "@tensorflow-models/toxicity";
import { GiftedChat } from "react-native-gifted-chat";
import { enableScreens } from "react-native-screens";

enableScreens();

const Stack = createStackNavigator();

const registerForPushNotifications = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    const token = await messaging().getToken();
    console.log("FCM Token:", token);
  }
};

useEffect(() => {
  registerForPushNotifications();
  const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    alert(`Notification reçue: ${remoteMessage.notification.title}`);
  });
  return unsubscribe;
}, []);

const optimizePerformance = () => {
  console.log("Optimisation des performances en cours...");
  // Ajout de configurations pour améliorer la fluidité de l'application
};

useEffect(() => {
  optimizePerformance();
}, []);

export default function App() {
  return (
    <StripeProvider publishableKey="your-publishable-key">
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
          <Stack.Screen name="Reviews" component={ReviewScreen} />
          <Stack.Screen name="Recommended" component={RecommendedScreen} />
          <Stack.Screen name="PersonalizedRecommendations" component={PersonalizedRecommendationsScreen} />
          <Stack.Screen name="ChatBot" component={ChatBotScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
}
