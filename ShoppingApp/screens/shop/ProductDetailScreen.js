import React from 'react';
import {ScrollView, Text, Image, Button, StyleSheet, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';

const ProductDetailScreen = props => {
  const productId = props.navigation.getParam('productId');
  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(prod => prod.id === productId),
  );

  const dispatch = useDispatch();

  const addProductHandler = () => {
    dispatch(cartActions.addToCart(selectedProduct));
  };

  return (
    <ScrollView>
      <Image style={styles.image} source={{uri: selectedProduct.imageUrl}} />
      <View style={styles.action}>
        <Button
          color={Colors.primary}
          title="Add to Cart"
          onPress={addProductHandler}
        />
      </View>

      <Text style={styles.price}>{selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  price: {
    color: '#888',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'OpenSans-Bold',
  },
  description: {
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 20,
    fontFamily: 'OpenSans-Regular',
  },
  action: {
    marginVertical: 10,
    alignItems: 'center',
  },
});

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productTitle'),
  };
};

export default ProductDetailScreen;
