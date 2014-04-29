/* uatracking.js
gaPvクラスをクリックすると、絶対パスを表示する
<a href="../../products/hoge/hoge_te.pdf" target="_blank" class="gaPv">hoge</a>
*/

$(document).ready(function() {
  $('.gaPv').click(function() {
    var getURL = $(this).attr("href");
    var absPATH = getAbsolutePath(getURL);
    console.log(absPATH);
    ga('send', 'pageview', {'page':absPATH});
  });
});

function getAbsolutePath(path)
{
  // DOMで空のaタグを作って、相対パスとなる文字列を指定、作った空のaタグのDOMからhref属性を取得すると
  // 絶対パスになることを利用した実装
  var e = document.createElement('span');
  e.innerHTML = '<a href="' + path + '" />';
  var absURL = e.firstChild.href;

  // 取得した絶対パスの文字列長をlenURLに保持する
  var lenURL = absURL.length;

  /* URLのルートに該当する「/」のスタート位置を特定する処理です。
     過去には下記の方法をとっていたが、これだとディレクトリを最初から特定してるので、抽象性に欠く
     var trimStart = absURL.indexOf('/abspath');

	 以下の方法もどうかと思うが、http://、https://がある限りは問題ないかなという判断
     9としているのは、プロトコルのスキームに利用する"//"を無視させるためです。
     "http://"で7文字
     "https://"で8文字
     なので、9文字目以降からの「/」を指定すれば問題ない。
     locationオブジェクトを利用してlocation.pathnameも試みたけど、ちょっと手に負えなかった。 */

  var trimStart = absURL.indexOf('/', 9)
  var absPATH = absURL.substring(trimStart, lenURL);
  var fix = "'" + absPATH + "'";
  return fix;
}
