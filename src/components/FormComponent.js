import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const FormComponent = ({formType, product, setProduct}) => {
  const [isPickerOpen, setIsPickerOpen] = useState(null);
  const [pickerValue, setPickerValue] = useState(null);

  const handleChange = (field, value) => {
    setProduct(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handlePickerOpen = (valueKey, options) => {
    setIsPickerOpen(valueKey);
    const selectedValue =
      product[valueKey] !== undefined ? product[valueKey] : 'Lütfen Seçiniz';
    setPickerValue(selectedValue);
  };

  const renderItem = ({item}) => {
    if (item.type === 'text' || item.type === 'number') {
      return (
        <View style={{marginBottom: 16}}>
          <Text style={styles.label}>{item.label}</Text>
          <TextInput
            style={styles.input}
            value={product?.[item.valueKey]?.toString()}
            onChangeText={text => handleChange(item.valueKey, text)}
            placeholder={item.placeholder}
            keyboardType={item.type === 'number' ? 'numeric' : 'default'}
          />
        </View>
      );
    }

    if (item.type === 'picker') {
      const selectedValue =
        product[item.valueKey] !== undefined && product[item.valueKey] !== null
          ? product[item.valueKey]
          : 'default';

      return (
        <View style={{marginBottom: 16}}>
          <Text style={styles.label}>{item.label}</Text>
          <TouchableOpacity
            style={styles.pickerLabel}
            onPress={() => handlePickerOpen(item.valueKey, item.options)}>
            <Text>
              {selectedValue === 'default'
                ? 'Lütfen Seçiniz'
                : item.options.find(option => option.value === selectedValue)
                    ?.label}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  };
  const handlePickerSelect = (valueKey, value) => {
    handleChange(valueKey, value);
    setIsPickerOpen(null);
  };
  const closePickerModal = () => {
    setIsPickerOpen(null);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={formType}
        renderItem={renderItem}
        keyExtractor={item => item.valueKey}
      />
      <Modal
        visible={isPickerOpen !== null}
        animationType="fade"
        transparent={true}
        onRequestClose={closePickerModal}>
        <TouchableWithoutFeedback onPress={closePickerModal}>
          <View style={styles.modalBackground} />
        </TouchableWithoutFeedback>

        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Picker
              selectedValue={pickerValue}
              onValueChange={value => setPickerValue(value)}>
              <Picker.Item label="Lütfen Seçiniz" value="default" />
              {formType
                ?.find(item => item?.valueKey === isPickerOpen)
                ?.options.map((option, index) => (
                  <Picker.Item
                    label={option?.label}
                    value={option?.value}
                    key={index}
                  />
                ))}
            </Picker>
            <View style={styles.modalButtons}>
              <Button title="İptal" onPress={closePickerModal} />
              <Button
                title="Seç"
                onPress={() => handlePickerSelect(isPickerOpen, pickerValue)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  switchLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  pickerLabel: {
    fontSize: 16,
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    maxHeight: '40%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalContent: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
export default FormComponent;
