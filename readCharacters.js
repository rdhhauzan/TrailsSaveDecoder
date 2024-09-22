const fs = require('fs');

// Character ID mapping
const characterIdMap = {
    0: "Rean",
    1: "Alisa",
    2: "Elliot",
    3: "Laura",
    4: "Machias",
    5: "Emma",
    6: "Jusis",
    7: "Fie",
    8: "Gaius",
    9: "Millium",
    10: "Crow",
    11: "Sara",
    12: "Anjelica",
    65535: "None"
};

function readDatFile(filePath) {
    const buffer = fs.readFileSync(filePath);

    const charactersOffset = 0x480; // Characters block starts at offset 0x480
    const characterStride = 80; // Each character block is 80 bytes
    const numberOfCharacters = 12; // There are 12 characters in total

    const characters = [];

    for (let i = 0; i < numberOfCharacters; i++) {
        const characterOffset = charactersOffset + i * characterStride;
        const characterId = buffer.readUInt16LE(characterOffset);

        // Get the character level (36 bytes into the character block)
        const levelOffset = characterOffset + 36;
        const characterLevel = buffer.readUInt16LE(levelOffset); // Level is a 2-byte short

        // Get the character Max HP (4 bytes into the character block)
        const maxHPOffset = characterOffset + 4;
        const characterMaxHP = buffer.readUInt16LE(maxHPOffset);

        // 

        // Map character name
        const characterName = characterIdMap[i];

        characters.push({
            id: characterId,
            name: characterName,
            level: characterLevel,
            maxHP: characterMaxHP
        });
    }

    return characters;
}

// Usage example:
const filePath = './save007.dat'; // Replace with your actual file path
const characters = readDatFile(filePath);

console.log(characters);

