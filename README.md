# 事前準備
dockerの代わり
`brew install colima`
docker使うがローカルにもインストール。IDE補完やLinterで使用するため。
`brew install node`
`node -v  # Node.js のバージョン確認`
`npm -v   # npm のバージョン確認`
backend フォルダで npm をインストール
`npm install`
`npm install --save-dev nodemon`

# 各種コマンド
- colima の起動、停止
`colima start`
`colima stop`

- docker-compose.yml で定義しているイメージの起動、停止、削除
  -d（デタッチドモード）：バックグラウンドで実行
`docker-compose up -d`
`docker-compose down`
`docker-compose stop`

- イメージを再ビルド
`docker-compose up -d --build`

- コンテナやボリューム確認
`docker ps`
`docker container ls`
`docker volume ls`

- コンテナのログ確認
`docker logs web-app-sample-backend-1`

- コンテナのシェルに入る
`docker exec -it web-app-sample-backend-1 sh`

- DBへ接続
`docker exec -it web-app-sample-db-1 psql -U postgres -d my_database`

- portを使用しているサービス確認
`lsof -i :5000`

- ターミナルから api実行
`curl http://localhost:5001/api`

- console.log の確認方法
`docker logs -f web-app-sample-backend-1`

- 修正反映方法
nodemon で自動反映。
または コンテナを再起動して反映 `docker-compose restart backend`

# コンテナ名、ポート
機能	コンテナ名	ポート
PostgreSQL (DB)	db	5432
Adminer (DB管理)	adminer	8080
Express (APIサーバー)	backend	5001


# API実行
curl http://localhost:5001/api/users

curl -X POST http://localhost:5001/api/users \
  -H "Content-Type: application/json" \
  -d '{"id": 1, "name": "sample"}'