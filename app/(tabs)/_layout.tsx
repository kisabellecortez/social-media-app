import { Tabs } from 'expo-router';
import React, {useEffect, useState} from 'react';
import {
    View, 
    Text,
    TextInput,
    TouchableOpacity, 
    StyleSheet,
    Button, 
    Image
} from "react-native";
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

import {Amplify} from "aws-amplify"
import awsCognitoConfig from "../../config/awsCognitoConfig.js";

let cognitoConfigured = false;

if(!cognitoConfigured){
  Amplify.configure(awsCognitoConfig);
  cognitoConfigured = true; 
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [userSignedIn, setUserSignedIn] = useState(false)

  useEffect(() => {
    const checkUser = async() => {
      setUserSignedIn(true)
    }

    checkUser();
  }, [])

  return(
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarShowLabel: false
        }}>
        <Tabs.Screen
          name="userHome"
          options={{
            tabBarIcon: ({focused}) => (
              <Image
                source={
                  require('../../assets/images/home.svg')
                }

                style={{width: 24, height: 24}}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="userMessages"
          options={{
            tabBarIcon: ({focused}) => (
              <Image
                source={
                  require('../../assets/images/message.svg')
                }

                style={{width: 24, height: 24}}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="userExplore"
          options={{
            tabBarIcon: ({focused}) => (
              <Image
                source={
                  require('../../assets/images/search.svg')
                }

                style={{width: 24, height: 24}}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="userAccount"
          options={{
            tabBarIcon: ({focused}) => (
              <Image
                source={
                  require('../../assets/images/user.svg')
                }

                style={{width: 24, height: 24}}
              />
            ),
          }}
        />
      </Tabs>
  )
}
