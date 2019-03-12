import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components";
import { screenWidth, busStops } from "../supporting_files/Data";
import Card from "./Card";

const haversine = require("haversine");

var previous = "Towards Paragon";

class CardGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedBuses: [],
      ealingEta: [],
      paragonEta: [],
      southEalingEta: [],
      warwickEta: [],
      littleEta: [],
      bondEta: []
    };
  }

  updateCollection = () => {
    myStops = busStops
      .filter(value => {
        return value.label == this.props.destination;
      })
      .sort(
        (a, b) =>
          this.calc(a.longitude, a.latitude) <
          this.calc(b.longitude, b.latitude)
      )
      .reverse();
    this.setState({
      sortedBuses: myStops
    });
  };

  componentWillReceiveProps = () => {
    this.updateCollection();
  };

  // componentDidMount() {
  //   setInterval(this.updateCollection, 0.1);
  // }

  calc = (long, lat) => {
    const start = {
      latitude: this.props.currentLatitude,
      longitude: this.props.currentlongitude
    };

    const end = {
      latitude: lat,
      longitude: long
    };
    return haversine(start, end, { unit: "mile" }).toFixed(2);
  };

  checkStop = name => {
    current = [];
    switch (name) {
      case "Warwick Road":
        return Math.min.apply(null, this.props.warwick);
      case "South Ealing":
        return Math.min.apply(null, this.props.southEaling);
      case "Ealing Broadway Centre":
        return Math.min.apply(null, this.props.bond);
      case "Bond Street":
        return Math.min.apply(null, this.props.bond);
      case "Little Ealing Lane":
        return Math.min.apply(null, this.props.little);
      case "Haven Green Ealing Broadway":
        return Math.min.apply(null, this.props.ealing);
      case "Paragon House":
        return Math.min.apply(null, this.props.paragon);
      default:
        return "null";
    }
    return "hi";
  };

  render() {
    return (
      <View>
        <Container>
          <ScrollView>
            {this.state.sortedBuses.map((stop, index) => (
              <Card
                key={index}
                title={stop.name}
                eta={this.checkStop(stop.name)}
                direction={stop.label}
                image={stop.image}
                currentlongitude={this.props.currentlongitude}
                currentLatitude={this.props.currentLatitude}
                calculate={this.calc(stop.longitude, stop.latitude)}
              />
            ))}
          </ScrollView>
        </Container>
      </View>
    );
  }
}

export default CardGrid;

const View = styled.View`
  width: ${screenWidth};
  height: 300px;
  align-items: center;
`;

const Container = styled.View`
  width: ${screenWidth - 32};
  height: 300px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  background: white;
  margin-top: -16px;
`;
