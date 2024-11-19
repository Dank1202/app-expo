// ProfileScreen.tsx
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Necesita expo install @expo/vector-icons para los íconos.
import useFetch from '@/hooks/useApi';

const ProfileScreen = () => {
  const [profile, setProfile] = useState({
    name: '',
    location: '',
    email: '',
    phoneNumber: '',
  });

  const { data, error, loading } = useFetch(
    'GET',
    'http://utcalvillo.store:3000/profile'
  );

  console.log('Hola')

  const printResults = () => {
    if (data) {
      console.log('Datos recibidos:', data);
      console.log('HOla')
    } else if (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (!loading) {
      printResults();
    }
  }, [data, error, loading]);

  console.log('Hola')

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      {/* Ícono de Cerrar */}
      <TouchableOpacity style={styles.closeIcon}>
        <Ionicons name="close-outline" size={28} color="black" />
      </TouchableOpacity>
      {/* Imagen de Perfil */}
      <Image style={styles.profileImage} source={{ uri: 'https://via.placeholder.com/100' }} />
      {/* Nombre y Ubicación */}
      <Text style={styles.name}>{profile.name}</Text>
      <Text style={styles.location}>
        <Ionicons name="location-outline" size={14} color="gray" /> {profile.location}
      </Text>
      {/* Línea divisoria */}
      <View style={styles.separator} />
      {/* Información del perfil */}
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Ionicons name="mail-outline" size={20} color="black" />
          <Text style={styles.infoLabel}>Email</Text>
        </View>
        <Text style={styles.infoText}>{profile.email}</Text>
        <View style={styles.infoRow}>
          <Ionicons name="person-outline" size={20} color="black" />
          <Text style={styles.infoLabel}>Nombre</Text>
        </View>
        <Text style={styles.infoText}>{profile.name}</Text>
        <View style={styles.infoRow}>
          <Ionicons name="call-outline" size={20} color="black" />
          <Text style={styles.infoLabel}>Número de teléfono</Text>
        </View>
        <Text style={styles.infoText}>{profile.phoneNumber}</Text>
      </View>
      {/* Botón de Cerrar Sesión */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => console.log('Cerrar sesión')}>
        <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  closeIcon: {
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 30,
    right: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 20,
    marginBottom: 10,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  location: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  separator: {
    width: '90%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
  infoContainer: {
    width: '90%',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
    color: '#333',
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 30,
    marginBottom: 15,
  },
  logoutButton: {
    width: '80%',
    backgroundColor: '#888',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;
