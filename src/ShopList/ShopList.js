import '../App.css';
import $ from 'jquery';
import { BrowserRouter as Router , Route } from 'react-router-dom';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import './style.css';
import grayStar from '../SVG/star.svg'
import orangeStar from '../SVG/orange-star.svg';
import triangle from '../SVG/triangle.svg';

const ShopList = (props) => {

    const [starState,setStarState] = useState(grayStar);

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

            tmpFavIdArr.push(props.id);
            tmpFavImgArr.push(props.img);
            tmpFavShopNameArr.push(props.shopName);
            tmpFavGenreArr.push(props.genre);
            tmpFavAccessArr.push(props.access);
            tmpFavCatchArr.push(props.catch);
            tmpFavLatArr.push(props.lat);
            tmpFavLngArr.push(props.lng);
            tmpFavAddressArr.push(props.address);
            tmpFavTimeArr.push(props.time);
            tmpFavUrlArr.push(props.url);

            console.log(props.url);


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

            starLink = orangeStar;
            setStarState(orangeStar);
            }

        }else{
            //最初の一個
            console.log('generate fav');
            sessionStorage.setItem('favId',shopID);
            sessionStorage.setItem('favImg',props.img);
            sessionStorage.setItem('favShopName',props.shopName);
            sessionStorage.setItem('favGenre',props.genre);
            sessionStorage.setItem('favAccess',props.access);
            sessionStorage.setItem('favCatch',props.catch);
            sessionStorage.setItem('favLat',props.lat);
            sessionStorage.setItem('favLng',props.lng);
            sessionStorage.setItem('favAddress',props.address);
            sessionStorage.setItem('favTime',props.time);
            sessionStorage.setItem('favUrl',props.url);
            console.log(sessionStorage.getItem('favId'));

            starLink = orangeStar;
            setStarState(orangeStar);
        }

    }

    useEffect(() => {
        if(sessionStorage.getItem('favId')){
            let favIdArr = sessionStorage.getItem('favId').split(',');
            console.log(favIdArr);
        
            let favCheck = favIdArr.indexOf(props.id);

            if(favCheck !== -1){
                setStarState(orangeStar);
            }else{
                setStarState(grayStar);
            }

            }

    },[])

    let favIdArr;
    let starLink = grayStar;
    let favCheck;

    if(sessionStorage.getItem('favId')){
        favIdArr = sessionStorage.getItem('favId').split(',');

        favCheck = favIdArr.indexOf(props.id);

        if(favCheck !== -1){
            starLink = orangeStar;
        }else{
            starLink = grayStar;
        }
    }


    return(
        <>
        {/* <Link to={props.detail}> */}
        <div className="row p-2">
            <div className="card p-0 shadow-sm">
                <div className="card-body pr-0 pl-0">
                    <div className="row">
                    <div className="col-5">
                    <Link to={props.detail}>
                        <img src={props.img} style={{width:"100%"}}></img>
                    </Link>
                    </div>
                    <div className="col-7">
                        <div className="row">
                            <div className="col-9">
                                <Link to={props.detail}>
                                <p className="shopName">{props.shopName}</p>
                                </Link>
                                <p className="genre">{props.genre}</p>
                            </div>
                            <div className="col-2 p-0" onClick={() => {FavBtn(props.id)}}>
                                {/* <div className="star"><img src={starState}></img></div> */}
                                <div className="star"><img src={starLink}></img></div>
                                <p className="fav-label text-center pt-1">候補!</p>
                            </div>
                        </div>
                        <p className="catch">{props.catch}</p>
                        <p className="access">{props.access}</p> 
                        <Link to={props.detail}>
                            <p className="toDetail text-end m-0 pt-2">詳細へ</p>  
                        </Link>       
                    </div>
                    </div>

                </div>
            </div>
        </div>
        {/* </Link> */}
        </>
    )
}

export default ShopList;