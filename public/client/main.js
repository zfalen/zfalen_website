var React = require('react');


// NAVBAR
var NavBar = require('./navBar');

// PROFILE SECTION
var ProfileHeader = require('./profileHeader');
var MiniProfile = require('./profilePage');


// PORTFOLIO SECTION
var RenderPortfolio = require('./portfolioPage');


// BLOG SECTION
var RenderBlogs = require('./blogPage');


// CONTACT SECTION

var RenderContact = require('./contactPage');



// CONTENT HOLDERS

var ContentWindow1 = React.createClass({
   
    render: function(){
        var padding = {
            marginBottom: 150
        }
        return(
            <div id="content-holder-1" align='center'>
                <ProfileHeader/>
                <div style={padding}></div>
                <MiniProfile/>
            </div>
        )
    }
});

var ContentWindow2 = React.createClass({
   
    render: function(){
        return(
            <div id="content-holder-2" align='center'>
                <RenderPortfolio/>
            </div>
        )
    }
});

var ContentWindow3 = React.createClass({
   
    render: function(){
        return(
            <div id="content-holder-3" align='center'>
                <RenderBlogs url='/api/blog/'/>
            </div>
        )
    }
});

var ContentWindow4 = React.createClass({
   
    render: function(){
        return(
            <div id="content-holder-4" align='center'>
                <RenderContact/>
            </div>
        )
    }
});




var Footer = React.createClass({
    
    getInitialState: function(){
        return({IgHoverClass: "socialBtn-inactive", TwitterHoverClass: "socialBtn-inactive", VimeoHoverClass: "socialBtn-inactive", LiHoverClass: "socialBtn-inactive"})
    },
    
    handleMouseEnter: function(stateToChange){
        this.setState({[stateToChange]: "socialBtn-active"})
    },
    
    handleMouseLeave: function(stateToChange){
        this.setState({[stateToChange]: "socialBtn-inactive"})
    },
    
    render: function(){
        var footerStyle = {
            backgroundColor: 'rgb(32, 32, 32)',
            width: '100%',
            height: 150,
            position: 'relative',
            marginTop: -25
        }
        
        return(
        <div style={footerStyle}>
            <div className="container text-center paddingTop-4">
                <div className="col-md-2 col-md-offset-2">
                    <a href="https://instagram.com/mtfreeski" target="_blank" onMouseEnter={this.handleMouseEnter.bind(this, 'IgHoverClass')} onMouseLeave={this.handleMouseLeave.bind(this, 'IgHoverClass')}>
                        <i className={"fa fa-instagram fa-3x " + this.state.IgHoverClass}></i>
                    </a>
                </div>
                <div className="col-md-2">
                    <a href="https://twitter.com/zfalen" target="_blank" onMouseEnter={this.handleMouseEnter.bind(this, 'TwitterHoverClass')} onMouseLeave={this.handleMouseLeave.bind(this, 'TwitterHoverClass')}>
                        <i className={"fa fa-twitter fa-3x " + this.state.TwitterHoverClass}></i>
                    </a>
                </div>
                <div className="col-md-2">
                    <a href="https://vimeo.com/mtfreeski" target="_blank" onMouseEnter={this.handleMouseEnter.bind(this, 'VimeoHoverClass')} onMouseLeave={this.handleMouseLeave.bind(this, 'VimeoHoverClass')}>
                        <i className={"fa fa-vimeo fa-3x " + this.state.VimeoHoverClass}></i>
                    </a>
                </div>
                <div className="col-md-2">
                    <a href="https://www.linkedin.com/in/zachary-falen-8882865b" target="_blank" onMouseEnter={this.handleMouseEnter.bind(this, 'LiHoverClass')} onMouseLeave={this.handleMouseLeave.bind(this, 'LiHoverClass')}>
                        <i className={"fa fa-linkedin fa-3x " + this.state.LiHoverClass}></i>
                    </a>
                </div>
            </div>
        </div>
        )
    }
});




var MainWindow = React.createClass({
    
    getInitialState: function(){
        return {currentlyActive: "nav-btn-1"};
    },
    
    updateActive: function(btnId){
        console.log('currentlyActive is now: ' + btnId);
        this.setState({currentlyActive: btnId});
    },
    
    
    render: function(){
        
        var tempStyle = {
            position: "relative"
        }
        
        var showContent1 = (this.state.currentlyActive === "nav-btn-1") ? <ContentWindow1/> : null;
        var showContent2 = (this.state.currentlyActive === "nav-btn-2") ? <ContentWindow2/> : null;
        var showContent3 = (this.state.currentlyActive === "nav-btn-3") ? <ContentWindow3/> : null;
        var showContent4 = (this.state.currentlyActive === "nav-btn-4") ? <ContentWindow4/> : null;
        return (
        <div>
            <NavBar updateActive={this.updateActive} currentlyActive={this.state.currentlyActive}/>
            <div style={tempStyle}>
                {showContent1}
                {showContent2}
                {showContent3}
                {showContent4}
            </div>
            <Footer/>
        </div>
        );
    }
});

module.exports = MainWindow;