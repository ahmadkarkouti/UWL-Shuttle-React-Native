import React from "react";
import { TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import styled from "styled-components";
import Avatar from "./components/Avatar";
import {
  screenWidth,
  screenHeight,
  busStops,
  screen
} from "./supporting_files/Data";
import SegmentedView, { destination } from "./components/SegmentedView";

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class App extends React.Component {
  state = {
    activeBuses: []
  };

  componentDidMount() {
    this.fetchActiveBuses();
  }

  fetchActiveBuses = () => {
    this.setState({
      activeBuses: []
    });
    fetch(destination)
      .then(response => response.json())
      .then(response => {
        console.log("\n===============\n");
        console.log(response.message.services[0].live);
        console.log("\n===============\n");

        response.message.services.map((value, index, array) => {
          if (value.live != null) {
            var joined = this.state.activeBuses.concat({
              longtitude: value.live.lon,
              latitude: value.live.lat
            });
            this.setState({ activeBuses: joined });
          }
        });
      });
  };

  clicked = () => {
    this.fetchActiveBuses();
    alert(this.state.activeBuses.length);
  };

  render() {
    return (
      <View>
        <SafeAreaView>
          <SegmentedView fetchActiveBuses={this.fetchActiveBuses} />

          <TouchableOpacity onPress={() => this.clicked()}>
            <Text>{this.state.activeBuses.length}</Text>
          </TouchableOpacity>
          <ScrollView>
            {this.state.activeBuses.map((value, index) => (
              <Text key={index}>
                Lon: {value.longtitude}, Lat: {value.latitude}
              </Text>
            ))}
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

export default App;

const View = styled.View`
  width: ${screenWidth};
  height: ${screenHeight};
  background: green;
`;

const Text = styled.Text`
  color: black;
  font-size: 36px;
  font-weight: 600;
  margin: 10px auto;
`;
