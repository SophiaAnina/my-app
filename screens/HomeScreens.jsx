import { View, Text, Button,StyleSheet, ScrollView, Image,TouchableOpacity,Stack, useColorScheme } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import Beskrivelse from './Beskrivelse';


export default function HomeScreens() {
    const navigation = useNavigation(); // vi bruger 'useNavigation' til at navigere til andre sider.
    const Stack = createNativeStackNavigator();

    const navigateToBeskrivelse = () => {
        navigation.navigate('Beskrivelse') // navigerer til 'Cat' siden.
    }


  const colorScheme = useColorScheme();
    return (
      
      <ScrollView style={styles.container}>
         
      <View style={styles.header}>
      <Image  style={styles.logo} source={require('./gotur.png')} />
        </View>
      <Text  style={styles.overskrift}>Forslået til dig</Text>
      <StatusBar style="auto" />
      <ScrollView horizontal style={styles.scrollHolder}>
        <ScrollView horizontal style={styles.imageScroll}>

        <TouchableOpacity  onPress={navigateToBeskrivelse}>
        <View style={styles.imageHolder}>
          <Image  style={styles.image} source={require('./benk.jpg')} />
          <Text  style={styles.overlayText}>Rundt om Lyngby sø</Text>
        </View>
        </TouchableOpacity>

       
        <TouchableOpacity  onPress={navigateToBeskrivelse}>
        <View style={styles.imageHolder}>
          <Image  style={styles.image} source={require('./park.jpg')} />
          <Text  style={styles.overlayText}>Rundt om Lyngby sø</Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={navigateToBeskrivelse}>
      <View style={styles.imageHolder}>
          <Image  style={styles.image} source={require('./skov.jpg')} />
          <Text  style={styles.overlayText}>Rundt om Lyngby sø</Text>
        </View>
     </TouchableOpacity>
        
        

        </ScrollView>
      </ScrollView>
      <Text  style={styles.overskrift}>Rute med legeplads</Text>

      <ScrollView horizontal style={styles.scrollHolder}>

        <ScrollView horizontal style={styles.imageScroll}>

        <TouchableOpacity  onPress={navigateToBeskrivelse}>
        <View style={styles.imageHolder}>
          <Image  style={styles.image} source={require('./legeplads.jpg')} />
          <Text  style={styles.overlayText}>Rundt om Lyngby sø</Text>
        </View>
        </TouchableOpacity>
        
        <TouchableOpacity  onPress={navigateToBeskrivelse}>
        <View style={styles.imageHolder}>
          <Image  style={styles.image} source={require('./tur.jpg')} />
          <Text  style={styles.overlayText}>Rundt om Lyngby sø</Text>
        </View>
      </TouchableOpacity>

        </ScrollView>
      </ScrollView>
      <Text  style={styles.overskrift}>Rute med historie</Text>
      <ScrollView horizontal style={styles.scrollHolder}>
        <ScrollView horizontal style={styles.imageScroll}>
        
        <TouchableOpacity  onPress={navigateToBeskrivelse}>
          <View style={styles.imageHolder}>
          <Image  style={styles.image} source={require('./city.jpg')} />
          <Text  style={styles.overlayText}>Rundt om Lyngby sø</Text>
        </View>
        </TouchableOpacity>
        
        <TouchableOpacity  onPress={navigateToBeskrivelse}>
        <View style={styles.imageHolder}>
          <Image  style={styles.image} source={require('./lake.jpg')} />
          <Text  style={styles.overlayText}>Rundt om Lyngby sø</Text>
        </View>
        </TouchableOpacity>
        
        <TouchableOpacity  onPress={navigateToBeskrivelse}>
          <View style={styles.imageHolder}>
          <Image  style={styles.image} source={require('./running.jpg')} />
          <Text  style={styles.overlayText}>Rundt om Lyngby sø</Text>
        </View>
        </TouchableOpacity>
        
        </ScrollView>
      </ScrollView>

    </ScrollView>
);
}
  const styles = StyleSheet.create({
  navigator:{
    backgroundColor: '#BAC7BE',
  },
  logo:{
    alignSelf:'center',
   resizeMode:'contain',
   width:300,
   marginHorizontal:60,
   
  },
  container: {
    flex: 1,
    backgroundColor: '#BAC7BE',
    overflow:'scroll',
    
    
  },
  header:{
    height:100,
    justifyContent:'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
   
  },
  text:{
  fontSize:24,
  margin:20,
  alignSelf:'center',
  },
  overskrift:{
    fontSize:26,
    color:'#3E5641',
    fontWeight:'500',
    marginLeft:20,
    marginBottom:20,
  },
  buttonHolder:{
    width:'100%',
    flexDirection:'row',
  }, 
  buttonText:{
    fontSize:24,
    marginBottom:10,
    marginTop:10,
  },
  overlayText:{
    fontSize:24,
    margin:20,
    alignSelf:'center',
    position:'relative',
    bottom:110,
    zIndex:2,
    color:'white',
    textShadowColor:'#B3B3B3',
    textShadowRadius:20,
    shadowOpacity:0.1,
    },
    scrollHolder:{
      overflow:'scroll',
      resizeMode:'cover'
    },
    imageScroll:{
      overflow:'scroll',
      flexDirection:'row',
      
    },
    imageHolder:{
      flexDirection:'column',
     
    },
  image: {
    width:250,
    height:140,
    alignSelf:'center',
    marginHorizontal:20,
    borderRadius: 20,
    
  },
  icon:{
    color:'black',
    zIndex:2,
  },
  footer:{
    backgroundColor: '#3E5641',
    flexDirection:'row',
    justifyContent:'space-between',
    padding:20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems:'center'
  },

  TilføjRute:{
  alignContent:'center',
  justifyContent:'center'
  },
  TilføjRuteText:{
    fontSize:16,
    fontWeight:'bold',
    color:'white',
    alignSelf:'center',
    
  },
  TilføjRutePlus:{
    fontSize:60,
    color:'white',
    alignSelf:'center'

    
  },
  FindRuteText:{
  
  fontSize:16,
  fontWeight:'bold',
  color:'white',
  
  },

});
  