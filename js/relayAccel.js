// チャンネル
const accelMotor__From__RasPI = "accelMotor__From__RasPI";

// 怖いがっている
const SCARY_LIMIT = 15;

let channel;
async function setRelay()
{
    let relay = RelayServer("achex", "chirimenSocket");
    channel = await relay.subscribe(accelMotor__From__RasPI);
    console.log("RelayServerに接続完了");
    channel.onmessage = getMessage;
}

function getMessage(msg)
{
    console.log(msg.data);
    let values = msg.data;
    let value = document.getElementById("valueAccel");
    let scary = document.getElementById("scaryAccel");
    let isScary = (values.all > SCARY_LIMIT) ? true : false;
    value.innerHTML = values.all;
    scary.innerHTML = (isScary === true) ? "O" : "X";
}