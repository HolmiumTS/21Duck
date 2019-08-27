import React, { useState, useEffect } from 'react';

import api from '../../api';
import MainFrame from './MainFrame';

import { IPost, Param } from '../../types';

import './Template.css';


export interface PageListTemplateProps {
    name: string;
    category: string;
};

export default (props: PageListTemplateProps) => {
    let initPosts = new Array<IPost>();
    for (let i = 0; i < 15; ++i) {
        initPosts.push(new IPost());
    }

    const [posts, setPosts] = useState(initPosts);
    const [postNum, setPostNum] = useState(0);
    const [loading, setLoading] = useState(true);

    const getPosts = (page: string): void => {
        setLoading(true);

        const params: Param = {
            page: page,
            category_id: props.category,
        };

        api.post.list(params).then((response) => {
            const posts: Array<IPost> = response.data;
            setPostNum(posts[0].posting_num);
            setPosts(posts);
            setLoading(false);

        }).catch(err => console.log(err));
    };

    useEffect(() => {
        getPosts('0');
    }, []);

    return (
        <div className={`${props.name}-root`}>
            <MainFrame
                name={props.name}
                posts={posts}
                postNum={postNum}
                getPosts={getPosts}
                loading={loading}
            />
        </div>
    );
};
