var React = require('react');

var ContactHeader = require('./contactHeader');



var RenderContact = React.createClass({   
    render: function(){
        var divStyle = {
            marginTop: 50,
            marginBottom: 50,
            backgroundColor: '#3794bf'
        };
        var divStyle2 = {
            marginTop: 100,
            marginBottom: 50,
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
            marginBottom: 100,
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
                    <h1><span style={divStyle3}>[</span><span style={divStyle4}>    GET IN TOUCH    </span><span style={divStyle3}>]</span></h1>
                </div>
            </div>
            
            <div className='container text-center' style={titlePadding}>
                <ContactHeader/>
            </div>
            
            <div className="row">
            <div className="col-md-5">
            
                        <div className="col-md-12">
                            <div className="vertical-center contact-iconBlock">
                           
                                <h5>zach.falen@partnerscreative.com</h5>
                                <i className={"fa fa-envelope fa-3x contact-mailIcon"}></i>
                            </div>

                        </div>
            
                        <div className="col-md-12">
                            <div className="vertical-center contact-iconBlock">
                                <h5>800 Ronald Ave // Misoula, MT 59801</h5>
                                <i className={"fa fa-map-marker fa-4x contact-icon"}></i>
                            </div>
                        </div>
                        
                        <div className="col-md-12">
                            <div className="vertical-center contact-iconBlock">
                                <h5>406.544.7052</h5>
                                <i className={"fa fa-phone fa-4x contact-icon"}></i>

                            </div>
                        </div>
            </div>
            
            <div className="col-md-7">
                <div id="profileSummary-backgroundHolder-outer">
                    <div id="profileSummary-backgroundHolder-inner">

                        <div id="profileSummary-backgroundHolder-overlay"></div>

                        <div id="profileSummary-backgroundHolder-img"></div>
                    </div>
                </div>
            </div>
            </div>
            
        </div>
        )
    }
});

module.exports = RenderContact;