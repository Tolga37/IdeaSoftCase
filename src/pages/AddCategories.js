import React, {useState} from 'react';
import {Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import FormComponent from '../components/FormComponent';

const AddCategories = ({navigation, route}) => {
  const {editItem, setProducts} = route.params || {};
  const [product, setProduct] = useState({
    name: `${editItem?.name || ''}`,
    sortOrder: editItem?.sortOrder,
    status: editItem?.status,
    displayShowcaseContent: editItem?.displayShowcaseContent,
    showcaseContentDisplayType: editItem?.showcaseContentDisplayType,
    displayShowcaseFooterContent: editItem?.displayShowcaseFooterContent,
    showcaseFooterContentDisplayType:
      editItem?.showcaseFooterContentDisplayType,
    hasChildren: editItem?.hasChildren,
    isCombine: editItem?.isCombine,
  });

  const formFields = [
    {
      type: 'text',
      label: 'Kategori Adı',
      valueKey: 'name',
      placeholder: 'Kategori Adını Girin',
    },
    {
      type: 'number',
      label: 'Sıralama',
      valueKey: 'sortOrder',
      placeholder: 'Sıralama Değeri Girin',
    },
    {
      type: 'picker',
      label: 'Durum',
      valueKey: 'status',
      options: [
        {label: 'Aktif', value: 1},
        {label: 'Pasif', value: 0},
      ],
    },
    {
      type: 'picker',
      label: 'Görünürlük Tipi',
      valueKey: 'displayShowcaseContent',
      options: [
        {label: 'Kapalı', value: 0},
        {label: 'Masaüstü', value: 1},
        {label: 'Mobil ve Masaüstü', value: 2},
      ],
    },
    {
      type: 'picker',
      label: 'Showcase İçerik Tipi',
      valueKey: 'showcaseContentDisplayType',
      options: [
        {label: 'Kategori içeriği', value: 1},
        {label: 'Kategori ve üst kategori içeriği', value: 2},
        {label: 'Kategori ve tüm üst kategoriler', value: 3},
      ],
    },
    {
      type: 'picker',
      label: 'Alt Gösterim İçeriği Durumu',
      valueKey: 'displayShowcaseFooterContent',
      options: [
        {label: 'Kapalı', value: 0},
        {label: 'Masaüstü', value: 1},
        {label: 'Mobil ve Masaüstü', value: 2},
      ],
    },
    {
      type: 'picker',
      label: 'Alt Gösterim İçerik Tipi',
      valueKey: 'showcaseFooterContentDisplayType',
      options: [
        {label: 'Kategori içeriği', value: 1},
        {label: 'Kategori ve alt kategori içeriği', value: 2},
        {label: 'Kategori ve tüm alt kategoriler', value: 3},
      ],
    },
    {
      type: 'picker',
      label: 'Çocuk Kategorisi Var mı?',
      valueKey: 'hasChildren',
      options: [
        {label: 'Var', value: 0},
        {label: 'Yok', value: 1},
      ],
    },
    {
      type: 'picker',
      label: 'Birleştirilen Kategori?',
      valueKey: 'isCombine',
      options: [
        {label: 'Kombin Kategori', value: 0},
        {label: 'Kombin Kategori değil', value: 1},
      ],
    },
  ];

  const handleCategories = async () => {
    const url = editItem
      ? 'https://testcase.myideasoft.com/admin-api/categories/' +
        `${editItem.id}`
      : 'https://testcase.myideasoft.com/admin-api/categories';

    const method = editItem ? 'PUT' : 'POST';

    const newCategoryData = {
      name: `${product.name}`,
      sortOrder: Number(product.sortOrder),
      status: product.status,
      displayShowcaseContent: product.displayShowcaseContent,
      showcaseContentDisplayType: product.showcaseContentDisplayType,
      displayShowcaseFooterContent: product.displayShowcaseFooterContent,
      showcaseFooterContentDisplayType:
        product.showcaseFooterContentDisplayType,
      hasChildren: product.hasChildren,
      isCombine: product.isCombine,
    };

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer AX5FTZ7UBAABUDT6XYYPW7LX',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategoryData),
      });

      const data = await response.json();
      if (response.ok) {
        setProducts(products => {
          let newProducts = [...products];
          if (editItem?.id) {
            const editiedProductIndex = products.findIndex(
              p => p?.id == editItem?.id,
            );
            newProducts[editiedProductIndex] = data;
            return newProducts;
          }
          newProducts.push(data);
          return newProducts;
        });
        navigation.goBack();
      } else {
        Alert.alert(
          'Hata',
          `API hatası: ${data.errorMessage || 'Bir hata oluştu.'}`,
          [{text: 'Tamam'}],
        );
      }
    } catch (error) {
      Alert.alert(
        'Hata',
        'Bir hata oluştu. Lütfen internet bağlantınızı kontrol edin veya tekrar deneyin.',
        [{text: 'Tamam'}],
      );
    }
  };

  return (
    <>
      <FormComponent
        formType={formFields}
        product={product}
        setProduct={setProduct}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleCategories}>
        <Text style={styles.addButtonText}>
          {editItem ? 'Güncelle' : 'Ekle'}
        </Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddCategories;
