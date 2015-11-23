var React = require('react');



var NavBtn1 = React.createClass({
    
    getInitialState: function(){
        return {isActive: true}
    },
    
    handleClick: function(e){
        if (this.props.currentlyActive != this.props.keyName){
            this.setState({isActive: true});
            this.props.updateActive(this.props.keyName);
        } else {
            return
        };
    },
    render: function(){
        
        var testStyle = {
            display: 'block',
            padding: 0
        }
        
        if (this.state.isActive === true && this.props.currentlyActive === this.props.keyName){
            console.log(this.state.isActive);
            return(
                    <li className="text-center nav-active">
                        <div className="nav-active-highlight"></div>
                        <a className="nav-active-textContainer" onClick={this.handleClick.bind(this, "activate")} style={testStyle}>
                            <i className="fa fa-user fa-3x nav-textShadow"></i><br/><br/>
                            <h4 className="nav-textShadow">Me</h4>
                        </a>
                    </li>
            )
        } else {
            console.log(this.state.isActive);
            return(
                    <li className="text-center nav-inactive">
                        <a className="nav-inactive-textContainer" onClick={this.handleClick.bind(this, "activate")} style={testStyle}>
                            <i className="fa fa-user fa-3x nav-textShadow"></i><br/><br/>
                            <h4 className="nav-textShadow">Me</h4>
                        </a>
                    </li>   
            )
        }
    }
});

var NavBtn2 = React.createClass({
    
    getInitialState: function(){
        return {isActive: false}
    },
    
    handleClick: function(e){
        if (this.props.currentlyActive != this.props.keyName){
            this.setState({isActive: true});
            this.props.updateActive(this.props.keyName);
        } else {
            return
        };
    },
    
    render: function(){
        if (this.state.isActive && this.props.currentlyActive === this.props.keyName){
            return(
                    <li className="text-center nav-active">
                        <div className="nav-active-highlight"></div>
                        <a className="nav-active-textContainer" onClick={this.handleClick.bind(this, "activate")}>
                            <i className="fa fa-briefcase fa-3x nav-textShadow"></i><br/><br/>
                            <h4 className="nav-textShadow">Portfolio</h4>
                        </a>
                    </li>
            )
        } else {
            return(
                    <li className="text-center nav-inactive">
                        <a className="nav-inactive-textContainer" onClick={this.handleClick.bind(this, "activate")}>
                            <i className="fa fa-briefcase fa-3x nav-textShadow"></i><br/><br/>
                            <h4 className="nav-textShadow">Portfolio</h4>
                        </a>
                    </li>         
            )
        }
    }
});

var NavBtn3 = React.createClass({
    
    getInitialState: function(){
        return {isActive: false}
    },
    
    handleClick: function(e){
        if (this.props.currentlyActive != this.props.keyName){
            this.setState({isActive: true});
            this.props.updateActive(this.props.keyName);
        } else {
            return
        };
    },
    
    render: function(){
        if (this.state.isActive && this.props.currentlyActive === this.props.keyName){
            return(
                    <li className="text-center nav-active">
                        <div className="nav-active-highlight"></div>
                        <a className="nav-active-textContainer" onClick={this.handleClick.bind(this, "activate")}>
                            <i className="fa fa-pencil fa-3x nav-textShadow"></i><br/><br/>
                            <h4 className="nav-textShadow">Blog</h4>
                        </a>
                    </li>
            )
        } else {
            return(
                    <li className="text-center nav-inactive">
                        <a className="nav-inactive-textContainer" onClick={this.handleClick.bind(this, "activate")}>
                            <i className="fa fa-pencil fa-3x nav-textShadow"></i><br/><br/>
                            <h4 className="nav-textShadow">Blog</h4>
                        </a>
                    </li>           
            )
        }
    }
});

var NavBtn4 = React.createClass({
    
    getInitialState: function(){
        return {isActive: false}
    },
    
    handleClick: function(e){
        if (this.props.currentlyActive != this.props.keyName){
            this.setState({isActive: true});
            this.props.updateActive(this.props.keyName);
        } else {
            return
        };
    },
    
    render: function(){
        if (this.state.isActive && this.props.currentlyActive === this.props.keyName){
            return(
                    <li className="text-center nav-active">
                        <div className="nav-active-highlight"></div>
                        <a className="nav-active-textContainer" onClick={this.handleClick.bind(this, "activate")}>
                            <i className="fa fa-envelope fa-3x nav-textShadow"></i><br/><br/>
                            <h4 className="nav-textShadow">Contact</h4>
                        </a>
                    </li>
            )
        } else {
            return(
                    <li className="text-center nav-inactive">
                        <a className="nav-inactive-textContainer" onClick={this.handleClick.bind(this, "activate")}>
                            <i className="fa fa-envelope fa-3x nav-textShadow"></i><br/><br/>
                            <h4 className="nav-textShadow">Contact</h4>
                        </a>
                    </li>          
            )
        }
    }
});



var NavBar = React.createClass({
    
    render: function(){
        return (
        <div>
            <nav className="navbar navbar-default" id="main-nav">
              <div className="container-fluid" id="nav-border">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                </div>

                <div className="collapse navbar-collapse" id="nav-holder">
                  <ul className="nav navbar-nav" id="nav-btns">

                    <NavBtn1 keyName="nav-btn-1" updateActive={this.props.updateActive} currentlyActive={this.props.currentlyActive}/>
                    <NavBtn2 keyName="nav-btn-2" updateActive={this.props.updateActive} currentlyActive={this.props.currentlyActive}/>
                    <NavBtn3 keyName="nav-btn-3" updateActive={this.props.updateActive} currentlyActive={this.props.currentlyActive}/>
                    <NavBtn4 keyName="nav-btn-4" updateActive={this.props.updateActive} currentlyActive={this.props.currentlyActive}/>

                  </ul>
                </div>
              </div>
            </nav>
        </div>
        );
    }
});

module.exports = NavBar;