import React, { createContext, ReactNode, useContext, useState } from 'react';

import * as Google from 'expo-google-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: User;
  signInWithGoogle(): Promise<void>;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);

  async function signInWithGoogle() {
    try {
      const result = await Google.logInAsync({
        iosClientId:
          '953430012162-fjtkthapa16m4etv37vr2tp8m6qs16fc.apps.googleusercontent.com',
        androidClientId:
          '953430012162-ckiudeti7veerb8g4j3e5unpec0hnqdg.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        const userLogged = {
          id: String(result.user.id),
          name: result.user.name!,
          email: result.user.email!,
          photo: result.user.photoUrl!,
        };

        setUser(userLogged);

        await AsyncStorage.setItem(
          '@gofinances:user',
          JSON.stringify(userLogged)
        );
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
