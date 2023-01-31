import { ScrollView } from "react-native";
import { CategoryCard } from "../CategoryCard";

export function Categories() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      endFillColor="#00CCBB"
    >
      <CategoryCard
        title="Fast Food"
        imgUrl="https://www.infoescola.com/wp-content/uploads/2009/03/fast-food.jpg"
      />
      <CategoryCard
        title="Healthy"
        imgUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDSuCLYYeUUc_MyuFiwYaUV20y5aJxURWgDn9IPQxu53Scdy40b1QH55-E8_ZZo_U0e2Q&usqp=CAU"
      />
      <CategoryCard
        title="Sushi"
        imgUrl="https://s2.glbimg.com/Z9j84t747HWwgFA7Yf4FSIY-ttI=/0x0:4000x2572/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_1f540e0b94d8437dbbc39d567a1dee68/internal_photos/bs/2021/b/N/B6KQ99T5W7OMNN7Xadtg/como-fazer-sushi-confira-receitas-classicas-e-adaptadas.jpg"
      />
      <CategoryCard
        title="Baker"
        imgUrl="https://invexo.com.br/blog/wp-content/uploads/2022/10/paes-padarias-copacabana-rio-de-janeiro.jpg"
      />
      <CategoryCard
        title="Chinese"
        imgUrl="http://images.summitmedia-digital.com/yummyph/images/2022/07/29/chinesefoodguidemainimage.jpg"
      />
    </ScrollView>
  );
}
