# Rails TS React
React/TSをview層としたRails-app（SPAではない）において、ReactのPage componentが受け取るpropsの型定義からRailsの対応するcontroller actionの出力をvalidateできないか、という試み

**現状、試みは失敗している**がログとして残す

## アプローチ

### 型定義以外の自動化
Railsのルーティング(controller action)とReactのPage componentのファイルパスを一致させ、マウントするコンポーネントの自動判別やpropsの受け取りを行っている。

このあたりは以前の試みとほぼ同様; https://qiita.com/cumet04/items/52cc84949a7ce9351317

### 型定義の一本化
React側でパラメータの型定義をやるのにRails側で似たような定義クラスみたいなものを二重定義したくない、またどうせ型定義があるならバリデーションしたい、というモチベーション。

Typescriptの型があるので、そこから何かしらのJSON定義情報を生成し、それを用いてRailsのcontrollerでバリデーションを実施すればよさそう、というアプローチ。

#### TS -> JSON Schema
[quicktype](https://quicktype.io/)というものがあり、本来はJSON or JSON Schemaからコードを生成するものだがexperimentalな機能としてTSの型からRuby(やその他言語)のデータ構造コードを生成できる。  
ただしTSからの生成は単独ファイルからしかできず、importを含む一般的なプロジェクト構成では使えない(refs https://github.com/quicktype/quicktype/issues/1274 )。

[typescript-json-schema](https://github.com/YousefED/typescript-json-schema)を直接使えとのことなので、これを利用してJSON Schemaを生成した（refs `frontend/scripts/gen*`, `frontend/scripts/_pageProps.d.ts`, `backend/lib/schema/*`）。

##### JSON Schema -> ruby
rubyコードの生成はquicktypeでできるはずなので試みた。生成できることはできるが、生成コードが依存している`dry-types`, `dry-struct`のバージョンが古すぎて危険なので見送った。

##### JSON Schema validation on ruby
そこでJSON Schemaを使ってcontrollerの出力json(hash)をバリデーションする方向を試みた。

[Ruby JSON Schema Validator](https://github.com/ruby-json-schema/json-schema)というのがあったので実施したのが現在のコード。  
しかしtypescript-json-schemaとruby-json-schemaが扱うJSON Schemaのドラフトバージョンが一致しないため断念した。  
※rubyの方はDraft4までしかサポートせず（単に古い）、tsの方はschema versionが指定できない（コードに直書き）のでどうにもならない

## 今後の展望
アイデアとモチベーションは悪くないと思うので、技術スタックを変えてやってみたい。

#### typescript-json-schemaをDraft4対応にして使う
forkして調整する。スキーマバージョンが変わるということは機能などの調整も必要だと思われるので、そのあたりも含めて。

現状のアーキテクチャを変えずにできて簡単そうな反面、{ruby|typescript}-json-schemaのメンテが必要になる。

#### JSON Schemaを捨ててOpenAPIを使う
既に勢いが感じられないJSON Schemaを捨て、より標準感の強いOpenAPIのエコシステムに乗っかる。

**TSからの**変換はなさそうなので、OpenAPI specを書いてtsとrubyコードを生成することになると思われる。
Open**API**の仕様のため、本ユースケースの前提である「API-SPAではなくサーバサイドJSON render」式で使えるかが不明。

開発の手数は増えるが流行に従ってAPI式にする選択肢もある。
