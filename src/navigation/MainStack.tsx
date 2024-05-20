import React, { useEffect, useRef } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faBell,
  faBox,
  faCamera,
  faCircleUser,
  faComments,
  faCompass,
  faFireAlt,
  faGear,
  faHome,
  faHouse,
  faLink,
  faMagnifyingGlass,
  faPenToSquare,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

import { useTheme } from '../config/theme/Theme.context';
import { Fonts } from '../config/fonts/Fonts';
import { LKText } from '../components/General';
import { View } from 'react-native';

import { AuthLogout } from '../services/authentication';
import { useApolloClient } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import Home from '../screens/Home/Home';
import Create from '../screens/Create/Create';
import Profile from '../screens/Profile/Profile';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const MainStack = () => {
  const { theme } = useTheme();
  const client = useApolloClient();
  const navigation = useNavigation();

  const PlaceholderComponent: React.FC = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.color.bgColor,
        }}>
        <LKText weight="bold" style={[{ textAlign: 'center', marginTop: theme.spacing.base, opacity: 0.5 }]}>Coming soon</LKText>
      </View>
    );
  };

  const TabComponents = () => {
    return (
      <Tab.Navigator
        initialRouteName="Feed"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            switch (route.name) {
              case 'Feed':
                return (
                  <FontAwesomeIcon icon={faHome} size={22} color={color} />
                );

              case 'Search':
                return (
                  <FontAwesomeIcon icon={faMagnifyingGlass} size={22} color={color} />
                );

              case 'Create':
                return (
                  <FontAwesomeIcon icon={faPenToSquare} size={22} color={color} />
                );

              case 'Profile':
                return (
                  <FontAwesomeIcon icon={faCircleUser} size={22} color={color} />
                );
            }
          },

          tabBarActiveTintColor: theme.color.textColor,
          tabBarInactiveTintColor: theme.color.olColor,
          tabBarAllowFontScaling: false,
          tabBarLabelStyle: {
            fontFamily: Fonts['regular'],
            // fontSize: 8,
          },
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: theme.color.bgColor,
            borderTopWidth: 1,
            borderTopColor: theme.color.olColor,
          },
        })}>
        <Tab.Screen
          name="Feed"
          component={Home}
          options={{ headerShown: false }}
        />

        {/* <Tab.Screen
          name="Search"
          component={PlaceholderComponent}
          options={{ headerShown: false }}
        /> */}

        <Tab.Screen
          name="Create"
          component={PlaceholderComponent}
          options={{ headerShown: false }}
          listeners={{
            tabPress: e => {
              e.preventDefault();
              navigation.navigate("Main/Create")
            },
          }}
        />

        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    )
  }

  return (
    <View
      // entering={viewInitialAnimation}
      style={{ flex: 1, transform: [{ scale: 1 }] }}>
      <Stack.Navigator>
        <Stack.Screen
          name="Main/Main"
          component={TabComponents}
          options={{ headerShown: false, animation: 'none' }}
        />
        <Stack.Screen
          name="Main/Create"
          component={Create}
          options={{
            headerShown: false,
            presentation: "formSheet",
          }}
        />
      </Stack.Navigator>
    </View>
  );
};
