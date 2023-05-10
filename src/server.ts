import { remote, Browser } from 'webdriverio';
import express from 'express';
import jayson from 'jayson';
import bodyParser from 'body-parser';
import chromedriver from 'chromedriver';
import { Landing } from './pageobjects/landing-page';
import { Settings } from "./pageobjects/setting";

const app = express();

// ChromeDriver arguments
const args: string[] = [
// Optional arguments
];
  
  // Start the ChromeDriver process with Promise option
  const returnPromise = true;
  chromedriver
    .start(args, returnPromise)
    .then(() => {
      console.log('chromedriver is ready');
    });
  const jsonRpcServer = jayson.server({
    openURL: async function (params: string[], callback: (err: Error | null, res?: any) => void) {
        try {
        const url = params[0];
        const browser = await remote({
            automationProtocol: 'webdriver',
            hostname: 'localhost',
            port: 9515,
            path: '/',
            capabilities: {
            browserName: 'chrome',
            },
        });
    
        const landing_page = new Landing(browser);
        await landing_page.enterSiteAndLogin(
            Settings.devSiteURL,
            Settings.devLoginURL,
            Settings.authUser,
            Settings.authPassword,
            Settings.loginUser,
            Settings.loginPassword
          );
    
        const successResponse = {
            status: 'success',
            message: `URL opened successfully: ${url}`,
        };
    
        callback(null, successResponse);
        } catch (error) {
        console.error('Error:', error);
        callback(error as Error | null);
        }
    },
    });
    
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/jsonrpc', (req, res) => {
  jsonRpcServer.call(req.body, req, (error, success) => {
    if (error) {
        const err = error as { code?: number };
        const statusCode = err.code && typeof err.code === 'number' ? err.code : 500;
        console.error('Error:', error); // Add this line to log the error
        res.status(statusCode).json(error);
    } else {
      res.json(success);
    }
  });
});

const PORT = process.env.PORT || 3000;
// Store the server instance in a variable
const server = app.listen(PORT, () => {
console.log(`JSON-RPC server is running on port ${PORT}`);
});

// Listen for signals to close the server and stop Chromedriver
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

function gracefulShutdown() {
    console.log('Received signal to shutdown. Stopping Chromedriver and closing server...');

    // Stop Chromedriver
    chromedriver.stop();

    // Close the server
    server.close(() => {
        console.log('Server closed.');
        process.exit();
    });
}