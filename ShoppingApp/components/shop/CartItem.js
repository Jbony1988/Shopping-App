import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CartItem = ({
  imageUrl,
  quantity,
  title,
  amount,
  deleteable,
  onRemove,
  increaseQty,
}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.cartItem}>
        <View>
          <Image style={styles.image} source={{uri: `${imageUrl}`}} />
          {console.log(quantity, 'image')}
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.quantity}>{quantity} </Text>
          <Text style={styles.mainText}>{title}</Text>
          <Text style={styles.mainText}>${amount}</Text>
        </View>
      </View>
      {deleteable && (
        <View style={styles.increaseDecreaseBtn}>
          <TouchableOpacity onPress={onRemove} style={styles.button}>
            <Ionicons
              name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
              size={23}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={increaseQty} style={styles.button}>
            <Ionicons
              name={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
              size={23}
              color="black"
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontFamily: 'OpenSans-Regular',
    color: '#888',
    fontSize: 16,
  },
  mainText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
  },
  button: {
    marginLeft: 20,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#DCDCDC',
  },
  image: {
    height: 75,
    width: 100,
  },
  productInfo: {
    width: '50%',
  },
  increaseDecreaseBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 5,
  },
  wrapper: {
    marginTop: 40,
  },
});

export default CartItem;
