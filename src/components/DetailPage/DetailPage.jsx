import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './DetailPage.css'

function DetailPage() {
    const history = useHistory();

    const params = useParams();

    const dispatch = useDispatch();

    const detail = useSelector(store => store.listings)

    const favorites = useSelector(store => store.favorite)
    
    useEffect(() => {
        dispatch({ type: 'FETCH_FAVORITE', payload: params.id});
        dispatch({ type: 'FETCH_DETAIL', payload: params.id});
        window.scrollTo(0,0)
    }, []);
       
    function favorite() {
        dispatch({ type: 'ADD_FAVORITE', payload: {listings_id: params.id}})
    };

    function notFavorite(){
        dispatch({ type: 'DELETE_FAVORITE', payload: params.id})
    };

    return(
        <div className="detail-container">
            <div>
              {favorites[0] ? <FavoriteIcon onClick={notFavorite} className='fav-icon'/> : <FavoriteBorderIcon onClick={favorite} className='not-fav-icon'/>}
            </div>
         {detail.map(info => {
          return(
              <div key={info.id} >
                <div className='heading-container'>
                    <div className='section-container'>
                        <h2>{info.item}</h2>
                        <img className="detail-img" height={500} width={650} src={info.image}/>
                    </div>
                    <div className='section2-container'>
                        <h2>Contact Information</h2>
                        <h3>{info.name}</h3>
                        <h4>{info.address}</h4>
                        <a href={info.email}>{info.email}</a>
                        <h4>{info.phone_number}</h4>
                    </div>
                </div>
                <div className='section3-container'>
                  <p>{info.description}</p> 
                </div>
              </div> 
          )})}
          <Button onClick={() => {history.push('/')}}variant="contained">Back</Button>
      </div>
    )
}

export default DetailPage;