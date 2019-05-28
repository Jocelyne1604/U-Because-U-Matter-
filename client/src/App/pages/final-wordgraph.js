import React from 'react';
import FusionCharts from 'fusioncharts';
import Column2D from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

function countWords (incomingData) {
    incomingData.forEach(element => {
      console.log('element ', element)
      console.log('elements journal entry ', element)
      element['word_count'] = superCounter(element['journal_entry'])
    });
  }
  
  function superCounter(str) { 
    var words = str.trim().replace(/\s+/gi, ' ').split(' ').length; 
    console.log('number of words', str, words)
    return words;
  };  

 

class ChartViewer extends React.Component {
  
    
  constructor(props) {
    super(props);
    console.log(props.dataArray)
    this.state = {
      timeseriesDs: {
        type: 'column2d',
        // renderAt: 'container',
        width: '600',
        height: '400',
        dataFormat: 'json',
        dataSource: {
            caption: { text: 'Online Sales of a SuperStore in the US' },
            chart: {
                "caption": "Word Count by Date",
                "subCaption": "Write Write Write...",
                "xAxisName": "Date",
                "yAxisName": "Word Count",
                "numberSuffix": "",
                "theme": "fusion"
            },
            data: props.dataArray.sort(function(a, b) {
              return new Date(a.journal_date) - new Date(b.journal_date)
          })
            .map(function (entry){ return {label: entry.journal_date,
                                                          value: superCounter(entry.journal_entry) }} )
        }
      }
    };
  }

  render() {

    return (
      <div>
        {this.state.timeseriesDs.dataSource.data ? (
          <ReactFC {...this.state.timeseriesDs} />
        ) : (
          'loading'
        )}
      </div>
    );
  }
}

export default ChartViewer;