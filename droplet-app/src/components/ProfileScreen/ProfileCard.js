import React from 'react'
import './ProfileCard.css'

const PostMedia = (props) => {
    switch(props.mediaType) {
        case 'photo':
            return (<div className='post-media'><img src={props.mediaSource} /></div>)
        case 'video':
            return (<div className='post-media'><video src={props.mediaSource} /></div>)
        default:
            return (<div></div>)
    }
}

const ProfileCard = (props) => (
    <div className='profilecard'>
        <div className='profilecard-top'>
            <img className='profilecard-pic' src={props.picture} alt='' />
            <p className='username'>@{props.username}</p>
        </div>
        <p>[This is a filler bio. Your real one will go here once we code it.]</p>
    </div>
)

export default ProfileCard;