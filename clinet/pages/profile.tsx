import { List, Button, Card, Icon } from "antd";

const Profile = ()=>{
    return (
        <div>
            <List
                style={{marginBottom:'20px'}}
                grid={{gutter:4,xs:2,md:3}}
                size="small"
                header={<div>Follower List</div>}
                loadMore={<Button style={{width:'100%'}}>More</Button>}
                bordered
                dataSource={["one","two","three"]}
                renderItem={(item)=>(
                    <List.Item style={{marginTop:'20px'}}>
                        <Card actions={[<Icon key="stop" type="stop"/>]}>
                            <Card.Meta description={item}/>
                        </Card>
                    </List.Item>
                )}
            />
            <List
                style={{marginBottom:'20px'}}
                grid={{gutter:4,xs:2,md:3}}
                size="small"
                header={<div>Following List</div>}
                loadMore={<Button style={{width:'100%'}}>More</Button>}
                bordered
                dataSource={["one","two","three"]}
                renderItem={(item)=>(
                    <List.Item style={{marginTop:'20px'}}>
                        <Card actions={[<Icon key="stop" type="stop"/>]}>
                            <Card.Meta description={item}/>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default Profile;