import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
// import MuiThemeProvider from 'material-ui-old/styles/MuiThemeProvider';
import DrawerTest from "./App/components/DrawerTest.js";
import 'normalize.css';
import ResponsiveDrawer from "./App/components/ResponsiveDrawer";

//=======================================
let flag = false;
let res = '';
/**
 * @return {string}
 */
res = (() => {
  let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  let isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
  // let isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
  let isIE = window.ActiveXObject || "ActiveXObject" in window;
  // let isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器
  let isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
  let isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
  let isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
  let isQQ = userAgent.indexOf('QQ') > -1;
  let isUC = userAgent.indexOf('UC') > -1;
  let isBaidu = userAgent.toLocaleLowerCase().indexOf('baidu') > -1;
  let isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1
    && !isBaidu && !isEdge && !isQQ && !isUC; //判断Chrome浏览器

  if (isIE) {
    let reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    let fIEVersion = parseFloat(RegExp["$1"]);
    if (userAgent.indexOf('MSIE 6.0') != -1) {
      return "IE6";
    } else if (fIEVersion == 7) {
      return "IE7";
    }
    else if (fIEVersion == 8) {
      return "IE8";
    }
    else if (fIEVersion == 9) {
      return "IE9";
    }
    else if (fIEVersion == 10) {
      return "IE10";
    }
    else if (userAgent.toLowerCase().match(/rv:([\d.]+)\) like gecko/)) {
      return "IE11";
    }
    else {
      return "0"
    }//IE版本过低
  }//isIE end

  if (isFF) {
    flag = true;
    return "FF";
  }
  if (isOpera) {
    return "Opera";
  }
  if (isSafari) {
    flag = true;
    return "Safari";
  }
  if (isChrome) {
    flag = true;
    return "Chrome";
  }
  if (isEdge) {
    return "Edge";
  }

  if (isQQ) {
    return 'QQBrowser'
  }
  if (isUC) {
    return 'UCBrowser'
  }
})();//myBrowser() end


//=======================================

class App extends React.Component {

  render() {
    return (
      <div>
        {/*<MuiThemeProvider>*/}
        <DrawerTest/>
        {/*<ResponsiveDrawer/>*/}
        {/*</MuiThemeProvider>*/}
      </div>
    );
  }
}

// whiteList is awesome(

if (flag) {
  console.log('wow! you are using the awesome ' + res);
  ReactDOM.render(
    <App/>,
    document.getElementById('app')
  );
} else {

  // if write too early, then would get bundle.js, roboto is done which is not expected!
  setTimeout(() => {
    document.writeln('what you are using is the fucking [' + res, '] maybe u need a better explorer :)\n' +
      'if u don\'t know what a better is, then plz just press alt + f4, thank you!');
    window.close();
  }, 0)

}

// if (module.hot) {
//   module.hot.accept();
// }
//
//


// ReactDOM.render(<App />, document.getElementById('app'));
registerServiceWorker();
