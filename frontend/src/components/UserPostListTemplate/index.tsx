import React, { useState, useEffect } from 'react';

import api from '../../api';
import MainFrame from './MainFrame';

import { IPost, Param } from '../../types';

import './Template.css';


export interface BannerItem {
    img: string,
    title: string,
    text: string;
};

const items: BannerItem[] = [{
    img: 'https://zos.alipayobjects.com/rmsportal/hzPBTkqtFpLlWCi.jpg',
    title: '揭秘学院路3公寓114寝室',
    text: '每次我过去玩都飘来一股茶香，然后我就被麻晕了什么都不记得了'
}, {
    img: 'https://zos.alipayobjects.com/rmsportal/gGlUMYGEIvjDOOw.jpg',
    title: '早知道编辑器也会。。。',
    text: '调了两天的编辑器终于能高亮了结果和我说用现成的？？？'
}];

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

    const renderBanner = (item: BannerItem) => (
        <div onClick={() => console.log(item.title)}>
            <img src={item.img} alt='' />
            <h3>{item.title}</h3>
            <span>{item.text}</span>
        </div>
    );

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