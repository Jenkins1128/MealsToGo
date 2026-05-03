import { Box } from "@/components/ui/box";
import React, { useContext, useState, useEffect } from "react";
import { Searchbar } from "react-native-paper";
import { LocationContext } from "@/services/location/locationContext";

interface SearchProps {
  isFavoritesToggled: boolean;
  onFavoritesToggle: () => void;
}

export const Search = ({
  isFavoritesToggled,
  onFavoritesToggle,
}: SearchProps) => {
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  return (
    <Box className="p-4">
      <Searchbar
        icon={isFavoritesToggled ? "heart" : "heart-outline"}
        onIconPress={onFavoritesToggle}
        placeholder="Search for a location"
        value={searchKeyword}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
        onSubmitEditing={() => {
          search(searchKeyword);
        }}
      />
    </Box>
  );
};
