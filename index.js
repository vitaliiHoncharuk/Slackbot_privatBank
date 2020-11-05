(function () {
  require('dotenv').config();
  const {RTMClient} = require('@slack/rtm-api');
  const {WebClient} = require('@slack/web-api');
  const fetch = require("node-fetch");

  const rtm = new RTMClient(process.env.ROBOT_API_KEY);
  const web = new WebClient(process.env.ROBOT_API_KEY);

  rtm.start().catch(console.error);

  rtm.on('ready', async () => {
	const msg = await processDataToMessage();
	// make sure #nothing chanel exists in your app. (Or change to existing one)
	await sendMessage('#nothing', msg).then(() => {
	  return rtm.disconnect()
	});
  });


  const processDataToMessage = async () => {
	const data = await getPBdata();

	let msg = ['Currency  |  Buy  |  Sell'];
	const flags = ['us', 'euro', 'ru'];
	data.forEach((currency, idx) => {
	  if (currency.ccy !== 'BTC') {
		msg.push(formatMessage(currency, flags[idx]));
	  }
	});

	return msg.join('\n');
  };

  const formatMessage = ({ccy, buy, sale}, flag) => {
	return`:${flag}: ${ccy} :${flag}:  |  ${Math.floor(buy * 100) / 100} |  ${Math.floor(sale * 100) / 100}`;
  };


  const sendMessage = async (chanel, message) => {
	await web.chat.postMessage({
	  channel: chanel,
	  text: message,
	});
  };

  const getPBdata = async () => {
	const response = await fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
	return await response.json();
  };
}());
