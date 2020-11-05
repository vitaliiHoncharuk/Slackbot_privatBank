# SlackBot

##Instructions on installation : 
1. Create classic slack App and Bot [Here](https://api.slack.com/apps?new_classic_app=1).
2. Clone/Fork this [repository](https://github.com/vitaliiHoncharuk/Slackbot_privatBank) and open.
3. Get  `Bot Api Key` for your bot and change variable in `.env` file.
4. In terminal , from root run `npm install`.
5. To post message , find in `index.js` file call `sendMessage` function and 
make changes due to comments.

### Advanced usage [Running as cron job] 
 _Linux only_

1. Open terminal , from project folder enter
    `pwd` - get the exact path to directory where `index.js` file is presented. 
    In my case, it was : `/Users/newadmin/Desktop/SlackBot_Cron/index.js`
2. `which node` - exact path, from where your node is running.
    In my case, it was : `/usr/local/opt/node@10/bin/node`
3. Change `script.sh` file due to your results.
4. Find `.bash_profile` , export variable `ROBOT_API_KEY` (which should be already in `.env` file)
5. In terminal `crontab -e` , `i` to change file (in case you use vim editor).
6. Add `0 0 * * * . $HOME/.bash_profile; /Users/newadmin/Desktop/SlackBot_Cron/script.sh`, 
-  `0 0 * * *` - when to run script (in this case it is everyday at 00:00)
- `. $HOME/.bash_profile;` to be able to read variables from your bash profile
- `/Users/newadmin/Desktop/SlackBot_Cron/script.sh` is location of script.sh file (from `step 1` + `/script.sh` to your path)
