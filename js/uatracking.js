/* uatracking.js
gaPvクラスをクリックすると、UAにルート相対パスを送信する
<a href="../../products/hoge/hoge_te.pdf" target="_blank" class="gaPv">hoge</a>
*/

$(document).ready(function() {
  $('.gaPv').click(function() {
    var getURL = $(this).attr("href");
    var absPATH = getAbsolutePath(getURL);
    var rRltvPATH = getRootRelativePath(absPATH);

    var fix = "'" + rRltvPATH + "'";
     console.log(fix); 
    ga('send', 'pageview', {'page':fix});
  });
});

function getAbsolutePath(path)
{
  // DOMで空のaタグを作って、相対パスとなる文字列を指定、作った空のaタグのDOMから
  // href属性を取得すると絶対パスになることを利用した実装
  var e = document.createElement('span');
  e.innerHTML = '<a href="' + path + '" />';
  return e.firstChild.href;
}

function getRootRelativePath(absPATH)
{
  // 絶対パスからルート相対パスを取得する
  var elm = document.createElement('a');
  elm.href = absPATH;
  return elm.pathname;
}