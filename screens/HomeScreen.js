import React from "react";
import {
  StyleSheet,
  View,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE
} from "react-native-maps";
import styled from "styled-components";
import { busStops, screenWidth } from "../supporting_files/Data";
import SegmentedView, {
  destination,
  toDestination
} from "../components/SegmentedView";
import CardGrid from "../components/CardGrid";
import moment from "moment";

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LONGITUDE = -0.3115481;
const LATITUDE = 51.5041284;
var joined = [];

function hello(func) {
  setInterval(func, 5000);
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      ealingEta: [],
      paragonEta: [],
      southEalingEta: [],
      warwickEta: [],
      littleEta: [],
      bondEta: [],
      activeBuses: [],
      latitude: LATITUDE,
      longitude: LONGITUDE,
      routeCoordinates: [],
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0,
        longitudeDelta: 0
      })
    };
  }

  componentDidMount() {
    this.fetchActiveBuses();
    hello(this.fetchActiveBuses);
    const { coordinate } = this.state;

    const { status } = Expo.Permissions.askAsync(Expo.Permissions.LOCATION);

    if (status === "granted") {
      const location = Expo.Location.getCurrentPositionAsync({
        enableHighAccuracy: true
      });
      return location;
    }

    this.watchID = navigator.geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;

        const newCoordinate = {
          latitude,
          longitude
        };

        // if (Platform.OS === "android") {
        //   if (this.marker) {
        //     this.marker._component.animateMarkerToCoordinate(
        //       newCoordinate,
        //       500
        //     );
        //   }
        // } else {
        //   coordinate.timing(newCoordinate).start();
        // }

        coordinate.timing(newCoordinate).start();

        this.setState({
          latitude,
          longitude
        });
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10
      }
    );
  }

  fetchActiveBuses = () => {
    this.setState({ activeBuses: [] });
    joined = [];
    ealingEta = [];
    paragonEta = [];
    southEalingEta = [];
    warwickEta = [];
    littleEta = [];
    bondEta = [];

    myNumber = -1;
    myIndex = 0;

    fetch(destination)
      .then(response => response.json())
      .then(response => {
        response.message.services.map(value => {
          if (value.live != null) {
            joined = joined.concat({
              longitude: value.live.lon,
              latitude: value.live.lat
            });
            this.setState({ activeBuses: joined });
          }

          myTry = -1;
          value.timetables.map((time, index) => {
            myIndex = myIndex + 1;
            myTry = myTry + 1;

            if (time.eta != "null") {
              datetime = time.depart.dateTime;
            } else {
              datetime = time.eta.etaDepart.dateTime;
            }

            // console.log("datetime", datetime);
            // console.log("theirH", theirHour);
            // console.log("theirM", theirMins);
            // console.log("myH", myHour);
            // console.log("myM", myMins);

            theirHour = datetime.substring(11, 13);
            theirMins = datetime.substring(14, 16);

            myHour = moment(Date(), "LLLL").format("HH");
            myMins = moment(Date(), "LLLL").format("mm");

            trying = theirHour - myHour + theirMins - myMins;

            hoursLeft = theirHour - myHour;

            if (hoursLeft >= 0) {
              hoursLeft = hoursLeft * 60;
              left = hoursLeft + theirMins - myMins;

              if (trying >= 0) {
                if (index == 0) {
                  ealingEta.push(trying);
                }

                if (index == 1) {
                  bondEta.push(trying);
                }

                if (index == 2) {
                  warwickEta.push(trying);
                }

                if (index == 3) {
                  southEalingEta.push(trying);
                }

                if (index == 4) {
                  littleEta.push(trying);
                }

                if (index == 5) {
                  paragonEta.push(trying);
                }
              }
            }
          });
        });

        this.setState({
          paragonEta: paragonEta,
          littleEta: littleEta,
          southEalingEta: southEalingEta,
          warwickEta: warwickEta,
          bondEta: bondEta,
          ealingEta: ealingEta
        });
      });
  };

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  getMapRegion = () => ({
    longitude: this.state.longitude - 0.01111,
    latitude: this.state.latitude - 0.03111,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1
  });

  hideTabBar = () => {
    alert("hiding...");
    this.props.navigation.setParams({ tabBar: { visible: false } });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.segmentContainer}>
          <SegmentedView fetchActiveBuses={this.fetchActiveBuses} />
          <CardGrid
            ref={child => {
              this.child = child;
            }}
            {...this.props}
            destination={toDestination}
            currentlongitude={this.state.longitude}
            currentLatitude={this.state.latitude}
            paragon={this.state.paragonEta}
            little={this.state.littleEta}
            southEaling={this.state.southEalingEta}
            warwick={this.state.warwickEta}
            bond={this.state.bondEta}
            ealing={this.state.ealingEta}
          />
        </View>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          tracksViewChanges
          initialRegion={this.getMapRegion()}
        >
          <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />
          <Marker.Animated
            ref={marker => {
              this.marker = marker;
            }}
            coordinate={this.state.coordinate}
          />

          {busStops
            .filter((value, index, array) => {
              return value.label == toDestination;
            })
            .map((stop, index) => (
              <Marker.Animated
                key={index}
                image={require("../assets/stops/bus-stop.png")}
                ref={marker => {
                  this.marker = marker;
                }}
                coordinate={
                  new AnimatedRegion({
                    latitude: stop.latitude,
                    longitude: stop.longitude,
                    latitudeDelta: 0,
                    longitudeDelta: 0
                  })
                }
              />
            ))}

          {this.state.activeBuses.map((bus, index) => (
            <Marker.Animated
              key={index}
              image={require("../assets/stops/space-shuttle.png")}
              ref={marker => {
                this.marker = marker;
              }}
              coordinate={
                new AnimatedRegion({
                  latitude: bus.latitude,
                  longitude: bus.longitude,
                  latitudeDelta: 0,
                  longitudeDelta: 0
                })
              }
            />
          ))}
        </MapView>
      </View>
    );
  }
}

const TabBarButton = styled.Image`
  width: 30px;
  height: 30px;
  flex-direction: row;
  align-self: flex-end;
  margin-right: 16px;
`;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  bubble: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: "stretch"
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent"
  },

  segmentContainer: {
    zIndex: 100,
    width: screenWidth
    // backgroundColor: "transparent"
  }
});

export default HomeScreen;
