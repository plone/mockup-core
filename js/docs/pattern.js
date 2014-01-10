define([
  'marked',
  'react',
  'mockup-registry'
], function(marked, React, Registry) {

  var Pattern = React.createClass({
    getDefaultProps: function() {
      return {
        url: ''
      };
    },
    getInitialState: function() {
      return {pattern: undefined};
    },
    parsePattern: function(text) {
      var option = /(.*)\((.*)\): (.*) \((.*)\)$/,
          section = /^Options:|^Documentation:|^License:|^Example:/,
          currentOption,
          currentExample,
          currentSection,
          examples = {},
          pattern = {};

      text = text.substring(1, text.length - 1);
      _.each(text.split('\n'), function(line, lineNumber) {
        line = line.substring(line.indexOf('*') + 2)
      
        if (section.exec(line) !== null) {
          currentSection = section.exec(line)[0].toLowerCase();
          currentSection = currentSection.substring(0, currentSection.length - 1)
          if (currentSection === 'example') {
            currentExample = line.substring(8).trim();
          }
        } else if (currentSection) {
          if (currentSection === 'options') {
            currentOption = option.exec(line);
            if (currentOption) {
              if (!pattern.options) {
                pattern.options = {};
              }
              pattern.options[currentOption[1].trim()] = {
                type: currentOption[2].trim(),
                description: currentOption[3].trim(),
                defaultValue: currentOption[4].trim()
              };
            }
          } else if (currentExample && currentSection === 'example') {
            if (!examples[currentExample]) {
              examples[currentExample] = '';
            }
            examples[currentExample] += line + '\n';
          } else {
            if (!pattern[currentSection]) {
              pattern[currentSection] = '';
            }
            pattern[currentSection] += line + '\n';
          }
        }
      });
      _.each(pattern, function(value, i) {
        if (typeof value === 'string') {
          pattern[i] = '';
          var lines = value.split('\n'),
              firstLineSpaces = lines[0].length - lines[0].trimLeft().length;
          _.each(value.split('\n'), function(line, j) {
            pattern[i] += line.substring(firstLineSpaces) + '\n';
          });
      
          pattern[i] = marked(pattern[i]);
      
          _.each(examples, function(example, name) {
            example = '' +
              '<div class="mockup-pattern-example">' + example +
              '<p><pre>' + _.escape(example) + '</pre><p>' +
              '</div>';
            pattern[i] = pattern[i].replace('{{ ' + name + ' }}', example);
          });
      
        }
      });
      return pattern;
    },
    componentWillMount: function() {
      var self = this;
      if (this.props.url) {
        require([
          'text!' + this.props.url, this.props.url
        ], function (pattern) {
          pattern = (/\/\*[\s\S]*?\*\//gm).exec(pattern)[0];
          self.setState({pattern: self.parsePattern(pattern)});
        });
      }
    },
    componentDidUpdate: function() {
      Registry.scan(this.getDOMNode());
    },
    render: function() {
      if (!this.state.pattern) {
        return <div className="mockup-pattern" />
      }
      var documentation = this.state.pattern.documentation,
          options = this.state.pattern.options,
          license = this.state.pattern.license;
      return <div className="mockup-pattern">
          <h2>Documentation</h2>
          <div className="mockup-pattern-documentation"
               dangerouslySetInnerHTML={{__html: documentation}} />
          <h2>Configuration</h2>
          <div className="table-responsive mockup-pattern-configuration">
            <table className="table table-stripped table-condensed">
              <thead>
                <tr>
                  <th>Option</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
              {Object.keys(options).map(function(name) {
                  return <tr key={name}>
                           <td>{name}</td>
                           <td>{options[name].type}</td>
                           <td>{options[name].defaultValue}</td>
                           <td>{options[name].description}</td>
                         </tr>
              })}
              </tbody>
            </table>
          </div>
          <h2>License</h2>
          <div className="mockup-pattern-license"
               dangerouslySetInnerHTML={{__html: license}} />
        </div>
    }
  });

  return Pattern;
});
