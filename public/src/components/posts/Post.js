import React from 'react';

import { Link } from 'react-router';
import { Card, CardHeader, CardMedia } from 'material-ui/Card';

export default (props) => (
    <Card className="post" style={props.style}>
        <CardHeader
            title={<div><Link to={`/${props.post.user}`}>{props.post.user}</Link></div>}
            subtitle={props.post.timestamp}
        />
        <CardMedia>
            <img src={`/api/posts/${props.post.user}/${props.post.url}`} />
        </CardMedia>
    </Card>
);