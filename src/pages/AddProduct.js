import React, {useState} from 'react';
import {Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import FormComponent from '../components/FormComponent';

const AddProduct = ({navigation, route}) => {
  const {editItem, setProducts} = route.params || {};
  const [product, setProduct] = useState({
    name: `${editItem?.name || ''}`,
    sku: `${editItem?.sku || ''}`,
    stockAmount: editItem?.stockAmount,
    price1: editItem?.price1,
    discountType: editItem?.discountType,
    taxIncluded: editItem?.taxIncluded,
    stockTypeLabel: editItem?.stockTypeLabel,
    customShippingDisabled: editItem?.customShippingDisabled,
    hasGift: editItem?.hasGift,
    status: editItem?.status,
    hasOption: editItem?.hasOption,
    categoryShowcaseStatus: editItem?.categoryShowcaseStatus,
  });

  const formFields = [
    {
      type: 'text',
      label: 'Ürün Adı',
      valueKey: 'name',
      placeholder: 'Ürün Adını Girin',
    },
    {
      type: 'text',
      label: 'SKU (Stok Kodu)',
      valueKey: 'sku',
      placeholder: 'SKU Girin',
    },
    {
      type: 'number',
      label: 'Stok Adeti',
      valueKey: 'stockAmount',
      placeholder: 'Stok Miktarı',
    },
    {
      type: 'number',
      label: 'Fiyat',
      valueKey: 'price1',
      placeholder: 'Ürün Fiyatı',
    },
    {
      type: 'picker',
      label: 'Stok Türü',
      valueKey: 'stockTypeLabel',
      options: [
        {label: 'Piece', value: 'Piece'},
        {label: 'cm', value: 'cm'},
        {label: 'Dozen', value: 'Dozen'},
        {label: 'gram', value: 'gram'},
        {label: 'kg', value: 'kg'},
        {label: 'Person', value: 'Person'},
        {label: 'Package', value: 'Package'},
        {label: 'metre', value: 'metre'},
        {label: 'm2', value: 'm2'},
        {label: 'pair', value: 'pair'},
      ],
    },
    {
      type: 'picker',
      label: 'Özel Kargo Devre Dışı mı?',
      valueKey: 'customShippingDisabled',
      options: [
        {label: 'Hayır', value: 0},
        {label: 'Evet', value: 1},
      ],
    },
    {
      type: 'picker',
      label: 'Hediye Durumu',
      valueKey: 'hasGift',
      options: [
        {label: 'Hayır', value: 0},
        {label: 'Evet', value: 1},
      ],
    },
    {
      type: 'picker',
      label: 'Durum',
      valueKey: 'status',
      options: [
        {label: 'Hayır', value: 0},
        {label: 'Evet', value: 1},
      ],
    },
    {
      type: 'picker',
      label: 'Seçenek Var mı?',
      valueKey: 'hasOption',
      options: [
        {label: 'Hayır', value: 0},
        {label: 'Evet', value: 1},
      ],
    },
    {
      type: 'picker',
      label: 'İndirim Türü',
      valueKey: 'discountType',
      options: [
        {label: 'Hayır', value: 0},
        {label: 'Evet', value: 1},
      ],
    },
    {
      type: 'picker',
      label: 'Vergi Dahil mi?',
      valueKey: 'taxIncluded',
      options: [
        {label: 'Hayır', value: 0},
        {label: 'Evet', value: 1},
      ],
    },
    {
      type: 'picker',
      label: 'Kategori Görüntüleme Durumu',
      valueKey: 'categoryShowcaseStatus',
      options: [
        {label: 'Hayır', value: 0},
        {label: 'Evet', value: 1},
      ],
    },
  ];

  const handleProducts = async () => {
    const allFielsFilled = Object.values(product).every(
      p => p != null && p != 'default' && p !== '',
    );

    if (!allFielsFilled)
      return Alert.alert('Hata', 'Tüm Alanları Doldurun', [{text: 'Tamam'}]);
    const url = editItem
      ? 'https://testcase.myideasoft.com/admin-api/products/' + `${editItem.id}`
      : 'https://testcase.myideasoft.com/admin-api/products';

    const method = editItem ? 'PUT' : 'POST';

    const newProductData = {
      name: `${product.name}`,
      sku: `${product.sku}`,
      stockAmount: Number(product.stockAmount),
      price1: Number(product.price1),
      currency: {
        id: 3,
        property1: [
          'product',
          'subscription_product',
          'tabbed_midblock_product',
          'draft_order',
        ],
        property2: [
          'product',
          'subscription_product',
          'tabbed_midblock_product',
          'draft_order',
        ],
      },
      discountType: product?.discountType,
      taxIncluded: product?.taxIncluded,
      stockTypeLabel: `${product.stockTypeLabel}`,
      customShippingDisabled: product?.customShippingDisabled,
      hasGift: product.hasGift,
      status: product.status,
      hasOption: product.hasOption,
      categoryShowcaseStatus: product.categoryShowcaseStatus,
    };

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer AX5FTZ7UBAABUDT6XYYPW7LX',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProductData),
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
      <TouchableOpacity style={styles.addButton} onPress={handleProducts}>
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
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddProduct;
