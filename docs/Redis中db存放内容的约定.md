# Redis中db存放内容的约定

```ts
// dbnumber范围丛0～15，用来间隔不同种类的数据
redisClient.select(dbnumber)
```

## db0
存放排行榜数据 (zSet)
单用户总榜排名缓存(uid: totalRanking)

## db1
存放被ban的token(uid: token)

## db2
存放uid: username对照数据(uid: username)

## db3
存放用户累计功德（SQL）缓存（uid: totalGongde）