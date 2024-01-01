export const getObjectValue = (a, b) => { a ? a : b}

export function addImageHeight(array) {
    // create an array of promises
    let promises = array.map((obj) => {
      // create a new promise for each object
      return new Promise((resolve, reject) => {
        // create a new Image instance
        let img = new Image();
        // set the src property to the image URL
        img.src = obj.src;
        // add an onload event handler
        img.onload = function () {
          // get the natural height and width of the image
          let height = img.naturalHeight || 200;
          let width = img.naturalWidth || 200;
          // create a copy of the object and add the height and width properties
          let newObj = { ...obj, height, width };
          // resolve the promise with the new object
          resolve(newObj);
        };
        // add an onerror event handler
        img.onerror = function () {
          // reject the promise with an error message
          // reject(`Failed to load image from ${obj.src}`);
          let height = 200;
          let width = 200;
          let src = "hide";
          // create a copy of the object and add the height and width properties
          let newObj = { ...obj, src, height, width };
          // resolve the promise with the new object
          resolve(newObj);
        };
      });
    });
    // return a promise that resolves with an array of new objects
    return Promise.all(promises);
  }