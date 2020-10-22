CREATE TABLE [tReddit_Comments] (
	course			VARCHAR(100)
	,professor		VARCHAR(100)
	,sentiment_rating	FLOAT --subject to discussion
	,content		VARCHAR(MAX)
	,link			VARCHAR(MAX)
	PRIMARY KEY(course,professor,link)
) 
