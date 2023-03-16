import Clarifai from 'clarifai';
import { Component } from 'react';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin.js';
import Register from './components/Register/Register.js';
import './App.css';

const app = new Clarifai.App({
  apiKey: '9f86d0bde89c41d7910d921089ed6714'
});

const initialState = {
  input:'',
  imageURL:'',
  box: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }
    })
  }

  calcFaceLoc = (data) => {
    const boxSize = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const newArr = data.outputs[0].data.regions.map(region=> {
      return{
        leftCol: region.region_info.bounding_box.left_col * width,
        topRow: region.region_info.bounding_box.top_row * height,
        rightCol: width - (region.region_info.bounding_box.right_col * width),
        bottomRow: height - (region.region_info.bounding_box.bottom_row * height),
      }
    })
    return newArr;
  }

  displayFace = (box) => {
    this.setState({box: box});
  }

  OnInputChange = (event) => {
    this.setState({input: event.target.value});
  } 

  OnSubmit = (e) => {
    // e.preventDefault();
    this.setState({imageURL: this.state.input})
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(response=> {
        if(response){
          // 
          fetch('http://localhost:3001/image', {
            method: 'put',
            headers: {'Content-Type':"application/json"},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response=>response.json())
          .then(count=>{
            this.setState({user: {
              ...this.state.user,
              entries: count
            }
            })
          })
          //.then(count => {
          // this.setState(Object.assign(this.state.user,{entries:count}))
          //})
        }
        
        this.displayFace(this.calcFaceLoc(response))
      })
      .catch(err=>console.log(err));
  }

  onRouteChange = (route) => {
    this.setState({route: route})
    if(route === 'signout'){
      this.setState(initialState)
    }
    else if(route ==='home'){
      this.setState({isSignedIn: true})
    }
    
  }

  render() {
    return (
      <div className="App">
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} className="navbar"/>
        { this.state.route === 'home' 
        ? <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm 
              OnInputChange={this.OnInputChange} 
              OnSubmit={this.OnSubmit}
            />
            <FaceRecognition 
              imageURL={this.state.imageURL}
              box={this.state.box}
            />
          </div>
        : ( this.state.route === 'signin'
            ? <div>
                <Logo />
                <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              </div>
            : <div>
                <Logo />
                <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              </div>
        ) 
      } 
      </div>
    );
  }
  
}

export default App;
