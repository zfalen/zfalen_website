var ContentWindow1 = React.createClass({
   
    render: function(){
        var padding = {
            marginBottom: 150
        }
        return(
            <div id="content-holder-1" align='center'>
                <RenderProfile/>
                <div style={padding}></div>
                <ProfileSummary/>
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
        </div>
        );
    }
});

React.render(<MainWindow/>, document.getElementById('render-here'));