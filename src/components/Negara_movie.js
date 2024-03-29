import React, { Component, useEffect, useState } from 'react'
import axios  from 'axios'
import {useParams} from 'react-router-dom'
import {Img} from 'react-image'
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate'
import Header from './Header';
import Footer from './Footer';

function Negara() {
  const key = "fb280e17a4edec2501eec3c356448bf9"
  const param = useParams()
  const [no,noHal] = useState(1)
  const [movie,setMovie] = useState([])
  useEffect(()=>{
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_original_language=${param.id}&page=${no}`)
    .then(res=>{
      const hasil = res.data.results
      setMovie(hasil)
    })
    .catch(err=>console.log(err))
  },[no])

  const page = 20
  const curretPage = no*page
  const jmlPage = 10
  const inOnePage = movie
  const changePage = ({selected})=>{
    noHal(selected)
  } 
  return (
    <>
    <div className="head-mo">    
       <div className='hmk'>
           <h3>Film {param.id}</h3> 
       </div>
   </div>
   <div className='pop-mo'>
       { inOnePage.map(item=>{
           return(
          
                   <div className='pop-mov' key ={item.id}>
                        <Link className='main-link' to={`/currentMovie/${item.id}`} key = {item.id}>
                           <div className='title_mo'>               
                                   <Img className="img-movies" src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} width={100}/>
                                   <div className="one_mo"><i class="fas fa-heart"></i> <span>{item.vote_average}</span></div>
                           </div>
                           <div className='title-year'>{item.original_title}<br/>({item.release_date})</div>
                       </Link>
                   </div>
           )})
       }
   </div> 
    <ReactPaginate 
       previousLabel={"<Prev"}
       nextLabel={">Next"}
       pageCount={jmlPage}
       onPageChange={changePage}
       containerClassName={"paginationBtn"}
       previousClassName={"prevBtn"}
       nextClassName={"nextLinkBtn"}
       disabledClassName={'paginationDisabled'}
       activeClassName={'paginationActive'}
       />
   </>

  )
}
export default class Negara_movie extends Component {
  render() {
    return (
      <>
       <Header/>
       <Negara/>
       <Footer/>
      </>
    )
  }
}
