from comment import Comment
from typing import List
import psycopg2

class DatabaseManager:
    def __init__(self):
        self.host = "localhost"
        self.database = "rmp_db"
        self.user = "rmp_user"
        self.password = "test_pass"
        self.conn = psycopg2.connect(host=self.host,database=self.database,user=self.user,password = self.password)
    
    def set_up_tables(self):
        with self.conn.cursor() as cursor:
            with open("../database/schema.sql", "r") as rmp_schema:
                setup_queries = rmp_schema.read()
                cursor.execute(setup_queries)
            self.conn.commit()

    def execute_query(self,querystring):
        resultset = []
        try:
            cur = self.conn.cursor()
            cur.execute(querystring)
            self.conn.commit()
            if "select" in querystring.lower():
                rowset = cur.fetchall()
                for row in rowset:
                    resultset.append(row)
            cur.close()
        except (Exception, psycopg2.DatabaseError) as error:
            print('SQL ERROR: ', error)
        finally:
            return resultset
            

    def insert_comment(self, courseId,professor,sentiment_rating,content,link,upvotes):
        query = "INSERT INTO tReddit_Comments(courseId,professor,sentiment_rating,content,link,upvotes) VALUES ('{}','{}',{},'{}','{}',{});".format(courseId,professor,sentiment_rating,content,link,upvotes)
        self.execute_query(query)

    def comments_containing(self, query) -> List[Comment]:
        query = "SELECT * FROM tReddit_Comments WHERE professor LIKE '%{}%' OR courseId LIKE '%{}%';".format(query,query)
        rowset = self.execute_query(query)
        comments = []

        for row in rowset:
            comments.append(Comment(row[4],row[5],row[6]))

        return comments

    def most_upvoted_comments_containing(self, query, n) -> List[Comment]:
        query = "SELECT * FROM tReddit_Comments WHERE professor LIKE '%{}%' OR courseId LIKE '%{}%' ORDER BY upvotes DESC;".format(query,query)
        rowset = self.execute_query(query)
        comments = []

        counter = 0
        for row in rowset:
            comments.append(Comment(row[4],row[5],row[6]))
            counter += 1
            if counter == n:
                break

        return comments

    def populate_db_testing(self):
        self.execute_query("DELETE FROM tReddit_Comments WHERE 1=1") 
        self.insert_comment("cs1","prof1",0,"blah blah", "link", 10)
        self.insert_comment('cs1','goldschmidt',0,'test comment 1 mentions goldschmidt and cs1','https://reddit.com/fake_url_1',5)
        self.insert_comment('cs1','goldschmidt',0,'test comment 2 mentions goldschmidt and cs1','https://reddit.com/fake_url_2',3)
        self.insert_comment('cs1','holzbauer',0,'test comment 3 mentions holzbauer and cs1','https://reddit.com/fake_url_3',2)
        self.insert_comment('sdd','goldschmidt',0,'test comment 4 mentions goldschmidt and sdd','https://reddit.com/fake_url_4',8)
        self.insert_comment('cs1','milanova',0,'test comment 5 mentions milanova and cs1','https://reddit.com/fake_url_5',9)


if __name__ == "__main__":
    DbManagerTest = DatabaseManager()
    DbManagerTest.set_up_tables()
    DbManagerTest.populate_db_testing()
    
    print("---------- comments_containing 'goldschmidt' test ----------")
    comments = DbManagerTest.comments_containing("goldschmidt")
    for comment in comments:
        print(comment)
    
    print("---------- most_upvoted_comments_containing 'cs1' test ----------")
    comments = DbManagerTest.most_upvoted_comments_containing("cs1",5)
    for comment in comments:
        print(comment)
