import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";
import { LocationContext } from "@/services/location/Location.context";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SearchContainer = styled.View`
  padding: ${(props: any) => props.theme.space[3]};
  position: absolute;
  z-index: 999;
  width: 100%;
`;

export const Search = () => {
  const insets = useSafeAreaInsets();
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  return (
    <SearchContainer style={{ top: insets.top }}>
      <Searchbar
        placeholder="Search for a location"
        icon="map"
        value={searchKeyword}
        onChangeText={(text: string) => {
          setSearchKeyword(text);
        }}
        onSubmitEditing={() => {
          search(searchKeyword);
        }}
      />
    </SearchContainer>
  );
};
