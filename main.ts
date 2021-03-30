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

discord.on(discord.Event.GUILD_BAN_ADD, async (user) => {
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

commands.raw('help', async (message) => {
  let hasDisallowedRole = false;
  for (var i in Commands.commands.helpCommand.rolesDisallowed) {
    if (
      message.member.roles.includes(
        Commands.commands.helpCommand.rolesDisallowed[i]
      )
    ) {
      hasDisallowedRole = true;
    }
  }
  let inDisallowedChannel = false;
  for (var i in Commands.commands.helpCommand.channelsDisllowed) {
    if (
      Commands.commands.helpCommand.channelsDisllowed[i] === message.channelId
    ) {
      inDisallowedChannel = true;
    }
  }
  if (Commands.commands.helpCommand.enabled) {
    if (hasDisallowedRole === false && inDisallowedChannel === false) {
      const msg = await message.reply(
        new discord.Embed({
          title: '**What do you need help with?**',
          description: `\n**Roles:** ${
            discord.decor.Emojis.ONE
          }\n**Channels:** ${discord.decor.Emojis.TWO}\n**Rules:** ${
            discord.decor.Emojis.THREE
          }\n\n*React with the corresponding emoji of what you need help with! If what you need help with is not listed, contact a staff member.*\n\nUsed by ${message.author.getTag()}`,
          color: 0x99d6d3
        })
      );
      await msg.addReaction(discord.decor.Emojis.ONE);
      await msg.addReaction(discord.decor.Emojis.TWO);
      await msg.addReaction(discord.decor.Emojis.THREE);
    } else if (hasDisallowedRole && inDisallowedChannel === false) {
      message.delete();
      const msg = await message.reply(
        new discord.Embed({
          description: `You have a blacklisted role, so you can not use this command, ${message.author.toMention()}.`,
          color: 0x99d6d3
        })
      );
      setTimeout(() => msg.delete(), 5000);
    } else if (inDisallowedChannel && hasDisallowedRole === false) {
      message.delete();
      const msg = await message.reply(
        new discord.Embed({
          description: `You are in a blacklisted channel, so you can not use this command, ${message.author.toMention()}.`,
          color: 0x99d6d3
        })
      );
      setTimeout(() => msg.delete(), 5000);
    } else {
      message.delete();
      const msg = await message.reply(
        new discord.Embed({
          description: `You are in a blacklisted channel and have a blacklisted role, so you can not use this command, ${message.author.toMention()}.`,
          color: 0x99d6d3
        })
      );
      setTimeout(() => msg.delete(), 5000);
    }
  } else {
    const msg = await message.reply(
      new discord.Embed({
        description:
          'This command is currently disabled, sorry for the inconvenience!',
        color: 0xfffe0d
      })
    );
    if (inDisallowedChannel) {
      message.delete();
    }
    setTimeout(() => msg.delete(), 5000);
  }
});

commands.on(
  { name: 'suggest' },
  (args) => ({
    suggestion: args.text()
  }),
  async (message, { suggestion }) => {
    let hasDisallowedRole = false;
    for (var i in Commands.commands.suggestCommand.rolesDisallowed) {
      if (
        message.member.roles.includes(
          Commands.commands.suggestCommand.rolesDisallowed[i]
        )
      ) {
        hasDisallowedRole = true;
      }
    }
    let inDisallowedChannel = false;
    for (var i in Commands.commands.suggestCommand.channelsDisllowed) {
      if (
        Commands.commands.suggestCommand.channelsDisllowed[i] ===
        message.channelId
      ) {
        inDisallowedChannel = true;
      }
    }
    if (Commands.commands.helpCommand.enabled) {
      if (hasDisallowedRole === false && inDisallowedChannel === false) {
        const channel = await discord.getGuildTextChannel(
          Settings.channels.suggestions
        );
        if (channel !== undefined && channel !== null) {
          const msg = await channel.sendMessage(
            new discord.Embed({
              title: '**A new suggestion has been submitted!**',
              description: `\nSuggestion: ${suggestion}\nBy: ${message.author.getTag()}`
            })
          );
          await msg.addReaction(discord.decor.Emojis.WHITE_CHECK_MARK);
          await msg.addReaction(discord.decor.Emojis.X);
        }
        message.reply('Your suggestion has been added!');
      } else if (hasDisallowedRole && inDisallowedChannel === false) {
        message.delete();
        const msg = await message.reply(
          new discord.Embed({
            description: `You have a blacklisted role, so you can not use this command, ${message.author.toMention()}.`,
            color: 0x99d6d3
          })
        );
        setTimeout(() => msg.delete(), 5000);
      } else if (inDisallowedChannel && hasDisallowedRole === false) {
        message.delete();
        const msg = await message.reply(
          new discord.Embed({
            description: `You are in a blacklisted channel, so you can not use this command, ${message.author.toMention()}.`,
            color: 0x99d6d3
          })
        );
        setTimeout(() => msg.delete(), 5000);
      } else {
        message.delete();
        const msg = await message.reply(
          new discord.Embed({
            description: `You are in a blacklisted channel and have a blacklisted role, so you can not use this command, ${message.author.toMention()}.`,
            color: 0x99d6d3
          })
        );
        setTimeout(() => msg.delete(), 5000);
      }
    } else {
      const msg = await message.reply(
        new discord.Embed({
          description:
            'This command is currently disabled, sorry for the inconvenience!',
          color: 0xfffe0d
        })
      );
      if (inDisallowedChannel) {
        message.delete();
      }
      setTimeout(() => msg.delete(), 5000);
    }
  }
);

commands.on(
  { name: 'report' },
  (args) => ({
    user: args.user(),
    reason: args.text()
  }),
  async (message, { user, reason }) => {
    let hasDisallowedRole = false;
    for (var i in Commands.commands.reportCommand.rolesDisallowed) {
      if (
        message.member.roles.includes(
          Commands.commands.reportCommand.rolesDisallowed[i]
        )
      ) {
        hasDisallowedRole = true;
      }
    }
    let inDisallowedChannel = false;
    for (var i in Commands.commands.reportCommand.channelsDisllowed) {
      if (
        Commands.commands.reportCommand.channelsDisllowed[i] ===
        message.channelId
      ) {
        inDisallowedChannel = true;
      }
    }
    if (Commands.commands.reportCommand.enabled) {
      const channel = await discord.getGuildTextChannel(
        Settings.channels.reports
      );
      if (channel !== undefined && channel !== null) {
        channel?.sendMessage(
          new discord.Embed({
            title: '**A new report has been submitted!**',
            description: `**Reason:** ${reason}\n**User:** ${user.getTag()}\n**Reported by:** ${message.author.getTag()}`,
            color: 0xffff00
          })
        );
        message.delete();
        message.reply(
          `Your report has been sent to the staff team, and they will review it.`
        );
      }
    } else {
      const msg = await message.reply(
        new discord.Embed({
          description:
            'This command is currently disabled, sorry for the inconvenience!',
          color: 0xfffe0d
        })
      );
      if (inDisallowedChannel) {
        message.delete();
      }
      setTimeout(() => msg.delete(), 5000);
    }
  }
);

commands.on(
  { name: 'mute' },
  (args) => ({
    user: args.guildMember(),
    reason: args.text()
  }),
  async (message, { user, reason }) => {
    let hasDisallowedRole = false;
    for (var i in Commands.commands.reportCommand.rolesDisallowed) {
      if (
        message.member.roles.includes(
          Commands.commands.reportCommand.rolesDisallowed[i]
        )
      ) {
        hasDisallowedRole = true;
      }
    }
    let inDisallowedChannel = false;
    for (var i in Commands.commands.reportCommand.channelsDisllowed) {
      if (
        Commands.commands.reportCommand.channelsDisllowed[i] ===
        message.channelId
      ) {
        inDisallowedChannel = true;
      }
    }
    if (
      !user.roles.includes(Settings.roles.muted) &&
      hasDisallowedRole === false &&
      inDisallowedChannel === false
    ) {
      Database.mutes.put(user.user.id, {
        reason: reason,
        moderator: message.author.getTag()
      });
      user.addRole(Settings.roles.muted);
      message.reply(
        new discord.Embed({
          title: '**A user has been muted.**',
          description: `**User:** ${user.user.toMention()}\n\n**Reason:** ${reason}`,
          color: 0xffff00
        })
      );
    }
    if (hasDisallowedRole && inDisallowedChannel === false) {
      message.delete();
      const msg = await message.reply(
        new discord.Embed({
          description: `You have a blacklisted role, so you can not use this command, ${message.author.toMention()}.`,
          color: 0x99d6d3
        })
      );
      setTimeout(() => msg.delete(), 5000);
    } else if (inDisallowedChannel && hasDisallowedRole === false) {
      message.delete();
      const msg = await message.reply(
        new discord.Embed({
          description: `You are in a blacklisted channel, so you can not use this command, ${message.author.toMention()}.`,
          color: 0x99d6d3
        })
      );
      setTimeout(() => msg.delete(), 5000);
    } else if (
      inDisallowedChannel &&
      hasDisallowedRole &&
      !user.roles.includes(Settings.roles.muted)
    ) {
      message.delete();
      const msg = await message.reply(
        new discord.Embed({
          description: `You are in a blacklisted channel and have a blacklisted role, so you can not use this command, ${message.author.toMention()}.`,
          color: 0x99d6d3
        })
      );
      setTimeout(() => msg.delete(), 5000);
    } else if (user.roles.includes(Settings.roles.muted)) {
      const msg = await message.reply(
        new discord.Embed({
          description: 'This user is already muted.',
          color: 0xffff00
        })
      );
      if (inDisallowedChannel) {
        message.delete();
      }
      setTimeout(() => msg.delete(), 5000);
    }
  }
);

commands.on(
  { name: 'addrole' },
  (args) => ({
    user: args.guildMember(),
    role: args.string()
  }),
  async (message, { user, role }) => {
    if (
      user !== undefined &&
      user !== null &&
      role !== undefined &&
      role !== null
    ) {
      user.addRole(role);
    }
  }
);
