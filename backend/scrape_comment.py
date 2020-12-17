import praw

def scrape():
    r = praw.Reddit(user_agent="Comment Extraction (by u/USERNAME)")
    # This URL is about the data structure course.
    thread = "https://www.reddit.com/r/RPI/"
    r.login(settings['username'], settings['password'], disable_warning=True)
    submission = r.get_submission(thread)

    comments = []

    for comment in submission.comments:
        #this works, prints out the comments text
        print(comment.body)

        #now i want to get the child comments that are replied to this comment
        commentSubmission = r.get_submission(comment.permalink)
        #ideally comments[0] should show me first reply, comments[1] the second. etc
        comments.append(commentSubmission.comments[1])


    return comments

# If we need a sub-comment of a comment, we can add the following code
'''process_comments(submission.comments)
def process_comments(objects):
    for object in objects:
        if type(object).__name__ == "Comment":
            process_comments(object.replies) # Get replies of comment
            # Do stuff with comment (object)
        elif type(object).__name__ == "MoreComments":
            process_comments(object.comments()) # Get more comments at same level
            '''
