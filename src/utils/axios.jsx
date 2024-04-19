import axios from 'axios'

const instance =axios.create({
    baseURL:"https://api.themoviedb.org/3",
 
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NWEzYWQxMzA2Yjg0ZGQzYTk1YThlZTZkM2U5ZGQ1ZCIsInN1YiI6IjY2MGJiZTQ1MGI1ZmQ2MDE2MjM2YWUxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mz9XsaA8uhlnb8_CaWZ7xSjp1sia5t-b9reX6Y2Kvu0'
      }
    
})
export default instance;