// frontend/src/App.jsx  
import { useState, useEffect } from 'react'  
import './App.css'  

function App() {  
  const [posts, setPosts] = useState([])  
  const [error, setError] = useState(null)  

  useEffect(() => {  
    // This function will call our Go API  
    const fetchPosts = async () => {  
      try {  
        // This URL MUST match the server address and port of your Go app  
        const response = await fetch('http://localhost:8080/api/posts')  

        if (!response.ok) {  
          throw new Error(`HTTP error! status: ${response.status}`)  
        }  
          
        const data = await response.json()  
        setPosts(data) // Set the posts in our state  
      } catch (e) {  
        console.error('Fetch error:', e)  
        setError(e.message)  
      }  
    }  

    fetchPosts()  
  }, []) // The empty array ensures this effect runs only once on component mount  

  return (  
    <div className="App">  
      <h1>GoTalk Forum</h1>  
      <h2>Posts from our Go API:</h2>  
      {error && <p className="error">Error fetching data: {error}</p>}  
      <div className="posts-list">  
        {posts.length > 0 ? (  
          posts.map((post) => (  
            <div key={post.id} className="post-item">  
              <h3>{post.title}</h3>  
              <p>Posted on: {new Date(post.createdAt).toLocaleString()}</p>  
            </div>  
          ))  
        ) : (  
          <p>Loading posts...</p>  
        )}  
      </div>  
    </div>  
  )  
}  

export default App