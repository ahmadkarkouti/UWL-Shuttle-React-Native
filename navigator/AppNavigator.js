import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import TabNavigator from "./TabNavigator";

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen
  },
  {
    mode: "modal"
  }
);

export default createAppContainer(TabNavigator);
