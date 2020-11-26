from typing import List
from course import Course


class CourseTracker:
    def __init__(self):
        pass

    def get_all_courses(self) -> List[Course]:
        return [
            Course("Computer Science 1", "CSCI", 1100),
            Course("Data Structures", "CSCI", 1200)
        ]
