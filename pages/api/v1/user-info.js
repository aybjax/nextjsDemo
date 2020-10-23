import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://jsonplaceholder.typicode.com/posts',
  headers :{
      'Content-Type': 'application/json',
      'x-token-access': 'random',
  }
})

export default async (req, res) => {
  const axRes = await axiosInstance.post('/', req.body)
  res.json({ ...axRes.data })
}
  