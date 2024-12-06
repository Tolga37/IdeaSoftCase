import React, {useState, useEffect} from 'react';
import ListComponent from '../components/ListComponent';
import {Alert} from 'react-native';

const Products = ({navigation}) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        'https://testcase.myideasoft.com/admin-api/products',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer AX5FTZ7UBAABUDT6XYYPW7LX',
          },
        },
      );

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      Alert.alert(
        'Hata',
        'Bir hata oluştu. Lütfen internet bağlantınızı kontrol edin veya tekrar deneyin.',
        [{text: 'Tamam'}],
      );
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ListComponent
      listData={products}
      navigation={navigation}
      setProducts={setProducts}
      editPageName="AddProduct"
      type="products"
    />
  );
};

export default Products;
