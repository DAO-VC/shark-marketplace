echo "Generate build..."
npm run generate:test

ip="104.248.43.29"
folder="/www/shark.digitalppl.com"

echo "Packing.."
tar czf shark.tar.gz dist/

echo "UPLOAD..."
scp shark.tar.gz root@$ip:$folder


ssh -tt root@$ip << EOF
 cd $folder;
 tar -zxvf shark.tar.gz;
EOF

echo "CLEAR..."
rm shark.tar.gz
