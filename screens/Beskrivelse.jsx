import { View, Text, StyleSheet,ScrollView,Image,TouchableOpacity} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';



export default function Beskrivelse() {

    return (
      <ScrollView style={styles.container}>

      <View style={styles.header}>
      <Image  style={styles.logo} source={require('./gotur.png')} />
        </View>
        <ScrollView style={styles.container}>
        
        <View style={styles.imageHolder}>
          <Image  style={styles.image} source={require('./bakke.jpg')} />
          <Text  style={styles.overlayText}>Rundt om Lyngby sø</Text>
        </View>
        <Text style={styles.overskift}>Beskrivelse</Text>
        <Text style={styles.text}>
        Der er mange tilgængelige udgaver af Lorem Ipsum, men de fleste udgaver har gennemgået forandringer, når nogen har tilføjet humor eller tilfældige ord, som på ingen måde ser ægte ud. Hvis du skal bruge en udgave af Lorem Ipsum, skal du sikre dig, at der ikke indgår noget pinligt midt i teksten. Alle Lorem Ipsum-generatore på nettet har en tendens til kun at dublere små brudstykker af Lorem Ipsum efter behov, hvilket gør dette til den første ægte generator på internettet. 
        </Text>
        <View style={styles.kategori}>
        <View style={styles.IconHolder}>
        <Text style={styles.IconText}>Nem at Løbe</Text>
        <MaterialIcons name="directions-run" size={60} color="#0288D1" />
          </View>

          <View style={styles.IconHolder}>
        <Text style={styles.IconText}>Hunde Venlig</Text>
        <Ionicons name="paw-sharp" size={60} color="#0288D1" />
        

          </View>

          <View style={styles.IconHolder}>
        <Text style={styles.IconText}>Urban Rute</Text>
        <Ionicons name="business-sharp" size={60} color="#0288D1" />
        

          </View>
        </View>
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
    marginTop:20,
    marginBottom:20,
  },
  text:{
  fontSize:24,
  marginBottom:40,
  marginHorizontal:20,
  alignSelf:'center',
  fontSize:20,
  lineHeight:30,
  letterSpacing:1,
  },
  overskift:{
    fontSize:32,
    color:'#2274A5',
    marginLeft:20,
  },
    scrollHolder:{
      overflow:'scroll',
      resizeMode:'cover'
    },
    imageScroll:{
      overflow:'scroll',
      flexDirection:'row',
      
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
    imageHolder:{
      flexDirection:'column',
     justifyContent:'center'
    },
  image: {
    width:350,
    height:140,
    alignSelf:'center',
    borderRadius: 20,
    justifyContent:'center',
  },
  kategori:{
    flexDirection:'row',
    width:300,
    justifyContent:'space-around',
    marginLeft:20,
    marginBottom:20,
  },
  icon:{
    color:'black',
    zIndex:2,
  },
  IconText:{
    fontSize:20,
    alignSelf:'center',
    color:'#0288D1',
    width:100,
    fontWeight:'600'
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

  color:'#F28123',
  
  },

});
  
  