var Search = React.createClass({
  getInitialState: function() {
    return {data: [], tags: []};
  },
  getSelectValues: function(select) {
    var result = [];
    var options = select && select.options;
    var opt;

    for (var i = 0; i < options.length; i ++) {
      opt = options[i];
      if (opt.selected) {
        result.push( parseInt(opt.value) );
      }
    }
    return result;
  },
  search: function(e) { 
    e.preventDefault();
    var searchField = React.findDOMNode(this.refs.search_field);
    var paperTags = this.getSelectValues(searchField);
    this.props.onSearch(paperTags);
  },
  handlePaperClick: function(paperID) {
    this.props.onPaperSelect(paperID);
  },
  componentDidMount: function() {
    $.get("/tags").done(function(tags) {
      this.setState({tags: tags});
      $(React.findDOMNode(this.refs.search_field)).chosen({
        no_results_text: "There's no tag with that name",
        width: "200px"
      });
    }.bind(this));
  },
  render: function() {
    return (
      <div className="search-div">
        <select ref="search_field" data-placeholder="Select some tags" className="chosen-select" multiple>
          {this.state.tags.map(function(tag) {
            return (
              <option value={tag.id} key={tag.id}>{tag.name}</option>
            );
          }, this)}
        </select>
        <input type="submit" className="button" className="search" onClick={this.search} />
        <Feed ref="here" onPaperClick={this.handlePaperClick} data={this.props.data} />
      </div>
    );
  }
});