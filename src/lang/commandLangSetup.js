// commandLangSetup.js
async function chatGuard() {
    // chatGuard.js

    const trLang = require("../tr.json").buildCommands.chatGuard;
    //? const enLang = require("../en.json").buildCommands.chatGuard;
    const chatGuard = {
        name: {
            //! en: enLang.name,
            tr: trLang.name,
        },
        description: {
            //! en: enLang.description,
            tr: trLang.description,
        },
        antiLink: {
            name: {
                //! en: enLang.antiLink.name,
                tr: trLang.antiLink.name,
            },
            description: {
                //! en: enLang.antiLink.description,
                tr: trLang.antiLink.description,
            },
            enable: {
                name: {
                    //! en: enLang.antiLink.enable.name,
                    tr: trLang.antiLink.enable.name,
                },
                description: {
                    //! en: enLang.antiLink.enable.description,
                    tr: trLang.antiLink.enable.description,
                },
                roleOption: {
                    name: {
                        //! en: enLang.antiLink.enable.roleOption.name,
                        tr: trLang.antiLink.enable.roleOption.name,
                    },
                    description: {
                        //! en: enLang.antiLink.enable.roleOption.description,
                        tr: trLang.antiLink.enable.roleOption.description,
                    },
                },
            },
            disable: {
                name: {
                    //! en: enLang.antiLink.disable.name,
                    tr: trLang.antiLink.disable.name,
                },
                description: {
                    //! en: enLang.antiLink.disable.description,
                    tr: trLang.antiLink.disable.description,
                },
            },
        },
        capitalLetter: {
            name: {
                //! en: enLang.capitalLetter.name,
                tr: trLang.capitalLetter.name,
            },
            description: {
                //! en: enLang.capitalLetter.description,
                tr: trLang.capitalLetter.description,
            },
            enable: {
                name: {
                    //! en: enLang.capitalLetter.enable.name,
                    tr: trLang.capitalLetter.enable.name,
                },
                description: {
                    //! en: enLang.capitalLetter.enable.description,
                    tr: trLang.capitalLetter.enable.description,
                },
            },
            disable: {
                name: {
                    //! en: enLang.capitalLetter.disable.name,
                    tr: trLang.capitalLetter.disable.name,
                },
                description: {
                    //! en: enLang.capitalLetter.disable.description,
                    tr: trLang.capitalLetter.disable.description,
                },
            },
        },
        slowMode: {
            name: {
                //! en: enLang.slowMode.name,
                tr: trLang.slowMode.name,
            },
            description: {
                //! en: enLang.slowMode.description,
                tr: trLang.slowMode.description,
            },
            enable: {
                name: {
                    //! en: enLang.slowMode.enable.name,
                    tr: trLang.slowMode.enable.name,
                },
                description: {
                    //! en: enLang.slowMode.enable.description,
                    tr: trLang.slowMode.enable.description,
                },
                durationOption: {
                    name: {
                        //! en: enLang.slowMode.enable.durationOption.name,
                        tr: trLang.slowMode.enable.durationOption.name,
                    },
                    description: {
                        //! en: enLang.slowMode.enable.durationOption.description,
                        tr: trLang.slowMode.enable.durationOption.description,
                    },
                },
                channelOption: {
                    name: {
                        //! en: enLang.slowMode.enable.channelOption.name,
                        tr: trLang.slowMode.enable.channelOption.name,
                    },
                    description: {
                        //! en: enLang.slowMode.enable.channelOption.description,
                        tr: trLang.slowMode.enable.channelOption.description,
                    },
                },
            },
            disable: {
                name: {
                    //! en: enLang.slowMode.disable.name,
                    tr: trLang.slowMode.disable.name,
                },
                description: {
                    //! en: enLang.slowMode.disable.description,
                    tr: trLang.slowMode.disable.description,
                },
                channelOption: {
                    name: {
                        //! en: enLang.slowMode.disable.channelOption.name,
                        tr: trLang.slowMode.disable.channelOption.name,
                    },
                    description: {
                        //! en: enLang.slowMode.disable.channelOption.description,
                        tr: trLang.slowMode.disable.channelOption.description,
                    },
                },
            },
        },
        forbidWord: {
            name: {
                //! en: enLang.forbidWord.name,
                tr: trLang.forbidWord.name,
            },
            description: {
                //! en: enLang.forbidWord.description,
                tr: trLang.forbidWord.description,
            },
            wordOption: {
                name: {
                    //! en: enLang.forbidWord.wordOption.name,
                    tr: trLang.forbidWord.wordOption.name,
                },
                description: {
                    //! en: enLang.forbidWord.wordOption.description,
                    tr: trLang.forbidWord.wordOption.description,
                },
            },
        },
    }
    return chatGuard;
}
async function game() {
    // game.js

    const trLang = require("../lang/tr.json").buildCommands.playGames;
    //? const enLang = require("../lang/en.json").buildCommands.playGames;
    const game = {
        gamble: {
            name: {
                //! en: enLang.gamble.name,
                tr: trLang.gamble.name,
            },
            description: {
                //! en: enLang.gamble.description,
                tr: trLang.gamble.description,
            },
            options: {
                amount: {
                    name: {
                        //! en: enLang.gamble.options.amount.name,
                        tr: trLang.gamble.options.amount.name,
                    },
                    description: {
                        //! en: enLang.gamble.options.amount.description,
                        tr: trLang.gamble.options.amount.description,
                    },
                },
            },
        },
        rps: {
            name: {
                //! en: enLang.rps.name,
                tr: trLang.rps.name,
            },
            description: {
                //! en: enLang.rps.description,
                tr: trLang.rps.description,
            },
            options: {
                user: {
                    name: {
                        //! en: enLang.rps.options.user.name,
                        tr: trLang.rps.options.user.name,
                    },
                    description: {
                        //! en: enLang.rps.options.user.description,
                        tr: trLang.rps.options.user.description,
                    },
                },
            },
        },
    }
    return game
}
async function info() {
    // info.js
    const trLang = require("../lang/tr.json").buildCommands.info;
    //? const enLang = require("../lang/en.json").buildCommands.info;
    const info = {
        name: [
            { tr: await trLang.name }
        ]
        ,
        description: {
            tr: trLang.description,
        },
        emojimap: {
            name: {
                //! en: enLang.emojimap.name,
                tr: trLang.emojimap.name,
            },
            description: {
                //! en: enLang.emojimap.description,
                tr: trLang.emojimap.description,
            },
        },
        help: {
            name: {
                //! en: enLang.help.name,
                tr: trLang.help.name,
            },
            description: {
                //! en: enLang.help.description,
                tr: trLang.help.description,
            },
        },
        serverInfo: {
            name: {
                //! en: enLang.serverInfo.name,
                tr: trLang.serverInfo.name,
            },
            description: {
                //! en: enLang.serverInfo.description,
                tr: trLang.serverInfo.description,
            },
        },
        userInfo: {
            name: {
                //! en: enLang.userInfo.name,
                tr: trLang.userInfo.name,
            },
            description: {
                //! en: enLang.userInfo.description,
                tr: trLang.userInfo.description,
            },
            options: {
                name: {
                    //! en: enLang.userInfo.options.name,
                    tr: trLang.userInfo.options.name,
                },
                description: {
                    //! en: enLang.userInfo.options.description,
                    tr: trLang.userInfo.options.description,
                },
            },
        },
    }
    return info;
}
async function levelSystem() {
    const trLang = require("../lang/tr.json").buildCommands.levelSystem;
    //? const enLang = require("../lang/en.json").buildCommands.levelSystem;
    const levelSystem = {
        name: {
            //! en: enLang.name,
            tr: trLang.name,
        },
        description: {
            //! en: enLang.description,
            tr: trLang.description,
        },
        subcommands: {
            daily: {
                name: {
                    //! en: enLang.subcommands.daily.name,
                    tr: trLang.subcommands.daily.name,
                },
                description: {
                    //! en: enLang.subcommands.daily.description,
                    tr: trLang.subcommands.daily.description,
                },
            },
            balance: {
                name: {
                    //! en: enLang.subcommands.balance.name,
                    tr: trLang.subcommands.balance.name,
                },
                description: {
                    //! en: enLang.subcommands.balance.description,
                    tr: trLang.subcommands.balance.description,
                },
                options: {
                    user: {
                        name: {
                            //! en: enLang.subcommands.balance.options.user.name,
                            tr: trLang.subcommands.balance.options.user.name,
                        },
                        description: {
                            //! en: enLang.subcommands.balance.options.user.description,
                            tr: trLang.subcommands.balance.options.user.description,
                        },
                    },
                },
            },
            level: {
                name: {
                    //! en: enLang.subcommands.level.name,
                    tr: trLang.subcommands.level.name,
                },
                description: {
                    //! en: enLang.subcommands.level.description,
                    tr: trLang.subcommands.level.description,
                },
                options: {
                    targetUser: {
                        name: {
                            //! en: enLang.subcommands.level.options.targetUser.name,
                            tr: trLang.subcommands.level.options.targetUser.name,
                        },
                        description: {
                            //! en: enLang.subcommands.level.options.targetUser.description,
                            tr: trLang.subcommands.level.options.targetUser.description,
                        },
                    },
                },
            },
        },
    }
    return levelSystem;
}
async function modareteSystem() {
    const trLang = require("../lang/tr.json").buildCommands.modrateSystem;
    //? const enLang = require("../lang/en.json").buildCommands.modrateSystem;
    const modrateSystem = {
        name: {
            //! en: enLang.name,
            tr: trLang.name,
        },
        description: {
            //! en: enLang.description,
            tr: trLang.description,
        },
        subcommands: {
            kick: {
                name: {
                    //! en: enLang.subcommands.kick.name,
                    tr: trLang.subcommands.kick.name,
                },
                description: {
                    //! en: enLang.subcommands.kick.description,
                    tr: trLang.subcommands.kick.description,
                },
                options: {
                    targetUser: {
                        name: {
                            //! en: enLang.subcommands.kick.options.targetUser.name,
                            tr: trLang.subcommands.kick.options.targetUser.name,
                        },
                        description: {
                            //! en: enLang.subcommands.kick.options.targetUser.description,
                            tr: trLang.subcommands.kick.options.targetUser.description,
                        },
                    },
                    reason: {
                        name: {
                            //! en: enLang.subcommands.kick.options.reason.name,
                            tr: trLang.subcommands.kick.options.reason.name,
                        },
                        description: {
                            //! en: enLang.subcommands.kick.options.reason.description,
                            tr: trLang.subcommands.kick.options.reason.description,
                        },
                    },
                },
            },
            moveAll: {
                name: {
                    //! en: enLang.subcommands.moveAll.name,
                    tr: trLang.subcommands.moveAll.name,
                },
                description: {
                    //! en: enLang.subcommands.moveAll.description,
                    tr: trLang.subcommands.moveAll.description,
                },
                options: {
                    source: {
                        name: {
                            //! en: enLang.subcommands.moveAll.options.source.name,
                            tr: trLang.subcommands.moveAll.options.source.name,
                        },
                        description: {
                            //! en: enLang.subcommands.moveAll.options.source.description,
                            tr: trLang.subcommands.moveAll.options.source.description,
                        },
                    },
                    target: {
                        name: {
                            //! en: enLang.subcommands.moveAll.options.target.name,
                            tr: trLang.subcommands.moveAll.options.target.name,
                        },
                        description: {
                            //! en: enLang.subcommands.moveAll.options.target.description,
                            tr: trLang.subcommands.moveAll.options.target.description,
                        },
                    },
                },
            },
            removeRole: {
                name: {
                    //! en: enLang.subcommands.removeRole.name,
                    tr: trLang.subcommands.removeRole.name,
                },
                description: {
                    //! en: enLang.subcommands.removeRole.description,
                    tr: trLang.subcommands.removeRole.description,
                },
                options: {
                    targetUser: {
                        name: {
                            //! en: enLang.subcommands.removeRole.options.targetUser.name,
                            tr: trLang.subcommands.removeRole.options.targetUser.name,
                        },
                        description: {
                            //! en: enLang.subcommands.removeRole.options.targetUser.description,
                            tr: trLang.subcommands.removeRole.options.targetUser.description,
                        },
                    },
                },
            },
            timeout: {
                name: {
                    //! en: enLang.subcommands.timeout.name,
                    tr: trLang.subcommands.timeout.name,
                },
                description: {
                    //! en: enLang.subcommands.timeout.description,
                    tr: trLang.subcommands.timeout.description,
                },
                options: {
                    targetUser: {
                        name: {
                            //! en: enLang.subcommands.timeout.options.targetUser.name,
                            tr: trLang.subcommands.timeout.options.targetUser.name,
                        },
                        description: {
                            //! en: enLang.subcommands.timeout.options.targetUser.description,
                            tr: trLang.subcommands.timeout.options.targetUser.description,
                        },
                    },
                    duration: {
                        name: {
                            //! en: enLang.subcommands.timeout.options.duration.name,
                            tr: trLang.subcommands.timeout.options.duration.name,
                        },
                        description: {
                            //! en: enLang.subcommands.timeout.options.duration.description,
                            tr: trLang.subcommands.timeout.options.duration.description,
                        },
                    },
                    reason: {
                        name: {
                            //! en: enLang.subcommands.timeout.options.reason.name,
                            tr: trLang.subcommands.timeout.options.reason.name,
                        },
                        description: {
                            //! en: enLang.subcommands.timeout.options.reason.description,
                            tr: trLang.subcommands.timeout.options.reason.description,
                        },
                    },
                },
            },
            clear: {
                name: {
                    //! en: enLang.subcommands.clear.name,
                    tr: trLang.subcommands.clear.name,
                },
                description: {
                    //! en: enLang.subcommands.clear.description,
                    tr: trLang.subcommands.clear.description,
                },
                options: {
                    amount: {
                        name: {
                            //! en: enLang.subcommands.clear.options.amount.name,
                            tr: trLang.subcommands.clear.options.amount.name,
                        },
                        description: {
                            //! en: enLang.subcommands.clear.options.amount.description,
                            tr: trLang.subcommands.clear.options.amount.description,
                        },
                    },
                    target: {
                        name: {
                            //! en: enLang.subcommands.clear.options.target.name,
                            tr: trLang.subcommands.clear.options.target.name,
                        },
                        description: {
                            //! en: enLang.subcommands.clear.options.target.description,
                            tr: trLang.subcommands.clear.options.target.description,
                        },
                    },
                },
            },
            chanceUserName: {
                name: {
                    //! en: enLang.subcommands.chanceUserName.name,
                    tr: trLang.subcommands.chanceUserName.name,
                },
                description: {
                    //! en: enLang.subcommands.chanceUserName.description,
                    tr: trLang.subcommands.chanceUserName.description,
                },
                options: {
                    targetUser: {
                        name: {
                            //! en: enLang.subcommands.chanceUserName.options.targetUser.name,
                            tr: trLang.subcommands.chanceUserName.options.targetUser.name,
                        },
                        description: {
                            //! en: enLang.subcommands.chanceUserName.options.targetUser.description,
                            tr: trLang.subcommands.chanceUserName.options.targetUser.description,
                        },
                    },
                    setName: {
                        name: {
                            //! en: enLang.subcommands.chanceUserName.options.setName.name,
                            tr: trLang.subcommands.chanceUserName.options.setName.name,
                        },
                        description: {
                            //! en: enLang.subcommands.chanceUserName.options.setName.description,
                            tr: trLang.subcommands.chanceUserName.options.setName.description,
                        },
                    },
                },
            },
            ban: {
                name: {
                    //! en: enLang.subcommands.ban.name,
                    tr: trLang.subcommands.ban.name,
                },
                description: {
                    //! en: enLang.subcommands.ban.description,
                    tr: trLang.subcommands.ban.description,
                },
                options: {
                    targetUser: {
                        name: {
                            //! en: enLang.subcommands.ban.options.targetUser.name,
                            tr: trLang.subcommands.ban.options.targetUser.name,
                        },
                        description: {
                            //! en: enLang.subcommands.ban.options.targetUser.description,
                            tr: trLang.subcommands.ban.options.targetUser.description,
                        },
                    },
                    reason: {
                        name: {
                            //! en: enLang.subcommands.ban.options.reason.name,
                            tr: trLang.subcommands.ban.options.reason.name,
                        },
                        description: {
                            //! en: enLang.subcommands.ban.options.reason.description,
                            tr: trLang.subcommands.ban.options.reason.description,
                        },
                    },
                },
            },
        },
    }
    return modrateSystem;
}
async function musicSystem() {
    const trLang = require("../lang/tr.json").buildCommands.music;
    //? const enLang = require("../lang/en.json").buildCommands.music;
    const musicSystem = {
        name: {
            //! en: enLang.name,
            tr: trLang.name,
        },
        description: {
            //! en: enLang.description,
            tr: trLang.description,
        },
        play: {
            name: {
                //! en: enLang.play.name,
                tr: trLang.play.name,
            },
            description: {
                //! en: enLang.play.description,
                tr: trLang.play.description,
            },
            options: {
                query: {
                    name: {
                        //! en: enLang.play.options.query.name,
                        tr: trLang.play.options.query.name,
                    },
                    description: {
                        //! en: enLang.play.options.query.description,
                        tr: trLang.play.options.query.description,
                    },
                },
            },
        },
        volume: {
            name: {
                //! en: enLang.volume.name,
                tr: trLang.volume.name,
            },
            description: {
                //! en: enLang.volume.description,
                tr: trLang.volume.description,
            },
            options: {
                percent: {
                    name: {
                        //! en: enLang.volume.options.percent.name,
                        tr: trLang.volume.options.percent.name,
                    },
                    description: {
                        //! en: enLang.volume.options.percent.description,
                        tr: trLang.volume.options.percent.description,
                    },
                },
            },
        },
        queue: {
            name: {
                //! en: enLang.queue.name,
                tr: trLang.queue.name,
            },
            description: {
                //! en: enLang.queue.description,
                tr: trLang.queue.description,
            },
        },
        skip: {
            name: {
                //! en: enLang.skip.name,
                tr: trLang.skip.name,
            },
            description: {
                //! en: enLang.skip.description,
                tr: trLang.skip.description,
            },
        },
        pause: {
            name: {
                //! en: enLang.pause.name,
                tr: trLang.pause.name,
            },
            description: {
                //! en: enLang.pause.description,
                tr: trLang.pause.description,
            },
        },
        resume: {
            name: {
                //! en: enLang.resume.name,
                tr: trLang.resume.name,
            },
            description: {
                //! en: enLang.resume.description,
                tr: trLang.resume.description,
            },
        },
        stop: {
            name: {
                //! en: enLang.stop.name,
                tr: trLang.stop.name,
            },
            description: {
                //! en: enLang.stop.description,
                tr: trLang.stop.description,
            },
        },
        nowPlaying: {
            name: {
                //! en: enLang.nowPlaying.name,
                tr: trLang.nowPlaying.name,
            },
            description: {
                //! en: enLang.nowPlaying.description,
                tr: trLang.nowPlaying.description,
            },
        },
        shuffle: {
            name: {
                //! en: enLang.shuffle.name,
                tr: trLang.shuffle.name,
            },
            description: {
                //! en: enLang.shuffle.description,
                tr: trLang.shuffle.description,
            },
        },
        forward: {
            name: {
                //! en: enLang.forward.name,
                tr: trLang.forward.name,
            },
            description: {
                //! en: enLang.forward.description,
                tr: trLang.forward.description,
            },
            options: {
                seconds: {
                    name: {
                        //! en: enLang.forward.options.seconds.name,
                        tr: trLang.forward.options.seconds.name,
                    },
                    description: {
                        //! en: enLang.forward.options.seconds.description,
                        tr: trLang.forward.options.seconds.description,
                    },
                },
            },
        },
        rewind: {
            name: {
                //! en: enLang.rewind.name,
                tr: trLang.rewind.name,
            },
            description: {
                //! en: enLang.rewind.description,
                tr: trLang.rewind.description,
            },
            options: {
                seconds: {
                    name: {
                        //! en: enLang.rewind.options.seconds.name,
                        tr: trLang.rewind.options.seconds.name,
                    },
                    description: {
                        //! en: enLang.rewind.options.seconds.description,
                        tr: trLang.rewind.options.seconds.description,
                    },
                },
            },
        },
        loop: {
            name: {
                //! en: enLang.loop.name,
                tr: trLang.loop.name,
            },
            description: {
                //! en: enLang.loop.description,
                tr: trLang.loop.description,
            },
            options: {
                name: {
                    //! en: enLang.loop.options.name,
                    tr: trLang.loop.options.name,
                },
                description: {
                    //! en: enLang.loop.options.description,
                    tr: trLang.loop.options.description,
                },
            },
        },
    }
    return musicSystem;
}
async function setSystem() {
    const trLang = require("../lang/tr.json").buildCommands.serverSystem;
    //? const enLang = require("../lang/en.json").buildCommands.serverSystem;
    const setSystem = {
        name: {
            //! en: enLang.name,
            tr: trLang.name,
        },
        description: {
            //! en: enLang.description,
            tr: trLang.description,
        },
        configSuggestions: {
            name: {
                //! en: enLang.configSuggestions.name,
                tr: trLang.configSuggestions.name,
            },
            description: {
                //! en: enLang.configSuggestions.description,
                tr: trLang.configSuggestions.description,
            },
            enable: {
                name: {
                    //! en: enLang.configSuggestions.enable.name,
                    tr: trLang.configSuggestions.enable.name,
                },
                description: {
                    //! en: enLang.configSuggestions.enable.description,
                    tr: trLang.configSuggestions.enable.description,
                },
            },
            disable: {
                name: {
                    //! en: enLang.configSuggestions.disable.name,
                    tr: trLang.configSuggestions.disable.name,
                },
                description: {
                    //! en: enLang.configSuggestions.disable.description,
                    tr: trLang.configSuggestions.disable.description,
                },
            },
        },
        joinToCreate: {
            name: {
                //! en: enLang.joinToCreate.name,
                tr: trLang.joinToCreate.name,
            },
            description: {
                //! en: enLang.joinToCreate.description,
                tr: trLang.joinToCreate.description,
            },
            enable: {
                name: {
                    //! en: enLang.joinToCreate.enable.name,
                    tr: trLang.joinToCreate.enable.name,
                },
                description: {
                    //! en: enLang.joinToCreate.enable.description,
                    tr: trLang.joinToCreate.enable.description,
                },
                channel: {
                    name: {
                        //! en: enLang.joinToCreate.enable.channel.name,
                        tr: trLang.joinToCreate.enable.channel.name,
                    },
                    description: {
                        //! en: enLang.joinToCreate.enable.channel.description,
                        tr: trLang.joinToCreate.enable.channel.description,
                    },
                },
                category: {
                    name: {
                        //! en: enLang.joinToCreate.enable.category.name,
                        tr: trLang.joinToCreate.enable.category.name,
                    },
                    description: {
                        //! en: enLang.joinToCreate.enable.category.description,
                        tr: trLang.joinToCreate.enable.category.description,
                    },
                },
                voiceLimit: {
                    name: {
                        //! en: enLang.joinToCreate.enable.voiceLimit.name,
                        tr: trLang.joinToCreate.enable.voiceLimit.name,
                    },
                    description: {
                        //! en: enLang.joinToCreate.enable.voiceLimit.description,
                        tr: trLang.joinToCreate.enable.voiceLimit.description,
                    },
                },
            },
            disable: {
                name: {
                    //! en: enLang.joinToCreate.disable.name,
                    tr: trLang.joinToCreate.disable.name,
                },
                description: {
                    //! en: enLang.joinToCreate.disable.description,
                    tr: trLang.joinToCreate.disable.description,
                },
            },
        },
        setupRegister: {
            name: {
                //! en: enLang.setupRegister.name,
                tr: trLang.setupRegister.name,
            },
            description: {
                //! en: enLang.setupRegister.description,
                tr: trLang.setupRegister.description,
            },
            activateRoleSelectMenu: {
                name: {
                    //! en: enLang.setupRegister.activateRoleSelectMenu.name,
                    tr: trLang.setupRegister.activateRoleSelectMenu.name,
                },
                description: {
                    //! en: enLang.setupRegister.activateRoleSelectMenu.description,
                    tr: trLang.setupRegister.activateRoleSelectMenu.description,
                },
                setRoleType: {
                    name: {
                        //! en: enLang.setupRegister.activateRoleSelectMenu.setRoleType.name,
                        tr: trLang.setupRegister.activateRoleSelectMenu.setRoleType.name,
                    },
                    description: {
                        //! en: enLang.setupRegister.activateRoleSelectMenu.setRoleType.description,
                        tr: trLang.setupRegister.activateRoleSelectMenu.setRoleType.description,
                    },
                },
                setRoleContent: {
                    name: {
                        //! en: enLang.setupRegister.activateRoleSelectMenu.setRoleContent.name,
                        tr: trLang.setupRegister.activateRoleSelectMenu.setRoleContent.name,
                    },
                    description: {
                        //! en: enLang.setupRegister.activateRoleSelectMenu.setRoleContent.description,
                        tr: trLang.setupRegister.activateRoleSelectMenu.setRoleContent.description,
                    },
                },
                setMaxChoice: {
                    name: {
                        //! en: enLang.setupRegister.activateRoleSelectMenu.setMaxChoice.name,
                        tr: trLang.setupRegister.activateRoleSelectMenu.setMaxChoice.name,
                    },
                    description: {
                        //! en: enLang.setupRegister.activateRoleSelectMenu.setMaxChoice.description,
                        tr: trLang.setupRegister.activateRoleSelectMenu.setMaxChoice.description,
                    },
                },
                setMinChoice: {
                    name: {
                        //! en: enLang.setupRegister.activateRoleSelectMenu.setMinChoice.name,
                        tr: trLang.setupRegister.activateRoleSelectMenu.setMinChoice.name,
                    },
                    description: {
                        //! en: enLang.setupRegister.activateRoleSelectMenu.setMinChoice.description,
                        tr: trLang.setupRegister.activateRoleSelectMenu.setMinChoice.description,
                    },
                },
                roleDefaultName: {
                    name: {
                        //! en: enLang.setupRegister.activateRoleSelectMenu.roleDefaultName.name,
                        tr: trLang.setupRegister.activateRoleSelectMenu.roleDefaultName.name,
                    },
                    description: {
                        //! en: enLang.setupRegister.activateRoleSelectMenu.roleDefaultName.description,
                        tr: trLang.setupRegister.activateRoleSelectMenu.roleDefaultName.description,
                    },
                },
                setDefaultRole: {
                    name: {
                        //! en: enLang.setupRegister.activateRoleSelectMenu.setDefaultRole.name,
                        tr: trLang.setupRegister.activateRoleSelectMenu.setDefaultRole.name,
                    },
                    description: {
                        //! en: enLang.setupRegister.activateRoleSelectMenu.setDefaultRole.description,
                        tr: trLang.setupRegister.activateRoleSelectMenu.setDefaultRole.description,
                    },
                },
                roleFirstName: {
                    name: {
                        //! en: enLang.setupRegister.activateRoleSelectMenu.roleFirstName.name,
                        tr: trLang.setupRegister.activateRoleSelectMenu.roleFirstName.name,
                    },
                    description: {
                        //! en: enLang.setupRegister.activateRoleSelectMenu.roleFirstName.description,
                        tr: trLang.setupRegister.activateRoleSelectMenu.roleFirstName.description,
                    },
                },
                setFirstRole: {
                    name: {
                        //! en: enLang.setupRegister.activateRoleSelectMenu.setFirstRole.name,
                        tr: trLang.setupRegister.activateRoleSelectMenu.setFirstRole.name,
                    },
                    description: {
                        //! en: enLang.setupRegister.activateRoleSelectMenu.setFirstRole.description,
                        tr: trLang.setupRegister.activateRoleSelectMenu.setFirstRole.description,
                    },
                },
                roleSecondName: {
                    name: {
                        //! en: enLang.setupRegister.activateRoleSelectMenu.roleSecondName.name,
                        tr: trLang.setupRegister.activateRoleSelectMenu.roleSecondName.name,
                    },
                    description: {
                        //! en: enLang.setupRegister.activateRoleSelectMenu.roleSecondName.description,
                        tr: trLang.setupRegister.activateRoleSelectMenu.roleSecondName.description,
                    },
                },
                setSecondRole: {
                    name: {
                        //! en: enLang.setupRegister.activateRoleSelectMenu.setSecondRole.name,
                        tr: trLang.setupRegister.activateRoleSelectMenu.setSecondRole.name,
                    },
                    description: {
                        //! en: enLang.setupRegister.activateRoleSelectMenu.setSecondRole.description,
                        tr: trLang.setupRegister.activateRoleSelectMenu.setSecondRole.description,
                    },
                },
                roleThirdName: {
                    name: {
                        //! en: enLang.setupRegister.activateRoleSelectMenu.roleThirdName.name,
                        tr: trLang.setupRegister.activateRoleSelectMenu.roleThirdName.name,
                    },
                    description: {
                        //! en: enLang.setupRegister.activateRoleSelectMenu.roleThirdName.description,
                        tr: trLang.setupRegister.activateRoleSelectMenu.roleThirdName.description,
                    },
                },
                setThirdRole: {
                    name: {
                        //! en: enLang.setupRegister.activateRoleSelectMenu.setThirdRole.name,
                        tr: trLang.setupRegister.activateRoleSelectMenu.setThirdRole.name,
                    },
                    description: {
                        //! en: enLang.setupRegister.activateRoleSelectMenu.setThirdRole.description,
                        tr: trLang.setupRegister.activateRoleSelectMenu.setThirdRole.description,
                    },
                },
                roleFourthName: {
                    name: {
                        //! en: enLang.setupRegister.activateRoleSelectMenu.roleFourthName.name,
                        tr: trLang.setupRegister.activateRoleSelectMenu.roleFourthName.name,
                    },
                    description: {
                        //! en: enLang.setupRegister.activateRoleSelectMenu.roleFourthName.description,
                        tr: trLang.setupRegister.activateRoleSelectMenu.roleFourthName.description,
                    },
                },
                setFourthRole: {
                    name: {
                        //! en: enLang.setupRegister.activateRoleSelectMenu.setFourthRole.name,
                        tr: trLang.setupRegister.activateRoleSelectMenu.setFourthRole.name,
                    },
                    description: {
                        //! en: enLang.setupRegister.activateRoleSelectMenu.setFourthRole.description,
                        tr: trLang.setupRegister.activateRoleSelectMenu.setFourthRole.description,
                    },
                },
                roleFifthName: {
                    name: {
                        //! en: enLang.setupRegister.activateRoleSelectMenu.roleFifthName.name,
                        tr: trLang.setupRegister.activateRoleSelectMenu.roleFifthName.name,
                    },
                    description: {
                        //! en: enLang.setupRegister.activateRoleSelectMenu.roleFifthName.description,
                        tr: trLang.setupRegister.activateRoleSelectMenu.roleFifthName.description,
                    },
                },
                setFifthRole: {
                    name: {
                        //! en: enLang.setupRegister.activateRoleSelectMenu.setFifthRole.name,
                        tr: trLang.setupRegister.activateRoleSelectMenu.setFifthRole.name,
                    },
                    description: {
                        //! en: enLang.setupRegister.activateRoleSelectMenu.setFifthRole.description,
                        tr: trLang.setupRegister.activateRoleSelectMenu.setFifthRole.description,
                    },
                },
            },
            userInfoButton: {
                name: {
                    //! en: enLang.setupRegister.userInfoButton.name,
                    tr: trLang.setupRegister.userInfoButton.name,
                },
                description: {
                    //! en: enLang.setupRegister.userInfoButton.description,
                    tr: trLang.setupRegister.userInfoButton.description,
                },
            },
        },
        setupLogSystem: {
            name: {
                //! en: enLang.name,
                tr: trLang.name,
            },
            description: {
                //! en: enLang.description,
                tr: trLang.description,
            },
            choiceLogChannels: {
                name: {
                    //! en: enLang.choiceLogChannels.name,
                    tr: trLang.choiceLogChannels.name,
                },
                description: {
                    //! en: enLang.choiceLogChannels.description,
                    tr: trLang.choiceLogChannels.description,
                },
                setCategory: {
                    name: {
                        //! en: enLang.choiceLogChannels.setCategory.name,
                        tr: trLang.choiceLogChannels.setCategory.name,
                    },
                    description: {
                        //! en: enLang.choiceLogChannels.setCategory.description,
                        tr: trLang.choiceLogChannels.setCategory.description,
                    },
                },
                joinLogChannel: {
                    name: {
                        //! en: enLang.choiceLogChannels.joinLogChannel.name,
                        tr: trLang.choiceLogChannels.joinLogChannel.name,
                    },
                    description: {
                        //! en: enLang.choiceLogChannels.joinLogChannel.description,
                        tr: trLang.choiceLogChannels.joinLogChannel.description,
                    },
                },
                leftLogChannel: {
                    name: {
                        //! en: enLang.choiceLogChannels.leftLogChannel.name,
                        tr: trLang.choiceLogChannels.leftLogChannel.name,
                    },
                    description: {
                        //! en: enLang.choiceLogChannels.leftLogChannel.description,
                        tr: trLang.choiceLogChannels.leftLogChannel.description,
                    },
                },
                penaltyLogChannel: {
                    name: {
                        //! en: enLang.choiceLogChannels.penaltyLogChannel.name,
                        tr: trLang.choiceLogChannels.penaltyLogChannel.name,
                    },
                    description: {
                        //! en: enLang.choiceLogChannels.penaltyLogChannel.description,
                        tr: trLang.choiceLogChannels.penaltyLogChannel.description,
                    },
                },
                addsLogChannel: {
                    name: {
                        //! en: enLang.choiceLogChannels.addsLogChannel.name,
                        tr: trLang.choiceLogChannels.addsLogChannel.name,
                    },
                    description: {
                        //! en: enLang.choiceLogChannels.addsLogChannel.description,
                        tr: trLang.choiceLogChannels.addsLogChannel.description,
                    },
                },
                levelLogChannel: {
                    name: {
                        //! en: enLang.choiceLogChannels.levelLogChannel.name,
                        tr: trLang.choiceLogChannels.levelLogChannel.name,
                    },
                    description: {
                        //! en: enLang.choiceLogChannels.levelLogChannel.description,
                        tr: trLang.choiceLogChannels.levelLogChannel.description,
                    },
                },
                messageLogChannel: {
                    name: {
                        //! en: enLang.choiceLogChannels.messageLogChannel.name,
                        tr: trLang.choiceLogChannels.messageLogChannel.name,
                    },
                    description: {
                        //! en: enLang.choiceLogChannels.messageLogChannel.description,
                        tr: trLang.choiceLogChannels.messageLogChannel.description,
                    },
                },
                userLogChannel: {
                    name: {
                        //! en: enLang.choiceLogChannels.userLogChannel.name,
                        tr: trLang.choiceLogChannels.userLogChannel.name,
                    },
                    description: {
                        //! en: enLang.choiceLogChannels.userLogChannel.description,
                        tr: trLang.choiceLogChannels.userLogChannel.description,
                    },
                },
                banLogChannel: {
                    name: {
                        //! en: enLang.choiceLogChannels.banLogChannel.name,
                        tr: trLang.choiceLogChannels.banLogChannel.name,
                    },
                    description: {
                        //! en: enLang.choiceLogChannels.banLogChannel.description,
                        tr: trLang.choiceLogChannels.banLogChannel.description,
                    },
                },
                modLogChannel: {
                    name: {
                        //! en: enLang.choiceLogChannels.modLogChannel.name,
                        tr: trLang.choiceLogChannels.modLogChannel.name,
                    },
                    description: {
                        //! en: enLang.choiceLogChannels.modLogChannel.description,
                        tr: trLang.choiceLogChannels.modLogChannel.description,
                    },
                },
                inviteLogChannel: {
                    name: {
                        //! en: enLang.choiceLogChannels.inviteLogChannel.name,
                        tr: trLang.choiceLogChannels.inviteLogChannel.name,
                    },
                    description: {
                        //! en: enLang.choiceLogChannels.inviteLogChannel.description,
                        tr: trLang.choiceLogChannels.inviteLogChannel.description,
                    },
                },
                voiceChatLogChannel: {
                    name: {
                        //! en: enLang.choiceLogChannels.voiceChatLogChannel.name,
                        tr: trLang.choiceLogChannels.voiceChatLogChannel.name,
                    },
                    description: {
                        //! en: enLang.choiceLogChannels.voiceChatLogChannel.description,
                        tr: trLang.choiceLogChannels.voiceChatLogChannel.description,
                    },
                },
                tagLogChannel: {
                    name: {
                        //! en: enLang.choiceLogChannels.tagLogChannel.name,
                        tr: trLang.choiceLogChannels.tagLogChannel.name,
                    },
                    description: {
                        //! en: enLang.choiceLogChannels.tagLogChannel.description,
                        tr: trLang.choiceLogChannels.tagLogChannel.description,
                    },
                },
                commandLogChannel: {
                    name: {
                        //! en: enLang.choiceLogChannels.commandLogChannel.name,
                        tr: trLang.choiceLogChannels.commandLogChannel.name,
                    },
                    description: {
                        //! en: enLang.choiceLogChannels.commandLogChannel.description,
                        tr: trLang.choiceLogChannels.commandLogChannel.description,
                    },
                },
            },
            setupOneLogChannel: {
                name: {
                    //! en: enLang.setupOneLogChannel.name,
                    tr: trLang.setupOneLogChannel.name,
                },
                description: {
                    //! en: enLang.setupOneLogChannel.description,
                    tr: trLang.setupOneLogChannel.description,
                },
                setCategory: {
                    name: {
                        //! en: enLang.setupOneLogChannel.setCategory.name,
                        tr: trLang.setupOneLogChannel.setCategory.name,
                    },
                    description: {
                        //! en: enLang.setupOneLogChannel.setCategory.description,
                        tr: trLang.setupOneLogChannel.setCategory.description,
                    },
                },
                selectLogChannel: {
                    name: {
                        //! en: enLang.setupOneLogChannel.selectLogChannel.name,
                        tr: trLang.setupOneLogChannel.selectLogChannel.name,
                    },
                    description: {
                        //! en: enLang.setupOneLogChannel.selectLogChannel.description,
                        tr: trLang.setupOneLogChannel.selectLogChannel.description,
                    },
                },
            },
            createLogChannel: {
                name: {
                    //! en: enLang.createLogChannel.name,
                    tr: trLang.createLogChannel.name,
                },
                description: {
                    //! en: enLang.createLogChannel.description,
                    tr: trLang.createLogChannel.description,
                },
            },
            deleteLogChannel: {
                name: {
                    //! en: enLang.deleteLogChannel.name,
                    tr: trLang.deleteLogChannel.name,
                },
                description: {
                    //! en: enLang.deleteLogChannel.description,
                    tr: trLang.deleteLogChannel.description,
                },
            },
        },
        welcomeConfigLocalization: {
            name: {
                //! en: enLang.welcomeConfig.name,
                tr: trLang.welcomeConfig.name,
            },
            description: {
                //! en: enLang.welcomeConfig.description,
                tr: trLang.welcomeConfig.description,
            },
            enable: {
                name: {
                    //! en: enLang.welcomeConfig.enable.name,
                    tr: trLang.welcomeConfig.enable.name,
                },
                description: {
                    //! en: enLang.welcomeConfig.enable.description,
                    tr: trLang.welcomeConfig.enable.description,
                },
                welcomeChannel: {
                    name: {
                        //! en: enLang.welcomeConfig.enable.welcomeChannel.name,
                        tr: trLang.welcomeConfig.enable.welcomeChannel.name,
                    },
                    description: {
                        //! en: enLang.welcomeConfig.enable.welcomeChannel.description,
                        tr: trLang.welcomeConfig.enable.welcomeChannel.description,
                    },
                },
                registerChannel: {
                    name: {
                        //! en: enLang.welcomeConfig.enable.registerChannel.name,
                        tr: trLang.welcomeConfig.enable.registerChannel.name,
                    },
                    description: {
                        //! en: enLang.welcomeConfig.enable.registerChannel.description,
                        tr: trLang.welcomeConfig.enable.registerChannel.description,
                    },
                },
            },
            disable: {
                name: {
                    //! en: enLang.welcomeConfig.disable.name,
                    tr: trLang.welcomeConfig.disable.name,
                },
                description: {
                    //! en: enLang.welcomeConfig.disable.description,
                    tr: trLang.welcomeConfig.disable.description,
                },
            },
        },
        ticketSystem: {
            name: {
                //! en: enLang.ticketSetup.name,
                tr: trLang.ticketSetup.name,
            },
            description: {
                //! en: enLang.ticketSetup.description,
                tr: trLang.ticketSetup.description,
            },
            enable: {
                name: {
                    //! en: enLang.ticketSetup.enable.name,
                    tr: trLang.ticketSetup.enable.name,
                },
                description: {
                    //! en: enLang.ticketSetup.enable.description,
                    tr: trLang.ticketSetup.enable.description,
                },
                staffRole: {
                    name: {
                        //! en: enLang.ticketSetup.enable.staffRole.name,
                        tr: trLang.ticketSetup.enable.staffRole.name,
                    },
                    description: {
                        //! en: enLang.ticketSetup.enable.staffRole.description,
                        tr: trLang.ticketSetup.enable.staffRole.description,
                    },
                },
            },
            disable: {
                name: {
                    //! en: enLang.ticketSetup.disable.name,
                    tr: trLang.ticketSetup.disable.name,
                },
                description: {
                    //! en: enLang.ticketSetup.disable.description,
                    tr: trLang.ticketSetup.disable.description,
                },
            },
        },
        autoroleConfigure: {
            name: {
                //! en: enLang.autoroleConfigure.name,
                tr: trLang.autoroleConfigure.name,
            },
            description: {
                //! en: enLang.autoroleConfigure.description,
                tr: trLang.autoroleConfigure.description,
            },
            enable: {
                name: {
                    //! en: enLang.autoroleConfigure.enable.name,
                    tr: trLang.autoroleConfigure.enable.name,
                },
                description: {
                    //! en: enLang.autoroleConfigure.enable.description,
                    tr: trLang.autoroleConfigure.enable.description,
                },
                role: {
                    name: {
                        //! en: enLang.autoroleConfigure.enable.role.name,
                        tr: trLang.autoroleConfigure.enable.role.name,
                    },
                    description: {
                        //! en: enLang.autoroleConfigure.enable.role.description,
                        tr: trLang.autoroleConfigure.enable.role.description,
                    },
                },
            },
            disable: {
                name: {
                    //! en: enLang.autoroleConfigure.disable.name,
                    tr: trLang.autoroleConfigure.disable.name,
                },
                description: {
                    //! en: enLang.autoroleConfigure.disable.description,
                    tr: trLang.autoroleConfigure.disable.description,
                },
            },
        },
        giveawaySetup: {
            name: {
                //! en: enLang.giveawaySetup.name,
                tr: trLang.giveawaySetup.name,
            },
            description: {
                //! en: enLang.giveawaySetup.description,
                tr: trLang.giveawaySetup.description,
            },
            enable: {
                name: {
                    //! en: enLang.giveawaySetup.enable.name,
                    tr: trLang.giveawaySetup.enable.name,
                },
                description: {
                    //! en: enLang.giveawaySetup.enable.description,
                    tr: trLang.giveawaySetup.enable.description,
                },
            },
            disable: {
                name: {
                    //! en: enLang.giveawaySetup.disable.name,
                    tr: trLang.giveawaySetup.disable.name,
                },
                description: {
                    //! en: enLang.giveawaySetup.disable.description,
                    tr: trLang.giveawaySetup.disable.description,
                },
            },
        }
    }
    return setSystem;

}
module.exports = {
    chatGuard,
    game,
    info,
    levelSystem,
    modareteSystem,
    musicSystem,
    setSystem
}