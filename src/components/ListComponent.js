import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ListComponent = ({
  listData,
  navigation,
  editPageName,
  type,
  setProducts,
}) => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(listData);

  const handleEdit = product => {
    navigation.navigate(`${editPageName}`, {editItem: product, setProducts});
  };

  const handleDeleteProduct = async productId => {
    const url =
      'https://testcase.myideasoft.com/admin-api/' +
      `${type}/` +
      `${productId}`;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer AX5FTZ7UBAABUDT6XYYPW7LX',
        },
      });

      const data = await response.text();

      if (response.ok) {
        setProducts(listData => {
          let newProducts = [...listData];
          const deletedProductIndex = listData.findIndex(
            p => p?.id == productId,
          );
          newProducts.splice(deletedProductIndex, 1);
          return newProducts;
        });
        Alert.alert('Başarılı', `Ürün Silindi.`, [{text: 'Tamam'}]);
      } else {
        console.error('Silme işlemi başarısız:', data);
      }
    } catch (error) {
      console.error('İstek hatası:', error);
    }
  };

  useEffect(() => {
    setFilteredData(listData);
  }, [listData]);

  const handleSearchTextChange = text => {
    setSearchText(text);
    if (text === '') {
      setFilteredData(listData);
    } else {
      const filtered = listData.filter(product =>
        product.name.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredData(filtered);
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.renderItemContainer}>
        <Text>{item?.name} </Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => handleEdit(item)}
            style={styles.icon}>
            <Icon name="pencil" size={20} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDeleteProduct(item?.id)}
            style={styles.icon}>
            <Icon name="trash" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ara..."
          value={searchText}
          onChangeText={handleSearchTextChange}
        />
        <Icon name="search" size={20} color="#666" />
      </View>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{paddingBottom: '20%'}}
      />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate(`${editPageName}`, {setProducts})}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    height: 40,
  },
  iconContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent:"flex-end",
    flex:1
  },
  icon: {
    padding: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007BFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    zIndex: 999,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  renderItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    flex: 1,
    padding:20
  },
});

export default ListComponent;
