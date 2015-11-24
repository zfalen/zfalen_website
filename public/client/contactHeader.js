var React = require('react');

var ContactHeader = React.createClass({   
    render: function(){
        
        return ( 
                <div className='container-fluid'>

                    <div className="container profileText">
                        <p><strong>If you'd like to connect,</strong> collaborate or explore with me, drop a line directly or by using the form below. </p>
                        <br/>
                    </div>
                </div>
        )
    }
});

module.exports = ContactHeader;