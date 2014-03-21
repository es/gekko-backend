#!/usr/bin/env bash
apt-get update
apt-get install -y nginx vim make g++ postgresql postgresql-contrib postgresql-server-dev-9.1 git-core language-pack-en

# Setting up Node.js
wget http://nodejs.org/dist/v0.10.26/node-v0.10.26.tar.gz
tar -xvf node-v0.10.26.tar.gz
rm node-v0.10.26.tar.gz
cd node-v0.10.26/
./configure
make
make install

# Setting up nginx
cp /vagrant/gecko.conf /etc/nginx/sites-enabled/
sed -i 's/sendfile on;/sendfile off;/g' /etc/nginx/nginx.conf
service nginx restart

cd /vagrant/db
sh db.sh

# Install dependencies
cd /vagrant
npm install