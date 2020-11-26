"""
This file contains tests for the following endpoints:
 - /word_cloud
 - /courses_by_popularity
 - /most_upvoted

The following classes are mocked out so that the backend functionality
can be tested in isolation:
 - DatabaseManager
 - SentimentAnalyzer
 - CourseTracker

The above classes are NOT tested in this file and should contain their own
independent tests to verify correctness
"""

from comment import Comment
from course import Course
import backend_server
import unittest.mock
from unittest.mock import patch, Mock


class TestWordCloud(unittest.TestCase):
    """
    TestWordCloud tests the /word_cloud endpoint of the backend API. This endpoint
    allows the user to see the most frequent words that occur in comments containing
    the given search query (the search query can be a course or professor name). The
    response contains the 25 most common words and their frequencies.
    """
    def test_missing_query(self):
        """
        test_missing_query tests that the /word_cloud endpoint returns a HTTP 400
        response if the search query is not provided in the query parameters
        """
        client = backend_server.app.test_client()
        resp = client.get("/word_cloud")
        self.assertEqual(resp.status_code, 400)
        self.assertEqual(resp.json, {"error": "missing query"})
        self.assertEqual(resp.headers["content-type"], "application/json")

    @patch("backend_server.DatabaseManager.comments_containing",
           Mock(return_value=[
               Comment("hello world", "https://fake_url", votes=1),
               Comment("test test test", "https://fake_url", votes=2),
               Comment("test 123", "https://fake_url", votes=3),
           ]))
    def test_multiple_comments(self):
        """
        test_with_multiple_comments tests that the /word_cloud endpoint correctly
        computes the word frequencies across all comments
        """
        client = backend_server.app.test_client()
        resp = client.get("/word_cloud?query=test")
        expected_response = {"123": 1, "hello": 1, "test": 4, "world": 1}
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.json, expected_response)

    @patch("backend_server.DatabaseManager.comments_containing",
           Mock(return_value=[]))
    def test_no_comments(self):
        """
        test_no_comments tests that the /word_cloud endpoint returns an empty dict
        if it cannot find any comments containing the search query
        """
        client = backend_server.app.test_client()
        resp = client.get("/word_cloud?query=test")
        expected_response = {}
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.json, expected_response)

    @patch("backend_server.DatabaseManager.comments_containing",
           Mock(return_value=[
               Comment("", "https://fake_url", votes=1),
               Comment("", "https://fake_url", votes=2),
           ]))
    def test_empty_comments(self):
        """
        test_empty_comments tests that the /word_cloud endpoint returns an empty dict
        if all comments have no text
        """
        client = backend_server.app.test_client()
        resp = client.get("/word_cloud?query=test")
        expected_response = {}
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.json, expected_response)


class TestCoursesByPopularity(unittest.TestCase):
    """
    TestCoursesByPopularity tests the /courses_by_popularity endpoint which returns
    a list of courses sorted by their popularity (popularity is computed by using
    the average sentiment of comments which reference that course)
    """
    @patch("backend_server.CourseTracker.get_all_courses",
           Mock(return_value=[]))
    def test_no_courses(self):
        """
        test_no_courses tests that if the system does not know about any courses
        then an empty list is returned
        """
        client = backend_server.app.test_client()
        resp = client.get("/courses_by_popularity")
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.json, [])

    @patch("backend_server.CourseTracker.get_all_courses",
           Mock(return_value=[
               Course("Data Structures", "CSCI", 1200),
           ]))
    @patch("backend_server.DatabaseManager.comments_containing",
           Mock(return_value=[]))
    def test_no_comments_for_course(self):
        """
        test_no_comments_for_course tests that if the system knows about a course but
        cannot find any comments referencing that course then it is not included in the
        result (because it doesn't have an average sentiment)
        """
        client = backend_server.app.test_client()
        resp = client.get("/courses_by_popularity")
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.json, [])

    @patch("backend_server.CourseTracker.get_all_courses",
           Mock(return_value=[
               Course("Data Structures", "CSCI", 1200),
           ]))
    @patch("backend_server.DatabaseManager.comments_containing",
           Mock(return_value=[
               Comment("A comment about Data Structures",
                       url="https://fake",
                       votes=1),
               Comment("Another comment about Data Structures",
                       url="https://fake",
                       votes=1),
           ]))
    @patch("backend_server.SentimentAnalyzer.analyze_sentiment",
           Mock(side_effect=(1, 3)))
    def test_one_course(self):
        """
        test_one_course tests that the system correctly computes the average sentiment
        for a single course with two comments. The first comment has sentiment 1 and the
        second comment has sentiment 3, giving an average sentiment of 2.
        """
        client = backend_server.app.test_client()
        resp = client.get("/courses_by_popularity")
        self.assertEqual(resp.status_code, 200)
        expected_resp = [{'avg_sentiment': 2.0, 'course': 'Data Structures'}]
        self.assertEqual(resp.json, expected_resp)

    @patch("backend_server.CourseTracker.get_all_courses",
           Mock(return_value=[
               Course("Computer Science 1", "CSCI", 1100),
               Course("Data Structures", "CSCI", 1200),
           ]))
    @patch("backend_server.DatabaseManager.comments_containing",
           Mock(return_value=[
               Comment("comment 1", url="https://fake", votes=1),
               Comment("comment 2", url="https://fake", votes=2),
               Comment("comment 3", url="https://fake", votes=3),
           ]))
    @patch("backend_server.SentimentAnalyzer.analyze_sentiment",
           Mock(side_effect=(6, 5, 4, 3, 2, 1)))
    def test_multiple_courses(self):
        """
        test_multiple_courses tests that the system correctly computes average sentiment
        for multiple courses and returns the list of courses sorted by their average
        sentiment
        """
        client = backend_server.app.test_client()
        resp = client.get("/courses_by_popularity")
        self.assertEqual(resp.status_code, 200)
        expected_resp = [
            {
                'avg_sentiment': 5.0,
                'course': 'Computer Science 1'
            },
            {
                'avg_sentiment': 2.0,
                'course': 'Data Structures'
            },
        ]
        self.assertEqual(resp.json, expected_resp)


class TestMostUpvoted(unittest.TestCase):
    """
    TestMostUpvoted tests the /most_upvoted endpoint which returns the top n
    most upvoted comments which contain the given search query.
    """
    def test_missing_query(self):
        """
        test_missing_query tests that the /most_upvoted endpoint returns an HTTP 400
        response if the user does not specify the query
        """
        client = backend_server.app.test_client()
        resp = client.get("/most_upvoted")
        self.assertEqual(resp.status_code, 400)
        self.assertEqual(resp.json, {"error": "missing query"})
        self.assertEqual(resp.headers["content-type"], "application/json")

    def test_missing_n(self):
        """
        test_missing_n tests that the /most_upvoted endpoint returns an HTTP 400
        response if the user does not specify n, the number of comments they want
        returned in the response
        """
        client = backend_server.app.test_client()
        resp = client.get("/most_upvoted?query=test")
        self.assertEqual(resp.status_code, 400)
        self.assertEqual(resp.json, {"error": "missing n"})
        self.assertEqual(resp.headers["content-type"], "application/json")

    @patch("backend_server.DatabaseManager.most_upvoted_comments_containing",
           Mock(return_value=[]))
    def test_no_comments(self):
        """
        test_no_comments tests that the /most_upvoted endpoint returns an empty list
        if the system does not know about any comments which contain the given search query
        """
        client = backend_server.app.test_client()
        resp = client.get("/most_upvoted?query=test&n=5")
        self.assertEqual(resp.status_code, 200)
        expected_resp = []
        self.assertEqual(resp.json, expected_resp)

    @patch("backend_server.DatabaseManager.most_upvoted_comments_containing",
           Mock(return_value=[
               Comment("test comment 1", "https://fake", votes=5),
               Comment("test comment 2", "https://fake", votes=3),
               Comment("test comment 3", "https://fake", votes=9),
           ]))
    def test_top_comments(self):
        """
        test_top_comments tests that the system returns the top comments sorted by
        the number of votes each comment has
        """
        client = backend_server.app.test_client()
        resp = client.get("/most_upvoted?query=test&n=5")
        self.assertEqual(resp.status_code, 200)
        expected_resp = [{
            'content': 'test comment 3',
            'url': 'https://fake',
            'votes': 9
        }, {
            'content': 'test comment 1',
            'url': 'https://fake',
            'votes': 5
        }, {
            'content': 'test comment 2',
            'url': 'https://fake',
            'votes': 3
        }]
        self.assertEqual(resp.json, expected_resp)
