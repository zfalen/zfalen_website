var ProfileSummary = React.createClass({
    render: function(){
        return(
        <div id="profileSummary-holder">
            <img src="img/headshot1.jpg" className="img-responsive thumbnail" id="profileSummary-headshot"></img>
            <div id="profileSummary-controlBar">
                <div className="col-md-1 col-md-offset-5 top-25">
                    <i className="fa fa-user fa-2x profileSummary-controlBtn-inactive"></i>
                </div>
                <div className="col-md-1 top-25">
                    <i className="fa fa-twitter fa-2x profileSummary-controlBtn-inactive"></i>
                </div>
                <div className="col-md-1 top-25">
                    <i className="fa fa-cogs fa-2x profileSummary-controlBtn-active"></i>
                </div>
            </div>
    
            <div className="container" id="profileSummary-skillsHolder">
                <div className="col-md-6 col-md-offset-6"><h2 className="profileSummary-sectionTitle">EXPERIENCE \\</h2></div>
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