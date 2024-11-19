import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './_layout';
import useFetch from '@/hooks/useApi';
import { useUser } from '@/context/UserContext'; // Importa el contexto

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

interface LoginResponse {
  message: string;
  token?: string;
  userId?: string; // Añade userId en la respuesta
}

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  const { data, loading, error, fetchData } = useFetch<LoginResponse>(
    'POST',
    'http://utcalvillo.ddns.net:3000/api/users/login'
  );

  const { setUserId } = useUser(); // Usa el contexto

  const handleLogin = async () => {
    setLoginMessage('');
    fetchData({ email, password });
  };

  useEffect(() => {
    if (data) {
      if (data.message === 'Inicio de sesión exitoso') {
        setLoginMessage('Inicio de sesión exitoso');
        if (data.userId) {
          setUserId(data.userId); // Almacena el userId en el contexto
        }
        navigation.navigate('Search');
      } else {
        setLoginMessage(data.message || 'Error desconocido');
      }
    }
  }, [data, navigation, setUserId]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{ uri: 'https://via.placeholder.com/150' }}
      />
      <Text style={styles.title}>Iniciar Sesión</Text>

      <Text style={styles.label}>Correo Electrónico</Text>
      <TextInput
        style={styles.input}
        placeholder="name@example.com"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Contraseña</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="********"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text>{showPassword ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text>Iniciar Sesión</Text>}
      </TouchableOpacity>

      {loginMessage && <Text style={styles.message}>{loginMessage}</Text>}
      {error && <Text style={styles.error}>Error: {error}</Text>}

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.link}>Crear cuenta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  logo: { width: 100, height: 100, alignSelf: 'center' },
  title: { fontSize: 24, textAlign: 'center', marginVertical: 20 },
  label: { fontSize: 16, marginVertical: 5 },
  input: { borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 15 },
  passwordContainer: { flexDirection: 'row', alignItems: 'center' },
  button: { backgroundColor: '#4A90E2', padding: 15, borderRadius: 8, alignItems: 'center' },
  message: { textAlign: 'center', marginVertical: 10 },
  error: { color: 'red', textAlign: 'center', marginTop: 10 },
  link: { textAlign: 'center', color: '#4A90E2', marginTop: 15 },
});
