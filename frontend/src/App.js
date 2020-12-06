import React, {useState} from 'react';
import './App.css';
import "antd/dist/antd.css"
import {Tabs, Card, Layout, Menu, Breadcrumb, AutoComplete} from 'antd';
import ReactWordCloud from "react-wordcloud"

const {Header, Content, Footer} = Layout;
const {TabPane} = Tabs;

// NOTE: This is dummy data for the demo,
// TODO: Implement this completely, this should get real data from the backend
// instead of hardcoding
const courses = [
    {
        "name": "Computer Science 1",
        "threads": [
            {
                "name": "CS1",
                "url": "https://www.reddit.com/r/RPI/comments/dhsl32/cs1/",
                "comments": [
                    `
I am taking the same class, and yes, it does get stressful sometimes, especially when you have no idea what's going on. I found it helpful to test and try out things that are covered in lecture yourself rather than just reading them. Also, I keep an extra ide window only when I do HW so that I can test things (e.g. testing how the pop()function works) without having to comment out the entire code. U can PM me if you have any specific question.
                    `,
                    `
                    I can't endorse this approach enough. Some of these concepts, you have to try them out many times over to get a real appreciation for what is happening. You have to break them on purpose, change them, etc. Add a bunch of print statements if you don't have good debugger skills.
The toughest challenge in these concepts isn't things you don't know, but rather the things you do know aren't true, which gets exposed when the problem changes on you. Writing a bunch of test code to experiment will prove you got it down.
                    `,
                    `
                    What specific problems are you having? Are you running out of time? Are you just struggling to understand the concepts?
                    `,
                    `
                    I’m not entirely sure. I think I understand the concepts and then I get to the homework’s and assignments and just completely don’t know what to do or how to start
                    `,
                    `
                    One other thing you can do is go on w3schools tutorials for python. Lectures are fine but the prof isn’t gonna stop if you are having trouble understanding it. And I know better than anybody that it takes more courage than it seems to raise your hand and say you’re having trouble understanding something in a lecture hall full of students.
                    `,
                    `
                    Is CS1 now Python? I remember hearing about CS2/Data Structures switching over to it, but thought CS1 was still C++. So now I'm confused as to what each class is being taught in.
                    `,
                    `
                    CS1 is in Python, DS is C++
                    `,
                    `
                    CS1 is python, DS is C++, Algo (what little code you write) can be in whatever you want mostly, OpSys is C, PSoft is Java. Think those are the main ones currently (that I've taken at least)
                    `,
                ]

            },
            {
                "name": "What Language is Comp Sci 1 done in?",
                "url": "https://www.reddit.com/r/RPI/comments/hqkm28/what_language_is_comp_sci_1_done_in/",
                "comments": [
                    `It is in Python`,
                    `its a decent workload and a fair amount of people tend to struggle, but if you have prior programming experience you should be fine.`,
                    `Ok, I don’t have a ton but I took a comp sci course in high school and it was in Java, and I’m trying to learn C++ for DS, so hopefully it won’t be too bad`,
                    `Were you taking AP CSA? CS 1 goes over most of the same stuff.`,
                    `Yeah the main boon is just knowing how to program in a general sense. Ya know, variables, loops, all of that stuff. Python itself is a very easy language to learn.

That being said, it's a good idea to study a bit of basic C++ knowledge as you're doing (and 100% take the prep course over winter break) for DS because C++ is much more complicated.`,
                    `
                    How would you compare C++ to Java? I learned a tiny bit of python in like 7th grade but I don’t remember any of it, but I know some Java now
                    `,
                    `
                    Well C++ is a compiled language, meaning that the code you write cannot be executed until the compiler links it into extremely efficient machine code, which can then be run very quickly compared to an interpreted language, which is what Java is.

As far as coding in the languages goes, there are some similarities, but also a few fundamental differences. For one, C++ isn't as focused on object-oriented programming like Java typically is, and several of the built-in data types function differently. Every language has its quirks which are both helpful and a pain in the ass. I'm not particularly fluent in Java, so I can't really dive into specific off the top of my head, but I can tell you that just knowing how to code generally and having a basic knowledge of coding structures and data structures and how they work will be immediately helpful. Python is super simple, so you shouldn't have any problems adapting your knowledge to it.

Overall, Data Structures is less about C++ as a language and more about, well, Data Structures. A large part of what you do in the class is deconstruct standard library data types and learn how to build your own structures. Really it's knowledge that could be leveraged in pretty much any coding language.
                    `,
                    `
                    You should be well prepared for CS1, it’s great you’ve started learning C++ but the purpose of CS1 from my point of view is to teach very basic and fundamental rules and concepts of computer science. This is done through a simple and easily readable language (python). Once you hit DS it’s likely you won’t know the specific syntax of c++ but they expect in the first 2-3 weeks of the course you can write fluently with it because it’s so similar to python, and the fundamentals are the same.

What I would say is that if you really care about your GPA certainly take CS1 your first semester, there is 0 reason not to and it may help, if not conceptually, the exams are hard. It’s hand written code? Sound stupid? It is. You hand write, I believe it should be a project based class but the reality is hand writing code is difficult so taking CS1 if even just to get used to the CS course style at RPI would be invaluable before difficult classes
                    `,
                    `
                    If you think writing Python code for CS1 tests is hard... try grading 700 hand-written programs, each slightly different, by executing them in your head.
                    `,
                    `
                    Oh I bet, we slaughter TAs we absolutely need a lab based CS1 for the sanity of you all and for the sake of us.
                    `,
                    `
                    if you took ap cs, cs 1 should be pretty light. Also for DS no prior knowledge of C++ is 'necessary' so they do teach you the language in the beginning, but I guess it always helps to know in advance
                    `,
                    `
                    it's pretty easy. Tests are the hardest part
                    `,
                    `
                    I was a Graduate TA for CS1 for 7 semesters ranging from 2012 to 2017. The course is taught in Python and rotates between a handful of professors depending on the semester. The course is structured as an intro not only for CS majors but also for a wide range of disciplines, including math, engineering, physics, computational biology, etc. It is also intended as a high level overview of object-oriented programming concepts and the basics of logics and some brief algorithms before students advance to CS2 (Data Structures) taught in C++.

Some have mentioned here that the tests are hard. They certainly aren’t designed to stump the students. If you attend lecture, participate in labs, and stay up with understanding the homework assignments, the tests should be fairly straightforward and on-par with an involved Homework assignment.

Let me know if you have any questions about the class.
                    `,
                    `
                   I have a background in programming didn’t show up to a single class and got an easy A if you know how to program just take a full day to learn the syntax and all the tricks of python and you should know the entire course. 
                    `,
                    `I know a little bit but I only really took one class, I don’t really have a background in programming, but I have heard that python is easier than Java or C++
                    `,
                    `
                    True.

Java and C++ were both developed for use on large programming projects, typically with big, distributed teams. There's a lot of unnecessary structure in the language that gets in the way of learning basic programming concepts. Python is leaner, and easier to handle for a CS 1 class. (The notion that AP CompSci in High School should be a java-based class is the kind of idiocy that should get someone banned for life....)

Personally, I think old school C would be better than Python for CS 1, but perhaps that is obviously from the handle... At this point, Class/object languages are so ubiquitous that I think a lot of people would bristle at the notion.
                    `,
                    `
                    Python. Not hard. I had Kuzmin and stopped going to class after the second lecture, and I had no Python experience. Got an A- I believe. The labs and homeworks can feel very long and pointless, partial credit is your friend. The tests are out to get you and are tricky, just plain tricky and mean.
                    `,
                    `Those damn one-liners`,
                    `Those give me PTSD`,
                    `They were such a dumb type of question. Readability and comprehension are much more important than "can you string a bunch of obscure stuff together in unnecessary combinations"`,
                    `Python. Tests are hard, homeworks are easy except for the last one (huge exception, a lot of people I know didnt get to finish it because they assumed it was as easy as the rest).`,
                    `In reality HW 8 (or whatever number it was) was just a small taste of what Data Structures homeworks were like.`,
                    `Personally I thought that homework was harder than a bunch of DS homeworks lol. Like half of DS homeworks were just long and annoying, not hard, whereas I thought the last CS1 homework is actually difficult (obviously not as hard as say hw5 or 6, but still harder than 1 or 2 for DS)`,
                    `Oh that's true for sure. It doesn't help that Turner is notoriously bad at writing concise directions for homework, and by the time we were in DS we actually knew a little more about how to code effectively. DS definitely worked back up to that difficulty, whereas in CS1 the difficulty leap to the last HW was substantial. I mean, I did every CS1 homework in like 2 days.`,
                    `Back in 2002-2006+ it was in C. Python should be much easier.`,
                    `Python, specifically Python 3.7. CS1 is a really great introduction to computer science, and there are plenty of resources online, if you want to get a head start on programming.`,
                    `It’s been in Python 3 in the past, though every semester they discuss changing it, I doubt that’s happening anytime soon

It’s a hard class if you’ve never programmed before (I’ve seen some tears) but if you know the basics of programming, it’s pretty easy. Each week has a lab and a homework. The lab should be started before you get there and the homework should be started as soon as it’s posted (especially in data structures)`,
                    `I know its Python now, though I'm curious: What are they discussing changing it to?`,
                    `Professors and TAs discuss changing it at the end of most semesters. A lot of options are thrown out there but it always go back to python in the end`,
                    `I took it last semester and I can definitely recommend a tutor I had then- I can dm you if you want.`
                ]
            }
        ]
    },
    {
        "name": "Data Structures",

        "threads": [
            {
                "name": "Does anyone feel like the amount of work required for Data Structures is a bit extreme for four credits?",
                "url": "https://www.reddit.com/r/RPI/comments/j0y9r6/does_anyone_feel_like_the_amount_of_work_required/",
                "comments": [
                    `
Yes. It's a weed-out course so that's on purpose. You're not meant to ace everything or hell even finish everything. And as mentioned, I'm in several 4000 level ECSE classes that are like 6-8hrs/wk outside of class and they're all 3 credits. Pretty sure even Capstone is 3, at least for ECSE. It's about time spent in class, not outside of it.
                    `,
                    `It'll be ok! DS is a lot, but you'll make it. Really getting the concepts is more important than your grade for this course. Start your homeworks early, ask for help when you need it (seriously, don't hesitate to post on the discussion forum, go to office hours, ask friends or TAs for advice -- I can also help out if you have a question, whatever works), and really get a good grasp on how everything you're learning works. There may be times where it feels overwhelming, but know that you will make it through. It's tough for a reason.
                    `,
                    `
                    Yeah, DS is a very difficult class, especially for a freshman. Honestly, one of the more useful/important classes as well if you're heading into software engineering. I would definitely budget something close to 20-30 hours for some of the later homeworks, at least to start
                    `,
                    `
                    Definitely agree. Students can and should get a lot out of DS. Anyone who goes through DS and keeps their head above the water is qualified for a summer internship most anywhere. There are lots of projects and topics covered, so if you know how to write it up on a resume you can leverage the class a lot.
                    `,
                    `
                    Data structures is typically like that, but get used to it. RPI workload is intense. But get through this course and you'll come out of it a much better programmer.
                    `,
                    `
                    You are not going insane; I took Data Structures Fall 2018, and I was SHOCKED at how difficult it was. It felt like a 9-credit class and consumed most of my time. I would spend over 12hrs/wk on the homeworks, and yes, homework 6 is terrible and I didn't do too well. So it is not just you, this course is genuinely very very hard.

That said, it is doable, and you can make it through. Go to office hours a lot, take advantage of the ALAC tutoring as well, and do as many practice problems as you can for the exams. Data Structures is, by far, the hardest CS class in terms of workload (although maybe not in terms of concepts) and may very well be the most time-consuming class you will ever take at RPI.
                    `,
                    `
                    I’m a grad working at Microsoft now and it was both the hardest and most useful class for me. It's supposed to be a weed out class and when you're through it everything gets much easier. I don't think she still teaches it but Cutler was An amazing teacher and RPI lucked out when they poached her to teach DS.
                    `,
                    `
                    I wish I only spent ten hours a week on DS HW
                    `,
                    `
                    Once you get through it, you will be a much better programmer/problem solver. It is very worth i
                    `,
                    `
                    A lot of the people I know that took DS either filled that semester with easy electives or took the absolute bare minimum credit load they could in order to allocate enough time for the DS hws.

It'll be daunting and will definitely feel over-kill but it's meant to be like that and at this point it's accepted as-is. Thankfully it's far from non-applicable and you'll be glad you got through it.
                    `,
                    `
                    We didn't have the supplemental video lectures when I took it (2013). Several of my friends and I just skipped the lectures, downloaded her slides, and used that as 4 extra hours a week to do the homework. As for it being a lot of work for 4 credits, idk, most of my physics classes assigned 6-8 hours of homework a week, it's a bit more, but not excessive.

Also, the trick is to teach yourself C++ during the break before the semester.
                    `,
                    `
When I took the class, you started working on the lab before the lab time-frame if I remember correctly. Homework took on average 20 hours (with the exception of the homework 6, the recursion homework). I recommend scheduling your time when you will work on each classes work, and when you will sleep (make sure to schedule 8 hours). Stick to that schedule even if you lose a couple points on homework. Also schedule in going to office hours/tutoring. If you are struggling on any of the homeworks, see if you can get someone to private tutor you.

Since all of my information from when I took the class spring of 2013 I can't guarantee everything has stayed the same. Even during my time there professor Cutler slightly changed the work, though mostly minor changes to homeworks/labs/tests to make them new each semester.

I almost dropped CS after data structures, but I am really glad I stayed in. I work as a full time developer and I love my job.
`,
                    `
                    Haha Data structures go: WORKLOAD
                    `
                ]
            },
            {
                "name": "Past and current students: who here has, at one point or another, had to skip other daytime classes in order to complete Data Structures homework?",
                "url": "https://www.reddit.com/r/RPI/comments/jdzdux/past_and_current_students_who_here_has_at_one/",
                "comments": [
                    `
                    When I took DS, I would still go to classes, but only to be there for attendance and do my DS homework. Despite handful I've Iearned, I suffered from DS and don't ever want to do it again(thank god I passed)
                    `,
                    `
                    When I took DS last semester, I would probably spend no exaggeration 90% of my time doing work on just DS. All of my other classes took a backseat, but thankfully they werent very difficult. Im happy with the difficulty of FOCS and CompOrg this semester. Challenging, but nothing that overwhelms me in the same way DS did.
                    `,
                    `
Almost failed that class because of the homework but never skipped a class to try and finish one. Just gave up on sleep for most of the semester.
                    `,
                    `
                    Never skipped classes, always did the homework in the evening. Sure it took 40 hours but there are more than that in the week.
                    `,
                    `
                    I would usually skip principles of econ to do data structures homework (it helped that econ lectures usually weren't super helpful anyway).
                    `,
                    `
                    I skipped class all the time but that was just because I was a lazy student lol. It’s not like I worked on Data Structures homework instead. I just set aside a few evenings for the crazy ones like HW6, which was doable (didn’t quite get full credit though). I took it with Cutler like 7 years ago (!), but it seems the structure didn’t change much.
                    `,
                    `
                    Maybe it's because I'm online but honestly, I really don't mind the class. While I agree that it is a lot of work, and that is certainly something people can complain about, I personally think that if somebody says that they "hate" DS, (IMO) they simply shouldn't be a CS major and they haven't done enough research on CS before choosing it as a major.

DS isn't like some crazy useless abstract blockchain class or something, DS really is like the core of CS, it's just like if a doctor hated a biology class or a civil engineer hated a physics mechanics class. If you don't like the DS material, then you probably didn't go into CS for the right reasons.
                    `,
                ]
            }
        ]
    },

    {
        "name": "Foundations of Computer Science",
        "threads": []
    },
    {
        "name": "Introduction to Algorithms",
        "threads": []
    },
    {
        "name": "Computer Organization",
        "threads": []
    },
    {
        "name": "Principles of Software",
        "threads": []
    },
];

function Select() {
    return (
        <div style={{textAlign: "center", fontSize: 30, marginTop: 50, opacity: 0.7}}>
            <h1>Please select a course</h1>
        </div>
    )
}

function Modules(props) {
    const {course} = props;

    const counts = {};
    for (let i = 0; i < course.threads.length; i++) {
        for (let j = 0; j < course.threads[i].comments.length; j++) {
            const text = course.threads[i].comments[j];
            console.log("text is", text);
            const words = text.replace("\n", "").replace(".", "").replace(",", "").trim().split(" ").map(w => w.toLowerCase());

            for (let k = 0; k < words.length; k++) {
                if (words[k] in counts) {
                    counts[words[k]]++
                } else {
                    counts[words[k]] = 1
                }
            }
        }
    }

    const ignore = ["the", "of", "on", "and", "a", "you", "to", "for", "my", "as", "when", "that", "if", "i", "very",
        "are", "but", "it", "is", "out", "can", "really", "make", "all", "it's", "get", "do", "your", "was", "what",
        "than", "just", "so", "have", "how", "in", "be", "things", "there", "would", "try", "any"];
    const words = [];
    for (let c in counts) {
        if (ignore.includes(c)) {
            continue
        }
        words.push({
            "text": c,
            "value": counts[c],
        })
    }
    const cards = [];

    for (let i = 0; i < course.threads.length; i++) {
        for (let j = 0; j < course.threads[i].comments.length; j++) {
            const card = <Card style={{margin: 10}}>
                <div>{course.threads[i].comments[j]}</div>
                <div style={{marginTop: 10, opacity: 0.8, fontSize: "0.8em"}}>
                    Thread: <a href={course.threads[i].url}>{course.threads[i].name}</a>
                </div>
            </Card>;
            cards.push(card)
        }

    }
    return (
        <div style={{width: "100%", padding: 50}}>
            <Card type={"inner"} title={<span style={{fontSize: 30}}>{course.name}</span>}>
                <Tabs>
                    <TabPane tab={"Comments"} key={"1"}>
                        {cards}
                    </TabPane>

                    <TabPane tab={"Word cloud"} key={"2"}>
                        <ReactWordCloud style={{"height": 700}} words={words}/>
                    </TabPane>
                </Tabs>


            </Card>

        </div>
    )
}

function App() {

    const [course, setCourse] = useState(null);
    const on_sel = (sel) => {
        for (let i = 0; i < courses.length; i++) {
            if (courses[i].name === sel) {
                setCourse(courses[i])
            }
        }
    };

    return (
        <Layout>
            <Header>
                <div className={"top-bar"} style={{display: "flex", paddingLeft: 20, paddingRight: 20}}>
                    <span style={{color: "#fff", fontSize: 20}}>RedditMyProfessor</span>
                    <div style={{display: "inline-block", width: "100%"}}>
                        <AutoComplete
                            options={courses.map(c => ({value: c.name}))}
                            style={{width: "100%", display: "inline-block"}}
                            placeholder={"search for a course"}
                            onSelect={on_sel}
                        />
                    </div>
                </div>
            </Header>
            <div style={{backgroundColor: "#fff"}}>
                {course === null ? <Select/> : <Modules course={course}/>}
            </div>

        </Layout>
    )


}

export default App;
