var MyBlogs = React.createClass({
    render: function(){
        var BlogData = this.props.data.map(function(BlogPost){
            return (
                <li className='well list-unstyled'> 
                   <h2> {BlogPost.name} </h2>
                    <p> {BlogPost.subtitle} </p>
                </li>
                );
        });
                                            
            return(
                <div>
                    <ul>
                        {BlogData}
                    </ul>
                </div>
            );
    }
});

var BlogBox = React.createClass({
    
    getInitialState: function(){
        return {data: []};
    },
    
    loadBlogsFromServer: function(){
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data){
                console.log('inside succces!')
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err){
                console.log('broken URL is ' + this.props.url)
                console.error(this.props.url, status, err.toString)
            }.bind(this)
        });
    },
    
    componentDidMount: function(){
        this.loadBlogsFromServer();
        setInterval(this.loadBlogsFromServer, this.props.pollInterval);
    },
    
    render: function(){
        var divStyle = {
            marginTop: 50
        };
        return (
        <div>
            <div style={divStyle}>
                <ul>
                    <MyBlogs data={this.state.data}/>
                </ul>
            </div>
        </div>
        );
    }
});

var BlogBuilder = React.createClass({
    handleSubmit: function(e) {
        console.log("HI DOUG");
        e.preventDefault();
        var blogName = React.findDOMNode(this.refs.newName).value.trim();
        var blogSubtitle = React.findDOMNode(this.refs.newSubtitle).value.trim();
       
        var data = ({name: blogName, subtitle: blogSubtitle});
    
        if (!blogName || !blogSubtitle) {
          return;
        };
        
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          type: 'POST',
          data:data,
          success: function(data) {
            console.log(data);
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });

        // TODO: send request to the server
        this.refs.newName.value = '';
        this.refs.newSubtitle.value = '';
        return;
  },
    
    render: function() {

        var divStyle2 = {
            marginTop: 50,
            marginBottom: 50,
        };
        
        return (
            <div className={divStyle2}>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label>BLOG TITLE</label>
                    <input type="text" className="form-control" placeholder="title goes here" ref="newName" />
                  </div>
                  <div className="form-group">
                    <label>BLOG CONTENT</label>
                    <input type="text" className="form-control" placeholder="content goes here" ref="newSubtitle" />
                  </div>
                  <button type="submit" className="btn btn-default" value="Post">Submit</button>
                </form>
            </div>
          );
    }
});

var RenderBlogs = React.createClass({
    
    render: function(){
        var divStyle = {
            marginTop: 50,
            marginBottom: 50,
            backgroundColor: '#3794bf'
        };
        var divStyle2 = {
            marginTop: 50,
            marginBottom: 50,
        };
        var containerStyle = {
            marginRight: 50
        };
        var textStyle = {
            color: '#f15922'
        };
        return (
        <div>    
            <div className='container-fluid'>
                <div className='container text-center' style={divStyle2}>
                    <h1 className='well'> ZACH'S COOL ASS BLOG</h1>
                </div>
                <div className='container' style={divStyle}>
                    <div style={containerStyle}>
                        <BlogBox url='/api/blog/' pollInterval={2000}/>
                    </div>
                </div>
            </div>
            <div className='container-fluid'>
                <div className='container text-center'>
                    <h1 className='well'> SUBMIT A BLOG</h1>
                </div>
                <div className='container'>
                    <div className={divStyle2}>
                        <BlogBuilder url='/api/blog/'/>
                    </div>
                </div>
            </div>
        </div>
        );
    }
});

React.render(<RenderBlogs url='/api/blog/'/>, document.getElementById('blog-list'));
