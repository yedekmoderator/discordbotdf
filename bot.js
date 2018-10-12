const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'yenilikler') {
    msg.reply('Toplantı Bugün Saat 7 de olucaktır. bundan sonra bu komutu kullanabilirsiniz.');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cugara') {
    msg.reply('Sigara İçeceğine Bunu iç Daha Yararlı :tropical_drink:');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sorumvar') {
    msg.reply('Sorularınızı:thinking:Sunucu Yetkililerine Sorabilirsiniz.');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'beril') {
    msg.reply('Bu komutu sadece Utku Kullanabilir.:blue_heart:');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'bubotneolum') {
    msg.reply('Bu bot Utku Say Tarafından Dream Friends Yapılan bir bottur.');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'botabakyaw') {
    msg.reply('Bu bot Utku Say Tarafından Dream Friends Yapılan bir bottur.');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'bu bot ne utku') {
    msg.reply('Bu bot Utku Say Tarafından Dream Friends Yapılan bir bottur.');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'çok kötü bir bot') {
    msg.reply('Kullanmayabilirsiniz Efendim.');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'c!yardım') {
    msg.reply('c!yardım değil efendim.sadece yardım yazarak yardım kısmına ulaşabilirsiniz.');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'kes lan') {
    msg.reply('Saygılı konuşursanız Seviniriz');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'orospu çocuğu') {
    msg.reply('Saygılı konuşursanız seviniriz.');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('Aleyküm Selam , Hoşgeldin');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'S.a') {
    msg.reply('Aleyküm Selam , Hoşgeldin');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'SA') {
    msg.reply('Aleyküm Selam , Hoşgeldin');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'Naber') {
    msg.reply('İyidir , Senden ?');
  }
});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.BOT_TOKEN);
