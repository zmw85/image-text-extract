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

console.log('Processing...');
googleVisionService.textDetection(process.argv[2] ? process.argv[2] : 'images/photo-id-1.jpg')
  .then(res => {
    // console.log(`extracted text: ${res}`);

    // let re = new RegExp('[0-9][0-9] [A-Z][A-Z][A-Z] [0-9][0-9][0-9][0-9]');
    const matches = res.match(/[0-9][0-9] [A-Z][A-Z][A-Z] [0-9][0-9][0-9][0-9]/g);
    // console.log(matches);

    if (matches) {
      if (matches.length === 2) {
        const dateFormat = 'DD MMM YYYY';
        const expiry = matches.map(m => moment(m, dateFormat).format('YYYY-MM-DD'))
          .sort()
          .reverse()
          .map(m => moment(m, 'YYYY-MM-DD'))[0]
          .format(dateFormat);
        console.log(expiry);
      }
    } else {
      console.log("couldn't find expiry date");
    }

  });
    