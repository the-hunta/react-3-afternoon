import React, { Component } from 'react';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';

import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

let baseUrl = 'https://practiceapi.devmountain.com/api'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get(baseUrl + '/posts')
    .then(response => this.setState({
        posts: response.data
    }))
    .catch(err => {
      console.log(err)
      toast.error('weeeelllll. that didnt work :(')
    })

  }

  updatePost(id, text) {
    axios.put(baseUrl + '/posts' )
    .then(response =>{
      this.state({posts: response.data});
    })
    .catch(err => {
      console.log(err)
      toast.error('Rip-eroni')
    })
  
  }

  deletePost() {
    axios.delete(baseUrl + '/posts')
    .then(response =>{
      this.state({posts: response.data})
    })
    .catch(err => {
      console.log(err)
      toast.error('uuuummm nnnooooo (-_-)')
    })

  }

  createPost() {
    axios.post(baseUrl + '/posts')
    .then(respone => {
      this.state({posts: response.data})
    })
    .catch(err =>{
      console.log(err)
      toast.error("Yyyyyeeaaahhhh no..")
    })
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>
         {posts.map( post=> (
           <Post key={post.id}
              text={post.text}
              date={post.date}
              updatePostFn={this.updatePost}
              deletePostFn={this.deletePost}/>
         ))}
          
        </section>
      </div>
    );
  }
}

export default App;
