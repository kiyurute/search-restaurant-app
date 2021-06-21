import '../App.css';
import $ from 'jquery';
import { BrowserRouter as Router , Route } from 'react-router-dom';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import ShopList from '../ShopList/ShopList.js';
import './style.css'


function SearchPage() {

  const [apiData,setApiData] = useState([]);
  const [PCimgArr,setPCImgArr] = useState([]);
  const [mobileimgArr,setMobileimgArr] = useState([]);
  const [shopNameArr,setShopNameArr] = useState([]);
  const [accessArr,setAccessArr] = useState([]);
  const [genreArr,setGenreArr] = useState([]);
  const [catchArr,setCatchArr] = useState([]);
  const [resultMessage,setResultMessage] = useState();
  const [pageArr,setPageArr] = useState([]);
  const [idArr,setIdArr] = useState([]);
  const [lngArr,setLngArr] = useState([]);
  const [latArr,setLatArr] = useState([]);
  const [urlArr,setUrlArr] = useState([]);
  const [shopLat,setShopLat] = useState([]);
  const [shopLng,setShopLng] = useState([]);
  const [addressArr,setAddressArr] = useState([]);
  const [timeArr,setTimeArr] = useState([]);
  const [currentPage,setCurrentPage] = useState();
  
  


  useEffect(() => {
      //セッションにデータがあればそこから持ってくる、なければ何もしない
    if(sessionStorage.getItem('shopName')){
        console.log('true');

        setApiData(sessionStorage.getItem('apiData').split(','));

        setPCImgArr(sessionStorage.getItem('pcImgs').split(','));
        setMobileimgArr(sessionStorage.getItem('mobileImgs').split(','));
        setShopNameArr(sessionStorage.getItem('shopName').split(','));
        setAccessArr(sessionStorage.getItem('access').split(','));
        setGenreArr(sessionStorage.getItem('genre').split(','));
        setCatchArr(sessionStorage.getItem('catch').split(','));
        setResultMessage(sessionStorage.getItem('resultMessage'));
        setIdArr(sessionStorage.getItem('id').split(','));
        setLatArr(sessionStorage.getItem('lat').split(','));
        setLngArr(sessionStorage.getItem('lng').split(','));
        setTimeArr(sessionStorage.getItem('time').split(','));
        setAddressArr(sessionStorage.getItem('address').split(','));
        setUrlArr(sessionStorage.getItem('urls').split(','));

        let range = sessionStorage.getItem('range'); //検索中の範囲を取得

        let select = document.getElementById('area');
       
        select.options[parseInt(range-1)].selected = true;

        let sortSession = sessionStorage.getItem('sort');
        let sortTag = document.getElementById('sort');

        if(sortSession === "4"){
          sortTag.options[0].selecetd = true;
        }else if(sortSession === "5"){
          sortTag.options[1].selected = true;
        }

        let tmpPageArr = sessionStorage.getItem('pageArr').split(',');
        setPageArr([...tmpPageArr]);

        setCurrentPage(sessionStorage.getItem('currentPage'));

        let keywordSession = sessionStorage.getItem('keyword');
        let keywordTag = document.getElementById('keyword');

        keywordTag.value = keywordSession;


    }else{
        console.log('false');
        console.log(apiData)
    }


  },[])



  const searchBtn = (val,keyword,sort) => {
      //検索したら、セッションに保存して結果を表示
      //valが検索範囲,keywordがキーワード

    setResultMessage('検索中');
    console.log(keyword);

    const successCallBack = (position) => {
      let URL = "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=3e16c33a658d883f&large_area=Z011&format=jsonp&lat="+position.coords.latitude+"&lng="+position.coords.longitude+"&range="+val+"&start=1"+"&keyword="+keyword+"&order="+sort;

      window.sessionStorage.setItem('myLat',position.coords.latitude);
      window.sessionStorage.setItem('myLng',position.coords.longitude);
      window.sessionStorage.setItem('range',val);
      window.sessionStorage.setItem('keyword',keyword);
      window.sessionStorage.setItem('sort',sort);

      $.ajax({
        url: URL,
        type: 'GET',
        dataType: 'jsonp',
        jsonpCallback: 'callback'
      }).done(function(data) {
        console.log(data.results.results_returned);
        
        let pageArrLength = Math.ceil(data.results.results_available/10);
        let tmpPageArr = []

        for(let i=1;i<=pageArrLength;i++){
            tmpPageArr.push("page"+i);
        }

        window.sessionStorage.setItem('pageArr',tmpPageArr);
        setPageArr([...tmpPageArr]);
        setCurrentPage(1);
        sessionStorage.setItem('currentPage',1)

        let shopData = data.results.shop;
        console.log(shopData);

        sessionStorage.setItem('apiData',shopData);

        setApiData(shopData);
        let tmpResultMessage = "半径"+indexToRange(val)+"圏内の検索結果を表示中"
        setResultMessage(tmpResultMessage);

        let tmpPCImgArr = [];
        let tmpMobileImgArr = [];
        let tmpShopNameArr = [];
        let tmpAccessArr = [];
        let tmpGenreArr = [];
        let tmpAddressArr = [];
        let tmpTimeArr = [];
        let tmpLngArr = [];
        let tmpLatArr = [];
        let tmpUrlArr = [];
        let tmpCatchArr = [];
        let tmpIdArr = [];

        shopData.map((element) => {
            tmpPCImgArr.push(element.photo.pc.l);
            tmpMobileImgArr.push(element.photo.mobile.l);
            tmpShopNameArr.push(element.name);
            tmpAccessArr.push(element.access);
            tmpGenreArr.push(element.genre.name);
            tmpAddressArr.push(element.address);
            tmpTimeArr.push(element.open);
            tmpLngArr.push(element.lng);
            tmpLatArr.push(element.lat);
            tmpUrlArr.push(element.urls.pc);
            tmpCatchArr.push(element.catch);
            tmpIdArr.push(element.id);
        })

        window.sessionStorage.setItem('mobileImgs',tmpMobileImgArr);
        window.sessionStorage.setItem('pcImgs',tmpPCImgArr);
        window.sessionStorage.setItem('shopName',tmpShopNameArr);
        window.sessionStorage.setItem('access',tmpAccessArr);
        window.sessionStorage.setItem('genre',tmpGenreArr);
        window.sessionStorage.setItem('address',tmpAddressArr);
        window.sessionStorage.setItem('resultMessage',tmpResultMessage);
        window.sessionStorage.setItem('time',tmpTimeArr);
        window.sessionStorage.setItem('lng',tmpLngArr);
        window.sessionStorage.setItem('lat',tmpLatArr);
        window.sessionStorage.setItem('urls',tmpUrlArr);
        window.sessionStorage.setItem('catch',tmpCatchArr);
        window.sessionStorage.setItem('id',tmpIdArr);

        setPCImgArr([...tmpPCImgArr]);
        setMobileimgArr([...tmpMobileImgArr]);
        setShopNameArr([...tmpShopNameArr]);
        setAccessArr([...tmpAccessArr]);
        setGenreArr([...tmpGenreArr]);
        setCatchArr([...tmpCatchArr]);
        setIdArr([...tmpIdArr]);
        setLngArr([...tmpLngArr]);
        setLatArr([...tmpLatArr]);
        setAddressArr([...tmpAddressArr]);
        setTimeArr([...tmpTimeArr]);
        setUrlArr([...tmpUrlArr]);

      }).fail(function(data) {
        window.alert('検索に失敗しました');
        console.log(data)
      });

    }

    const errorCallBack = (error) => {
      console.log(error);
    }

    navigator.geolocation.getCurrentPosition(successCallBack,errorCallBack);

  }

  const indexToRange = (num) => {
    switch(num){
      case "1":
        return "300m";
        break;
      case "2":
        return "500m";
        break;
      case "3":
        return "1km";
        break;
      case "4":
        return "2km";
        break;
      case "5":
        return "3km";
        break;
    }
  }
  
  function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}



const pagenation = (val) => {
    //ページネーションの処理
    console.log(val+"ページ");
    let startFrom = (parseInt(val-1)*10);
    console.log('startFrom:'+startFrom);
    let URL = "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=3e16c33a658d883f&large_area=Z011&format=jsonp&lat="+sessionStorage.getItem('myLat')+"&lng="+sessionStorage.getItem('myLng')+"&range="+sessionStorage.getItem('range')+"&start="+startFrom;
    console.log('url;'+URL);
    $.ajax({
        url: URL,
        type: 'GET',
        dataType: 'jsonp',
        jsonpCallback: 'callback'
      }).done(function(data) {
        console.log(data)
        console.log(data.results.results_returned);
        
        let pageArrLength = Math.ceil(data.results.results_available/10);
        let tmpPageArr = []

        for(let i=1;i<=pageArrLength;i++){
            tmpPageArr.push("page"+i);
        }

        setPageArr([...tmpPageArr]);
        setCurrentPage(val);
        sessionStorage.setItem('currentPage',val);

        console.log(pageArr);

        let shopData = data.results.shop;
        console.log(shopData);

        sessionStorage.setItem('apiData',shopData);

        setApiData(shopData);
        setResultMessage("半径1km圏内の検索結果を表示中");
        setResultMessage("半径"+indexToRange(sessionStorage.getItem('range'))+"圏内の検索結果を表示中");

        let tmpPCImgArr = [];
        let tmpMobileImgArr = [];
        let tmpShopNameArr = [];
        let tmpAccessArr = [];
        let tmpGenreArr = [];
        let tmpAddressArr = [];
        let tmpTimeArr = [];
        let tmpLatArr = [];
        let tmpLngArr = [];
        let tmpUrlArr = [];
        let tmpCatchArr = [];
        let tmpIdArr = [];

        data.results.shop.map((element) => {
            tmpPCImgArr.push(element.photo.pc.l);
            tmpMobileImgArr.push(element.photo.mobile.l);
            tmpShopNameArr.push(element.name);
            tmpAccessArr.push(element.access);
            tmpGenreArr.push(element.genre.name);
            tmpAddressArr.push(element.address);
            tmpTimeArr.push(element.open);
            tmpLatArr.push(element.lat);
            tmpLngArr.push(element.lng);
            tmpUrlArr.push(element.urls.pc);
            tmpCatchArr.push(element.catch);
            tmpIdArr.push(element.id);
        })

        window.sessionStorage.setItem('mobileImgs',tmpMobileImgArr);
        window.sessionStorage.setItem('pcImgs',tmpPCImgArr);
        window.sessionStorage.setItem('shopName',tmpShopNameArr);
        window.sessionStorage.setItem('access',tmpAccessArr);
        window.sessionStorage.setItem('genre',tmpGenreArr);
        window.sessionStorage.setItem('address',tmpAddressArr);
        window.sessionStorage.setItem('time',tmpTimeArr);
        window.sessionStorage.setItem('lng',tmpLngArr);
        window.sessionStorage.setItem('lat',tmpLatArr);
        window.sessionStorage.setItem('urls',tmpUrlArr);
        window.sessionStorage.setItem('catch',tmpCatchArr);
        window.sessionStorage.setItem('id',tmpIdArr);

        setPCImgArr([...tmpPCImgArr]);
        setMobileimgArr([...tmpMobileImgArr]);
        setShopNameArr([...tmpShopNameArr]);
        setAccessArr([...tmpAccessArr]);
        setGenreArr([...tmpGenreArr]);
        setAddressArr([...tmpAddressArr]);
        setTimeArr([...tmpTimeArr]);
        setCatchArr([...tmpCatchArr]);
        setIdArr([...tmpIdArr]);
        setLatArr([...tmpLatArr]);
        setLngArr([...tmpLngArr]);
        setUrlArr([...urlArr]);

      }).fail(function(data) {
        window.alert('検索に失敗しました');
        console.log(data)
      });

      // let pageItem = document.getElementById('page-item-'+val);
      // pageItem.classList.add('active');
      // console.log(pageItem);
     
}

  return (
    <div className="App">

    <div className="row menu-wrapper w-100 m-0">
      <div className="col-5">
        <p className="text-center menu-item pt-2 search">検索</p>
        <div className="search-under"></div>
      </div>

      <div className="col-7">
        <Link to="/Favorite">
        <p className="text-center menu-item pt-2 fav-list">候補一覧</p>
        </Link>
      </div>
    </div>

    <div className="search-box p-3" style={{background:'white'}}>
        <div className="d-flex flex-row">
            <div className="col-4 p-2">
                <p className="search-label text-right" style={{textAlign:'right'}}>検索半径</p>
            </div>

            <div className="col-8">
            <select className="form-select" aria-label="Default select example" id="area">
                <option value="1">300m</option>
                <option value="2">500m</option>
                <option value="3">1km</option>
                <option value="4">2km</option>
                <option value="5">3km</option>
            </select>
            </div>
        </div>

        <div className="d-flex flex-row">
            <div className="col-4 p-2">
                <p className="search-label text-right" style={{textAlign:'right'}}>キーワード</p>
            </div>

            <div className="col-8">
            <input type="text" class="form-control" placeholder="" aria-label="Username" aria-describedby="addon-wrapping" id="keyword"/>
            </div>
        </div>

        <div className="d-flex flex-row">
        <div className="col-4 p-2">
                <p className="search-label text-right" style={{textAlign:'right'}}>表示順</p>
            </div>

            <div className="col-5">
            <select className="form-select" aria-label="Default select example" id="sort">
                <option value="4">おすすめ順</option>
                <option value="5">近い順</option>
            </select>
            </div>

            <div className="col-3 pb-2 d-flex flex-row-reverse">
                <div className="pb-2">
                    <button className="btn btn-primary" onClick={() => {searchBtn(document.getElementById("area").value,document.getElementById("keyword").value,document.getElementById("sort").value)}}>検索</button>
                </div>
            </div>
        </div>


    </div>
      
    <div className="container-fluid search-result-wrapper">

      <p className="resultMessage">{resultMessage}</p>
      <p className="pageMessage">{currentPage}/{pageArr.length}ページ</p>
      
      <div className="d-flex align-content-start flex-wrap">
      {apiData.map((element,key) => {

        // return(
        //   <div key={key}>
        //     <div className="col-sm-6">

        //     <ShopList id={idArr[key]} shopName={shopNameArr[key]} genre={genreArr[key]} access={accessArr[key]} address={addressArr[key]} catch={catchArr[key]} img={navigator.userAgent.match(/(iPhone|iPod|Android.*Mobile)/i) ? mobileimgArr[key] :PCimgArr[key]} detail={'/detail?index='+key} lng={lngArr[key]} lat={latArr[key]} time={timeArr[key]} url={urlArr[key]}>
        //     </ShopList>

        //     </div>

        //   </div>
        // )

        return(
          <div key={key} className="list-wrapper col-lg-4 col-md-6 p-sm-2">

            <ShopList id={idArr[key]} shopName={shopNameArr[key]} genre={genreArr[key]} access={accessArr[key]} address={addressArr[key]} catch={catchArr[key]} img={navigator.userAgent.match(/(iPhone|iPod|Android.*Mobile)/i) ? mobileimgArr[key] :PCimgArr[key]} detail={'/detail?index='+key} lng={lngArr[key]} lat={latArr[key]} time={timeArr[key]} url={urlArr[key]}>
            </ShopList>
    
          </div>
        )

        
      })}
      </div>
    

      <div className="row overflow-auto p-2">
        
            <nav aria-label="..." className="p-0">
                <ul class="pagination">


                  {pageArr.map((element,key) => {
                      return(
                        <li key={key} className={parseInt(sessionStorage.getItem('currentPage'))===key+1 ? "page-item active" : "page-item"} onClick={() => {pagenation(key+1)}} id={"page-item-"+key}><div class="page-link">{key+1}</div></li> 
                      )
                  })}
                  


                </ul>
            </nav>
        
      </div>
    </div>
    </div>

  );
}

export default SearchPage;
