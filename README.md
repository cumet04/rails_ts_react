# Rails TS React
Rails + React/TS構成を色々といい感じにする仕組みを検討するサンドボックス

## 開発環境
```
env UID=$(id -u) GID=$(id -g) docker-compose up -V --build
./backend/bin/exec rails db:create
./backend/bin/exec rails db:migrate
```

## フレームワーク
あらかじめOpenAPIでSpecを定義してそこからあれこれする。

### Rails側
controllerはfrontendにわたすデータを`view_props`にてjson(hash)で渡し、view相当の部分は完全にReactで書く。
このあたりは以前の試みとほぼ同様; https://qiita.com/cumet04/items/52cc84949a7ce9351317

Viewに返すデータを生成するロジックは`app/api/**_api.rb`にて定義し、controllerではこれらを呼び出してhashに入れるに留める（testable, API schemaの観点から）。

APIが返すデータフォーマットはOpenAPIのSpecで定義されており、これらはRack層にて[committee](https://github.com/interagent/committee)でvalidationされる（development, test環境のみ）。  
APIでないページが返すデータはReact側のPageコンポーネントのPropsに合わせ、各属性にはAPIクラスの生成物を入れるようにする。

Modelその他は通常通り。

### React側
Rails側のcontroller/actionに合わせたディレクトリ構造でPageコンポーネントを配置しておく。  

OpenAPIのSpecから`api/generate.sh`にてAPIクライアントおよび型を生成し、Rails側からのデータ受け取りにはこれを活用する。

---

## 過去のアプローチ
React/TSをview層としたRails-app（SPAではない）において、ReactのPage componentが受け取るpropsの型定義からRailsの対応するcontroller actionの出力をvalidateできないか、という試み

**この試み最終的に失敗している**がログとして残す

### 型定義以外の自動化
Railsのルーティング(controller action)とReactのPage componentのファイルパスを一致させ、マウントするコンポーネントの自動判別やpropsの受け取りを行っている。

このあたりは以前の試みとほぼ同様; https://qiita.com/cumet04/items/52cc84949a7ce9351317

※この部分は現在でも変わっていない

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

[Ruby JSON Schema Validator](https://github.com/ruby-json-schema/json-schema)というのがあったので実施したのが[現在のコード](https://github.com/cumet04/rails_ts_react/tree/json-schema)。  
しかしtypescript-json-schemaとruby-json-schemaが扱うJSON Schemaのドラフトバージョンが一致しないため断念した。  
※rubyの方はDraft4までしかサポートせず（単に古い）、tsの方はschema versionが指定できない（コードに直書き）のでどうにもならない

### 所感
アイデアとモチベーションは悪くないと思うのだが、JSON Schemaが古かったのかもしれない。  
この方針で行くならtypescript-json-schemaをforkしてDraft4対応することになるが、そのあたりのメンテは積極的にはやりたくない。

周辺エコシステムを使いたいのであればOpenAPIやAPI+SPA式に寄せるなど流行に乗らねばならないのかもしれない。
