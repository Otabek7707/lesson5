
import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
let url = 'http://localhost:5555/books';

function App() {

  // const navigate = useNavigate()

  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [year,setYear] = useState('')
  const [loading,setLoading] = useState (false)
  const [books, setBooks] = useState([])


  useEffect(()=> {
    setLoading(true);
    axios.get(url).then (({data}) =>{
      setLoading(false);
      console.log(data.data)
      setBooks(data.data)
    }).catch((error)=>{
      setLoading(false);
      console.log(error);
    });
  }, [])

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear : year,
    };

    setLoading(true);
    axios.post (url,data).then (() =>{
      setLoading(false);
      getData()
    }).catch((error)=>{
      setLoading(false);
      console.log(error);
    });





    // console.log("fmfmg")

    // axios.post(url, {
    //   title : "Harry poter",
    //   author : "Abror",
    //   publishYear : 2023
    // }).then(resp=>{
    //   console.log(resp)
    // })
  


  };


  const getData = () => {
    setLoading(true);
    axios.get(url).then ((data) =>{
      setLoading(false);
      console.log(data.body)
    }).catch((error)=>{
      setLoading(false);
      console.log(error);
    });
  } 

  return (
    <>
    <div className='sss'>
      <input className='inp'  
       type="text" 
       value={title}
       onChange={(e) =>setTitle(e.target.value)}
       />

      <input className='inp' 
       type="text" 
       value={author}
       onChange={(e) =>setAuthor(e.target.value)}
       />

      <input className='inp'
       type="text" 
       value={year}
       onChange={(e) =>setYear(e.target.value)}
       />
      <button className='btn' onClick={handleSaveBook}>CreateMacBook</button>
    </div>
    <table className='tab'>
      {books.map(function(elem){
          return <tr   key={elem.id} className='tr' ><td className='td'>{elem.title}</td> <br /> <td className='td'>{elem.author}</td> <br /> <td className='td'>{elem.publishYear}</td></tr>
      })}
    </table>
    </>
  )
}

export default App
