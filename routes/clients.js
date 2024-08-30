var express = require("express");
 const axios = require("axios");
// const sendMail = require("../utils/sendMail");

var router = express.Router();

router.get("/GetReceiptsBySupplierTIN", async function (req, res) {
    try {
      const clientTIN = req.query.clientTIN; // Extract the clientTIN from the request query parameters
       // Make the external API call using the extracted clientTIN
       const GetReceiptsBySupplierTIN = await axios.get(`${process.env.API_URL}GetReceiptsByBuyerTIN?buyerTIN=${clientTIN}`, {
        timeout: 10000 // 10 seconds timeout
      });
    
        res.status(200).json({
          message: "success",
          data: GetReceiptsBySupplierTIN.data
        });
      } catch (error) {

        res.status(200).json({
          message: "success",
          data: [{}]
        });
    
        // console.error("Error:", error);
        // res.status(500).json({
        //   message: "error",
        //   error: error.message
        // });
      }
});
router.get("/GetAllReceiptsBySupplierTIN", async function (req, res) {
  try {
    const clientTIN = req.query.clientTIN; // Extract the clientTIN from the request query parameters
     // Make the external API call using the extracted clientTIN
     const GetReceiptsBySupplierTIN = await axios.get(`${process.env.API_URL}GetReceiptsByBuyerTIN?buyerTIN=${clientTIN}`, {
      timeout: 10000 // 10 seconds timeout
     })

     const GetReceiptsByBuyerTIN = await axios.get(`${process.env.API_URL}GetReceiptsBySupplierTIN?supplierTIN=${clientTIN}`, {
      timeout: 10000 // 10 seconds timeout
    });
  

    const allReceipts = GetReceiptsBySupplierTIN.data.concat(GetReceiptsByBuyerTIN.data);
    //  const GetReceiptsBySupplierTIN = await axios.get(`${process.env.API_URL}GetReceiptsBySupplierTIN?supplierTIN=${clientTIN}`, {
    //   timeout: 10000 // 10 seconds timeout
    // });

    console.log(allReceipts)
    console.log("all receipts")
  
      res.status(200).json({
        message: "success",
        // data: GetReceiptsBySupplierTIN.data
        data: allReceipts
      });
    } catch (error) {

      res.status(200).json({
        message: "success",
        data: [{}]
      });
  
      // console.error("Error:", error);
      // res.status(500).json({
      //   message: "error",
      //   error: error.message
      // });
    }
});
router.get("/GetReceiptsByBuyerTIN", async function (req, res) {
  try {

    const clientTIN = req.query.clientTIN; // Extract the clientTIN from the request query parameters
    console.log("THis is the clientTIN", clientTIN);
     // Make the external API call using the extracted clientTIN
     const GetReceiptsByBuyerTIN = await axios.get(`${process.env.API_URL}GetReceiptsBySupplierTIN?supplierTIN=${clientTIN}`, {
      timeout: 10000 // 10 seconds timeout
    });
  
      res.status(200).json({
        message: "success",
        data: GetReceiptsByBuyerTIN.data
      });
    } catch (error) {

     
        res.status(200).json({
          message: "success",
          data: [{}]
        });
    
    
    }
});
router.get("/GetPendingReceiptsBySupplierTIN", async function (req, res) {
  try {
    const clientTIN = req.query.clientTIN; // Extract the clientTIN from the request query parameters
     // Make the external API call using the extracted clientTIN
     const GetPendingReceiptsBySupplierTIN = await axios.get(`${process.env.API_URL}GetPendingReceiptsBySupplierTIN?supplierTIN=${clientTIN}`, {
      timeout: 10000 // 10 seconds timeout
    });
  
      res.status(200).json({
        message: "success",
        data: GetPendingReceiptsBySupplierTIN.data
      });
    } catch (error) {

      res.status(200).json({
        message: "success",
        data: [{}]
      });
  
      // console.error("Error:", error);
      // res.status(500).json({
      //   message: "error",
      //   error: error.message
      // });
    }
});

router.get("/GetSupplierByTIN", async function (req, res) {
  try {
    const clientTIN = req.query.clientTIN; // Extract the clientTIN from the request query parameters
     // Make the external API call using the extracted clientTIN
     let GetClientBySupplierTIN = [];
    GetClientBySupplierTIN = await axios.get(`${process.env.API_URL}GetSupplierByTIN?supplierTIN=${clientTIN}`, {
      timeout: 10000 // 10 seconds timeout
    });
  console.log("client Tin",clientTIN);
      res.status(200).json({
        message: "success",
        data: [GetClientBySupplierTIN.data]
      });
    } catch (error) {

      res.status(500).json({
        message: "false",
        error: error.message
      });
  
      // console.error("Error:", error);
      // res.status(500).json({
      //   message: "error",
      //   error: error.message
      // });
    }
});

router.post("/add-receipt", async function (req, res) {
  console.log("receipt here", req.body)

  // submitReceipt = await axios.get(`${process.env.API_URL}SubmitReceipt?deviceID=123&DeviceModelName=revmmax&DeviceModelVersion=test'`, {
  //   timeout: 10000 // 10 seconds timeout
  // });

  // const certificate="MIIDejCCAmKgAwIBAgIQALbaNKf9cTdgEeLkc+DU2zANBgkqhkiG9w0BAQsFADB5MRwwGgYDVQQDDBNaSU1SQV8xMjNfdGVzdF90ZXN0MSMwIQYDVQQKDBpaaW1iYWJ3ZSBSZXZlbnVlIEF1dGhvcml0eTEJMAcGA1UECwwAMQkwBwYDVQQMDAAxETAPBgNVBAgMCFppbWJhYndlMQswCQYDVQQGEwJaVzAeFw0yNDA3MzAxMjEwMzFaFw0yNTA3MzAxMjEwMzFaMHkxHDAaBgNVBAMME1pJTVJBXzEyM190ZXN0X3Rlc3QxIzAhBgNVBAoMGlppbWJhYndlIFJldmVudWUgQXV0aG9yaXR5MQkwBwYDVQQLDAAxCTAHBgNVBAwMADERMA8GA1UECAwIWmltYmFid2UxCzAJBgNVBAYTAlpXMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAj9RsoM9N2PeNgldPWxKZD8CsRoaPWe6TILJrwPFWoqjjrbV2sPW2qmUq+WJEuHtfy3F9Yr6X7PI5wL7ggYAN8AwBwVkiv8WzB371SFpLV4l3hRlhyH6dN77M5+9IhKT5q7AzUFhoKWgmPF2Cr//fJV3Z1eZoQZb6+qS7/60iIUEBorGPQ8JAb/jzyrhSnmqj3Vo9jJaEkPqBPEJphl/9f6VeasfXZsvX905+HrDpQoulomQKSt4wOQHoxYojBU19TaXtencNbY9cK/WwKNELuFjSKfbwbX72jx3SLYkZULNFWvFbynjjcgFtOzC6zuPEaFqBcJXtDhFXAp9YE1xqdQIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQBl3CaKZNd7Sh7XpYdpyFH6TGZlAHPAReZsDhLReN9SKIKt81Z/URLlNd99acL6vSe+k3YGKYWtpFsgT2prttbSI5SPYUBmxof2HpSJghy5lbv9ookKdfw77mCvZGFlUsN6yELSDEUJXj8bPssJZMoModGWnAvOa2Kh2MxXm6Y7Xjl4hEhwd96x60hqcMFxuFy9dNlP5NJ3ETZnKXT5K2xahet3VWHM/lMBMckkor4P7k52ckCdwBDGORd2RxCwLJCq5fQzbgDKakr8v/OZgy/tVgVxivJV29pLZptgLBUtfRhAtD1Rq7mFQHWlCEMej7klz6D0cVTmOdT6m6bMRWc7";
  const certificate = 
  `MIIDejCCAmKgAwIBAgIQALbaNKf9cTdgEeLkc+DU2zANBgkqhkiG9w0BAQsFADB5MRwwGgYDVQQDDBNaSU1SQV8xMjNfdGVzdF90ZXN0MSMwIQYDVQQKDBpaaW1iYWJ3ZSBSZXZlbnVlIEF1dGhvcml0eTE
  JMAcGA1UECwwAMQkwBwYDVQQMDAAxETAPBgNVBAgMCFppbWJhYndlMQswCQYDVQQGEwJaVzAeFw0yNDA3MzAxMjEwMzFaFw0yNTA3MzAxMjEwMzFaMHkxHDAaBgNVBAMME1pJTVJBXzEyM190ZXN0X3Rlc3Q
  xIzAhBgNVBAoMGlppbWJhYndlIFJldmVudWUgQXV0aG9yaXR5MQkwBwYDVQQLDAAxCTAHBgNVBAwMADERMA8GA1UECAwIWmltYmFid2UxCzAJBgNVBAYTAlpXMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMII
  BCgKCAQEAj9RsoM9N2PeNgldPWxKZD8CsRoaPWe6TILJrwPFWoqjjrbV2sPW2qmUq+WJEuHtfy3F9Yr6X7PI5wL7ggYAN8AwBwVkiv8WzB371SFpLV4l3hRlhyH6dN77M5+
  9IhKT5q7AzUFhoKWgmPF2Cr//fJV3Z1eZoQZb6+qS7/60iIUEBorGPQ8JAb/jzyrhSnmqj3Vo9jJaEkPqBPEJphl/9f6VeasfXZsvX905
  +HrDpQoulomQKSt4wOQHoxYojBU19TaXtencNbY9cK/WwKNELuFjSKfbwbX72jx3SLYkZULNFWvFbynjjcgFtOzC6zuPEaFqBcJXtDhFXAp9YE1xqdQIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQBl3CaKZNd
  7Sh7XpYdpyFH6TGZlAHPAReZsDhLReN9SKIKt81Z/URLlNd99acL6vSe+k3YGKYWtpFsgT2prttbSI5SPYUBmxof2HpSJghy5lbv9ookKdfw77mCvZGFlUsN6yELSDEUJXj8bPssJZMoModGWnAvOa2Kh2Mx
  Xm6Y7Xjl4hEhwd96x60hqcMFxuFy9dNlP5NJ3ETZnKXT5K2xahet3VWHM/lMBMckkor4P7k52ckCdwBDGORd2RxCwLJCq5fQzbgDKakr8v/OZgy/tVgVxivJV29pLZptgLBUtfRhAtD1Rq7mFQHWlCEMej7k
  lz6D0cVTmOdT6m6bMRWc7`
  
  // Define the URL and query parameters
const url = `${process.env.API_URL}SubmitReceipt?deviceID=123&DeviceModelName=test&DeviceModelVersion=test`;

// Define the JSON data to be sent in the body
const jsonData ={
  "receipt": {
      "receiptType": "FiscalInvoice",
      "receiptCurrency": "ZWL",
      "receiptCounter": 30,
      "receiptGlobalNo": 120,
      "invoiceNo": "TEST20240730145413",
      "buyerData": {
          "buyerRegisterName": "Varun",
          "buyerTradeName": "Varun",
          "buyerTIN": "2000757474",
          "VATNumber": "220001963",
          "buyerContacts": {
              "phoneNo": "0777000002",
              "email": "varun@varun.com"
          },
          "buyerAddress": null
      },
      "supplierTIN": "2000152399",
      "supplierVAT": "220192567",
      "receiptNotes": " Dev",
      "receiptDate": "2024-07-30T14:54:13",
      "creditDebitNote": null,
      "receiptLinesTaxInclusive": true,
      "receiptLines": [
          {
              "receiptLineName": "REVMAX COMBO",
              "receiptLineNo": 1,
              "receiptLineQuantity": 1.000,
              "receiptLineType": "Sale",
              "receiptLineTotal": 595.00,
              "taxID": 2,
              "receiptLineHSCode": "TEST",
              "receiptLinePrice": 595.000,
              "taxCode": "B",
              "taxPercent": 0.0
          }
      ],
      "receiptTaxes": [
          {
              "salesAmountWithTax": 595.00,
              "taxAmount": 0.00,
              "taxID": 2,
              "taxCode": "B",
              "taxPercent": 0.0
          },
          {
              "salesAmountWithTax": 0.00,
              "taxAmount": 0.00,
              "taxID": 3,
              "taxCode": "A",
              "taxPercent": 15.00
          }
      ],
      "receiptPayments": [
          {
              "moneyTypeCode": "Cash",
              "paymentAmount": 595.00
          }
      ],
      "receiptTotal": 595.00,
      "receiptPrintForm": "Receipt48",
      "receiptDeviceSignature": {
          "hash": "gaJQ4c7PT0xHx4uZIBtmmtd0GKY+WR5NeA7K1GOq1vs=",
          "signature": "iq7MObHYB7pHTodMHecn0rK5S1xYhZ+e3+ygWJXp9h8/hN4VcPSBQcc7cVB3Dkn9RkFIdhcnrc3SHqOXn54160y+FVmCKdxpznWGBI1RWSAodBDowm0E0SVtiznDwyktKxbNsuHaCOPymFdQKMfXTGgejlxm6+s3J/RKt1Vq463ldonVdd6Pi9f/WskX2Ss9TMQ23bwQvkNo+/ktjz95aNaitRxxqnLlSzIbeJxvmrWa/LNEDdcYriziT/SJO9jEoVlnP7MwfLbw8XkWEerqReDCMspNC0aMqq1/MFvBnowLoeBDsOdhKxikseXSs35BheNkyMksASAMFkFqOTXbIw=="
      }
  }
}
// Make the POST request with the JSON data in the body
// const url = 'http://140.82.25.196:10069/api/SubmitReceipt?deviceID=123&DeviceModelName=test&DeviceModelVersion=test';
const jsonBody = JSON.stringify(jsonData);
// const certificate = 'lz6D0cVTmOdT6m6bMRWc7';

const encodedCertificate = Buffer.from(certificate).toString('base64');

const headers = {
  'Content-Type': 'application/json',
  'accept': '*/*',
  'certificate': encodedCertificate,
};
axios.post(url, jsonBody, { headers })
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
})


module.exports = router;
