import React from 'react';
import marked from 'marked';
import cx from 'classnames';

import { Card, Avatar, Skeleton, Tooltip } from 'antd';

import { getRelativeTime } from '../../utils';
import PostFooter from './PostFooter';

import { IPost } from '../../types';

import './Post.css';

const { Meta } = Card;


export interface PostProps {
    post: IPost;
    loading: boolean;
    detail: boolean;
    thumb: boolean;
};

export default (props: PostProps) => {
    return (
        <Card
            className={cx('post', props.detail && 'post-detail')}
            hoverable
        >
            <Skeleton
                loading={props.loading}
                active
                avatar
            >
                <Meta
                    avatar={<Avatar src={props.post.user_head} />}
                    title={props.post.theme}
                />
                <span className='user-nickname'>
                    {props.post.user_nickname}
                </span>
                <Tooltip className='post-created-time' title={props.post.formated_posting_time}>
                    <span>
                        {getRelativeTime(props.post.formated_posting_time)}
                    </span>
                </Tooltip>
                <div
                    className='post-content'
                    dangerouslySetInnerHTML={{
                        __html: marked(props.post.posting_content)
                    }}
                />
                <PostFooter
                    post={props.post}
                    detail={props.detail}
                    thumb={props.thumb}
                />
            </Skeleton>
        </Card>
    );
};
