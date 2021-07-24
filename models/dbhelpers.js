const db = require('../data/dbConfig');

module.exports = {
    addIPSource,
    findIPSourceByID,
    findIPSourceByName,
    getAllIPSource,
    removeIPSource,
    modifyIPSource
}

//add
async function addIPSource(neoSource) {
    neoSource.sourceid = Date.now();
    // const [sourceID] = await db("ipsource").insert(neoSource);
    // return neoSource;
    return await db('ipsource').insert(neoSource, ['sourceid', 'sourcename']);
}

//delete
async function removeIPSource(key) {
    return await db("ipsource")
        .where({sourceid: key}).first()
        .del();
}

//find
async function getAllIPSource() {
    return await db("ipsource");
}

//findbyID
async function findIPSourceByID(key) {
    key = parseInt(key);
    return await db("ipsource")
        .where({sourceid: key})
        .first();
}

async function findIPSourceByName(key) {
    return await db("ipsource")
        .where({sourcename: key})
        .first();
}

//update
async function modifyIPSource(key, changes) {
    key = parseInt(key);
    console.log(changes);
    return await db("ipsource")
        .where({sourceid: key})
        .update(changes)
        .then(() => {
            return findIPSourceByID(key);
        })
}