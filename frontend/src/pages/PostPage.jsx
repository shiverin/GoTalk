import React from 'react';  
import { useParams } from 'react-router-dom';  
  
export default function PostPage() {  
  // This hook grabs the ':id' from the URL, e.g., "/post/123" -> id will be "123"  
  const { id } = useParams();  
  
  return (  
    <div style={{ padding: '2rem', textAlign: 'center' }}>  
      <h1>Post Detail Page</h1>  
      <p>You are viewing the post with ID: <strong>{id}</strong></p>  
      <p><em>(Here you would fetch and display the specific post's data)</em></p>  
      <a href="/">Go back to Landing Page</a>  
    </div>  
  );  
}