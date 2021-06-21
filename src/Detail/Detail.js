import '../App.css';
import $ from 'jquery';
import { BrowserRouter as Router , Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './style.css';
import { GoogleMap, LoadScript, InfoWindow } from "@react-google-maps/api";
import grayStar from '../SVG/star.svg';
import orangeStar from '../SVG/orange-star.svg';

const Detail = () => {

    const [starState,setStarState] = useState(grayStar);

    function getParam(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    let mobileImgs = window.sessionStorage.getItem('pcImgs').split(',');
    let id = window.sessionStorage.getItem('id').split(',');
    let shopName = window.sessionStorage.getItem('shopName').split(',');
    let address = window.sessionStorage.getItem('address').split(',');
    let access = window.sessionStorage.getItem('access').split(',');
    let time = window.sessionStorage.getItem('time').split(',');
    let urls = window.sessionStorage.getItem('urls').split(',');
    let genre = window.sessionStorage.getItem('genre').split(',');
    let catchfrase = window.sessionStorage.getItem('catch').split(',');
    let lng = window.sessionStorage.getItem('lng').split(',');
    let lat = window.sessionStorage.getItem('lat').split(',.');

    console.log(urls);
    
    //"http://maps.google.com/maps/api/js?key=AIzaSyAUVafQIR9bD81TI2jAI5J8qiVYKfv0ir0&language=ja"

    let shopLat = sessionStorage.getItem('lat').split(',');
    let shopLng = sessionStorage.getItem('lng').split(',');

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

      console.log(shopLat);

      console.log(parseFloat(shopLat[getParam('index')]));
      console.log(parseFloat(shopLng[getParam('index')]));



    const FavBtn = (shopID) => {
        if(sessionStorage.getItem('favShopName')){
            console.log('adding fav');
            let currentIds = sessionStorage.getItem('favId').split(',');
            console.log(shopID,currentIds);

            let searchResult = currentIds.some( function(value){
                return value === shopID;
            });

            if(searchResult){
                //既に候補されている場合は消す
                let resultIndex = currentIds.indexOf(shopID);

                let favImgs = sessionStorage.getItem('favImg').split(',');
                let favShopName = sessionStorage.getItem('favShopName').split(',');
                let favGenre = sessionStorage.getItem('favGenre').split(',');
                let favAccess = sessionStorage.getItem('favAccess').split(',');
                let favCatch = sessionStorage.getItem('favCatch').split(',');
                let favLat = sessionStorage.getItem('favLat').split(',');
                let favLng = sessionStorage.getItem('favLng').split(',');
                let favAddress = sessionStorage.getItem('favAddress').split(',');
                let favTime = sessionStorage.getItem('favTime').split(',');
                let favUrl = sessionStorage.getItem('favUrl').split(',');

                favImgs.splice(resultIndex,1);
                favShopName.splice(resultIndex,1);
                favGenre.splice(resultIndex,1);
                currentIds.splice(resultIndex,1);
                favAccess.splice(resultIndex,1);
                favCatch.splice(resultIndex,1);
                favLat.splice(resultIndex,1);
                favLng.splice(resultIndex,1);
                favAddress.splice(resultIndex,1);
                favTime.splice(resultIndex,1);
                favUrl.splice(resultIndex,1);

                sessionStorage.setItem('favImg',favImgs);
                sessionStorage.setItem('favShopName',favShopName);
                sessionStorage.setItem('favGenre',favGenre);
                sessionStorage.setItem('favId',currentIds);
                sessionStorage.setItem('favCatch',favCatch);
                sessionStorage.setItem('favAccess',favAccess);
                sessionStorage.setItem('favLat',favLat);
                sessionStorage.setItem('favLng',favLng);
                sessionStorage.setItem('favAddress',favAddress);
                sessionStorage.setItem('favTime',favTime);
                sessionStorage.setItem('favUrl',favUrl);

                starLink = grayStar;
                setStarState(grayStar);
                
            }else{
                //新規追加
            let tmpFavIdArr = sessionStorage.getItem('favId').split(',');
            let tmpFavImgArr = sessionStorage.getItem('favImg').split(',');
            let tmpFavShopNameArr = sessionStorage.getItem('favShopName').split(',')
            let tmpFavGenreArr = sessionStorage.getItem('favGenre').split(',');
            let tmpFavAccessArr = sessionStorage.getItem('favAccess').split(',');
            let tmpFavCatchArr = sessionStorage.getItem('favCatch').split(',');
            let tmpFavLatArr = sessionStorage.getItem('favLat').split(',');
            let tmpFavLngArr = sessionStorage.getItem('favLng').split(',');
            let tmpFavAddressArr = sessionStorage.getItem('favAddress').split(',');
            let tmpFavTimeArr = sessionStorage.getItem('favTime').split(',');
            let tmpFavUrlArr = sessionStorage.getItem('favUrl').split(',');

            tmpFavIdArr.push(id[getParam('index')]);
            tmpFavImgArr.push(mobileImgs[getParam('index')]);
            tmpFavShopNameArr.push(shopName[getParam('index')]);
            tmpFavGenreArr.push(genre[getParam('index')]);
            tmpFavAccessArr.push(access[getParam('index')]);
            tmpFavCatchArr.push(catchfrase[getParam('index')]);
            tmpFavLatArr.push(lat[getParam('index')]);
            tmpFavLngArr.push(lng[getParam('index')]);
            tmpFavAddressArr.push(address[getParam('index')]);
            tmpFavTimeArr.push(time[getParam('index')]);
            tmpFavUrlArr.push(urls[getParam('index')]);

            sessionStorage.setItem('favId',tmpFavIdArr);
            sessionStorage.setItem('favImg',tmpFavImgArr);
            sessionStorage.setItem('favShopName',tmpFavShopNameArr);
            sessionStorage.setItem('favGenre',tmpFavGenreArr);
            sessionStorage.setItem('favAccess',tmpFavAccessArr);
            sessionStorage.setItem('favCatch',tmpFavCatchArr);
            sessionStorage.setItem('favLat',tmpFavLatArr);
            sessionStorage.setItem('favLng',tmpFavLngArr);
            sessionStorage.setItem('favAddress',tmpFavAddressArr);
            sessionStorage.setItem('favTime',tmpFavTimeArr);
            sessionStorage.setItem('favUrl',tmpFavUrlArr);

            console.log(tmpFavIdArr);

            starLink = orangeStar;
            setStarState(orangeStar);
            }

        }else{
            //最初の一個
            console.log('generate fav');
            sessionStorage.setItem('favId',id[getParam('index')]);
            sessionStorage.setItem('favImg',mobileImgs[getParam('index')]);
            sessionStorage.setItem('favShopName',shopName[getParam('index')]);
            sessionStorage.setItem('favGenre',genre[getParam('index')]);
            sessionStorage.setItem('favAccess',access[getParam('index')]);
            sessionStorage.setItem('favCatch',catchfrase[getParam('index')]);
            sessionStorage.setItem('favLat',lat[getParam('index')]);
            sessionStorage.setItem('favLng',lng[getParam('index')]);
            sessionStorage.setItem('favAddress',address[getParam('index')]);
            sessionStorage.setItem('favTime',time[getParam('index')]);
            sessionStorage.setItem('favUrl',urls[getParam('index')]);
            console.log(sessionStorage.getItem('favId'));

            starLink = orangeStar;
            setStarState(orangeStar);
        }

    }

    let favIdArr;
    let starLink = grayStar;


    if(sessionStorage.getItem('favId')){

        favIdArr = sessionStorage.getItem('favId').split(',');
        let favCheck = favIdArr.indexOf(id[getParam('index')]);

        if(favCheck !== -1){
            starLink = orangeStar;
        }else{
            starLink = grayStar;
        }


    }


    return(
        <>
        <div className="container-fluid">
            <div className="pt-3">
            <div className="p-sm-3">
                <div className="card">                  
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-6">
                                <img src={mobileImgs[getParam('index')]} className="w-100 detail-img"></img>
                            </div>
                            <div className="col-sm-6">

                                <div className="row">
                                    <div className="col-10">
                                        <p className="detail-name">{shopName[getParam('index')]}</p>
                                    </div>
                                    <div className="col-2" onClick={() => {FavBtn(id[getParam('index')])}}>

                                            <div className="star"><img src={starLink}></img></div>
                                            <p className="fav-label text-center pt-1">候補!</p>

                                    </div>
                                </div>
                                <p className="catchfarase-label">{catchfrase[getParam('index')]}</p>
                                <p className="detail-genre-label">ジャンル:{}</p>
                                <p className="detail-genre">{genre[getParam('index')]}</p>
                                <p className="time-label">開店時間:</p>
                                <p className="time">{time[getParam('index')]}</p>
                                <p className="access-label">アクセス:</p>
                                <p className="detail-access">{access[getParam('index')]}</p>
                                <p className="address-label">住所:</p>
                                <p className="address">{address[getParam('index')]}</p>
                                <div>
                                <LoadScript googleMapsApiKey="AIzaSyAUVafQIR9bD81TI2jAI5J8qiVYKfv0ir0">
                                    <GoogleMap
                                    mapContainerStyle={containerStyle}
                                    center={center}
                                    zoom={17}
                                    >
                                        <InfoWindow position={center}>
                                            <div style={divStyle}>
                                            <span>{shopName[getParam('index')]}</span>
                                            </div>
                                        </InfoWindow>

                                    </GoogleMap>
                                </LoadScript>
                                </div>

                                <a href={"https://www.google.com/maps/dir/?api=1&origin=&destination="+shopName[getParam('index')]}><p className="search-route pt-2">googleで経路を検索</p></a>

                                <p className="homepage-label"> webサイト:</p>
                                <a href={urls[getParam('index')]}><p className="homepage">{urls[getParam('index')]}</p></a>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>

            <div id='map'>

            </div>
        </div>
        </>
    )
}

export default Detail;