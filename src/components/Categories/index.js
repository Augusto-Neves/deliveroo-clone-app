import { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import sanityClient from "../../services/sanity";

import { CategoryCard } from "../CategoryCard";

export function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == 'category']`)
      .then((result) => setCategories(result))
      .catch((error) => console.log(error));
  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
    >
      {categories?.map((category) => (
        <CategoryCard
          key={category._id}
          title={category.name}
          imgUrl={category.image.asset._ref}
        />
      ))}
    </ScrollView>
  );
}
