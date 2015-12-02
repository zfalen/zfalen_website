var React = require('react');

var PieChart = require('react-simple-pie-chart');

var TweetBox = require('./recentTweet');


var Profile = React.createClass({
   
    render: function(){
        var slashStyle = {
            fontWeight: 200
        }
        return(
            <div className="container" id='profileSummary-profileHolder'>
                <div className="col-md-6 col-md-offset-6">
                    <h2 className="profileSummary-sectionTitle"><span style={slashStyle}>// </span>ZACHARY &thinsp; M. &thinsp; FALEN </h2>
                    <div className="row">
                        <div className="col-md-12 profileSummary-profileText">
                            <p><strong>Founder</strong>&nbsp;- Bloom Content &nbsp; &nbsp; // &nbsp; &nbsp; <strong>MKTG Consultant</strong>&nbsp;- Blackstone Launchpad</p><br/>
                            <p><strong><u>Location</u>:</strong>&nbsp; &nbsp; University of Montana &nbsp; &nbsp; // &nbsp; &nbsp; Missoula, MT </p>
                            <p><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  BA</strong>&nbsp;- &nbsp; Marketing &nbsp; &nbsp; <strong>Minor</strong>&nbsp;- &nbsp; Media Arts</p><br/>
                            <p><strong><u>Interests</u>:</strong>&nbsp; &nbsp; Skiing &nbsp; // &nbsp; Fly Fishing &nbsp; // &nbsp; Kayaking &nbsp; // &nbsp; Backpacking &nbsp; // &nbsp; Creating </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

var Twitter = React.createClass({
    
    getInitialState: function(){
        return({hoverClass: "profileSummary-twitterIcon-inactive"})
    },
    
    handleMouseEnter: function(stateToChange){
        this.setState({[stateToChange]: "profileSummary-twitterIcon-active"})
    },
    
    handleMouseLeave: function(stateToChange){
        this.setState({[stateToChange]: "profileSummary-twitterIcon-inactive"})
    },
   
    render: function(){
        var slashStyle = {
            fontWeight: 200
        }
        var atStyle = {
            fontWeight: 100,
            fontSize: 25
        }
        return(
            <div className="container" id='profileSummary-twitterHolder'>
                <div className="col-md-8 col-md-offset-2">
                    <div className="row vertical-center profileSummary-twitterStatusHolder">
                        <div className="col-md-4">
                            <a href="https://twitter.com/zfalen" target="_blank" onMouseEnter={this.handleMouseEnter.bind(this, 'hoverClass')} onMouseLeave={this.handleMouseLeave.bind(this, 'hoverClass')}>
                                <i className={"fa fa-twitter fa-5x profileSummary-twitterIcon " + this.state.hoverClass}></i>
                            </a>
                        </div>
                        <div className="col-md-8" id="profileSummary-tweetBox">
                            <TweetBox url='/api/handle/'/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

var GramBoxes = React.createClass({
    
    render: function(){
        var gramBoxes = this.props.data.map(function(gram){
            
            var holderStyle = {
                display: 'block',
                position: 'relative',
                backgroundImage: 'url(' + gram.images.standard_resolution.url + ')',
                backgroundSize: '126%',
                backgroundPosition: '50% 40%',
                backgroundRepeat: 'no-repeat',
                height: 400
            }
            
            return <div className="col-md-4" style={holderStyle}/>
        });
        
        return(
            <div>
            {gramBoxes}
            </div>
        )
    }
})

var Grams = React.createClass({
   
    getInitialState: function(){
        return({data: []})
    },
    
    loadGramsFromServer: function(){
        $.ajax({
            url: '/api/grams',
            dataType: 'json',
            cache: false,
            success: function(data){
                this.setState({data: data}); 
                console.log('the grams are golden!');
            }.bind(this),
            error: function(xhr, status, err){
                console.error(this.props.url, status, err.toString)
            }.bind(this)
        });
    },
    
    componentDidMount: function(){
        this.loadGramsFromServer();
    },
    
    render: function(){
        
        var wrapperStyle = {
            padding: 0
        }
        
        var topStyle = {
            width: '100%',
            height: 1,
            backgroundColor: '#202020'
        }
        
        
        return(
            <div className="container-fluid" style={wrapperStyle}>
                <GramBoxes data={this.state.data}/>
            </div>
        )
    }
    
    
});


var Skills = React.createClass({
    
    handleClick: function() {
        $("html, body").animate({ scrollTop: 0 }, 600);
    },
    
    render: function(){
        var slashStyle = {
            fontWeight: 200
        }
        
        var padLeft = {
            paddingLeft: 45,
        }
        
        var xlStyle = {
            fontSize: 35,
            textAlign: 'left',
            paddingLeft: 25,
            color: '#FFF'
        }
        
        var bigStyle = {
            fontSize: 30,
            textAlign: 'left',
            color: '#FFF'
        }
        
        var medStyle = {
            fontSize: 20,
            textAlign: 'left',
            color: '#FFF',
            fontWeight: 400
        }
        
        return(
            <div id="profileSummary-skillsHolder">
            
                <div id="profileSummary-servicesLogoHolder">
                    <img src="../img/services_graphic.svg" id="profileSummary-servicesLogo"/>
                    
                    <div className="text-center white" id="profileSummary-skillsHolder1">
                        <i className="fa fa-cloud profileSummary-skillsIcon"/>
                        <h2 className="profileSummary-skillsTitle">DIGITAL STRATEGY</h2>
                        <p className="profileSummary-skillsText">Lorem ipsum dolorem set ep sigma sig hominem.<br/>Vos tantum hominis.<br/>Memento mori.</p><br/>
                        <h2 className="blue">· · ·</h2>
                    
                    </div>
                </div>
            
                <div id="profileSummary-serviceHolder2">
                    
                    <div className="vertical-center">
                        <div className="text-center black" id="profileSummary-skillsHolder2">
                            <div className="row">
                                <div className="col-md-4">
                                    <i className="fa fa-film profileSummary-skillsIcon"/>
                                    <h3 className="profileSummary-skillsTitle">VIDEOGRAPHY</h3>
                                    <p className="profileSummary-skillsText">Lorem ipsum dolorem set ep sigma sig hominem.<br/>Vos tantum hominis.<br/>Memento mori.</p>
                                </div>
                                <div className="col-md-4">
                                    <i className="fa fa-camera-retro profileSummary-skillsIcon"/>
                                    <h3 className="profileSummary-skillsTitle">PHOTOGRAPHY</h3>
                                    <p className="profileSummary-skillsText">Lorem ipsum dolorem set ep sigma sig hominem.<br/>Vos tantum hominis.<br/>Memento mori.</p>
                                </div>
                                <div className="col-md-4">
                                    <i className="fa fa-spinner profileSummary-skillsIcon"/>
                                    <h3 className="profileSummary-skillsTitle">MOTION DESIGN</h3>
                                    <p className="profileSummary-skillsText">Lorem ipsum dolorem set ep sigma sig hominem.<br/>Vos tantum hominis.<br/>Memento mori.</p>
                                </div>
                            </div>
                            <div className="spacer-40px"></div>
                            <h2 className="blue">· · ·</h2>
                        </div>
                    </div>
                </div>
            
                <div id="profileSummary-serviceHolder3">
                    
                    <div className="vertical-center">
                        <div className="text-center white" id="profileSummary-skillsHolder3">
                            <div className="col-md-12">
                                <i className="fa fa-tablet profileSummary-skillsIcon"/>
                                <h3 className="profileSummary-skillsTitle">UI DESIGN</h3>
                                <p className="profileSummary-skillsText">Lorem ipsum dolorem set ep sigma sig hominem.<br/>Vos tantum hominis.<br/>Memento mori.</p><br/>
                                <h2 className="blue">· · ·</h2>
                            </div>
                        </div>
                    </div>
                </div>
            
            
                <div id="profileSummary-serviceHolder2">
                    
                    <div className="vertical-center">
                        <div className="text-center black" id="profileSummary-skillsHolder2">
                            <div className="col-md-12">
                                <i className="fa fa-wordpress profileSummary-skillsIcon"/>
                                <h3 className="profileSummary-skillsTitle">WORDPRESS DEVELOPMENT</h3>
                                <p className="profileSummary-skillsText">Lorem ipsum dolorem set ep sigma sig hominem.<br/>Vos tantum hominis.<br/>Memento mori.</p><br/>
                                <h2 className="blue">· · ·</h2>
                            </div>
                        </div>
                    </div>
                </div>
            
            
                <div id="profileSummary-serviceHolder3">
                    
                    <div className="vertical-center">
                        <div className="text-center white" id="profileSummary-skillsHolder3">
                            <div className="row">
                                <div className="col-md-6">
                                    <i className="fa fa-pencil profileSummary-skillsIcon"/>
                                    <h3 className="profileSummary-skillsTitle">GRAPHIC DESIGN</h3>
                                    <p className="profileSummary-skillsText">Lorem ipsum dolorem set ep sigma sig hominem.<br/>Vos tantum hominis.<br/>Memento mori.</p>
                                </div>
                                <div className="col-md-6">
                                    <i className="fa fa-file-text profileSummary-skillsIcon"/>
                                    <h3 className="profileSummary-skillsTitle">COPYWRITING</h3>
                                    <p className="profileSummary-skillsText">Lorem ipsum dolorem set ep sigma sig hominem.<br/>Vos tantum hominis.<br/>Memento mori.</p>
                                </div>
                            </div>
                            <div className="spacer-100px"/>
                            <button onClick={this.handleClick} className="btn btn-blue ghost"><i className="fa fa-angle-double-up fa-2x"/></button>
                        </div>
                    </div>
                </div>
            




                
            </div>
            
        )
    }
});

var ControlBar = React.createClass({
    
    render: function(){
        return(
            <div id="profileSummary-controlBar">
                <div className="col-md-1 col-md-offset-5 top-25">
                    <a onClick={this.props.handleClick.bind(this, "Profile")}>
                        <i className={"fa fa-user fa-2x " + this.props.profileClass}></i>
                    </a>
                </div>
                <div className="col-md-1 top-25">
                    <a onClick={this.props.handleClick.bind(this, "Twitter")}>
                        <i className={"fa fa-twitter fa-2x " + this.props.twitterClass}></i>
                    </a>
                </div>
                <div className="col-md-1 top-25">
                    <a onClick={this.props.handleClick.bind(this, "Skills")}>
                        <i className={"fa fa-cogs fa-2x " + this.props.skillsClass}></i>
                    </a>
                </div>
            </div>
        )
    }
});



var MiniProfile = React.createClass({
    
    getInitialState: function(){
        return({showHeadshot: true, showProfile: true, ProfileClass: 'profileSummary-controlBtn-active',  showTwitter: false, TwitterClass: 'profileSummary-controlBtn-inactive', showGrams: false, showSkills: false, SkillsClass: 'profileSummary-controlBtn-inactive', activeNow: 'Profile'})
    },
    
    handleClick: function(stateToChange){
        var stateClass = stateToChange + "Class";
        var showState = "show" + stateToChange;
        var activeState = "show" + this.state.activeNow;
        var activeClass = this.state.activeNow + "Class";
        
        if (stateToChange === "Profile"){
            this.setState({showHeadshot: true})
        } else {
            this.setState({showHeadshot: false})
        }
        
        if (stateToChange === "Twitter"){
            this.setState({showGrams: true})
        } else {
            this.setState({showGrams: false})
        }
        
        if (this.state.stateToChange != this.state.activeNow){
                this.setState({[activeState]: false})
                this.setState({[showState]: true});
            
                this.setState({[activeClass]: "profileSummary-controlBtn-inactive"});  
                this.setState({[stateClass]: "profileSummary-controlBtn-active"});
            
                this.setState({activeNow: [stateToChange]});
        } else {
            return
        };
        
    },
    
    render: function(){
        var showProfile = (this.state.showProfile) ? <Profile/> : null;
        var showHeadshot = (this.state.showHeadshot) ? <img src="img/headshot1.jpg" className="img-responsive thumbnail" id="profileSummary-headshot"/> : null;
        var showTwitter = (this.state.showTwitter) ? <Twitter/> : null;
        var showGrams = (this.state.showGrams) ? <Grams/> : null;
        var showSkills = (this.state.showSkills) ? <Skills/> : null;
        return(
            <div>
            <div id="profileSummary-holder">
                {showHeadshot}
                <ControlBar handleClick={this.handleClick} profileClass={this.state.ProfileClass} twitterClass={this.state.TwitterClass} skillsClass={this.state.SkillsClass}/>

                {showProfile}
                {showTwitter}

                <div id="profileSummary-backgroundHolder-outer">
                    <div id="profileSummary-backgroundHolder-inner">

                        <div id="profileSummary-backgroundHolder-overlay"></div>

                        <div id="profileSummary-backgroundHolder-img"></div>
                    </div>
                </div>
            </div>
            {showSkills}
            {showGrams}
            </div>
        )
    }
});
    
module.exports = MiniProfile;