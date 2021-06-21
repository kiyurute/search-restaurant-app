import '../App.css';
import $ from 'jquery';
import { BrowserRouter as Router , Route } from 'react-router-dom';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import ShopList from '../ShopList/ShopList.js';
import { GoogleMap, LoadScript, InfoWindow } from "@react-google-maps/api";


const FavDetail = () => {

    function getParam(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    let idArr = sessionStorage.getItem('favId').split(',');
    let shopNameArr = sessionStorage.getItem('favShopName').split(',');
    let genreArr = sessionStorage.getItem('favGenre').split(',');
    let imgArr = sessionStorage.getItem('favImg').split(',');
    let accessArr = sessionStorage.getItem('favAccess').split(',');
    let addressArr = sessionStorage.getItem('favAddress').split(',');
    let catchArr = sessionStorage.getItem('favCatch').split(',');
    let shopLat = sessionStorage.getItem('favLat').split(',');
    let shopLng = sessionStorage.getItem('favLng').split(',');
    let time = sessionStorage.getItem('favTime').split(',');
    let urls = sessionStorage.getItem('favUrl').split(',');

    console.log(shopLat);

    const containerStyle = {
        width: "100%",
        height:"400px"
      };
      
      const center = {
        lat: parseFloat(shopLat[getParam('index')]),
        lng: parseFloat(shopLng[getParam('index')]),
      };
    
    const divStyle = {
        background: "white",
    }


    return(
        <>
        <div className="container-fluid">
            <div className="pt-3">
                <div className="card">
                    <img src={imgArr[getParam('index')]}></img>
                    <div className="card-body">

                        <div className="row">
                            <div className="col-10">
                                <p className="detail-name">{shopNameArr[getParam('index')]}</p>
                            </div>
                            {/* <div className="col-2" onClick={() => {FavBtn(id[getParam('index')])}}>
                                
                                    <div className="star"><img src={starLink}></img></div>
                                    <p className="fav-label text-center pt-1">候補!</p>
                            
                            </div> */}
                        </div>
                        <p className="catchfarase-label">{catchArr[getParam('index')]}</p>
                        <p className="detail-genre-label">ジャンル:</p>
                        <p className="detail-genre">{genreArr[getParam('index')]}</p>
                        <p className="time-label">開店時間:</p>
                        <p className="time">{time[getParam('index')]}</p>
                        <p className="access-label">アクセス:</p>
                        <p className="detail-access">{accessArr[getParam('index')]}</p>
                        <p className="address-label">住所:</p>
                        <p className="address">{addressArr[getParam('index')]}</p>
                        <div>
                        <LoadScript googleMapsApiKey="AIzaSyAUVafQIR9bD81TI2jAI5J8qiVYKfv0ir0">
                            <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={17}
                            >
                                <InfoWindow position={center}>
                                    <div style={divStyle}>
                                    <span>{shopNameArr[getParam('index')]}</span>
                                    </div>
                                </InfoWindow>

                            </GoogleMap>
                        </LoadScript>
                        </div>

                        <a href={"https://www.google.com/maps/dir/?api=1&origin=&destination="+shopNameArr[getParam('index')]}><p className="search-route pt-2">googleで経路を検索</p></a>

                        <p className="homepage-label"> webサイト:</p>
                        <a href={urls[getParam('index')]}><p className="homepage">{urls[getParam('index')]}</p></a> 

                    </div>
                </div>
            </div>

            <div id='map'>

            </div>
        </div>
        </>
    )
}

export default FavDetail;