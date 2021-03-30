import * as Settings from './settings';

export const commands = {
  helpCommand: {
    enabled: true,
    channelsDisllowed: [
      Settings.channels.generalchat,
      Settings.channels.generalimages,
      Settings.channels.information,
      Settings.channels.announcements,
      Settings.channels.modlogs,
      Settings.channels.reports,
      Settings.channels.rules,
      Settings.channels.suggestions
    ],
    rolesDisallowed: [],
    rolesNeeded: [Settings.roles.verified],
    responseString: new discord.Embed({ title: '**What do you need help with**?', description: `\n**Roles:** ${discord.decor.Emojis.ONE}\n**Channels:** ${discord.decor.Emojis.TWO}\n**Rules:** ${discord.decor.Emojis.THREE}\n\n*React with the corresponding emoji of what you need help with! If what you need help with is not listed, contact a staff member.*\n\nUsed by ${message.author.getTag()}` })
  },
  addRoleCommand: {
    enabled: true,
    channelsDisllowed: [],
    rolesDisallowed: [Settings.roles.tmod],
    rolesNeeded: [Settings.roles.admin, Settings.roles.founder]
  },
  removeRoleCommand: {
    enabled: true,
    channelsDisllowed: [],
    rolesDisallowed: [Settings.roles.tmod],
    rolesNeeded: [Settings.roles.admin, Settings.roles.founder]
  },
  banCommand: {
    enabled: true,
    channelsDisllowed: [],
    rolesDisallowed: [],
    rolesNeeded: [
      Settings.roles.mod,
      Settings.roles.admin,
      Settings.roles.founder
    ]
  },
  kickCommand: {
    enabled: true,
    channelsDisllowed: [],
    rolesDisallowed: [],
    rolesNeeded: [
      Settings.roles.mod,
      Settings.roles.admin,
      Settings.roles.founder
    ]
  },
  levelCommand: {
    enabled: false,
    channelsDisllowed: [],
    rolesDisallowed: [],
    rolesNeeded: [Settings.roles.verified]
  },
  rankCommand: {
    enabled: false,
    channelsDisllowed: [],
    rolesDisallowed: [],
    rolesNeeded: [Settings.roles.verified]
  },
  leaderboardCommand: {
    enabled: false,
    channelsDisllowed: [],
    rolesDisallowed: [],
    rolesNeeded: [Settings.roles.verified]
  },
  suggestCommand: {
    enabled: true,
    channelsDisllowed: [
      Settings.channels.rules,
      Settings.channels.reports,
      Settings.channels.modlogs,
      Settings.channels.information,
      Settings.channels.generalimages,
      Settings.channels.generalchat,
      Settings.channels.announcements,
      Settings.channels.suggestions
    ],
    rolesDisallowed: [],
    rolesNeeded: [Settings.roles.verified]
  },
  reportCommand: {
    enabled: true,
    channelsDisllowed: [],
    rolesDisallowed: [],
    rolesNeeded: [Settings.roles.verified]
  },
  warnCommand: {
    enabled: false,
    channelsDisllowed: [],
    rolesDisallowed: [],
    rolesNeeded: [
      Settings.roles.tmod,
      Settings.roles.mod,
      Settings.roles.admin,
      Settings.roles.founder
    ]
  },
  getwarnsCommand: {
    enabled: false,
    channelsDisllowed: [],
    rolesDisallowed: [],
    rolesNeeded: [
      Settings.roles.tmod,
      Settings.roles.mod,
      Settings.roles.admin,
      Settings.roles.founder
    ]
  },
  deletewarns: {
    enabled: false,
    channelsDisllowed: [],
    rolesDisallowed: [],
    rolesNeeded: [
      Settings.roles.mod,
      Settings.roles.admin,
      Settings.roles.founder
    ]
  },
  muteCommand: {
    enabled: true,
    channelsDisllowed: [],
    rolesDisallowed: [],
    rolesNeeded: [
      Settings.roles.tmod,
      Settings.roles.mod,
      Settings.roles.admin,
      Settings.roles.founder
    ]
  },
  unmuteCommand: {
    enabled: true,
    channelsDisllowed: [],
    rolesDisallowed: [],
    rolesNeeded: [
      Settings.roles.tmod,
      Settings.roles.mod,
      Settings.roles.admin,
      Settings.roles.founder
    ]
  },
  messagesCommand: {
    enabled: false,
    channelsDisllowed: [],
    rolesDisallowed: [],
    rolesNeeded: [Settings.roles.verified]
  },
  serverInfoCommand: {
    enabled: true,
    channelsDisllowed: [],
    rolesDisallowed: [],
    rolesNeeded: [Settings.roles.verified]
  },
  userInfoCommand: {
    enabled: true,
    channelsDisllowed: [],
    rolesDisallowed: [],
    rolesNeeded: [Settings.roles.verified]
  },
  pollCommand: {
    enabled: true,
    channelsDisllowed: [],
    rolesDisallowed: [],
    rolesNeeded: [
      Settings.roles.mod,
      Settings.roles.admin,
      Settings.roles.founder
    ]
  },
  getBanCommand: {
    enabled: true,
    channelsDisllowed: [],
    rolesDisallowed: [],
    rolesNeeded: [
      Settings.roles.mod,
      Settings.roles.admin,
      Settings.roles.founder
    ]
  }
};
