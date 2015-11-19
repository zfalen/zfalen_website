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
                <div className="col-md-7 col-md-offset-6">
                    <div className="col-md-6"><h2 className="profileSummary-sectionTitle"><span style={slashStyle}>//  <span style={atStyle}>@</span></span>Zfalen </h2></div>
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

var Skills = React.createClass({
    
    render: function(){
        var slashStyle = {
            fontWeight: 200
        }
        return(
            <div className="container" id="profileSummary-skillsHolder">
                <div className="col-md-6 col-md-offset-6"><h2 className="profileSummary-sectionTitle"><span style={slashStyle}>// </span>EXPERIENCE </h2></div>
                <div className="col-md-3 col-md-offset-6" id="profileSummary-skillsColumn1">
                    <div>
                        <h6 className="profileSummary-skillsTitle">DIGITAL MARKETING</h6>
                        <div className="progress profileSummary-skillsBar">
                          <div className="progress-bar profileSummary-skillsBarInner profileSummary-skillsBar30" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                            <span className="sr-only">30% Complete</span>
                          </div><p className="profileSummary-skillsBarIndicator-left">30%</p>
                        </div>
                    </div>

                    <div className="spacer-40px"></div>

                    <div>
                        <h6 className="profileSummary-skillsTitle">VIDEO / PHOTO / MOTION </h6>
                        <div className="progress profileSummary-skillsBar">
                          <div className="progress-bar profileSummary-skillsBarInner profileSummary-skillsBar30 " role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">
                            <span className="sr-only">20% Complete</span>
                          </div><p className="profileSummary-skillsBarIndicator-left">30%</p>
                        </div>
                    </div> 

                </div>
                <div className="col-md-3" id="profileSummary-skillsColumn2">
                    <div>
                        <h6 className="profileSummary-skillsTitle"> WEB </h6>
                        <div className="progress profileSummary-skillsBar">
                          <div className="progress-bar profileSummary-skillsBarInner profileSummary-skillsBar25" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                            <span className="sr-only">25% Complete</span>
                          </div><p className="profileSummary-skillsBarIndicator-right">25%</p>
                        </div>
                    </div>

                    <div className="spacer-40px"></div>

                    <div>
                        <h6 className="profileSummary-skillsTitle">DESIGN </h6>
                        <div className="progress profileSummary-skillsBar">
                          <div className="progress-bar profileSummary-skillsBarInner profileSummary-skillsBar15" role="progressbar" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">
                            <span className="sr-only">15% Complete</span>
                          </div><p className="profileSummary-skillsBarIndicator-right">15%</p>
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



var ProfileSummary = React.createClass({
    
    getInitialState: function(){
        return({showProfile: true, ProfileClass: 'profileSummary-controlBtn-active',  showTwitter: false, TwitterClass: 'profileSummary-controlBtn-inactive', showSkills: false, SkillsClass: 'profileSummary-controlBtn-inactive', activeNow: 'Profile'})
    },
    
    handleClick: function(stateToChange){
        var stateClass = stateToChange + "Class";
        var showState = "show" + stateToChange;
        var activeState = "show" + this.state.activeNow;
        var activeClass = this.state.activeNow + "Class";
        
        if (this.state.stateToChange != this.state.activeNow){
                this.setState({[activeState]: false})
                this.setState({[showState]: true});
            
                this.setState({[activeClass]: "profileSummary-controlBtn-inactive"});  
                this.setState({[stateClass]: "profileSummary-controlBtn-active"});
            
                this.setState({activeNow: [stateToChange]});
        } else {
            return
        };
        console.log(this.state.activeNow);
    },
    
    render: function(){
        var showProfile = (this.state.showProfile) ? <Profile/> : null;
        var showTwitter = (this.state.showTwitter) ? <Twitter/> : null;
        var showSkills = (this.state.showSkills) ? <Skills/> : null;
        return(
        <div id="profileSummary-holder">
            <img src="img/headshot1.jpg" className="img-responsive thumbnail" id="profileSummary-headshot"></img>
            <ControlBar handleClick={this.handleClick} profileClass={this.state.ProfileClass} twitterClass={this.state.TwitterClass} skillsClass={this.state.SkillsClass}/>
            
            {showProfile}
            {showTwitter}
            {showSkills}
    
            <div id="profileSummary-backgroundHolder-outer">
                <div id="profileSummary-backgroundHolder-inner">
                    
                    <div id="profileSummary-backgroundHolder-overlay"></div>

                    <div id="profileSummary-backgroundHolder-img"></div>
                </div>
            </div>
        </div>
        )
    }
});



var RenderProfile = React.createClass({   
    render: function(){
        
        var titlePadding = {
            marginTop: 100,
            marginBottom: 50,
        };
        
        var headingStyle = {
            fontWeight: 900,
            fontSize: 75,
            paddingLeft: 20,
            paddingRight: 20
        };
        
        var containerStyle = {
            marginRight: 50
        };
        
        return (
            <div>    
                <div className='container-fluid'>
                    <div className='container text-center' style={titlePadding}>
                        <h1 style={headingStyle}>    HELLO,    </h1>
                    </div>

                    <div className="container profileText">
                        <p><strong>I am a digital marketer and entrepreneur,</strong> with an adrenaline habit and a knack for crafting creative content that people love. </p>
                        <br/>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                
                </div>
            </div>
        )
    }
});