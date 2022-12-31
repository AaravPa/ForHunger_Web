import * as React from 'react';
import { Button, Text, View, StyleSheet, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, Image, TextInput, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { firebase } from './config';
import axios from 'axios';

const HomeStack = createStackNavigator();
var count = false

export default class App extends React.Component {
  
  constructor() {
    super()
    this.state = {
      donation:'',
      donation_quantity:'',
      address:'',
      name:'',
      emailnumber:'',
      password:'',
      req_name:'',
      req_emailnumber:'',
      req_password:'',
      org_name:'',
      custom_req:'',
      DonationList:'',
      searchKeyword: '',
      searchResults: [],
      isShowingResults: false,
    }
    this.requestRef= null
    this.DonationScreen1 = this.DonationScreen1.bind(this);
    this.DonationScreen2 = this.DonationScreen2.bind(this);
    this.DonationScreen3 = this.DonationScreen3.bind(this);
    this.DonationScreen4 = this.DonationScreen4.bind(this);
    this.DonationScreen5 = this.DonationScreen5.bind(this);
    this.RequestScreen1 = this.RequestScreen1.bind(this);
    this.RequestScreen2 = this.RequestScreen2.bind(this);
    this.RequestScreen3 = this.RequestScreen3.bind(this);
    this.CustomRequestScreen = this.CustomRequestScreen.bind(this);
    this.CustomDonationScreen = this.CustomDonationScreen.bind(this);
  }

  searchLocation = async (text) => {
    this.setState({searchKeyword: text});
    axios
      .request({
        method: 'post',
        url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyDs33U1Dwj_k2i-D_vZbkzAdAtGkGeqDKI&input=${this.state.searchKeyword}`,
      })
      .then((response) => {
        console.log(response.data);
        this.setState({
          searchResults: response.data.predictions,
          isShowingResults: true,
        });
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

   HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center', backgroundColor:"#4F7942"}}>
        <Text style={styles.title}>For Hunger</Text>
        <Text style={styles.subtitle}>Food is a gift. Pass it on.</Text>
        <TouchableOpacity style={styles.button} onPress={() => {if (count==false) { navigation.navigate('DonationScreen3') } else { navigation.navigate('CustomDonationScreen') }}}>
          <Text style={{fontWeight:"400", fontSize:28, marginTop:2, marginLeft:3, color:"white"}}>Donate</Text> 
        </TouchableOpacity> 
        <TouchableOpacity style={styles.button} onPress={() => {
          if (count==false) { navigation.navigate('RequestScreen1') } else { navigation.navigate('RequestScreen2') }}}>
          <Text style={{fontWeight:"400", fontSize:28, marginTop:2, marginLeft:3, color:"white"}}>Request</Text>
        </TouchableOpacity>
        <Image
        style={styles.image}
        source={require('./food.png')}
        />

        {false &&
          <Image
          style={styles.tinyLogo}
          source={require('./userimage.png')}
          />          
        }
      </View>
    );
  }
  CustomDonationScreen({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center',backgroundColor:"#4F7942" }}>
        <Text style={styles.title11}>Choose Request or Donate?</Text>
      <TouchableOpacity onPress={()=> navigation.navigate('DonationScreen2')}>
        <ListItem style={styles.listbutton} bottomDivider>
            <ListItem.Content style={{borderRadius: 20,borderColor:"white",borderWidth:1}}>
            <ListItem.Title>{this.state.req_name}</ListItem.Title>
              <ListItem.Subtitle>{this.state.custom_req}</ListItem.Subtitle>
              <ListItem.Subtitle>{this.state.req_emailnumber}</ListItem.Subtitle>
              <ListItem.Subtitle>{this.state.org_name}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
        <TouchableOpacity style={styles.nextbutton} onPress={() => navigation.navigate('DonationScreen1')}>
          <Text style={{fontWeight:"400", fontSize:20, textAlign:"center", marginTop:-2, marginLeft:-5, color:"white"}}>Donate</Text>
        </TouchableOpacity>
      </View>
    );
  }
   DonationScreen1({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center', backgroundColor:"#4F7942" }}>
        <Text style={styles.title2}>Custom Donation</Text>
        <Text style={styles.subtitle2}>What Would You Like to Donate?</Text>
        <TextInput style={styles.inputBox} placeholder={"ex. flour"} placeholderTextColor="white" onChangeText= {(text) => {
          this.setState({donation:text});
        }}></TextInput>
        <Text style={styles.subtitle3}>How Much Would You Like to Donate?</Text>
        <TextInput style={styles.inputBox} placeholder={"ex. 10 lbs"} placeholderTextColor="white" onChangeText= {(text) => {
          this.setState({donation_quantity:text});
        }}
        ></TextInput>
        <TouchableOpacity style={styles.nextbutton} onPress={
          () => firebase.firestore()
            .collection('donate')
            .add({
              donation: this.state.donation,
              quantity: this.state.donation_quantity,
            })
            .then(()=> {
            navigation.navigate('DonationScreen2')
             })
             }>
          <Text style={{fontWeight:"400", fontSize:30, textAlign:"center", marginTop:-7, marginLeft:-5, color:"white"}}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
   DonationScreen2({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center', backgroundColor:"#4F7942" }}>
        <Text style={styles.title3}>Pickup</Text>
        <Text style={styles.subtitle4}>Enter Method of Delivery</Text>
        <TouchableOpacity style={styles.nextbutton7} onPress={() => {this.setState({address:"Car/SUV"});navigation.navigate('DonationScreen4')}}>
          <Text style={{fontWeight:"400", fontSize:20, textAlign:"center", marginTop:-2, marginLeft:-5, color:"white"}}>Car/SUV</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextbutton7} onPress={() => {this.setState({address:"Van/Truck"});navigation.navigate('DonationScreen4')}}>
          <Text style={{fontWeight:"400", fontSize:20, textAlign:"center", marginTop:-2, marginLeft:-5, color:"white"}}>Van/Truck</Text>
        </TouchableOpacity>
        <View style={styles.autocompleteContainer}>
        <TextInput style={styles.inputBox4} placeholder={"Other"} placeholderTextColor={"white"} onChangeText= {(text) => {
          this.setState({address:text});
        }}></TextInput>
            </View>
        <TouchableOpacity style={styles.nextbutton} onPress={() => 
          firebase.firestore()
            .collection('donate')
            .add({
              address: this.state.address
            })
            .then(()=> {
              navigation.navigate('DonationScreen4')
             })}>
          <Text style={{fontWeight:"400", fontSize:30, textAlign:"center", marginTop:-7, marginLeft:-5, color:"white"}}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
   DonationScreen3({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center', backgroundColor:"#4F7942" }}>
        <Text style={styles.title4}>Create An Account</Text>
        <Text style={styles.subtitle5}>Please Create an Account to Continue</Text>
        <TextInput style={styles.inputBox2} placeholder={"Full Name"} onChangeText= {(text) => {
          this.setState({ name: text});
        }}
        multiline={true}
        placeholderTextColor="white"
       ></TextInput>
        <TextInput style={styles.inputBox2} placeholder={"Email Address/Phone Number"} onChangeText= {(text) => {
          this.setState({ emailnumber: text});
        }}
        multiline={true}
        placeholderTextColor="white"
        ></TextInput>
        <TextInput style={styles.inputBox2} placeholder={"Password"} secureTextEntry = {true} onChangeText= {(text) => {
          this.setState({ password: text});
        }}
        multiline={true}
        placeholderTextColor="white"
        ></TextInput>
        <TouchableOpacity style={styles.nextbutton} onPress={() => 
          firebase.firestore()
            .collection('user_info')
            .add({
              name:this.state.name,
              emailnumber:this.state.emailnumber,
              password:this.state.password
            })
            .then(()=> {
            navigation.navigate('CustomDonationScreen')
             })}>
          <Text style={{fontWeight:"400", fontSize:30, textAlign:"center", marginTop:-7, marginLeft:-5, color:"white"}}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
   DonationScreen4({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center', backgroundColor:"#4F7942" }}>
        <Text style={styles.title5}>Confirmation</Text>
        <Text style={styles.subtitle6}>Are You Sure You Want to Donate?</Text>
        <TouchableOpacity style={styles.nextbutton} onPress={() => navigation.navigate('DonationScreen5')}>
          <Text style={{fontWeight:"400", fontSize:28, textAlign:"center", marginTop:-7, marginLeft:-5, color:"white"}}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextbutton} onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={{fontWeight:"400", fontSize:28, textAlign:"center", marginTop:-7, marginLeft:-7.7, color:"white"}}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
   DonationScreen5({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center', backgroundColor:"#4F7942" }}>
        <Text style={styles.title6}>Your Donation Has Been Submitted</Text>
        <Text style={styles.subtitle7}>Thank you for being a part of ending hunger!</Text>
        <TouchableOpacity style={styles.nextbutton2} onPress={() => {this.setState({count:true}); console.log(count); navigation.navigate('DonationScreen1')}}>
          <Text style={{fontWeight:"400", fontSize:28, textAlign:"center", marginTop:-7, marginLeft:-7.7, color:"white"}}>Donate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextbutton6} onPress={() => {this.setState({count:true}); console.log(count); navigation.navigate('HomeScreen')}}>
          <Text style={{fontWeight:"400", fontSize:28, textAlign:"center", marginTop:-7, marginLeft:-5, color:"white"}}>Home</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
   RequestScreen1({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center', backgroundColor:"#4F7942" }}>
        <Text style={styles.title7}>Create An Account</Text>
        <Text style={styles.subtitle5}>Please Create an Account to Continue</Text>
        <TextInput style={styles.inputBox2} placeholder={"Full Name"} placeholderTextColor="white" onChangeText= {(text) => {
          this.setState({ req_name: text});
        }}
        multiline={true}
        ></TextInput>
        <TextInput style={styles.inputBox2} placeholder={"Email Address/Phone Number"} placeholderTextColor="white" onChangeText= {(text) => {
          this.setState({ req_emailnumber: text});
        }}
        multiline={true}
        ></TextInput>
        <TextInput style={styles.inputBox2} placeholder={"Password"} placeholderTextColor="white" secureTextEntry={true} onChangeText= {(text) => {
          this.setState({ req_password: text});
        }}
        multiline={true}
        ></TextInput>
        <TextInput style={styles.inputBox2} placeholder={"Organization Name"} placeholderTextColor="white" onChangeText= {(text) => {
          this.setState({ org_name: text});
        }}
        multiline={true}
        ></TextInput>
        <TouchableOpacity style={styles.nextbutton} onPress={() => 
          firebase.firestore()
            .collection('user_info')
            .add({
              req_name:this.state.req_name,
              req_emailnumber:this.state.req_emailnumber,
              req_password:this.state.req_password,
              org:this.state.org_name
            })
            .then(()=> {
            navigation.navigate('RequestScreen2')
             })}>
          <Text style={{fontWeight:"400", fontSize:30, textAlign:"center", marginTop:-7, marginLeft:-5, color:"white"}}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
   RequestScreen2({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center', backgroundColor:"#4F7942" }}>
        <Text style={styles.title10}>Select An Option or Request</Text>
        <TouchableOpacity onPress={()=> navigation.navigate('CustomRequestScreen')}>
          <ListItem style={styles.listbutton} bottomDivider>
            <ListItem.Content>
            <ListItem.Title>{this.state.name}</ListItem.Title>
              <ListItem.Subtitle>{this.state.donation}</ListItem.Subtitle>
              <ListItem.Subtitle>{this.state.donation_quantity}</ListItem.Subtitle>
              <ListItem.Subtitle>{this.state.emailnumber}</ListItem.Subtitle>
              <ListItem.Subtitle>{this.state.address}</ListItem.Subtitle>
            </ListItem.Content>
            </ListItem>
          </TouchableOpacity>
            <TouchableOpacity style={styles.nextbutton5} onPress={() => navigation.navigate("CustomRequestScreen")}>
          <Text style={{fontWeight:"400", fontSize:20, textAlign:"center", color:"white"}}>Request</Text>
          </TouchableOpacity>
      </View>
    );
  }
  
   RequestScreen3({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center', backgroundColor:"#4F7942" }}>
        <Text style={styles.title9}>Your Request Has Been Submitted</Text>
        <Text style={styles.subtitle9}>Thank you for the contribution!</Text>
        <TouchableOpacity style={styles.nextbutton} onPress={() => {count=true; navigation.navigate('HomeScreen')}}>
          <Text style={{fontWeight:"400", fontSize:30, textAlign:"center", marginTop:-7, marginLeft:-5, color:"white"}}>Home</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  CustomRequestScreen({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center', backgroundColor:"#4F7942" }}>
        <Text style={styles.title8}>Be Specific</Text>
        <Text style={styles.subtitle8}>What Would You Like To Request?</Text>
        <TextInput style={styles.inputBox3} placeholder={"Type Here"} placeholderTextColor="white" onChangeText= {(text) => {
          this.setState({ custom_req: text});
        }}
        multiline={true}></TextInput>
        <TouchableOpacity style={styles.nextbutton} onPress={() => 
          firebase.firestore()
            .collection('request')
            .add({
              custom_req:this.state.custom_req
            })
            .then(()=> {
            navigation.navigate('RequestScreen3')
             })}>
          <Text style={{fontWeight:"400", fontSize:30, textAlign:"center", marginTop:-7, marginLeft:-5, color:"white"}}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  
  

  render() {
    return (
      <NavigationContainer>
        <HomeStack.Navigator screenOptions={{
          headerShown: false
        }}>
          <HomeStack.Screen name="HomeScreen" component={this.HomeScreen} />  
          <HomeStack.Screen name="DonationScreen3" component={this.DonationScreen3} />
          <HomeStack.Screen name="CustomDonationScreen" component={this.CustomDonationScreen} /> 
          <HomeStack.Screen name="DonationScreen1" component={this.DonationScreen1} />
          <HomeStack.Screen name="DonationScreen2" component={this.DonationScreen2} />
          <HomeStack.Screen name="DonationScreen4" component={this.DonationScreen4} />
          <HomeStack.Screen name="DonationScreen5" component={this.DonationScreen5} />
          <HomeStack.Screen name="RequestScreen1" component={this.RequestScreen1} />
          <HomeStack.Screen name="RequestScreen2" component={this.RequestScreen2} />
           <HomeStack.Screen name="RequestScreen3" component={this.RequestScreen3} />
          <HomeStack.Screen name="CustomRequestScreen" component={this.CustomRequestScreen}/>
        </HomeStack.Navigator>
      </NavigationContainer>
    );
   }
  }
    
const styles = StyleSheet.create({
  title:{
    fontSize:50,
    fontWeight:"bold",
    alignItems:"left",
    marginLeft:-105,
    marginTop:-280,
    color:"white"
  },
  title2:{
    fontSize:50,
    fontWeight:"bold",
    alignItems:"left",
    marginRight:-35,
    marginTop:-510,
    marginBottom:30,
    color:"white"
  },
  title3:{
    fontSize:50,
    fontWeight:"bold",
    alignItems:"left",
    marginLeft:-310,
    marginTop:-470,
    marginBottom:15,
    marginRight:-100,
    color:"white"
  },
  title4:{
    fontSize:50,
    fontWeight:"bold",
    alignItems:"left",
    marginLeft:-105,
    marginTop:-460,
    marginBottom:15,
    marginRight:-170,
    color:"white"
  },
  title5:{
    fontSize:50,
    fontWeight:"bold",
    alignItems:"left",
    marginLeft:-105,
    marginTop:-600,
    marginBottom:15,
    marginRight:-45,
    color:"white"
  },
  title6:{
    fontSize:50,
    fontWeight:"bold",
    alignItems:"left",
    marginLeft:-5,
    marginTop:-480,
    marginBottom:15,
    marginRight:-130,
    width:500,
    color:"white"
  },
  title7:{
    fontSize:50,
    fontWeight:"bold",
    alignItems:"left",
    marginLeft:-5,
    marginTop:-400,
    marginBottom:15,
    marginRight:-130,
    width:500,
    color:"white"
  },
  title8:{
    fontSize:50,
    fontWeight:"bold",
    alignItems:"left",
    marginLeft:-5,
    marginTop:-560,
    marginBottom:15,
    marginRight:-130,
    width:500,
    color:"white"
  },
  title9:{
    fontSize:50,
    fontWeight:"bold",
    alignItems:"left",
    marginLeft:-5,
    marginTop:-590,
    marginBottom:15,
    marginRight:-130,
    width:500,
    color:"white"
  },
  title10:{
    fontSize:50,
    fontWeight:"bold",
    alignItems:"left",
    marginLeft:-5,
    marginTop:-460,
    marginBottom:15,
    marginRight:-30,
    width:400,
    color:"white"
  },
  title11:{
    fontSize:50,
    fontWeight:"bold",
    alignItems:"left",
    marginLeft:-5,
    marginTop:-590,
    marginBottom:15,
    marginRight:-30,
    width:400,
    color:"white"
  },
  title12:{
    fontSize:50,
    fontWeight:"bold",
    alignItems:"left",
    marginLeft:-5,
    marginTop:-710,
    marginBottom:30,
    marginRight:-605,
    width:1000,
    color:"white"
  },
  subtitle:{
    fontSize:35,
    fontWeight:"400",
    alignItems:"left",
    marginBottom:50,
    color:"white"
  },
  subtitle2:{
    fontSize:35,
    fontWeight:"400",
    alignItems:"left",
    marginBottom:50,
    marginRight:-140,
    color:"white"
  },
  subtitle3:{
    fontSize:35,
    fontWeight:"400",
    alignItems:"left",
    marginBottom:50,
    marginRight:-220,
    color:"white"
  },
  subtitle4:{
    fontSize:35,
    fontWeight:"400",
    alignItems:"left",
    marginBottom:50,
    marginRight:-20,
    color:"white"
  },
  subtitle5:{
    fontSize:35,
    fontWeight:"400",
    alignItems:"left",
    marginBottom:90,
    marginRight:-210,
    color:"white"
  },
  subtitle6:{
    fontSize:35,
    fontWeight:"400",
    alignItems:"left",
    marginBottom:40,
    marginRight:-170,
    color:"white"
  },
  subtitle7:{
    fontSize:35,
    fontWeight:"400",
    alignItems:"left",
    marginBottom:50,
    marginRight:-30,
    width:400,
    color:"white"
  },
  subtitle8:{
    fontSize:35,
    fontWeight:"400",
    alignItems:"left",
    marginBottom:100,
    marginRight:-25,
    width:400,
    color:"white"
  },
  subtitle9:{
    fontSize:35,
    fontWeight:"400",
    alignItems:"left",
    marginBottom:30,
    marginRight:-25,
    width:400,
    color:"white"
  },
  button: {
    width:270,
    height:70,
    borderRadius: 20,
    borderColor:"white",
    borderWidth:1,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    marginLeft:-100,
    marginBottom:30
  },
  tinyLogo: {
    width:50,
    height:50,
    marginRight:-450,
    marginTop:-610,
    marginBottom:560,
    borderColor:"white",
    borderWidth:1
  },
  nextbutton: {
    width:100,
    height:50,
    borderRadius: 20,
    borderColor:"white",
    borderWidth:1,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    marginLeft:-270,
    marginBottom:30,
    color:"white"
  },
  nextbutton2: {
    width:110,
    height:50,
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    marginLeft:-270,
    marginBottom:30,
    marginRight:-5,
    borderColor:"white",
    borderWidth:1,
    color:"white"
  },
  nextbutton3: {
    width:190,
    height:50,
    borderRadius: 20,
    padding: 10,
    marginTop: 30,
    marginBottom: 30,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    marginLeft:-185,
    borderColor:"white",
    borderWidth:1
  },
  nextbutton4: {
    width:190,
    height:50,
    borderRadius: 20,
    padding: 10,
    marginTop: 50,
    marginBottom: -10,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    marginLeft:-185,
    borderColor:"white",
    borderWidth:1
  },
  nextbutton5: {
    width:100,
    height:50,
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    marginLeft:-270,
    marginBottom:80,
    marginTop:30,
    borderColor:"white",
    borderWidth:1
  },
  nextbutton6: {
    width:100,
    height:50,
    borderRadius: 20,
    borderColor:"white",
    borderWidth:1,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    marginLeft:-275,
    marginBottom:30,
    color:"white"
  },
  nextbutton7: {
    width:100,
    height:50,
    borderRadius: 20,
    borderColor:"white",
    borderWidth:1,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    color:"white", 
    flexDirection: "column-reverse",
    justifyContent: "center",
    marginBottom:45,
    marginTop:-20,
    marginLeft:-265
  },
  listbutton: {
    width:370,
    borderColor:"#98BF64",
    borderWidth:1,
    justifyContent: "center",
    marginLeft:-5,
    marginBottom:30
  },
  inputBox: {
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    fontSize: 20,
    marginLeft:-70,
    marginTop:-40,
    marginBottom:30,
    borderColor:"white",
  },
  inputBox2: {
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    fontSize: 20,
    marginLeft:-70,
    marginTop:-40,
    marginBottom:60,
    borderColor:"white",
  },
  inputBox3: {
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor:"white",
    fontSize: 20,
    marginLeft:-70,
    marginTop:-40,
    marginBottom:20 
  },
  inputBox4: {
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    fontSize: 20,
    marginLeft:-60,
    marginTop:-30,
    marginBottom:50,
    borderColor:"white",
  },
  text: {
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor:"white",
    fontSize: 20,
    marginLeft:-70,
    marginTop:-40,
    marginBottom:20 
  },
  autocompleteContainer: {
    zIndex: 1,
  },
  searchResultsContainer: {
    width: 340,
    height: 200,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 50,
  },
  resultItem: {
    width: '100%',
    justifyContent: 'center',
    height: 40,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingLeft: 15,
  },
  searchBox: {
    width: 340,
    height: 50,
    fontSize: 18,
    borderRadius: 8,
    borderColor: '#aaa',
    color: '#000',
    backgroundColor: '#fff',
    borderWidth: 1.5,
    paddingLeft: 15,
  },
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
  },
  image:{
    marginTop:20,
    width:400,
    height:400,
    marginBottom:-120
  }
})

//TO-DO : | change style of list of donations/requests |