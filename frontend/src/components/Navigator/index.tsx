import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { History } from 'history';

import { Menu, Input, Icon, message } from 'antd';

import { logout } from '../../actions';

import { ClickParam } from 'antd/lib/menu';
import { useUser } from '../../hooks';

import './Navigator.css';

const { Item, SubMenu } = Menu;
const { Search } = Input;


export interface NavigatorProps {
    history: History;
};

export default (props: NavigatorProps) => {
    const [menuKey, setKey] = useState(props.history.location.pathname.slice(1));
    const user = useUser();
    const dispatch = useDispatch();

    useEffect(() => {
        const regex = '/([\\w]+)(/.+)?';
        const key = (props.history.location.pathname.match(regex) as RegExpMatchArray)[1];
        console.log('key:',key);
        if (key !== 'notify') {
            setKey(key);
        }
    }, [props.history.location.pathname])

    return (
        <Menu
            className='navigator'
            theme='light'
            mode='horizontal'
            selectedKeys={[menuKey]}
        >
            <Item key='explore'>
                <Link to='/explore'>
                    <span>
                        <img className='logo' src='./duckv2.ico' alt='' />
                    </span>
                    <span className="duck21">21Duck</span>
                </Link>
            </Item>
            <Item key='chat'>
                <Link to='/chat'>闲聊栈</Link>
            </Item>
            <Item key='problems'>
                <Link to='/problems'>AK我的OJ题</Link>
            </Item>
            <Item key='courses'>
                <Link to='/courses'>课程推荐</Link>
            </Item>
            <Item key='campus'>
                <Link to='/campus'>校园周边</Link>
            </Item>
            <Item key='resources'>
                <Link to='/resources'>资源分享</Link>
            </Item>
            {user.identity === 0 ? (
                <Item
                    className='user'
                    key='login'
                >
                    <Link to='/login'>
                        <Icon type='user' />
                        登录
                    </Link>
                </Item>
            ) : (
                    <SubMenu
                        className='user-menu'
                        title={
                            <span >
                                <Icon type='user' />
                                用户
                            </span>
                        }
                    >
                        <Item key='user'>
                            <Link to='/user'>个人中心</Link>
                        </Item>
                        {user.identity === 2 ? <Item key='admin'>
                            <Link to='/admin'>管理面板</Link>
                        </Item> : null}
                        <Item onClick={() => {
                            dispatch(logout());
                            message.config({ top: 75 });
                            message.success('注销成功');
                            setTimeout(() => props.history.replace('/login'), 100);
                        }}>
                            注销
                        </Item>
                    </SubMenu>
                )}
            <Item
                className='notify'
                key='notify'
                onClick={(e: ClickParam) => console.log('bell')}
            >
                <Icon type='bell' />
                通知
            </Item>
            <Search
                className='navigator-search'
                placeholder='search'
                onSearch={(e: string) => console.log(e)}
            />
        </Menu>
    );
};
