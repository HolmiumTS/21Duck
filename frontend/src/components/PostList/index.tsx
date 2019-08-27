import React, { useState } from 'react';

import { List } from 'antd';

import Post from '../Post';

import { IPost } from '../../types';

import './PostList.css';


export interface PostListProps {
    posts: Array<IPost>;
    loading: boolean;
    postNum: number;
    getPosts: (page: string) => void;
};

export default (props: PostListProps) => {
    const [current, setCurrent] = useState(1);

    const handlePageChange = (page: number): void => {
        setCurrent(page);
        props.getPosts((page - 1).toString());
    };

    return (
        <List
            className='post-list'
            itemLayout='horizontal'
            dataSource={props.posts}
            renderItem={(post) => (
                <li>
                    <Post
                        post={post}
                        loading={props.loading}
                        detail={false}
                    />
                </li>
            )}
            pagination={{
                current: current,
                defaultPageSize: 15,
                size: 'small',
                total: props.postNum,
                hideOnSinglePage: true,
                showQuickJumper: true,
                onChange: (page) => handlePageChange(page),
                position: 'bottom'
            }}
        />
    );
};
