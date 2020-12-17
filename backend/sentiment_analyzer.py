from comment import Comment
from google.cloud import language_v1


class SentimentAnalyzer:
    def __init__(self):
        pass

    # Older trivial function to maintain backend test functionality
    def analyze_sentiment(self, comment: Comment) -> float:
        return 1

    # Analyze sentiment within a comment's content
    def analyze__comment_nlp(self, comment: Comment) -> float:
    	client = language_v1.LanguageServiceClient()

    	# Get comment content
    	text_content = comment.content

    	type_ = language_v1.Document.Type.PLAIN_TEXT

    	# If not specifed, client will autodetect
    	# Assume to be English for RPI Reddit comments for now
    	langauge = "en"
    	document = {"content": text_content, "type_": type_, "language": language}

    	# Set encoding type
    	encodying_type = language_v1.EncodyingType.UTF8

    	# Get the sentiment of the content
    	response = client.analyze_sentiment(request = {'document': document, 'encoding_type': encoding_type})

        return response.document_sentiment.score
