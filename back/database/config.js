const Story = require("../modeles/story")
const Choice = require('../modeles/choice')
const Scenario = require('../modeles/scenario')
const Unicorn = require("../modeles/unicorn")
const User = require('../modeles/user')
const bcrypt = require('bcrypt')
require('dotenv').config()


const launch = async()=>{

    await Story.sync({force: true})
    await Scenario.sync({force: true})
    await Choice.sync({force: true})
    await Unicorn.sync({force: true})
    await User.sync({force: true})

    await User.create({
        username: process.env.USER_USERNAME,
        password: await bcrypt.hash(process.env.USER_PASSWORD, 10),
        email: process.env.USER_EMAIL,
    })

    await Story.create({
        title: "Le Secret de la Forêt Oubliée",
    })

    await Scenario.create({
        title: "L'Entrée de la Forêt",
        description: "Tu es à l'orée de la Forêt Oubliée. Devant toi, les arbres semblent anciens, leurs racines tordues comme des serpents pétrifiés. Le chemin est peu visible à travers la brume, mais tu devines trois directions possibles.",
        difficulty: 1,
        storyId: 1
    })

    await Scenario.create({
        title: "La découverte",
        description: "Tu es dans la cabane avec l'ancien livre. Il contient une énigme que tu dois résoudre pour obtenir des informations sur l'emplacement du trésor.",
        difficulty: 2,
        storyId: 1
    })

    await Scenario.create({
        title: "La découverte",
        description: "Tu es maintenant face à la créature gardienne. Elle te demande de prouver ta valeur.",
        difficulty: 2,
        storyId: 1
    })
    
    await Scenario.create({
        title: "La découverte",
        description: "Tu es dans une crypte souterraine. Elle est remplie de coffres anciens, mais aussi de pièges mortels",
        difficulty: 2,
        storyId: 1
    })

    await Scenario.create({
        title: "La fin du voyage",
        description: "Tu te diriges vers l'emplacement du trésor. Mais il y a un dernier gardien qui te barre la route, un ancien esprit.",
        difficulty: 3,
        storyId: 1
    })

    await Scenario.create({
        title: "La fin du voyage",
        description: "Tu arrives dans une clairière cachée où le trésor semble enterré sous un arbre ancien.",
        difficulty: 3,
        storyId: 1
    })

    await Scenario.create({
        title: "La fin du voyage",
        description: "Tu fais face à un choix difficile : l'esprit du trésor t'offre de choisir entre deux chemins.",
        difficulty: 3,
        storyId: 1
    })

    await Scenario.create({
        title: "La fin du voyage",
        description: "Le couloir est étroit, éclairé par des cristaux lumineux incrustés dans les murs. Après quelques minutes de marche, tu arrives dans une immense salle souterraine. Au centre de cette pièce se trouve un piédestal ancien, sur lequel repose un artefact mystérieux en forme de sphère, scintillant faiblement dans l'obscurité. Mais avant que tu puisses t'en approcher, trois chemins s'ouvrent devant toi. Chaque chemin semble mener à un destin différent.",
        difficulty: 3,
        storyId: 1
    })

    await Choice.create({
        title: "Prendre le chemin de droite, éclairé par une lumière pâle.",
        consequence: "Tu arrives devant une vieille cabane abandonnée. À l'intérieur, tu trouves un livre ancien qui pourrait contenir des indices sur le trésor. Mais le livre semble vivant. En l'ouvrant, une aura sombre t'enveloppe et aspire ton âme. Tu tombes raide mort, victime d'une malédiction ancienne.",
        nextScenarId: 2,
        scenarId: 1
    })

    await Choice.create({
        title: "Prendre le chemin central, couvert de fougères épaisses.",
        consequence: "Tu te retrouves face à une énorme créature gardienne qui te barre la route. Si tu fais un mauvais choix, elle te dévorera sur place.",
        nextScenarId: 3,
        scenarId: 1
    })

    await Choice.create({
        title: "Prendre le chemin de gauche, où la brume est la plus dense.",
        consequence: "Tu tombes dans une fosse cachée. Si tu ne réagis pas rapidement, les murs se referment lentement et tu meurs écrasé par les pièges de la forêt.",
        nextScenarId: 4,
        scenarId: 1
    })

    await Choice.create({
        title: "Résoudre l'énigme en choisissant le mot 'Soleil.'",
        consequence: "Tu tombes dans une fosse cachée. Si tu ne réagis pas rapidement, les murs se referment lentement et tu meurs écrasé par les pièges de la forêt.",
        nextScenarId: 5,
        scenarId: 2
    })

    await Choice.create({
        title: "Résoudre l'énigme en choisissant le mot 'Lune.'",
        consequence: "Tu as débloqué un piège ! La cabane commence à s'effondrer et tu es écrasé sous les décombres.",
        statImpact: {"hp":-10},
        scenarId: 2
    })

    await Choice.create({
        title: "Résoudre l'énigme en choisissant le mot 'Étoile.'",
        consequence: "Le livre se transforme en poussière, mais derrière l'étagère, une porte secrète s'ouvre.",
        nextScenarId: 8,
        scenarId: 2
    })

    await Choice.create({
        title: "Combattre la créature.",
        consequence: "Le combat est acharné. Mais tu fais une erreur et la créature t'écrase dans ses griffes, te laissant mortellement blessé.",
        statImpact: {"hp":-10},
        scenarId: 3
    })

    await Choice.create({
        title: "Offrir un objet précieux à la créature.",
        consequence: "La créature accepte ton offrande et te guide vers un passage secret.",
        nextScenarId: 6,
        scenarId: 3
    })

    await Choice.create({
        title: "Essayer de discuter avec la créature pour la convaincre.",
        consequence: "La créature, méprisant tes paroles, t'attaque et te tue sans pitié.",
        statImpact: {"hp":-10},
        scenarId: 3
    })

    await Choice.create({
        title: "Ouvrir le coffre au centre de la crypte.",
        consequence: "Le coffre contenait une malédiction : une nuée de serpents venimeux en sort et te mord à plusieurs reprises. Le poison t’emporte rapidement.",
        statImpact: {"hp":-10},
        scenarId: 4
    })

    await Choice.create({
        title: "Examiner les murs de la crypte à la recherche de symboles.",
        consequence: "Tu trouves un message gravé dans la pierre indiquant une sortie secrète vers le trésor.",
        nextScenarId: 7,
        scenarId: 4
    })

    await Choice.create({
        title: "Essayer d'utiliser la carte comme une clé pour déverrouiller l'accès au trésor.",
        consequence: "Le gardien disparaît et te laisse entrer, révélant un trésor d'une valeur inestimable.",
        scenarId: 5
    })

    await Choice.create({
        title: "Tenter de parler à l'esprit pour qu'il te laisse passer.",
        consequence: "L'esprit te donne un dernier test à résoudre. Tu échoues, et il te maudit, te tuant instantanément.",
        statImpact: {"hp":-10},
        scenarId: 5
    })

    await Choice.create({
        title: "Creuser sous l'arbre pour trouver le trésor.",
        consequence: " Tu trouves un coffre rempli de joyaux et d'or.",
        scenarId: 6
    })

    await Choice.create({
        title: "Examiner l'arbre pour trouver un autre indice.",
        consequence: "Tu trouves un symbole ancien qui t'ouvre un portail vers un autre monde, mais en le traversant, tu te retrouves perdu pour toujours dans un néant sans fin. Mortel.",
        statImpact: {"hp":-10},
        scenarId: 6
    })

    await Choice.create({
        title: "Prendre le trésor, mais rester prisonnier dans la crypte pour l'éternité.",
        consequence: "Tu deviens le nouveau gardien du trésor, immortel mais condamné à errer pour toujours dans les ténèbres.",
        statImpact: {"hp":-10},
        scenarId: 7
    })

    await Choice.create({
        title: "Renoncer au trésor et regagner ta liberté.",
        consequence: "Tu quittes la crypte, mais tu gagnes la sagesse éternelle et une protection spirituelle.",
        scenarId: 7
    })

    await Choice.create({
        title: "Prendre le chemin de droite, où tu entends un bruit d'eau ruisselante.",
        consequence: "Tu avances vers le bruit de l'eau, mais en atteignant une rivière souterraine, tu réalises trop tard qu'elle est infestée de créatures venimeuses. Elles t'attaquent sans pitié, et tu succombes rapidement à leurs morsures. La mort t'attendait dans l'ombre.",
        statImpact: {"hp":-10},
        scenarId: 8
    })
    
    await Choice.create({
        title: "Prendre le chemin central, le plus obscur et inquiétant, mais où tu sens une force mystérieuse t'attirer.",
        consequence: "Tu continues sur ce chemin, malgré ton instinct te disant de faire demi-tour. Tu arrives dans une salle où des statues anciennes semblent te fixer. Lorsque tu t'approches, les statues s'animent. Tu te rends compte trop tard qu'elles sont en réalité des gardiens maudits, et avant de pouvoir réagir, tu es pétrifié sur place. Ton aventure s’arrête ici, figé dans la pierre pour l’éternité.",
        statImpact: {"hp":-10},
        scenarId: 8
    })

    await Choice.create({
        title: "Prendre le chemin de gauche, où tu vois des inscriptions anciennes gravées sur les murs.",
        consequence: "En suivant ce chemin, tu déchiffres peu à peu les inscriptions, qui te racontent l'histoire d'un ancien roi ayant cherché à maîtriser les étoiles. À la fin du chemin, tu arrives devant une porte en pierre scellée. En la touchant avec l'artefact, la porte s'ouvre et te mène vers la salle du trésor caché de ce roi ancien.",
        scenarId: 8
    })
}


launch()