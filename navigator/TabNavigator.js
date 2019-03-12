import React from "react";
import styled from "styled-components";

import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import AboutScreen from "../screens/AboutScreen";
import DevScreen from "../screens/DevScreen";

// import { Icon } from "expo";

// Set active colors

const activeColor = "#FF453B";
const inActiveColor = "#b8bece";

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = ({ navigation }) => {
  var tabBarVisible = true;

  return {
    tabBarVisible,
    tabBarLabel: ({ focused }) => (
      <Label
        style={{
          color: focused ? activeColor : inActiveColor
        }}
      >
        Shuttle
      </Label>
    ),

    tabBarIcon: ({ focused }) => (
      <Icon
        style={{
          tintColor: focused ? activeColor : inActiveColor
        }}
        source={require("../assets/logos/bus-stop.png")}
      />
    )
  };
};

const AboutStack = createStackNavigator({
  Home: AboutScreen,
  Dev: DevScreen
});

AboutStack.navigationOptions = ({ navigation }) => {
  var tabBarVisible = true;

  return {
    tabBarVisible,
    tabBarLabel: ({ focused }) => (
      <Label
        style={{
          color: focused ? activeColor : inActiveColor
        }}
      >
        About
      </Label>
    ),

    tabBarIcon: ({ focused }) => (
      <Icon
        style={{
          tintColor: focused ? activeColor : inActiveColor
        }}
        source={require("../assets/logos/start-up.png")}
      />
    )
  };
};

const Label = styled.Text`
  font-size: 13px;
  margin: auto;
`;

const Icon = styled.Image`
  width: 25px;
  height: 25px;
`;

const TabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    AboutStack
  },
  {
    showLabel: true,
    activeTintColr: "#FF453B",
    inActiveTintColor: "#b8bece",
    style: {
      backgroundColor: "#ffffff"
    }
  }
);

export default TabNavigator;
