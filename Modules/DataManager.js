const mysql = require(`mysql2`);
const {LOG, toString, red} = require(`../Util.js`);

mysql.connection = false;
mysql.setConnection = function(){
    mysql.connection = mysql.createConnection({host: global.Settings.MySQL_Host,user: global.Settings.MySQL_User,database: global.Settings.MySQL_Database,password: global.Settings.MySQL_Password});

    mysql.connection.connect((error)=>{
        if(error) {
            LOG("DataManager:Error", `${error.code}: ${error.message}`); // 'ER_BAD_DB_ERROR'
            mysql.connection.destroy();
            setTimeout(() => {
                mysql.setConnection();
            }, 1000);
        }
        else {
            LOG(`MySQL`,`Connected to ${global.Settings.MySQL_Host}:${global.Settings.MySQL_User}`);
            
            mysql.connection.on('error', function(err) {
                LOG("MySQL:Error", `${err.code}: ${err.message}`); // 'ER_BAD_DB_ERROR'
                mysql.connection.destroy();
                setTimeout(() => {
                    mysql.setConnection();
                }, 1000);
            });
        }
    });

    mysql.lastPing = 0;

    mysql.list = [];

    mysql.request = function(query,log=true){
        return new Promise((res, rej)=>{
            let start = new Date().getTime();
            mysql.list.push({time: new Date().toLocaleTimeString(), query: query})
            mysql.connection.query(query, (error, result)=>{
                if(error) {
                    LOG(`MySQL:ERROR:${error.code}`,`${red(query)}`);
                    Discord.channel(`806969507054354472`).send(`<@282816403721945088> \`\`\`${error.code} / ${query}\`\`\``)
                    rej();
                } else {
                    mysql.lastPing = new Date().getTime()-start;
                    if(log) LOG(`MySQL:request`, `${query}:${mysql.lastPing}ms`)
                    res(result);
                }
            })
        })
    }
}

mysql.setConnection();

exports.request = mysql.request;

/**
 * @param {String} table - table name
 * @param {Object?} rule - {ID: "<ID>"}
 * @returns {Promise}
 */
exports.select = function(table, rule) {
    if(rule==null) return mysql.request(`select * from ${table}`)
    else return mysql.request(`select * from ${table} where ${typeof(rule)=='string'?rule:tableToString(rule)}`)
}

/**
 * @param {String} table - table name
 * @param {Object} data - {ID: "<ID>"}
 * @returns {Promise}
 */
exports.insert = function(table, data) {
    let indexes = [];
    for(let i in data) indexes.push(`\`${i}\``);
    indexes=indexes.join(',')
    let values = [];
    for(let i in data) {
        let d = data[i];
        let t = typeof(d)
        values.push(t==='object'?`'${toString(d)}'`:t==="string"?`'${d}'`:d);
    }
    values=values.join(',')
    return mysql.request(`insert into ${table} (${indexes}) values (${values})`);
}

/**
 * @param {String} table - table name
 * @param {Object} data - {ID: "<ID>"}
 * @param {Object} rule - {ID: "<ID>"}
 * @returns {Promise}
 */
exports.update = function(table, data, rule) {
    let x = [];
    for(let idx in data) {
        let d = data[idx];
        let t = typeof(d)
        x.push(`\`${idx}\` = ${t==="string"?`'${d}'`:t==='object'?`'${toString(d)}'`:d}`)
    }
    return mysql.request(`update ${table} set ${x.join(',')} where ${rule}`);
}

/**
 * @param {Object} object
 * @returns {string}
 */
function tableToString(object) {
    let values = [];
    for(let i in object) {
        let d = object[i];
        let t = typeof(d)
        values.push(`${i} = ${t==="string"?`'${d}'`:d}`);
    }
    return values.join(' and ')
}