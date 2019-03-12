/* @flow */
import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";
import styled from "styled-components";
import { screenWidth } from "../supporting_files/Data.js";
import { busesAvailable } from "../App.js";

export var destination = "http://ebookqatar.com/LondonUWL/toParagon.php";
export var toDestination = "Towards Paragon";

// https://api.myjson.com/bins/o9pd6

// https://api.myjson.com/bins/ory02

// https://api.myjson.com/bins/17ffm2

class SegmentedView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSingleIndexSelect = index => {
    console.log("Clicked");
    this.setState(prevState => ({ ...prevState, selectedIndex: index }));
    if (index == 0) {
      destination = "http://ebookqatar.com/LondonUWL/toParagon.php";
      toDestination = "Towards Paragon";
    } else {
      destination = "https://ebookqatar.com/LondonUWL/toEalingBroadway.php";
      toDestination = "Towards Ealing";
    }
    this.props.fetchActiveBuses();
  };

  render() {
    const { selectedIndex, selectedIndices, customStyleIndex } = this.state;
    return (
      <View>
        <Container>
          <SegmentedControlTab
            values={["Paragon", "Ealing Brodway"]}
            selectedIndex={selectedIndex}
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            activeTabTextStyle={styles.activeTabTextStyle}
            tabTextStyle={styles.tabTextStyle}
            onTabPress={this.handleSingleIndexSelect}
            borderRadius={0}
          />
        </Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabStyle: {
    borderColor: "white",
    borderWidth: 0,
    height: 55,
    width: screenWidth,
    // color: "#ffffff"
    backgroundColor: "#D52C43",
    color: "white"
  },
  activeTabStyle: {
    backgroundColor: "white"
    // color: "white"
  },
  activeTabTextStyle: {
    color: "#1586cf"
  },
  tabTextStyle: {
    color: "white"
  }
});

export default SegmentedView;

const View = styled.View`
  width: ${screenWidth};
  height: 50px;
  align-items: center;
`;

const Container = styled.View`
  width: ${screenWidth - 32};
  height: 50px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
  margin-top: -16px;
`;
