# Money Statz

A basic finance tracker. Create Categories (called Jars) and track your income and expenses. 
Visualize how much money you spent with bar charts.

## Installation

Clone the repository. Change into the root folder and run the following commands. (On Unix systems, requires `python > 3.6` and `npm`)
```shell script
python3 -m venv venv
source venv/bin/activate

pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate

cd frontend
npm install
```

## Usage

After installation, change into the root directory and run:
```shell script
./startDev.sh
```

Use the + icon to add Jars. Click cells to add/edit/delete transactions. The Bar chart updates automatically. 
