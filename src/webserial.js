/**
 * Created by Tom on 5/27/2020.
 */
export let device = undefined;
let writer;
let active=true;
let stdout_callback;


export function registerstdout(func) {
    stdout_callback = func;
}


export function writetostdin(stdin) {
    try {
        var enc = new TextEncoder(); // always utf-8
        if (device.writable) {
            const writer = device.writable.getWriter();
            writer.write(enc.encode(stdin));
            writer.releaseLock();
        }
    } catch {
        device = undefined
    }
    return true;
}

async function read() {
    try {
        while (active) {
            const reader = device.readable.getReader();
            const { value, done} = await reader.read()
            if (done) {
                break;
            }
            var dec = new TextDecoder("ascii");
            const txt = dec.decode(value);
            console.log("Rec: "+txt);
            if (stdout_callback) {
                stdout_callback(txt);
            }
            reader.releaseLock();
        }
    } catch {
        device = undefined;
    }
}

let connect_resolves = [];
function connect_check() {
    if (device !== undefined && device.opened) {
        for (let resolve of connect_resolves) {
            resolve();
        }
        connect_resolves = [];
    }
}
setInterval(connect_check, 500);

export function on_connect() {
    //return new Promise((resolve) => connect_resolves.push(resolve));
}

navigator.serial.addEventListener('connect', (e) => {
    // Connect to `e.target` or add it to a list of available ports.
  });
  
navigator.serial.addEventListener('disconnect', (e) => {
// Remove `e.target` from the list of available ports.
});

export async function connect() {
    const usbVendorId = 0xCAFE;
    try {
        device = await navigator.serial.requestPort({ filters: [{usbVendorId}] });
        await device.open({baudRate: 115200});
        window.dev = device;
        read();
    } catch (e) {
        console.log(e);
    } 
    console.log("Connected");
    console.log(device);
}