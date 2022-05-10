#!/bin/sh
sqlite3 sample.db <<EOF
drop table if exists shops;
create table shops (id INTEGER PRIMARY_KEY, shop VARCHAR(255), platform VARCHAR(255), access_token VARCHAR(255));
EOF
echo "Database successfully created";
