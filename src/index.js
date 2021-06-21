import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import $ from 'jquery';

// $.ajax({
//   url: "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=3e16c33a658d883f&large_area=Z011&format=jsonp",
//   type: 'GET',
//   dataType: 'jsonp',
//   jsonpCallback: 'callback'
// }).done(function(data) {
//   var dummy = data; // 成功時 この処理はダミーなので変更してください
//   console.log(data)
// }).fail(function(data) {
//   var dummy = data; // 失敗時
// });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
