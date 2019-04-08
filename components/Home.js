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
import { NativeRouter, Route, Link, Redirect } from "react-router-native";

// import Pet from "./components/Pet";
// import Search from "./components/Search";

const petfinder = pf({
  key: "860324afdc30f92b5ccf51f9c50132e5",
  secret: "1a3830697c127408dd13020c0bcc0df0"
});

function getPetData(pet) {
  // const res = {}
  const photo = pet.media.photos.photo.find(item => {
    return item["@size"] === "x";
  });
  const name = Object.values(pet.name)[0];
  const description = Object.values(pet.description).length
    ? Object.values(pet.description)[0]
    : "No description available";
  let breed = Array.isArray(pet.breeds.breed)
    ? pet.breeds.breed.reduce((acc, s) => Object.values(s)[0] + ",  " + acc, "")
    : Object.values(pet.breeds.breed)[0];

  breed = breed
    .split(",")
    .map(s => s.trim())
    .filter(s => s.length)
    .join(", ");
  const phone = Object.values(pet.contact.phone)[0] || "No phone available";
  const email = Object.values(pet.contact.email)[0] || "NA";
  const state = Object.values(pet.contact.state)[0] || "NA";
  return { photo, name, description, breed, phone, state, email };
}

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: [],
      loading: true,
      navigate: { val: false, reditect: "/" }
    };
    this.handlePress = this.handlePress.bind(this);
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

        // Font.loadAsync({
        //   Roboto: require("native-base/Fonts/Roboto.ttf"),
        //   Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        //   Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
        // }).then(e => {
        //   this.setState({
        //     pets,
        //     loading: false
        //   });
        // });
        // this.setState();
      });
  }

  goBack() {
    this.props.history.goBack();
  }

  handlePress(link) {
    return e => {
      this.setState({
        navigate: {
          val: true,
          reditect: link
        }
      });
    };
  }
  render() {
    const { loading, navigate } = this.state;

    if (navigate.val) {
      return <Redirect to={navigate.reditect} push={true} />;
    }
    return (
      <>
        <Container>
          <Header />

          <Content>
            <H1 style={{ textAlign: "center" }}>
              Welcome to the petfinder client menu
            </H1>
            <Button onPress={this.handlePress("/adoptRandom")}>
              <Text>Adopt a Ranodm pet</Text>
            </Button>
            {/* <H3>Header Three</H3>
            <Text>Default</Text> */}
            {/* <Pet pet={this.state.pets[0]} /> */}
            {/* <Search /> */}
          </Content>
        </Container>
      </>
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
