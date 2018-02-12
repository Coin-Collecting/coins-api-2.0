from urllib.request import urlopen
from bs4 import BeautifulSoup
import peewee
from peewee import *


db = MySQLDatabase('coins_db', user='root', passwd='DodgerJuno21')

class Issues(peewee.Model):
    denomination_id = peewee.CharField()
    variety_name = peewee.TextField()
    from_year = peewee.TextField()
    to_year = peewee.TextField()
    composition = peewee.TextField()
    mass = peewee.TextField()
    diameter = peewee.TextField()

    class Meta:
        database = db

Issues.create_table()

class Coins(peewee.Model):
    issueId = peewee.CharField()
    year = peewee.TextField()
    mint = peewee.TextField()
    mintage = peewee.DoubleField()
    description = peewee.TextField()

    class Meta:
        database = db

Coins.create_table()

coin_pages = [
'http://www.coindatabase.com/coin_usa.php?id=954', # 1/2 cent
'http://www.coindatabase.com/coin_usa.php?id=2', # 1 cent
'http://www.coindatabase.com/coin_usa.php?id=1316', # 2 cent
'http://www.coindatabase.com/coin_usa.php?id=1326', # 3 cent
'http://www.coindatabase.com/coin_usa.php?id=0', # 5 cent
'http://www.coindatabase.com/coin_usa.php?id=1771', # 10 cent
'http://www.coindatabase.com/coin_usa.php?id=2255', # 20 cent
'http://www.coindatabase.com/coin_usa.php?id=2264', # 25 cent
'http://www.coindatabase.com/coin_usa.php?id=2668', # 50 cent
'http://www.coindatabase.com/coin_usa.php?id=3088', # 1 dollar
]

gold_pages = [
'http://www.coindatabase.com/coin_usa.php?id=3342',
'http://www.coindatabase.com/coin_usa.php?id=3418',
'http://www.coindatabase.com/coin_usa.php?id=3612',
'http://www.coindatabase.com/coin_usa.php?id=3656',
'http://www.coindatabase.com/coin_usa.php?id=3661',
'http://www.coindatabase.com/coin_usa.php?id=3946',
'http://www.coindatabase.com/coin_usa.php?id=4170'
]

for pg in coin_pages:
    page = urlopen(pg)

    soup = BeautifulSoup(page, 'html.parser')

    # Finds All Varieties
    headers = soup.find_all('table', attrs={'class': 'innercoins topping'})


    # Loops through all varieties
    for header in headers:
        denominationId = ''
        denominationName = header.find('h2').text.strip()
        if denominationName == '1/2 ct.':
            denominationId = 1
        elif denominationName == '1 ct.':
            denominationId = 2
        elif denominationName == '2 ct.':
            denominationId = 4
        elif denominationName == '3 ct.':
            denominationId = 5
        elif denominationName == '5 ct.':
            denominationId = 7
        elif denominationName == '10 ct.':
            denominationId = 9
        elif denominationName == '20 ct.':
            denominationId = 10
        elif denominationName == '25 ct.':
            denominationId = 11
        elif denominationName == '50 ct.':
            denominationId = 12
        elif denominationName == '1 $':
            denominationId = 13
        elif denominationName == '1 $ Gold':
            denominationId = 14
        elif denominationName == '2 $ 50':
            denominationId = 15
        elif denominationName == '3 $':
            denominationId = 16
        elif denominationName == '4 $':
            denominationId = 17
        elif denominationName == '5 $':
            denominationId = 18
        elif denominationName == '10 $':
            denominationId = 19
        elif denominationName == '20 $':
            denominationId = 20

        variety_name = header.find('th', attrs={'width': '55%'}).text.strip()

        #finds data for the coins such as diameter, weight and composition
        coin_data_table = header.find_next_siblings('table', attrs={'class': 'innercoins scnd'})

        diameter = coin_data_table[0].find('td', attrs={'width': '56%'}).find('ul').contents[1].text.strip()[10:-3].replace(',', '.')
        weight = coin_data_table[0].find('td', attrs={'width': '56%'}).find('ul').contents[5].text.strip()[8:-3].replace(',', '.')
        composition = coin_data_table[0].find('td', attrs={'width': '56%'}).find('ul').contents[7].text.strip()


        coin_info_table = coin_data_table[0].find_next_siblings('table', attrs={'class': 'innercoins thrd'})
        coinsData = coin_info_table[0].find_all('tr', attrs={'class', 'hl hllnk'})

        years = [];
        for coinData in coinsData:
            years.append(coinData.contents[3].text.strip()[:4])

        data_row = (denominationId, variety_name, min(years), max(years),diameter, weight, composition)
        #print(data_row)

        issue = Issues(
        denomination_id=denominationId,
        variety_name=variety_name,
        from_year=min(years),
        to_year=max(years),
        diameter=diameter,
        mass=weight,
        composition=composition
        )
        issue.save()
        print(str(issue.id) + ' ' + issue.variety_name + ' ' + issue.from_year + '-' + issue.to_year)
        for coinData in coinsData:
            mintageVal = '0'
            mintString = coinData.contents[7].text.strip().replace('.', '').replace(',', '').replace(' ', '')
            if mintString.isdigit():
                mintageVal = coinData.contents[7].text.strip().replace('.', '')

            coin = Coins(
            issue_id = issue.id,
            year = coinData.contents[3].text.strip()[:4],
            mint = coinData.contents[5].text.strip(),
            mintage = mintageVal,
            description = coinData.contents[9].text.strip()
            )
            coin.save()
