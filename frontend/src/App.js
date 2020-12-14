import React, {useEffect, useState} from 'react';
import './App.css';
import "antd/dist/antd.css"
import {Tabs, Card, Layout, Menu, Breadcrumb, AutoComplete} from 'antd';
import ReactWordCloud from "react-wordcloud"
import axios from "axios"

const {Header, Content, Footer} = Layout;
const {TabPane} = Tabs;

// NOTE: This is dummy data for the demo,
// TODO: Implement this completely, this should get real data from the backend
// instead of hardcoding


function Select() {
    return (
        <div style={{textAlign: "center", fontSize: 30, marginTop: 50, opacity: 0.7}}>
            <h1>Please select a course</h1>
        </div>
    )
}

function Modules(props) {
    const {course} = props;

    const [comments, setComments] = useState(null);
    const [wcCloud, setWcCloud] = useState(null);

    useEffect(async () => {
        const most_upvoted_req = await axios.get("http://localhost:5000/most_upvoted", {
            params: {
                query: course,
                n: 100,
            }
        });
        setComments(most_upvoted_req.data);

        const word_cloud_req = await axios.get("http://localhost:5000/word_cloud", {
            params: {
                query: course,
            }
        });
        setWcCloud(word_cloud_req.data)
    }, [course]);


    const words = [];
    for (let k in wcCloud) {
        words.push({
            "text": k,
            "value": wcCloud[k],
        })
    }
    const cards = [];

    for (let i = 0; comments && i < comments.length; i++) {
        const comment = comments[i];
        const card = <Card key={i} style={{margin: 10}}>
            <div>{comment["content"]}</div>
            <div style={{marginTop: 10, opacity: 0.8, fontSize: "0.8em"}}>
                Thread: <a href={comment["url"]}>{comment["url"]}</a>
            </div>
        </Card>;
        cards.push(card)
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

    // TODO: Add this to backend
    const autoOpts = [
        {value: "Computer Science 1"},
        {value: "Data Structures"},
        {value: "Goldschmidt"},
        {value: "Milanova"},
    ];

    return (
        <Layout>
            <Header>
                <div className={"top-bar"} style={{display: "flex", paddingLeft: 20, paddingRight: 20}}>
                    <span style={{color: "#fff", fontSize: 20}}>RedditMyProfessor</span>
                    <div style={{display: "inline-block", width: "100%"}}>
                        <AutoComplete
                            options={autoOpts}
                            style={{width: "100%", display: "inline-block"}}
                            placeholder={"search for a course"}
                            onSelect={setCourse}
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
