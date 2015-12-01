var React = require('react');

var MyTweets = React.createClass({
    render: function(){
        var tweetData = this.props.data.map(function(tweet){
            return <h4 className="profileSummary-twitterStatus">{tweet.text.toUpperCase()}</h4>
        });
        
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        
        var tweetDateString = this.props.data.map(function(tweet){
            
            var asDate = new Date(tweet.created_at);
            
            var asMonth = months[asDate.getMonth()];
            
            return <h6 className="profileSummary-twitterDate gold">{asMonth.toUpperCase() + "/" + asDate.getDate() + "/" + asDate.getFullYear()}</h6>
        });
        
        console.log(tweetDateString);
                                            
            return(
                <div>
                        {tweetDateString}
                        {tweetData}
                </div>
            );
    }
});

var TweetBox = React.createClass({
    
    getInitialState: function(){
        return {data: []};
    },
    
    loadTweetsFromServer: function(){
        var handle='Zfalen'
        $.ajax({
            url: this.props.url + handle,
            dataType: 'json',
            cache: false,
            success: function(data){
                console.log('inside succces!')
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err){
                console.log('broken URL is ' + this.props.url)
                console.error(this.props.url, status, err.toString)
            }.bind(this)
        });
    },
    
    componentDidMount: function(){
        this.loadTweetsFromServer();
    },
    
    render: function(){
        return (
            <MyTweets data={this.state.data}/>
        );
    }
});

module.exports = TweetBox;