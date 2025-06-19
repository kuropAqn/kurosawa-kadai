# 地域コミュニティイベント管理アプリ

地域住民同士のつながりを強化するためのイベント情報共有・参加管理アプリケーションです。  
React を用いたフロントエンドと Express.js ベースのバックエンドを同一サーバー上で動かします。

---

## 目次

1. [利用技術・ライブラリ](#利用技術ライブラリ)  
2. [機能一覧](#機能一覧)  
3. [動作環境](#動作環境)  
4. [セットアップ手順](#セットアップ手順)  
5. [利用方法（マニュアル）](#利用方法マニュアル)  
6. [API エンドポイント](#api-エンドポイント)  

---

## 利用技術・ライブラリ

- **言語・ランタイム**  
  - Node.js v18.x 以上  
- **フロントエンド**  
  - React v18.x (create-react-app)  
  - react-router-dom v6  
  - Fetch API  
- **バックエンド**  
  - Express.js v4.x  
  - CORS
  - express.static 
- **ビルド・ツール**  
  - npm / yarn  
- **デプロイ**  
  - Apache HTTPD 

---

## 機能一覧

1. **イベント一覧表示**  
   - ダミーデータ or API から取得した全イベントをカード形式で一覧  
   - キーワード・開催日・カテゴリによるクライアントサイド絞り込み  
2. **イベント詳細表示**  
   - タイトル、日時、場所、説明、定員、参加者数を表示  
   - 「参加する」ボタンで参加者数を即時更新  
3. **イベント作成フォーム**  
   - タイトル、開催日、場所、説明、定員を入力  
   - 必須チェック、文字数・数値バリデーション  
   - API に POST して新規イベント登録  
4. **コメント機能**  
   - 詳細ページでコメント一覧表示  
   - テキスト投稿（POST）→ページ遷移不要の即時反映  
   - サーバーサイドで `data/comments.json` に永続化  

---

## 動作環境

- **サーバー**  
  - OS：Amazon Linux 2 (EC2 t3.micro)  
  - Node.js：v18.x 以上  
  - Apache HTTPD：2.4.x  
- **開発PC**  
  - OS：Windows 10  
  - VSCode

---

## セットアップ手順

以下例では、EC2 上のユーザー `ec2-user` が想定パス `~/kurosawa-kadai` にリポジトリを配置します。

### 1. リポジトリをクローン・更新

bash
cd ~
git clone https://github.com/kuropAqn/kurosawa-kadai.git
cd kurosawa-kadai
既にクローン済みの場合は：

bash
コピーする
編集する
cd ~/kurosawa-kadai
git pull origin main
2. フロントエンド依存インストール
bash
コピーする
編集する
# プロジェクトルート
npm install        # または yarn install
3. React アプリのビルド
bash
コピーする
編集する
npm run build      # または yarn build
build/ フォルダが生成されます。

4. バックエンド依存インストール
bash
コピーする
編集する
cd server
npm install
5. 永続化用フォルダ・ファイル作成
bash
コピーする
編集する
cd ~/kurosawa-kadai/server
mkdir -p data
echo "{}" > data/comments.json
6. サーバー起動
bash
コピーする
編集する
# バックエンドと静的配信を同時に行う
cd ~/kurosawa-kadai/server
npm start
デフォルト：http://localhost:3001/ でアクセス可

別端末からは curl -I http://localhost:3001/api/events 等で確認

利用方法（マニュアル）
アプリにアクセス

ブラウザで http://<EC2のパブリックIP>:3001/ または Apache 経由で http://<IP>/

イベント一覧の絞り込み

上部フォームでキーワード／日付／カテゴリを指定

イベント詳細の閲覧

カードをクリック → 詳細ページへ遷移

イベント参加

「参加する」ボタンをクリック

コメント投稿

コメント欄に入力 → 「投稿」をクリック

ページ遷移せずに即時追加

新規イベント作成

ヘッダの「新規作成」リンクをクリック

入力後「作成する」を押すと一覧へリダイレクト

API エンドポイント
メソッド	パス	説明
GET	/api/events	全イベント取得
GET	/api/events/:id	イベント詳細取得
GET	/api/events/:id/participants/count	参加者数取得
POST	/api/events/:id/join	参加登録
GET	/api/events/:id/comments	コメント一覧取得
POST	/api/events/:id/comments	コメント投稿

