const { Storage } = require('@google-cloud/storage');
const argv = require('yargs').argv;

const { src, dest, bucketName } = argv;

if (!src) {
  console.log('Error: src is required');
  return;
}

if (!dest) {
  console.log('Error: dest is required');
  return;
}

if (!bucketName) {
  console.log('Error: bucketName is required');
  return;
}

// Initialize storage
const storage = new Storage({
  keyFilename: `./key.json`,
})

const bucket = storage.bucket(bucketName)

// Sending the upload request
bucket.upload(
  src,
  {
    gzip: true,
    metadata: {
      cacheControl: 'public, max-age=31536000',
    },
    destination: dest.endsWith('/') ? `${dest}${src.split('/').pop()}` : dest,
  },
  function (err) {
    if (err) {
      console.error(`Error uploading ${src}: ${err}`)
    } else {
      console.log(`${src} uploaded to ${bucketName}.`)
    }
  }
)

