// SearchScreen.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type CarItem = {
  id: string;
  title: string;
  description: string;
};

const cars: CarItem[] = [
  {
    id: '1',
    title: 'Honda Accord EXL 2.4L',
    description: 'Disfruta de un buen viaje eficiente para toda la familia sin la necesidad de reducir el espacio para una mejor comodidad',
  },
  {
    id: '2',
    title: 'Dodge Challenger',
    description: 'Disfruta de un viaje viviendo la deportividad de un motor V8 un verdadero motor americano 5.7 litros',
  },
];

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput placeholder="Search" style={styles.searchInput} />
      </View>

      {/* Lista de autos */}
      <FlatList
        data={cars}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.imagePlaceholder}>
              <Ionicons name="image" size={50} color="#999" />
            </View>
            <Text style={styles.carTitle}>{item.title}</Text>
            <Text style={styles.carDescription}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
  },
  imagePlaceholder: {
    height: 100,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  carTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  carDescription: {
    fontSize: 14,
    color: '#666',
  },
});