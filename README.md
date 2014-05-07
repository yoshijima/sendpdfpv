sendpdfpv
=========

Send UA root relative pathname

PDFのクリック（ダウンロード）をユニバーサルアナリティクス上でページビュー（仮想ページビュー）としてプロットさせる。

# １．サンプルファイル
```samplefileの構成
sendpdfpv ┬ js/ ─ uatracking.js
          │       (require jQuery)
          ├ index.html
          │ (main File)
          ├sampledir/
          │ (include Sample PDF File)
          └ sample1.pdf
            (Sample PDF File)
```

# ２．初期設定
Universal Analyticsのタグの場合と、Google Tag Managerのタグの場合ではIDの設定のしかたが異なるので、各々のタグの設定をしてください。
uatracking.jsは、Universal Analyticsの関数を利用しているので、Google Tag Managerを利用するときには、「タグの種類」の選択で、「アナリティクス」>「ユニバーサルアナリティクス」を設定してください。
1. タグの設定(sendpdfpv/index.html)
2. sendpdfpvディレクトリをDocumentRootとかに配置して。
3. 対象とするPDFの\<a>タグにclass="gaPv"を設定する。

#３．解説

```
ga('send', 'pageview', {'page', ルート相対パス});
```
で、PDFのクリックをUniversal Analyticsにプロットすることができるので、"uatracking.js"内では、class="gaPv"のある\<a>タグから、ルート相対パスを取得して、上述のga()関数にルート相対パスを渡すことをしています。

```
<a href="sample1.pdf" target="_blank" class="gaPv">sample1.pdf</a>
```

uatracking.jsは、テスト用にconsole.log()していますが、本番ではこれをコメントアウトする必要があります。

#４．注意事項
* 同じドメイン内での処理しか対応していません。外部サイトのクリック数については、Webサイトの解析方針にもよると思うのですが、PVで処理するかイベントで処理するか検討してください。
* PDFだけでなく、mpgやwmvとかのダウンロード数の計測にも使うことができますが、これも動画のクリックをどのようにして解析するかの方針によると思います。

