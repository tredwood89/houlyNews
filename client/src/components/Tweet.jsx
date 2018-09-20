import React from 'react';
import moment from 'moment';
import _ from 'lodash';

const Tweet = ({ tweet }) => {



   // const textFixer = function(tweet){
   //   let text = tweet.text
   //   let httpMatch = text.match(/http.*/,"")
   //   if (httpMatch){
   //     let linkString = httpMatch[0]
   //     let newText = text.replace(linkString,"")
   //
   //   }
   // }
   const httpMatchLink = function(tweet){
     let text = tweet.text
     let httpMatch = text.match(/http.*/,"")
     if (httpMatch) {
       let linkString = httpMatch[0]
       let httpLink = <a href={linkString}>View Full Tweet</a>
       // let newText = string.replace(linkString,"")
       console.log('linkStr', linkString)
       console.log('htpLink', httpLink);
       // console.log('newTEXt', newText);
       return ( httpLink )
     }
   }

    const specifyTweetType = function(text, quote, reply) {
        if (text.slice(0, 2) === 'RT') {
            return 'tweet-retweet';
        } else if (quote) {
            return 'tweet-quote';
        } else if (reply && _.get(tweet, "in_reply_to_screen_name") === tweet.user.screen_name) {
            return 'tweet-reply-self';
        } else if (reply) {
            return 'tweet-reply';
        }
        return 'tweet';
    };

    const tweetLinkMaker = function(username, tweetId) {
        return tweetId ?
            `https://www.twitter.com/${username}/status/${tweetId}` :
            `https://www.twitter.com/${username}`;
    };



    const addInteractionTag = function(tweet) {
        const { text, is_quote_status: quote, in_reply_to_screen_name: reply } = tweet;
        let action, link, name, tweetUrl;


        if (text.slice(0, 2) === 'RT' || quote || (reply && _.get(tweet, "in_reply_to_screen_name") !== tweet.user.screen_name)) {
            if (text.slice(0, 2) === 'RT') {
                action = 'Retweeted';
                name = text.match(/(@)\w+/)[0].slice(1);
                link = tweetLinkMaker(name);
                tweetUrl = tweetLinkMaker(name, _.get(tweet, "retweeted_status.id_str"));
            } else if (quote) {
                action = 'Quoted';
                name = _.get(tweet, 'quoted_status.user.screen_name');
                link = tweetLinkMaker(name);
                tweetUrl = tweetLinkMaker(name, _.get(tweet, 'quoted_status.id_str'));
            } else if (reply && _.get(tweet, "in_reply_to_screen_name") !== tweet.user.screen_name) {
                action = "Mentioned";
                name = _.get(tweet, "in_reply_to_screen_name");
                link = tweetLinkMaker(name);
            }

            if (tweetUrl) {
              return (<p>{action} <a href={link} target="_blank">{'@' + name + "'s"}</a> <a href={tweetUrl} target="_blank">tweet</a></p>)
            } else {
             return (<p>{action} <a href={link} target="_blank">{'@' + name}</a></p>)
            }

        }

    }

    const addInteractionUser = function(tweet) {
        const { text, is_quote_status: quote, in_reply_to_screen_name: reply } = tweet;
        let user, userLink, userImg;
        if (text.slice(0, 2) === 'RT' || quote || (reply && _.get(tweet, "in_reply_to_screen_name") !== tweet.user.screen_name)) {
            if (text.slice(0, 2) === 'RT') {
                user = _.get(tweet, 'retweeted_status.user', {});
                userLink = tweetLinkMaker(user.screen_name);
                userImg = user.profile_image_url_https;
            } else if (quote) {
                user = _.get(tweet, "quoted_status.user", {});
                userLink = tweetLinkMaker(user.screen_name);
                userImg = user.profile_image_url_https;
            } else if (reply && _.get(tweet, "in_reply_to_screen_name") !== tweet.user.screen_name) {
                user = _.get(tweet, "entities", {});
                userLink = tweetLinkMaker(tweet.in_reply_to_status_id_str);
                userImg = tweet.in_reply_to_status_id_str;
            }
            return (<a href={userLink} target="_blank"><img src={userImg} alt=""/></a>);
        }
    }

    return (
        <li className={`article list-group-item ${specifyTweetType(tweet.text, tweet.is_quote_status, tweet.in_reply_to_screen_name)}`}>
            <div className="row">
                <div className="col-2">
                    <a href={tweetLinkMaker(tweet.user.id_str, tweet.id_str)} target="_blank">
                        <img alt="Tweet Img" src={tweet.user.profile_image_url} />
                    </a>

                    { addInteractionUser(tweet) }
                </div>
                <div className="col-10">
                    { addInteractionTag(tweet) }
                    <p> { tweet.text } </p>
                    <p>{httpMatchLink(tweet)}</p>
                    <div className="d-flex justify-content-around">
                        <p className="m-0 text-danger"> <i className="fas fa-heart"></i> { tweet.favorite_count } </p>
                        <p className="m-0 text-success"> <i className="fas fa-retweet"></i> { tweet.retweet_count } </p>
                        <p className="m-0 "> { moment(tweet.created_at).format("dddd, MMMM Do") } </p>
                        <p className="m-0 "> { moment(tweet.created_at).format("h:mm:ssa") } </p>
                    </div>
                </div>
            </div>
        </li>
    )
};

export default Tweet;
