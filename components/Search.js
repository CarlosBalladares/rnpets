import React from "react";
import { ANIMALS } from "petfinder-client";
import { Consumer } from "./SearchContext";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label
} from "native-base";

class Search extends React.Component {
  render() {
    return (
      <Consumer>
        {context => (
          <>
            <Item floatingLabel last>
              <Label>Location</Label>
              <Input
                id="location"
                onChange={context.handleLocationChange}
                value={context.location}
                placeholder="Location"
              />
            </Item>
            {/* <label htmlFor="animal">
              Animal
              <select
                id="animal"
                value={context.animal}
                onChange={context.handleAnimalChange}
                onBlur={context.handleAnimalChange}
              >
                <option />
                {ANIMALS.map(animal => (
                  <option key={animal} value={animal}>
                    {animal}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="breed">
              Breed
              <select
                disabled={!context.breeds.length}
                id="breed"
                value={context.breed}
                onChange={context.handleBreedChange}
                onBlur={context.handleBreedChange}
              >
                <option />
                {context.breeds.map(breed => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))}
              </select>
            </label>
            <button>Submit</button> */}
          </>
        )}
      </Consumer>
    );
  }
}

export default Search;
