// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

'use strict';

const async = require('async');
const fs = require('fs');
const https = require('https');
const path = require("path");
const createReadStream = require('fs').createReadStream
const sleep = require('util').promisify(setTimeout);
const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;
/**
 * AUTHENTICATE
 * This single client is used for all examples.
 */
const key = process.env.KEY1;
const endpoint = process.env.END_POINT;

const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }), endpoint);
/**
 * END - Authenticate
 */

async function computerVision() {
  
      /**
       * OCR: READ PRINTED & HANDWRITTEN TEXT WITH THE READ API
       * Extracts text from images using OCR (optical character recognition).
       */

      // URL images containing printed and/or handwritten text. 
      // The URL can point to image files (.jpg/.png/.bmp) or multi-page files (.pdf, .tiff).
      const printedTextSampleURL = 'https://qph.cf2.quoracdn.net/main-qimg-5a0fda721e2f66b6042bde9a10e93d83-lq';


      // Recognize text in printed image from a URL
      const printedResult = await readTextFromURL(computerVisionClient, printedTextSampleURL);
      return printRecText(printedResult);
      

      // Perform read and await the result from URL
      async function readTextFromURL(client:any, url:string) {
        // To recognize text in a local image, replace client.read() with readTextInStream() as shown:
        let result = await client.read(url);

        // Operation ID is last path segment of operationLocation (a URL)
        let operation = result.operationLocation.split('/').slice(-1)[0];
        

        // Wait for read recognition to complete
        // result.status is initially undefined, since it's the result of read
        while (result.status !== "succeeded") { await sleep(1000); result = await client.getReadResult(operation); }
        return result.analyzeResult.readResults; // Return the first page of result. Replace [0] with the desired page if this is a multi-page file such as .pdf or .tiff.
      }

      // Prints all text from Read result
      function printRecText(readResults:any) {

        const recognitionResults: string[] = []; // Array of string to hold the combined texts.

        for (const page in readResults) { // Read operation returns an array of pages, so we iterate through all of them
          const result = readResults[page];
          if (result.lines.length) { // Iterate through all lines and words

            for (const line of result.lines) { // Iterate through all lines and words

              recognitionResults.push(line.words.map((w: { text: any; }) => w.text).join(' '));

            }
          }         
        }
        return recognitionResults; // Return an array of strings representing line feeds.
      }
}


export default async function Page(

) {
    let test = await computerVision(); 
    let result = JSON.stringify(test,null,2);
    module.exports = result; // Export the result to be used in other files.
    return <pre>{result}</pre>

}
