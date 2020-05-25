import React from 'react';
import {HeaderButton, Item} from 'react-navigation-header-buttons';
import {
  FlatList,
  Button,
  Platform,
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';

const CustomerHeaderButton = ({props, cartItems}) => {
  console.log(Object.keys(cartItems).length);

  return (
    <View
      style={[
        {padding: 5},
        Platform.OS == 'android' ? styles.iconContainer : null,
      ]}>
      <View
        style={{
          position: 'absolute',
          height: 30,
          width: 30,
          borderRadius: 15,
          backgroundColor: 'rgba(95,197,123,0.8)',
          right: 15,
          bottom: 15,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
        }}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>
          {Object.keys(cartItems).length}
        </Text>
      </View>
      <Icon
        onPress={() => props.navigation.navigate('Cart')}
        name="ios-cart"
        size={30}
      />
    </View>
    // <View style={{padding: 5}}>
    //   <View style={{backgroundColor: 'green', fontSize: 34}}>
    //     {cartItems.length}
    //   </View>
    //   <Icon name="ios-cart" size={30} />
    // </View>
    // <HeaderButton
    //   {...props}
    //   IconComponent={Ionicons}
    //   iconSize={23}
    //   color={Platform.OS === 'android' ? 'white' : Colors.primary}
    // />
  );
};

const mapStateToProps = state => ({
  cartItems: state.cart.items,
});

export default connect(mapStateToProps)(CustomerHeaderButton);
