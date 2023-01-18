import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';


const DisplayProducts = ({products}) => {
  return (
   <View style={styles.container}>
       <Text style={styles.textStyle}>{products.productName}</Text>
       <Text style={styles.textStyle2}>{products.cost}</Text>
   </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#fff',
        borderColor: '#000',
        borderWidth: 2,
        padding: 10
    },
    textStyle: {
        fontSize: 15,
        marginBottom: 5
    },
    textStyle2: {
        fontSize: 10,
        // marginBottom: 5
    }
})
export default DisplayProducts;