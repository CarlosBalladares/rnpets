import React from "react";
// import { StyleSheet, Text, View, ScrollView, Button, Image } from 'react-native';
import {
  Container,
  Header,
  Content,
  H1,
  H2,
  H3,
  Text,
  Button,
  Body,
  Title,
  Icon,
  Left
} from "native-base";
import pf from "petfinder-client";

// import Pet from "./components/Pet";
import { NativeRouter, Route, Link } from "react-router-native";
import Expo, { Font } from "expo";
import Home from "./components/Home";
import Pet from "./components/Pet";
import RandomPet from "./components/RandomPet";

import axios from "axios";

const petfinder = pf({
  key: "860324afdc30f92b5ccf51f9c50132e5",
  secret: "1a3830697c127408dd13020c0bcc0df0"
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pets: [], loading: true };
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    petfinder.pet
      .find({
        output: "full"
        // location: "Seattle, WA"
      })
      .then(data => {
        let pets;
        if (data.petfinder.pets && data.petfinder.pets.pet) {
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet;
          } else {
            pets = [data.petfinder.pets.pet];
          }
        } else {
          pets = [];
        }

        Font.loadAsync({
          Roboto: require("native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
          Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
        }).then(e => {
          this.setState({
            pets,
            loading: false
          });
        });
        // this.setState({ loading: false });
      });
  }
  goBack() {
    this.props.history.goBack();
  }
  render() {
    const { loading } = this.state;

    if (loading) {
      return (
        <Container>
          <Header />
          <Content>
            <H1>Fetching6</H1>
          </Content>
        </Container>
      );
    }
    return (
      <NativeRouter>
        <Route path="/pet/:id" component={Pet} />
        <Route path="/adoptRandom" component={RandomPet} />
        <Route exact path="/" component={Home} />
      </NativeRouter>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     'marginTop':100,
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
