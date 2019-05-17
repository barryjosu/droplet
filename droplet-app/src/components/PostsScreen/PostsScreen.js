import React, {Component} from 'react'
import { connect } from 'react-redux'
import './PostsScreen.css'
import PropTypes from 'prop-types'
import PostList from '../PostList/PostList'
import { loadHomePosts } from '../../actions/postActions'
import {updateTime, homePage} from '../../actions/miscActions'
import {arrayEquals} from '../../actions/utility.js'

class PostsScreen extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        //TEMP FIX
        //Starting coords, centered on Corvallis
        let lng = -123.278711
        let lat = 44.567325
        if(Array.isArray(this.props.location) && this.props.location.length === 2){
            this.props.dispatch(loadHomePosts(this.props.location));
        }else{
            this.props.dispatch(loadHomePosts([lng,lat]))
        }
        this.props.dispatch(homePage());
        this.props.dispatch(updateTime());
    }

    componentDidUpdate(prevProps){
        if(!arrayEquals(this.props.location, prevProps.location)){
            this.props.dispatch(loadHomePosts(this.props.location));
        }
    }

    render(){

        return(
            <main className={this.props.theme ? 'posts-screen screen dark' : 'posts-screen screen'}>
               <PostList posts={this.props.homePosts} like={false} />
            </main>
        )
    }
}

/*
const PostsScreen = (props) => {
    props.dispatch(loadHomePosts());
    return(
    <main className='posts-screen screen'>
       <PostList homePosts={props.homePosts} />
    </main>
    );
}*/

PostsScreen.propTypes = {
    homePosts: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        homePosts: state.homePosts,
        location: state.location,
        theme: state.themeId,
    }
}

export default connect(mapStateToProps)(PostsScreen);
