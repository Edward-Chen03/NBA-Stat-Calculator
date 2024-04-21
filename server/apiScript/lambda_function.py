import requests
import csv
import boto3
from html.parser import HTMLParser

class MyHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_table = False
        self.current_tags = []
        self.current_data = []
        self.rows = []
        self.header = []
        self.read_header = True

    def handle_starttag(self, tag, attrs):
        self.current_tags.append(tag)
        if tag == 'table':
            for attr in attrs:
                if attr[0] == 'id' and attr[1] == 'per_game_stats':
                    self.in_table = True
        if self.in_table and tag == 'tr':
            self.current_data = []

    def handle_endtag(self, tag):
        if tag == 'table' and self.in_table:
            self.in_table = False
        if self.in_table and tag == 'tr':
            if self.read_header:
                self.header = self.current_data
                self.read_header = False
            else:
                self.rows.append(dict(zip(self.header, self.current_data)))
        self.current_tags.pop()

    def handle_data(self, data):
        if self.in_table and self.current_tags[-1] in ['td', 'th']:
            self.current_data.append(data.strip())


parser = MyHTMLParser()

url = "https://www.basketball-reference.com/leagues/NBA_2024_per_game.html"
html_content = requests.get(url).content
parser.feed(html_content.decode('utf-8'))

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Test')


for row in parser.rows:
    item = {key: float(value) if value.replace('.', '', 1).isdigit() else value for key, value in row.items()}
    table.put_item(Item=item)
