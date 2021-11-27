const AccelMotor_From_RasPI = "AccelMotor_From_RasPI";

let channel;
async function setRelay()
{
    console.log("test");
    let relay = RelayServer("achex", "chirimenSocket");
    channel = await relay.subscribe(AccelMotor_From_RasPI);
    console.log("RelayServerに接続完了");
    channel.onmessage = getMessage;
}

function getMessage(msg)
{
    console.log(msg.data);
    let value = msg.data;
    let textAc = document.getElementById("textAc");
    textAc.innerHTML = value.all;
}