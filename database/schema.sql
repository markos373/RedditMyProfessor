DROP TABLE IF EXISTS tReddit_Comments;
CREATE TABLE tReddit_Comments (
	course			VARCHAR(100)
	,professor		VARCHAR(100)
	,sentiment_rating	FLOAT --subject to discussion
	,content		TEXT
	,link			VARCHAR(500)
	,upvotes		INT
	,UNIQUE (course,professor,link)
);