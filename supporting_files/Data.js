import React from "react";
import { Dimensions } from "react-native";

export const screen = Dimensions.get("window").width;
export const screenWidth = Dimensions.get("window").width;
export const screenHeight = Dimensions.get("window").height;

export const busStops = [
  {
    name: "Warwick Road",
    label: "Towards Paragon",
    stop: "Stop B",
    longitude: -0.304981,
    latitude: 51.506885,
    image: require("../assets/stops/location-b.png")
  },
  {
    name: "Ealing Broadway Centre",
    label: "Towards Paragon",
    stop: "Stop L",
    longitude: -0.304506,
    latitude: 51.512531,
    image: require("../assets/stops/location-L.png")
  },
  {
    name: "Little Ealing Lane",
    label: "Towards Paragon",
    stop: "Stop N",
    longitude: -0.306585,
    latitude: 51.4981,
    image: require("../assets/stops/location-n.png")
  },
  {
    name: "South Ealing",
    label: "Towards Paragon",
    stop: "Stop D",
    longitude: -0.306589,
    latitude: 51.501108,
    image: require("../assets/stops/location-d.png")
  },
  {
    name: "Haven Green Ealing Broadway",
    label: "Towards Paragon",
    stop: "Stop D",
    longitude: -0.303317,
    latitude: 51.515163,
    image: require("../assets/stops/location-d.png")
  },
  {
    name: "Paragon House",
    label: "Towards Paragon",
    stop: "Paragon House",
    longitude: -0.314611,
    latitude: 51.489375,
    image: require("../assets/stops/location-p.png")
  },
  {
    name: "Haven Green Ealing Broadway",
    label: "Towards Ealing",
    stop: "Stop D",
    longitude: -0.303317,
    latitude: 51.515163,
    image: require("../assets/stops/location-d.png")
  },
  {
    name: "Paragon House",
    label: "Towards Ealing",
    stop: "Paragon House",
    longitude: -0.314611,
    latitude: 51.489375,
    image: require("../assets/stops/location-p.png")
  },
  {
    name: "Bond Street",
    label: "Towards Ealing",
    stop: "Stop N",
    longitude: -0.305869,
    latitude: 51.511861,
    image: require("../assets/stops/location-n.png")
  },
  {
    name: "Warwick Road",
    label: "Towards Ealing",
    stop: "Stop L",
    longitude: -0.305298,
    latitude: 51.505895,
    image: require("../assets/stops/location-L.png")
  },
  {
    name: "South Ealing",
    label: "Towards Ealing",
    stop: "Stop J",
    longitude: -0.30671,
    latitude: 51.500902,
    image: require("../assets/stops/location-j.png")
  },
  {
    name: "Little Ealing Lane",
    label: "Towards Ealing",
    stop: "Stop N",
    longitude: -0.306627,
    latitude: 51.498174,
    image: require("../assets/stops/location-n.png")
  }
];
