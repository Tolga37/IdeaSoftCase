import React, {useState, useEffect} from 'react';
import ListComponent from '../components/ListComponent';
import {Alert} from 'react-native';

const Categories = ({navigation}) => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        'https://testcase.myideasoft.com/admin-api/categories',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer AX5FTZ7UBAABUDT6XYYPW7LX',
          },
        },
      );

      const data = await response.json();
      setCategories(data);
    } catch (error) {
      Alert.alert(
        'Hata',
        'Bir hata oluştu. Lütfen internet bağlantınızı kontrol edin veya tekrar deneyin.',
        [{text: 'Tamam'}],
      );
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <ListComponent
      listData={categories}
      navigation={navigation}
      setProducts={setCategories}
      editPageName="AddCategories"
      type="categories"
    />
  );
};

export default Categories;
