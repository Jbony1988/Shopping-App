import React from 'react';
import {Platform, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import Colors from '../../constants/Colors';

const CustomerHeaderButton = props => {
  const cartItems = useSelector(state => state.cart.items);
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Cart')}
      style={[
        styles.button,
        Platform.OS === 'android' ? styles.iconContainer : null,
      ]}>
      <View style={styles.cartStyle}>
        <Text style={styles.cartNumberStyle}>
          {Object.keys(cartItems).length}
        </Text>
      </View>
      <Icon
        name="ios-cart"
        color={Platform.OS === 'android' ? 'white' : ''}
        size={38}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cartStyle: {
    position: 'absolute',
    height: 30,
    width: 30,
    borderRadius: 15,
    left: 6,
    bottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
  },
  cartNumberStyle: {
    color: Platform.OS === 'ios' ? 'white' : 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    padding: 5,
  },
});

export default CustomerHeaderButton;
