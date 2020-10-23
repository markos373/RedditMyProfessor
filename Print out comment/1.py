import requests
from bs4 import BeautifulSoup

page = int(input('Please enter the total number of comments: '))+1
for i in range(1,page):
    url = 'https://our web page url'+str(i)+'/#comments'
    print('Comment on page %d:'%(i))
    res = requests.get(url)
    soup = BeautifulSoup(res.text,'html.parser')
    comments = soup.find_all('div',class_='comment-content')
    for comment in comments:
    print(comment.text)