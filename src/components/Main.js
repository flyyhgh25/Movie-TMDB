import React, { Component } from 'react'
import {Img} from 'react-image'
import Header from './Header'

export default class componentName extends Component {
    constructor(props) {
      super(props)
      this.state = {
         isLoaded : false,
         isi : [],
         top:[],
         terbaru:[],
         error:null,
      }
    } 
    componentDidMount(){
        let key = "fb280e17a4edec2501eec3c356448bf9"
        Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&sort_by=popularity$page=1`),
        fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`),
        fetch(`https://api.themoviedb.org/3/movie/latest?api_key=${key}&language=en-US`)
        ])
        .then(([resp1,resp2,resp3])=>Promise.all([resp1.json(),resp2.json(),resp3.json()]))
        .then(([resul,topk,terbarum])=>{
            this.setState({
                isLoaded:true,
                isi:resul.results,
                top:topk.results,
                terbaru:terbarum
            })
        },
        (error)=>{
            this.setState({
                isLoaded:true,
                error
            })
            })
        }
    
    GetPopular=()=>{
        return(
        <div className="main">
            <div className="head-mo">
                <h3>Popular MOVIES</h3>
                <p>Film Popular minggu ini </p>
            </div>
            <div className='pop-mo'>
                {
                    this.state.isi.map(item=>{
                        return(
                            <div className='pop-mov' key ={item.id}>
                                <Img className="img-movies" src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} width={100}/>
                                <div className='title_mo'> 
                                    <div className="one_mo"><i class="fas fa-heart"></i> <span>{item.vote_average}</span></div>
                                    <div className='two-mo'>{item.vote_count} Orang</div>
                                </div>
                                <div className='title-year'>{item.original_title}<br/>({item.release_date})</div>
                            </div>
                        ) 
                    })
                }
            </div>
        </div>
        )}

    GetTop = ()=>{
        return(
            <div className="main">
                <div className="head-mo">
                    <h3>Top MOVIES</h3>
                    <p>Film dengan Rating Terbanyak</p>
                </div>
                <div className='pop-mo'>
                    {
                        this.state.top.map(item=>{
                            return(
                                <div className='pop-mov' key ={item.id}>
                                    
                                    <Img className="img-movies" src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} width={100}/>
                                    <div className='title_mo'> 
                                        <div className="one_mo"><i class="fas fa-heart"></i> <span>{item.vote_average}</span></div>
                                        <div className='two-mo'>{item.vote_count} Orang</div>
                                    </div>
                                    <div className='title-year'>{item.original_title}<br/>({item.release_date})</div>
                                </div>
                            ) 
                        })
                    }
                </div>
            </div>
            )}

    
    render() {
        const {isLoaded,error}= this.state
        if(error){
            return (
                <div>
                    Error: {error.message}
                </div>
            )
        }
        else if(!isLoaded){
            return(
                <div>
                    Loading
                </div>
            )
        }
        else{
            return(
                <>
                <this.GetPopular/>
                <this.GetTop/>
                </>
            )
        }
    }
}
