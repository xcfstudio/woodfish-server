openssl genrsa -out ./rsa_private_key.pem 1024
openssl rsa -in ./rsa_private_key.pem -pubout -out ./rsa_public_key.pub
echo "Done! -- 密钥对已写入"