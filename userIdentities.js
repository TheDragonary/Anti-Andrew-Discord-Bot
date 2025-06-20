const users = [
    {
        id: '1181721653634420767',
        usernames: ['thedragonary', 'dragonary'],
        displayName: 'Dragonary',
        isCreator: true,
        isGod: true,
        traits: ['male', 'creator of andrew bot', 'creator of anti-andrew', 'british', 'likes games', 'likes anime', 'likes cars', 'likes cats', 'is a furry'],
    },
    {
        id: '956743571980038174',
        usernames: ['spookeddoor', 'spooked'],
        displayName: 'SpookedDoor',
        isCreator: true,
        isGod: true,
        traits: ['male', 'creator of andrew bot', 'creator of anti-andrew', 'american', 'likes games', 'likes persona', 'likes when they cry series (higurashi/umineko)', 'likes tea', 'draws'],
    },
    {
        id: '1208629217890148363',
        usernames: ['hellbeyv2', 'hellbey'],
        displayName: 'Hellbey',
        isGod: true,
        traits: ['male', 'american'],
    },
    {
        id: '545586677117353985',
        usernames: ['sillyh.', 'trinke'],
        displayName: 'Trinke',
        isGod: true,
        traits: ['male', 'lithuanian'],
    },
    {
        id: '197487122041667584',
        usernames: ['nonamebadass', 'poncho'],
        displayName: 'Poncho',
        isGod: true,
        traits: ['male', 'degenerate', 'american'],
    },
    {
        id: '1047876190809116752',
        usernames: ['moonmanv2', 'moon man', 'moonman', 'moonie', 'femoon'],
        displayName: 'Moon Man',
        traits: ['male', 'brazilian', 'only plays paradox games, map games like HOI4, EU4 and CK3', 'likes anime', 'likes lolis', 'old', 'lawyer'],
    },
    {
        id: '559520799829000203',
        usernames: ['marv_mari', 'brit'],
        displayName: 'Brit',
        isGod: true,
        traits: ['female', 'american', 'russian', 'futanari', 'married to real Tomoko', 'draws', 'likes vocaloid', 'likes miku'],
    },
    {
        id: '689829347443605768',
        usernames: ['edenlance', 'peanut', 'penut'],
        displayName: 'Penut',
        traits: ['female', 'american', 'likes games', 'likes anime', 'likes cats'],
    },
    {
        id: null,
        usernames: ['nagiro.', 'ghostto', 'nagito', 'nigito'],
        displayName: 'Ghostto',
        traits: ['male', 'degenerate', 'american', 'goons all the time', 'never plays L4D2 with Dragonary and SpookedDoor because he is busy gooning'],
    },
    {
        id: '776931705813860363',
        usernames: ['meeperthe1', 'meeper'],
        displayName: 'Meeper',
        traits: ['male', 'american', 'likes warhammer']
    },
    {
        id: '1014404029146726460',
        usernames: ['andrew143256', 'andrew', 'fish 27', 'fishdrew', 'fish27'],
        displayName: 'Fish27',
        traits: ['the real andrew', 'the person who andrew bot is based on'],
    },
    {
        id: '1068548654987755672',
        usernames: ['mafic igneous rock', 'mafic_igneous_rock', 'mafic', 'femboy'],
        displayName: 'Femboy',
        traits: ['male', 'finnish', 'likes games']
    },
    {
        id: '1357616229694705796',
        usernames: ['andrew-bot', 'andrew'],
        displayName: 'Andrew',
        traits: ['valenzuelan', 'unintelligent', 'loves tomoko', 'loves kanye', 'loves griffith', 
        'loves ronald reagan', 'loves trump', 'loves mussolini', 'loves nick fuentes', 'loves ksi', 
        'loves shuckle', 'loves miku', 'loves cirno', 'loves nukes', 'loves lain', 'retarded',],
    },
    {
        id: '1358133237855293533',
        usernames: ['Anti-Andrew'],
        displayName: 'Anti-Andrew',
        traits: ['enemy of Andrew']
    }
];

async function findUserIdentity({ id = null, name = '', guild = null }) {
    const normalised = (name ? name.toLowerCase().trim() : '');

    let user = users.find(user =>
        (id && user.id === id) ||
        user.usernames.some(u => u.toLowerCase() === normalised)
    );

    if (user) return user;

    if (guild) {
        if (!guild.members.cache.size) {
            await guild.members.fetch();
        }

        const member = guild.members.cache.find(
            m =>
                m.user.username.toLowerCase() === normalised ||
                m.displayName.toLowerCase() === normalised
        );

        if (member) {
            return {
                displayName: member.displayName,
                usernames: [member.user.username],
                traits: [],
                note: `This is a person in the server.`,
                id: member.id
            };
        }
    }
}

module.exports = {
    users,
    findUserIdentity,
};
