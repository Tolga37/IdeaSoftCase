import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from '../pages/HomePage';
import Categories from '../pages/Categories';
import Products from '../pages/Products';
import AddProduct from '../pages/AddProduct';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, TouchableOpacity,LogBox} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ListComponent from '../components/ListComponent';
import AddCategories from '../pages/AddCategories';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
LogBox.ignoreLogs(['Warning: ...']);
const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Products}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddProduct"
        component={AddProduct}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddCategories"
        component={AddCategories}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ListComponent"
        component={ListComponent}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const CategoryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Categories"
        component={Categories}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddCategories"
        component={AddCategories}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight:'bold'
          },
          tabBarActiveTintColor: 'blue', // Seçili olan tab için renk
          tabBarInactiveTintColor: 'gray', // Seçili olmayan tab için renk
        }}>
        <Tab.Screen
          name="Home"
          component={HomePage}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialIcons name="home" size={24} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Categories"
          component={CategoryStack}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialIcons name="category" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Products"
          component={ProfileStack}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialIcons name="apps" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
