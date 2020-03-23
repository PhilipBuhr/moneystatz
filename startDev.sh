#!/bin/bash

root=/workspace/moneyStatz

cd $root

source $root/venv/bin/activate

nohup python manage.py runserver &

cd frontend && npm run start

