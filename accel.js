import {requestI2CAccess} from "./node_modules/node-web-i2c/index.js";
import GROVEACCELEROMETER from "@chirimen/grove-accelerometer";
import nodeWebSocketLib from "websocket";
import {RelayServer} from "./RelayServer.js";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));


const AccelMotor_From_RasPI = "AccelMotor_From_RasPI";

main();

async function main() {
    const i2cAccess = await requestI2CAccess();
    const port = i2cAccess.ports.get(1);
    const groveaccelerometer = new GROVEACCELEROMETER(port, 0x53);
    await groveaccelerometer.init();

	let relay = RelayServer("achex", "chirimenSocket" , nodeWebSocketLib, "https://chirimen.org");
    let channel = await relay.subscribe(AccelMotor_From_RasPI);

    for (;;) {
        try {
        const values = await groveaccelerometer.read();
        console.log(`ax: ${values.x}, ax: ${values.y}, ax: ${values.z}\nAll: ${Math.abs(values.x) + Math.abs(values.y)}`);
        channel.send({ax: values.x, ay: values.y, az: values.z});
        } catch (err) {
            console.error("READ ERROR:" + err);
        }
        await sleep(1000);
    }
}
