#!/usr/bin/env bash
sudo -u postgres psql --dbname=postgres -a -f db.sql
sudo -u postgres psql --dbname=template1 -a -f user.sql
sudo -u postgres psql --dbname=db_name -a -f data.sql