var React = require('react');

var ProfileHeader = React.createClass({   
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

module.exports = ProfileHeader;