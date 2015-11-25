var React = require('react');

var ContactHeader = require('./contactHeader');
var Map = require('./map');



var RenderContact = React.createClass({   
    
    handleSubmit: function(e){
        e.preventDefault();
        var submissionUrl = '/api/sayHello';
        
        var submissionName = React.findDOMNode(this.refs.submissionName).value.trim();
        var submissionEmail = React.findDOMNode(this.refs.submissionEmail).value.trim();
        var submissionSubject = React.findDOMNode(this.refs.submissionSubject).value.trim();
        var submissionBody = React.findDOMNode(this.refs.submissionBody).value.trim();
        
        var data = ({name: submissionName, email: submissionEmail, subject: submissionSubject, body: submissionBody});
    
        if (!submissionName || !submissionBody || !submissionEmail || !submissionSubject) {
          alert('All fields are required');
          return;
        };
        
        var self = this;
        
        $.ajax({
          url: submissionUrl,
          dataType: 'json',
          type: 'POST',
          data: data,
          success: function(data) {
              self.props.onPost();
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
        
        React.findDOMNode(this.refs.submissionName).value = '';
        React.findDOMNode(this.refs.submissionEmail).value = '';
        React.findDOMNode(this.refs.submissionBody).value = '';
        
        alert('Thank you for reaching out! I\'ll be in touch soon.');
        
        return;
    },
    
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
            marginBottom: 0,
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
            
            <div className="container">
            <div className="blogTitle-separator center-block"></div>
            </div><br/>
            
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
            
                <div className="container" id='contact-formHolder'>
                    <div className="col-md-8">
                            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                                  <div className="form-group">
                                    <div className="col-md-6">
                                        <input className="form-control input-lg" id="submissionName" ref="submissionName" placeholder="Your Name"/>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="email" className="form-control input-lg" id="submissionEmail" ref="submissionEmail" placeholder="Your Email Address"/>
                                    </div>
                                  </div> 
                                  <div className="form-group form-group-lg">
                                    <div className="col-md-12">
                                        <input className="form-control" id="submissionSubject" ref="submissionSubject" placeholder="Subject"/>
                                    </div>
                                  </div>
                                  <div className="form-group form-group-lg">
                                    <div className="col-md-12">
                                        <textarea className="form-control" id="contact-message" ref="submissionBody" placeholder="Message..."/>
                                    </div>
                                  </div>
                                  <button type="submit" className="btn btn-warning ghost"><h3>SEND MESSAGE</h3></button>
                            </form>
                        </div>
                    </div>        

                    <div id="profileSummary-backgroundHolder-outer">
                        <div id="profileSummary-backgroundHolder-inner">

                            <div id="profileSummary-backgroundHolder-overlay"></div>

                            <div id="profileSummary-backgroundHolder-img"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="row">
                <Map/>
            </div>
            
        </div>
        )
    }
});

module.exports = RenderContact;