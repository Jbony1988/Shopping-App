import React from 'react';
import {Platform, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import Colors from '../../constants/Colors';

const CustomerHeaderButton = props => {
  const cartItems = useSelector(state => state.cart.items);
  const navigation = useNavigation();
  console.log(Object.keys(cartItems).length);
  // const goToCart = () => {
  //   props.navigation.navigate('Cart');
  // };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Cart')}
      style={[
        {padding: 5},
        Platform.OS === 'android' ? styles.iconContainer : null,
      ]}>
      <View style={styles.cartStyle}>
        <Text style={styles.cartNumberStyle}>
          {Object.keys(cartItems).length}
        </Text>
      </View>
      <Icon name="ios-cart" size={30} />
    </TouchableOpacity>
  );
};

const mapStateToProps = state => ({
  cartItems: state.cart.items,
});

const styles = StyleSheet.create({
  cartStyle: {
    position: 'absolute',
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: Colors.primary,
    right: 5,
    bottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
  },
  cartNumberStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CustomerHeaderButton;
