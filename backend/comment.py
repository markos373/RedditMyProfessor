class Comment:
    def __init__(self, content, url, votes):
        # TODO: This will probably need more properties once we start
        # scraping reddit
        self.content = content
        self.url = url
        self.votes = votes

    def to_dict(self):
        return {"content": self.content, "url": self.url, "votes": self.votes}
