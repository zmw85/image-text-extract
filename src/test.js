const moment = require('moment');

let googleVisionService = require('./services/googleVision');

// googleVisionService.annotateImage('images/removed_noice_2.png')
//   .then(res => {
//     console.log(res);
//   });


// googleVisionService.labelDetection('images/removed_noice_2.png')
//   .then(res => {
//     console.log(res);
//   });
  
googleVisionService.textDetection('images/removed_noice_2.png')
  .then(res => {
    console.log(`extracted text: ${res}`);

    // let re = new RegExp('[0-9][0-9] [A-Z][A-Z][A-Z] [0-9][0-9][0-9][0-9]');
    const matches = res.match(/[0-9][0-9] [A-Z][A-Z][A-Z] [0-9][0-9][0-9][0-9]/g);
    console.log(matches);

    if (matches) {
      if (matches.length === 2) {
        const dateFormat = 'DD MMM YYYY';
        const expiry = matches.map(m => moment(m, dateFormat)).sort().reverse()[0].format(dateFormat);
        console.log(expiry);
      }
    }

    
  });