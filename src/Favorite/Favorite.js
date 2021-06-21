import '../App.css';
import $ from 'jquery';
import { BrowserRouter as Router , Route } from 'react-router-dom';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import ShopList from '../ShopList/ShopList.js';
import './style.css'

const Favorite = () => {

    let idArr = [];
    let shopNameArr;
    let genreArr;
    let imgArr;
    let accessArr;
    let catchArr;

    if(sessionStorage.getItem('favId')){
        idArr = sessionStorage.getItem('favId').split(',');
        shopNameArr = sessionStorage.getItem('favShopName').split(',');
        genreArr = sessionStorage.getItem('favGenre').split(',');
        imgArr = sessionStorage.getItem('favImg').split(',');
        accessArr = sessionStorage.getItem('favAccess').split(',');
        catchArr = sessionStorage.getItem('favCatch').split(',');
    }


    return(

    <>
    <div className="row menu-wrapper w-100 m-0">
      <div className="col-5">
        <Link to="/">
        <p className="text-center menu-item pt-2 search">検索</p>
        </Link>
      </div>

      <div className="col-7">
        <p className="text-center menu-item pt-2 fav-list">候補一覧</p>
        <div className="fav-under"></div>
      </div>

    </div>

    <div className="container-fluid">
      <div className="fav-container d-flex align-content-start flex-wrap">

        {idArr.map((element,key) => {
            return(
              <div key={key} className="list-wrapper col-lg-4 col-md-6 p-sm-2">

              <ShopList shopName={shopNameArr[key]} genre={genreArr[key]} img={imgArr[key]} id={idArr[key]} access={accessArr[key]} catch={catchArr[key]} detail={'/favdetail?index='+key}>
            
              </ShopList>
            
              </div>
            )
        })}
      </div>
    </div>
    </>
    )
}

export default Favorite;