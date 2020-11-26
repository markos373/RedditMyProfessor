from comment import Comment
from typing import List


class DatabaseManager:
    def comments_containing(self, query) -> List[Comment]:
        # TODO
        return [
            Comment("test comment 1", "https://reddit.com/fake_url_1", 3),
            Comment("test comment 2", "https://reddit.com/fake_url_2", 1),
            Comment("test comment 3", "https://reddit.com/fake_url_3", 4),
            Comment("test comment 4", "https://reddit.com/fake_url_4", 1),
        ]

    def most_upvoted_comments_containing(self, query, n) -> List[Comment]:
        return [
            Comment("test comment 3", "https://reddit.com/fake_url_3", 4),
            Comment("test comment 1", "https://reddit.com/fake_url_1", 3),
            Comment("test comment 2", "https://reddit.com/fake_url_2", 1),
            Comment("test comment 4", "https://reddit.com/fake_url_4", 1),
        ]
