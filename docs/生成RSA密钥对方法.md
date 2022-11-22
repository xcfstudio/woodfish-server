# 利用openssl生成RSA密钥对

## 生成私钥
```shell
openssl genrsa -out ./rsa_private_key.pem 2048
```

## 根据私钥生成公钥
```shell
openssl rsa -in ./rsa_private_key.pem -pubout -out ./rsa_public_key.pub
```