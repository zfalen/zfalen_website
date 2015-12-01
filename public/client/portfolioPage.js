var React = require('react');



var RenderPortfolio = React.createClass({   
    render: function(){
        var divStyle = {
            marginTop: 50,
            marginBottom: 50,
            backgroundColor: '#3794bf'
        };
        var divStyle2 = {
            marginTop: 100,
            marginBottom: 100,
        };
        var divStyle3 = {
            color: '#03A9F4',
            fontWeight: 300
        };
        var divStyle4 = {
            fontWeight: 900,
            paddingLeft: 20,
            paddingRight: 20
        };
        var containerStyle = {
            marginRight: 50
        };
        var textStyle = {
            color: '#f15922'
        };
        var titlePadding = {
            paddingTop: 50,
            marginBottom: 200,
        };
        
        var headingStyle = {
            fontWeight: 900,
            fontSize: 75,
            paddingLeft: 20,
            paddingRight: 20
        };
        
        return (
        <div>    
            <div className='container-fluid'>
                <div className='container text-center' style={divStyle2}>
                    <h1><span style={divStyle3}>[</span><span style={divStyle4}>    PORTFOLIO    </span><span style={divStyle3}>]</span></h1>
                </div>
            
                <div className='container text-center' style={titlePadding}>
                    <i className="black fa fa-exclamation-triangle profileSummary-skillsIcon"/>
                    <h1 style={headingStyle}>    COMING SOON    </h1>
                </div>
        
            </div>
        </div>
        )
    }
});

module.exports = RenderPortfolio;