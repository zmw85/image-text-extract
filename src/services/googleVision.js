const async = require('async');
const fs = require('fs');
const path = require('path');

const Vision = require('@google-cloud/vision');
const vision = Vision({
  projectId: 'hackitv2',
  keyFilename: 'google-project-key.json'
});

function annotateImage(filename) {
  // Make a call to the Vision API to detect text

  let request = {
    image: {content: fs.readFileSync(filename).toString('base64')},
    features: {type: 'TEXT_DETECTION'}
  };
  
  return new Promise ((resolve, reject) => {
    vision.annotateImage(request)
      .then(responses => {
        if (!responses || responses.length === 0) {
          reject();
        }
        const res = responses[0];

        if (res.error) {
          reject();
        }

        console.log(res);
        let result = '';
        if (res.fullTextAnnotation.text) {
          result = res.fullTextAnnotation.text;
        }
        resolve(result);
      });
  });
}

function labelDetection(filename) {
  // Make a call to the Vision API to detect text

  let image = {
    content: fs.readFileSync(filename).toString('base64'),
  };
  
  return new Promise ((resolve, reject) => {
    vision.labelDetection(image)
      .then(responses => {
        if (!responses || responses.length === 0) {
          reject();
        }
        const res = responses[0];

        if (res.error) {
          reject();
        }

        // console.log(res);
        
        resolve(res);
      });
  });
}

function textDetection(filename) {
  // Make a call to the Vision API to detect text

  let image = {
    content: fs.readFileSync(filename).toString('base64'),
  };
  
  return new Promise ((resolve, reject) => {
    vision.textDetection(image)
      .then(responses => {
        if (!responses || responses.length === 0) {
          reject();
        }
        const res = responses[0];

        if (res.error) {
          reject();
        }

        let result = '';
        if (res.fullTextAnnotation.text) {
          result = res.fullTextAnnotation.text;
        }
        resolve(result);
      });
  });
}

module.exports = {
  annotateImage,
  labelDetection,
  textDetection
};