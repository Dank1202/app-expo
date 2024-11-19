import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useFetch from '@/hooks/useApi';

type CarItem = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
};

export default function SearchScreen({ navigation }) {
  const { data, loading, error } = useFetch<CarItem[]>('GET', 'http://utcalvillo.ddns.net:3000/api/cars');
  const [searchText, setSearchText] = useState('');

  // Filtrar y ordenar los vehículos basados en el texto de búsqueda
  const filteredData = data?.sort((a, b) => {
    const aIncludes = a.title.toLowerCase().includes(searchText.toLowerCase());
    const bIncludes = b.title.toLowerCase().includes(searchText.toLowerCase());
    if (aIncludes && !bIncludes) return -1;
    if (!aIncludes && bIncludes) return 1;
    return 0;
  });

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          placeholder="Buscar"
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Lista de autos */}
      <FlatList
        data={filteredData || []}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Reservation', { car: item })}>
            <View style={styles.card}>
              <Image source={{ uri: item.imageUrl }} style={styles.carImage} />
              <Text style={styles.carTitle}>{item.title}</Text>
              <Text style={styles.carDescription}>{item.description}</Text>
            </View>
          </TouchableOpacity>
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
  carImage: {
    height: 100,
    borderRadius: 5,
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
