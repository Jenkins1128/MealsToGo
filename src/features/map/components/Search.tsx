import { Box } from "@/components/ui/box";
import React, { useContext, useState, useEffect } from "react";
import { Searchbar } from "react-native-paper";
import { LocationContext } from "@/services/location/locationContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Search = () => {
  const insets = useSafeAreaInsets();
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  return (
    <Box className="absolute w-full z-50 p-4" style={{ top: insets.top }}>
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
    </Box>
  );
};
