DROP TABLE IF EXISTS tReddit_Comments;
DROP TABLE IF EXISTS tCourses;
DROP TABLE IF EXISTS tReports;

CREATE TABLE tReddit_Comments (
	commentId		SERIAL
	,courseId		VARCHAR(100)
	,professor		VARCHAR(100)
	,sentiment_rating	FLOAT
	,content		TEXT
	,link			VARCHAR(500)
	,upvotes		INT
	,UNIQUE (courseId,professor,link)
);

CREATE TABLE tCourses (
	courseId		VARCHAR(100)
    ,courseName 	VARCHAR(200)
);

CREATE TABLE tReports (
	ip_address	VARCHAR(100)
	,commentId	INT
	,reportContent  TEXT
)