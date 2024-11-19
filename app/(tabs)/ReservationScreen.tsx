// ReservationScreen.tsx
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useUser } from '@/context/UserContext'; // Importa el contexto

type CarItem = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
};

type RootStackParamList = {
  Search: undefined;
  Reservation: { car: CarItem };
};

type ReservationScreenRouteProp = RouteProp<RootStackParamList, 'Reservation'>;
type ReservationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Reservation'>;

type Props = {
  route: ReservationScreenRouteProp;
  navigation: ReservationScreenNavigationProp;
};

const ReservationScreen: React.FC<Props> = ({ route }) => {
  const { car } = route.params; // Auto seleccionado
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [showPickupDatePicker, setShowPickupDatePicker] = useState(false);
  const [showReturnDatePicker, setShowReturnDatePicker] = useState(false);
  const { userId } = useUser(); // Usa el contexto para obtener el userId
  const state = 'Confirmed'; // Estado de la reserva

  const handleReservationSubmit = async () => {
    if (!pickupDate || !returnDate) {
      Alert.alert('Error', 'Selecciona las fechas de recogida y regreso.');
      return;
    }

    if (!userId) {
      Alert.alert('Error', 'No se pudo obtener el ID del usuario.');
      return;
    }

    const reservationData = {
      carId: car._id,
      userId, // Incluye el userId desde el contexto
      startDate: pickupDate.toISOString(),
      endDate: returnDate.toISOString(),
      state, // Incluye el estado
    };

    try {
      const response = await fetch('http://utcalvillo.ddns.net:3000/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservationData),
      });

      if (response.ok) {
        Alert.alert('Reserva creada', '¡Tu reserva se realizó con éxito!');
      } else {
        const error = await response.json();
        Alert.alert('Error', error.message || 'Hubo un problema al crear la reserva.');
      }
    } catch (err) {
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Información del auto seleccionado */}
      <View style={styles.carDetails}>
        <Image source={{ uri: car.imageUrl }} style={styles.carImage} />
        <Text style={styles.carTitle}>{car.title}</Text>
        <Text style={styles.carDescription}>{car.description}</Text>
      </View>

      {/* Selección de fechas */}
      <Text style={styles.label}>Fecha de recogida:</Text>
      <Button
        title={pickupDate ? pickupDate.toDateString() : 'Seleccionar fecha'}
        onPress={() => setShowPickupDatePicker(true)}
      />
      {showPickupDatePicker && (
        <DateTimePicker
          value={pickupDate || new Date()}
          mode="date"
          onChange={(event, date) => {
            setShowPickupDatePicker(false);
            if (date) setPickupDate(date);
          }}
        />
      )}

      <Text style={styles.label}>Fecha de regreso:</Text>
      <Button
        title={returnDate ? returnDate.toDateString() : 'Seleccionar fecha'}
        onPress={() => setShowReturnDatePicker(true)}
      />
      {showReturnDatePicker && (
        <DateTimePicker
          value={returnDate || new Date()}
          mode="date"
          onChange={(event, date) => {
            setShowReturnDatePicker(false);
            if (date) setReturnDate(date);
          }}
        />
      )}

      {/* Botón para reservar */}
      <Button title="Reservar" onPress={handleReservationSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  carDetails: {
    marginBottom: 20,
    alignItems: 'center',
  },
  carImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
  carTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  carDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReservationScreen;
