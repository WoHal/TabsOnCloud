const WebSocket = require('ws');
const program = require('commander');

program
    .version('0.0.1')
    .option('-p, --port', 'server port')
    .parse(process.argv);

const PORT = program.port || 8033;

const wss = new WebSocket.Server({
  port: PORT,
  perMessageDeflate: {
    zlibDeflateOptions: {
      // See zlib defaults.
      chunkSize: 1024,
      memLevel: 7,
      level: 3
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024
    },
    // Other options settable:
    clientNoContextTakeover: true, // Defaults to negotiated value.
    serverNoContextTakeover: true, // Defaults to negotiated value.
    serverMaxWindowBits: 10, // Defaults to negotiated value.
    // Below options specified as default values.
    concurrencyLimit: 10, // Limits zlib concurrency for perf.
    threshold: 1024 // Size (in bytes) below which messages
    // should not be compressed.
  }
});

const existTabSet = new Set();

wss.on('connection', ws => {
    ws.on('message', data => {
        console.log('received: ', data);
        try {
            let urls = JSON.parse(data);
            urls.forEach(url => {
                existTabSet.add(url);
            });

            let res = [];
            for (let url of existTabSet.values()) {
                res.push(url);
            }

            ws.send(JSON.stringify(res));

            urls = null;
            res = null;
        } catch(e) {
            console.log(e);
        }
    });
});