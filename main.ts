import * as Settings from './settings';
import * as Commands from './commands';
import * as Database from './database';

const commands = new discord.command.CommandGroup({
  defaultPrefix: '>'
});

discord.on(discord.Event.MESSAGE_CREATE, async (message) => {
  if (
    [
      Settings.channels.announcements,
      Settings.channels.information,
      Settings.channels.rules
    ].includes(message.channelId)
  ) {
    message.reply(
      new discord.Embed({
        description: message.content,
        color: 0x000000
      })
    );
    message.delete();
  }
});

discord.on(discord.Event.GUILD_MEMBER_ADD, async (user) => {
  if (Settings.giveWelcome) {
    const channel = await discord.getGuildTextChannel(
      Settings.channels.welcome
    );
    if (channel !== undefined && channel !== null) {
      channel.sendMessage(
        new discord.Embed({
          description: `Welcome to the server, ${user.user.toMention()}! Make sure to check out the rules, <#${
            Settings.channels.rules
          }> and <#${Settings.channels.information}>!`,
          color: 0xfe4fd3
        })
      );
    }
  }
});

discord.on(discord.Event.GUILD_MEMBER_REMOVE, async (user) => {
  if (Settings.giveGoodbye) {
    const channel = await discord.getGuildTextChannel(
      Settings.channels.goodbye
    );
    if (channel !== undefined && channel !== null) {
      channel.sendMessage(
        new discord.Embed({
          description: `Aww, ${user.user.getTag()} has left the server...`,
          color: 0xfe4fd3
        })
      );
    }
  }
});

