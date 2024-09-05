import { View, Text, TouchableOpacity, Image, Button, StyleSheet, ScrollView, Dimensions,Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import Entypo from '@expo/vector-icons/Entypo';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreens from './screens/HomeScreens';
import Beskrivelse from './screens/Beskrivelse'
import FindScreen from './FindScreen';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SaveScreen from './screens/SaveScreen';
import * as Location from 'expo-location';
import MapView, { Marker, Polyline } from 'react-native-maps';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
 
const haversine = (start, end) => {
  const R = 6371e3; // metres
  const φ1 = start.latitude * Math.PI/180; 
  const φ2 = end.latitude * Math.PI/180;
  const Δφ = (end.latitude - start.latitude) * Math.PI/180;
  const Δλ = (end.longitude - start.longitude) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c; // in metres
};

function KortScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [route, setRoute] = useState([]);
  const [tracking, setTracking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [locationSubscription, setLocationSubscription] = useState(null);
  const [totalDistance, setTotalDistance] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const timerRef = useRef(null);
  const [previousLocation, setPreviousLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Tilladelse nægtet', 'Tilladelse til at få adgang til placering er nødvendig.');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    })();
  }, []);

  const startTracking = async () => {
    Alert.alert(
      "Start Rutesporing",
      "Er du sikker på, at du vil starte rutesporingen?",
      [
        {
          text: "Annuller",
          style: "cancel"
        },
        {
          text: "Start",
          onPress: async () => {
            setTracking(true);
            setPaused(false);

            // Start timeren for at spore tid
            if (!timerRef.current) {
              timerRef.current = setInterval(() => {
                setElapsedTime(prevTime => prevTime + 1);
              }, 1000);
            }

            // Start tracking af lokation og afstand
            const subscription = await Location.watchPositionAsync(
              {
                accuracy: Location.Accuracy.High,
                timeInterval: 1000,
                distanceInterval: 1,
              },
              (newLocation) => {
                setLocation(newLocation.coords);
                setRoute((prevRoute) => [...prevRoute, newLocation.coords]);

                if (previousLocation) {
                  const distance = haversine(previousLocation, newLocation.coords);
                  setTotalDistance(prevDistance => prevDistance + distance);
                }

                setPreviousLocation(newLocation.coords);
              }
            );
            setLocationSubscription(subscription);
          }
        }
      ]
    );
  };

  const stopTracking = () => {
    if (locationSubscription) {
      locationSubscription.remove();
      setLocationSubscription(null);
      setTracking(false);
      setPaused(false);

      // Stop timeren
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const pauseTracking = () => {
    if (locationSubscription) {
      locationSubscription.remove();
      setLocationSubscription(null);
      setPaused(true);

      // Stop timeren midlertidigt
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const resumeTracking = async () => {
    setPaused(false);

    // Genoptag timeren
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1);
      }, 1000);
    }

    // Genoptag tracking af lokation og afstand
    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (newLocation) => {
        setLocation(newLocation.coords);
        setRoute((prevRoute) => [...prevRoute, newLocation.coords]);

        if (previousLocation) {
          const distance = haversine(previousLocation, newLocation.coords);
          setTotalDistance(prevDistance => prevDistance + distance);
        }

        setPreviousLocation(newLocation.coords);
      }
    );
    setLocationSubscription(subscription);
  };

  const saveRoute = () => {
    Alert.alert('Rute gemt!', 'Din rute er blevet gemt.');
    navigation.navigate('SaveScreen');
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs > 0 ? `${hrs}:` : ''}${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <ScrollView 
      style={styles.container}
    >
      <View style={styles.page}>
        <View style={styles.topBanner}>
        <Image  style={styles.logo} source={require('./logo-hvid.png')} />
        </View>

        <View style={styles.mapContainer}>
          {location && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              showsUserLocation={true}
              followsUserLocation={true}
            >
              <Polyline coordinates={route} strokeColor="#FF0000" strokeWidth={3} />
              <Marker coordinate={location} title="Du er her" />
            </MapView>
          )}
          <View style={styles.mapButtonContainer}>
            {tracking && !paused ? (
              <>
                <TouchableOpacity style={styles.mapButton} onPress={pauseTracking}>
                  <Text style={styles.mapButtonText}>Pause</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.mapButton} onPress={stopTracking}>
                  <Text style={styles.mapButtonText}>Stop</Text>
                </TouchableOpacity>
              </>
            ) : tracking && paused ? (
              <TouchableOpacity style={styles.mapButton} onPress={resumeTracking}>
                <Text style={styles.mapButtonText}>Genoptag</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.mapButton} onPress={startTracking}>
                <Text style={styles.mapButtonText}>Start</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.mapButton} onPress={saveRoute} disabled={tracking}>
              <Text style={[styles.mapButtonText, tracking && { color: '#bbb' }]}>Gem Rute</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Tid: {formatTime(elapsedTime)}</Text>
          <Text style={styles.infoText}>Afstand: {(totalDistance / 1000).toFixed(2)} km</Text>
        </View>
      </View>
    </ScrollView>
  );
}

function StackNavigator(){
  return (
    <Stack.Navigator options={{headerShown: false }}>
    
        <Stack.Screen  name="Home" component={HomeScreens} options={{headerStyle: {backgroundColor: '#3E5641'}, headerTintColor: 'white'}} />
        <Stack.Screen name="Kort" component={KortScreen}/>
        <Stack.Screen name="Find Rute" component={FindScreen} />
        <Stack.Screen name="Beskrivelse" component={Beskrivelse} options={{headerStyle: {backgroundColor: '#3E5641'}, headerTintColor: 'white'}} />
        <Stack.Screen name="SaveScreen" component={SaveScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
  )
}

export default function App() {

  return (
    // Når vi bruger navigation, skal koden 'wrappes' i en NavigationContainer
    <NavigationContainer > 
    
    <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home';
                size = 40;
            } else if (route.name === 'Kort') {
              iconName = focused ? 'plus' : 'plus';
              size = 40
           
            }else if (route.name === 'Find Rute') {
              iconName = focused ? 'shoe-sneaker' : 'shoe-sneaker';
              size = 40
            }
            // You can return any component that you like here!
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'white',
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#3E5641',
           
            
          },
          headerStyle: {
            backgroundColor: '#3E5641',
          },
          headerTintColor: 'white',
        })}>
        <Tab.Screen name="Home" component={StackNavigator}  />
        <Tab.Screen name="Kort" component={KortScreen} />
        <Tab.Screen name="Find Rute" component={FindScreen} />
      </Tab.Navigator>
      {/* name er det navn vi bruger senere når vi vil navigere til en bestemt side.
          component er navnet på componenten */}
        
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#94A89A',
    paddingBottom:100,
    
  },
  page: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  topBanner: {
    backgroundColor: '#314F3E',
    paddingTop: 40,
    alignItems: 'center',
  },
  logo:{
    alignSelf:'center',
   resizeMode:'contain',
   width:300,
   margin:10,
   
  },
  mapContainer: {
    
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderRadius: 10,
    overflow: 'hidden',
    height: '50%',
  },
  map: {
    width: '100%',
    height: '100%',
    margin:0,
  },
  mapButtonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mapButton: {
    backgroundColor: '#3E5641',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  mapButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 30,
    marginVertical: 10,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#314F3E',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#314F3E',
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navButton: {
    alignItems: 'center',
  },
  navButtonText: {
    color: 'white',
    marginTop: 5,
    marginBottom: 10,
    fontSize: 12,
  },
});
