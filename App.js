import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Image } from 'react-native';
import axios from 'axios';


function getPetData(pet){

  // const res = {}
  const photo = pet.media.photos.photo.find((item)=>{
    return item['@size']==='x';
  })
  const name = Object.values(pet.name)[0];
  const description = Object.values(pet.description).length?Object.values(pet.description)[0]:"No description available";
  let breed  = Array.isArray(pet.breeds.breed)?pet.breeds.breed.reduce((acc, s)=>Object.values(s)[0]+",  "+acc , ""):Object.values(pet.breeds.breed)[0];

  breed =  breed.split(',').map(s=>s.trim()).filter(s => s.length).join(", ");
  const phone = Object.values(pet.contact.phone)[0] || "No phone available";
  const email = Object.values(pet.contact.email)[0] || "NA";
  const state = Object.values(pet.contact.state)[0] || "NA";
  return{photo, name, description, breed ,  phone, state, email}

}


export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state= {
      id:3,
      name:"init",
      description: 'sample desc',
      photo: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
      vis:false,
    }
  }

  componentDidMount(){
    // console.log("hello")

    var randomurl = "http://api.petfinder.com/pet.getRandom?format=json&key=860324afdc30f92b5ccf51f9c50132e5&animal=dog";

var baseurl = "http://api.petfinder.com/pet.get?format=json&key=860324afdc30f92b5ccf51f9c50132e5"
    axios.get(randomurl).then((res, rej)=>{
      if(res.status!==200) return;
      var id = Object.values(res.data.petfinder.petIds.id)[0];
      
      axios.get(baseurl+"&id="+id).then((res, rej)=>{
        // if(res.status!==200) res.send("err");
        const pet = res.data.petfinder.pet;
        this.setState({
          id, ...getPetData(pet)
        });
      })
    })
  }
  render() {
    return (
      
      <View style={styles.container}>
      <ScrollView>
        

        <Text style={{fontWeight:"bold"}}>Adopt this puppy {this.state.name} - {this.state.id}</Text>
        <Text>{this.state.description}</Text>
        <Text>{this.state.breed}</Text>
        <Text>{this.state.phone}</Text>
        <Text>{this.state.email}</Text>
        <Image           style={{width: 500, height: 500}}
          source={{uri: this.state.photo['$t']}}
        ></Image>


        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    'marginTop':100,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
