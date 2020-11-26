from flask import Flask, request, jsonify
from database_manager import DatabaseManager
from course_tracker import CourseTracker
from sentiment_analyzer import SentimentAnalyzer
import collections

app = Flask(__name__)


@app.route("/word_cloud", methods=['GET'])
def word_cloud():
    query = request.args.get("query")
    if query is None:
        return jsonify({"error": "missing query"}), 400

    db = DatabaseManager()
    comments = db.comments_containing(query)
    words = [word.lower() for c in comments for word in c.content.split()]
    counts = collections.Counter(words).most_common(25)
    return jsonify(dict(counts))


@app.route("/courses_by_popularity", methods=['GET'])
def courses_by_popularity():
    course_tracker = CourseTracker()
    db = DatabaseManager()
    analyzer = SentimentAnalyzer()
    sentiments = []
    for course in course_tracker.get_all_courses():
        course_comments = db.comments_containing(course.name)
        if len(course_comments) == 0:
            continue
        course_sentiments = [
            analyzer.analyze_sentiment(c.content) for c in course_comments
        ]
        avg_sentiment = sum(course_sentiments) / len(course_sentiments)
        sentiments.append({
            "course": course.name,
            "avg_sentiment": avg_sentiment
        })

    return jsonify(
        sorted(sentiments, key=lambda x: x["avg_sentiment"], reverse=True))


@app.route("/most_upvoted", methods=['GET'])
def most_upvoted():
    query = request.args.get("query", )
    n = request.args.get("n", type=int)
    if query is None:
        return jsonify({"error": "missing query"}), 400
    if n is None:
        return jsonify({"error": "missing n"}), 400

    db = DatabaseManager()
    comments = db.most_upvoted_comments_containing(query, n)
    comments.sort(key=lambda x: x.votes, reverse=True)
    return jsonify([c.to_dict() for c in comments])
