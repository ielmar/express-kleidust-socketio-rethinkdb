var r = require('rethinkdb')
  , slug = require('slug')
  , util = require('util')
  , assert = require('assert')
  , logdebug = require('debug')('rdb:debug')
  , logerror = require('debug')('rdb:error');


var dbConfig = {
    host: '46.101.234.33',
    port: '28015',
    db: 'qafqazinfo'
};

module.exports.getCats = function(callback) {
    onConnect(function(err, connection){
        r.db(dbConfig.db).table('category').filter({'enabled': 1, 'is_menu': 1}).pluck(['title','id']).orderBy(r.asc('id')).run(connection, function(err, cursor) {
      if(err) {
        logerror("[ERROR][%s][findMessages] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
        callback(null, []);
        connection.close();
      }
      else {
/*
        var results = [];
        cursor.each(function(err, row){
                if(err) throw err;
                results.push(row);
           }, function(err, results){
                if(err) throw err;
                callback(null, results);
                connection.close();
           }
        );
*/
        cursor.toArray(function(err, results) {
          if(err) {
            logerror("[ERROR][%s][findMessages][toArray] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
            callback(null, []);
          }
          else {
            callback(null, results);
          }
          connection.close();
        });
      }
    });
    });
};

module.exports.getBreakingNews = function(callback) {
    onConnect(function(err, connection){
        r.db(dbConfig.db).table('news').filter({'enabled': 1,'is_important':1}).filter(function(newsItem){
                return newsItem("news_date").lt(Date());
        }).pluck(['title','title_extra','news_img','news_date','id']).orderBy(r.desc('news_date')).limit(4).run(connection, function(err, cursor) {
      if(err) {
        logerror("[ERROR][%s][findMessages] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
        callback(null, []);
        connection.close();
      } 
      else {
        cursor.toArray(function(err, results) {
          if(err) {
            logerror("[ERROR][%s][findMessages][toArray] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
            callback(null, []);
          }
          else {
            callback(null, results);
          }
          connection.close();
        });
      }   
    });
    });
};  

module.exports.getLastNews1 = function(callback) {
    onConnect(function(err, connection){
        r.db(dbConfig.db).table('news').filter({'enabled':1}).filter(function(newsItem){
                return newsItem("news_date").lt(Date());
        }).pluck(['title','title_extra','news_date','id']).orderBy(r.desc('news_date')).limit(14).run(connection, function(err, cursor) {
      if(err) {
        logerror("[ERROR][%s][findMessages] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
        callback(null, []);
        connection.close();
      } 
      else {
        cursor.toArray(function(err, results) {
          if(err) {
            logerror("[ERROR][%s][findMessages][toArray] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
            callback(null, []);
          } 
          else {
            callback(null, results);
          } 
          connection.close();
        });
      } 
    });
    });
};

module.exports.getLastNews2 = function(callback) {
    onConnect(function(err, connection){
        r.db(dbConfig.db).table('news').filter({'enabled':1}).filter(function(newsItem){
                return newsItem("news_date").lt(Date());
        }).pluck(['title','title_extra','news_date','id']).orderBy(r.desc('news_date')).skip(14).limit(69).run(connection, function(err, cursor) {
      if(err) {
        logerror("[ERROR][%s][findMessages] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
        callback(null, []);
        connection.close();
      } 
      else {
        cursor.toArray(function(err, results) {
          if(err) {
            logerror("[ERROR][%s][findMessages][toArray] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
            callback(null, []);
          } 
          else {
            callback(null, results);
          } 
          connection.close();
        });
      } 
    });
    });
}; 

module.exports.getManset = function(callback) {
    onConnect(function(err, connection){
        r.db(dbConfig.db).table('news').filter({'is_manshet':1,'enabled':1}).filter(function(newsItem){
                return newsItem("news_date").lt(Date());
        }).limit(6).orderBy(r.desc('news_date')).run(connection, function(err, cursor) {
      if(err) {
        logerror("[ERROR][%s][findMessages] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
        callback(null, []);
        connection.close();
      } 
      else {
        cursor.toArray(function(err, results) {
          if(err) {
            logerror("[ERROR][%s][findMessages][toArray] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
            callback(null, []);
          } 
          else {
            callback(null, results);
          } 
          connection.close();
        });
      } 
    });
    });
};

module.exports.getCategoryXeber = function(callback) {
    onConnect(function(err, connection){
        r.db(dbConfig.db).table('news').filter({'category_id':1,'enabled':1}).filter(function(newsItem){
                return newsItem("news_date").lt(Date());
        }).orderBy(r.desc('news_date')).limit(4).run(connection, function(err, cursor) {
      if(err) {
        logerror("[ERROR][%s][findMessages] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
        callback(null, []);
        connection.close();
      } 
      else {
        cursor.toArray(function(err, results) {
          if(err) {
            logerror("[ERROR][%s][findMessages][toArray] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
            callback(null, []);
          } 
          else {
            callback(null, results);
          } 
          connection.close();
        });
      } 
    });
    });
};

module.exports.getTribuna = function(callback) {
    onConnect(function(err, connection){
        r.db(dbConfig.db).table('news').filter({'is_kose':1,'enabled': 1}).filter(function(newsItem){
                return newsItem("news_date").lt(Date());
        }).orderBy(r.desc('news_date')).limit(6).run(connection, function(err, cursor) {
      if(err) {
        logerror("[ERROR][%s][findMessages] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
        callback(null, []);
        connection.close();
      } 
      else {
        cursor.toArray(function(err, results) {
          if(err) {
            logerror("[ERROR][%s][findMessages][toArray] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
            callback(null, []);
          } 
          else {
            callback(null, results);
          } 
          connection.close();
        });
      } 
    });
    });
};

module.exports.getHadise = function(callback) {
    onConnect(function(err, connection){
        r.db(dbConfig.db).table('news').filter({'is_hadise':1,'enabled':1}).filter(function(newsItem){
                return newsItem("news_date").lt(Date());
        }).orderBy(r.desc('news_date')).limit(3).run(connection, function(err, cursor) {
      if(err) {
        logerror("[ERROR][%s][findMessages] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
        callback(null, []);
        connection.close();
      } 
      else {
        cursor.toArray(function(err, results) {
          if(err) {
            logerror("[ERROR][%s][findMessages][toArray] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
            callback(null, []);
          } 
          else {
            callback(null, results);
          } 
          connection.close();
        });
      } 
    });
    });
};

module.exports.getCategorySiyaset = function(callback) {
    onConnect(function(err, connection){
        r.db(dbConfig.db).table('news').filter({'category_id':2,'enabled':1}).filter(function(newsItem){
                return newsItem("news_date").lt(Date());
        }).limit(4).orderBy(r.desc('news_date')).run(connection, function(err, cursor) {
      if(err) {
        logerror("[ERROR][%s][findMessages] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
        callback(null, []);
        connection.close();
      } 
      else {
        cursor.toArray(function(err, results) {
          if(err) {
            logerror("[ERROR][%s][findMessages][toArray] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
            callback(null, []);
          } 
          else {
            callback(null, results);
          } 
          connection.close();
        });
      } 
    });
    });
};

module.exports.getFotosessiya = function(callback) {
    onConnect(function(err, connection){
        r.db(dbConfig.db).table('news').filter({'category_id':11,'enabled':1}).filter(function(newsItem){
                return newsItem("news_date").lt(Date());
        }).orderBy(r.desc('news_date')).limit(8).run(connection, function(err, cursor) {
      if(err) {
        logerror("[ERROR][%s][findMessages] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
        callback(null, []);
        connection.close();
      } 
      else {
        cursor.toArray(function(err, results) {
          if(err) {
            logerror("[ERROR][%s][findMessages][toArray] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
            callback(null, []);
          } 
          else {
            callback(null, results);
          } 
          connection.close();
        });
      } 
    });
    });
};

module.exports.getQadin = function(callback) {
    onConnect(function(err, connection){
        r.db(dbConfig.db).table('news').filter({'is_qadin':1,'enabled':1}).filter(function(newsItem){
                return newsItem("news_date").lt(Date());
        }).orderBy(r.desc('news_date')).limit(3).run(connection, function(err, cursor) {
      if(err) {
        logerror("[ERROR][%s][findMessages] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
        callback(null, []);
        connection.close();
      } 
      else {
        cursor.toArray(function(err, results) {
          if(err) {
            logerror("[ERROR][%s][findMessages][toArray] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
            callback(null, []);
          } 
          else {
            callback(null, results);
          } 
          connection.close();
        });
      } 
    });
    });
};

module.exports.getBizdenSize = function(callback) {
    onConnect(function(err, connection){
        r.db(dbConfig.db).table('news').filter({'is_bizdensize':1,'enabled':1}).filter(function(newsItem){
                return newsItem("news_date").lt(Date());
        }).orderBy(r.desc('news_date')).limit(3).run(connection, function(err, cursor) {
      if(err) {
        logerror("[ERROR][%s][findMessages] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
        callback(null, []);
        connection.close();
      } 
      else {
        cursor.toArray(function(err, results) {
          if(err) {
            logerror("[ERROR][%s][findMessages][toArray] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
            callback(null, []);
          } 
          else {
            callback(null, results);
          } 
          connection.close();
        });
      } 
    });
    });
};

module.exports.getShou = function(callback) {
    onConnect(function(err, connection){
        r.db(dbConfig.db).table('news').filter({'category_id':20,'enabled':1}).filter(function(newsItem){
                return newsItem("news_date").lt(Date());
        }).orderBy(r.desc('news_date')).limit(4).run(connection, function(err, cursor) {
      if(err) {
        logerror("[ERROR][%s][findMessages] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
        callback(null, []);
        connection.close();
      } 
      else {
        cursor.toArray(function(err, results) {
          if(err) {
            logerror("[ERROR][%s][findMessages][toArray] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
            callback(null, []);
          } 
          else {
            callback(null, results);
          } 
          connection.close();
        });
      } 
    });
    });
};

module.exports.getSosial = function(callback) {
    onConnect(function(err, connection){
        r.db(dbConfig.db).table('news').filter({'category_id':3,'enabled':1}).filter(function(newsItem){
                return newsItem("news_date").lt(Date());
        }).orderBy(r.desc('news_date')).limit(4).run(connection, function(err, cursor) {
      if(err) {
        logerror("[ERROR][%s][findMessages] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
        callback(null, []);
        connection.close();
      } 
      else {
        cursor.toArray(function(err, results) {
          if(err) {
            logerror("[ERROR][%s][findMessages][toArray] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
            callback(null, []);
          } 
          else {
            callback(null, results);
          } 
          connection.close();
        });
      } 
    });
    });
};

module.exports.getMusahibe = function(callback) {
    onConnect(function(err, connection){
        r.db(dbConfig.db).table('news').filter({'is_musahibe':1,'enabled':1}).filter(function(newsItem){
                return newsItem("news_date").lt(Date());
        }).orderBy(r.desc('news_date')).limit(3).run(connection, function(err, cursor) {
      if(err) {
        logerror("[ERROR][%s][findMessages] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
        callback(null, []);
        connection.close();
      } 
      else {
        cursor.toArray(function(err, results) {
          if(err) {
            logerror("[ERROR][%s][findMessages][toArray] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
            callback(null, []);
          } 
          else {
            callback(null, results);
          } 
          connection.close();
        });
      } 
    });
    });
};

module.exports.getKitabevi = function(callback) {
    onConnect(function(err, connection){
        r.db(dbConfig.db).table('news').filter({'is_kitabevi':1,'enabled':1}).filter(function(newsItem){
                return newsItem("news_date").lt(Date());
        }).orderBy(r.desc('news_date')).limit(3).run(connection, function(err, cursor) {
      if(err) {
        logerror("[ERROR][%s][findMessages] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
        callback(null, []);
        connection.close();
      } 
      else {
        cursor.toArray(function(err, results) {
          if(err) {
            logerror("[ERROR][%s][findMessages][toArray] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
            callback(null, []);
          } 
          else {
            callback(null, results);
          } 
          connection.close();
        });
      } 
    });
    });
};

module.exports.getIqtisadiyyat = function(callback) {
    onConnect(function(err, connection){
        r.db(dbConfig.db).table('news').filter({'category_id':4,'enabled':1}).filter(function(newsItem){
                return newsItem("news_date").lt(Date());
        }).orderBy(r.desc('news_date')).limit(4).run(connection, function(err, cursor) {
      if(err) {
        logerror("[ERROR][%s][findMessages] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
        callback(null, []);
        connection.close();
      } 
      else {
        cursor.toArray(function(err, results) {
          if(err) {
            logerror("[ERROR][%s][findMessages][toArray] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
            callback(null, []);
          } 
          else {
            callback(null, results);
          } 
          connection.close();
        });
      } 
    });
    });
};

module.exports.getDunya = function(callback) {
    onConnect(function(err, connection){
        r.db(dbConfig.db).table('news').filter({'category_id':6,'enabled':1}).filter(function(newsItem){
                return newsItem("news_date").lt(Date());
        }).orderBy(r.desc('news_date')).limit(4).run(connection, function(err, cursor) {
      if(err) {
        logerror("[ERROR][%s][findMessages] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
        callback(null, []);
        connection.close();
      } 
      else {
        cursor.toArray(function(err, results) {
          if(err) {
            logerror("[ERROR][%s][findMessages][toArray] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
            callback(null, []);
          } 
          else {
            callback(null, results);
          } 
          connection.close();
        });
      } 
    });
    });
};

module.exports.getQafqaz = function(callback) {
    onConnect(function(err, connection){
        r.db(dbConfig.db).table('news').filter({'category_id':7,'enabled':1}).filter(function(newsItem){
                return newsItem("news_date").lt(Date());
        }).orderBy(r.desc('news_date')).limit(4).run(connection, function(err, cursor) {
      if(err) {
        logerror("[ERROR][%s][findMessages] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
        callback(null, []);
        connection.close();
      } 
      else {
        cursor.toArray(function(err, results) {
          if(err) {
            logerror("[ERROR][%s][findMessages][toArray] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
            callback(null, []);
          } 
          else {
            callback(null, results);
          } 
          connection.close();
        });
      } 
    });
    });
};

module.exports.getDin = function(callback) {
    onConnect(function(err, connection){
        r.db(dbConfig.db).table('news').filter({'category_id':8,'enabled':1}).filter(function(newsItem){
                return newsItem("news_date").lt(Date());
        }).orderBy(r.desc('news_date')).limit(4).run(connection, function(err, cursor) {
      if(err) {
        logerror("[ERROR][%s][findMessages] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
        callback(null, []);
        connection.close();
      } 
      else {
        cursor.toArray(function(err, results) {
          if(err) {
            logerror("[ERROR][%s][findMessages][toArray] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
            callback(null, []);
          } 
          else {
            callback(null, results);
          } 
          connection.close();
        });
      } 
    });
    });
};

module.exports.getMedeniyyet = function(callback) {
    onConnect(function(err, connection){
        r.db(dbConfig.db).table('news').filter({'category_id':10,'enabled':1}).filter(function(newsItem){
                return newsItem("news_date").lt(Date());
        }).orderBy(r.desc('news_date')).limit(4).run(connection, function(err, cursor) {
      if(err) {
        logerror("[ERROR][%s][findMessages] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
        callback(null, []);
        connection.close();
      } 
      else {
        cursor.toArray(function(err, results) {
          if(err) {
            logerror("[ERROR][%s][findMessages][toArray] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
            callback(null, []);
          } 
          else {
            callback(null, results);
          } 
          connection.close();
        });
      } 
    });
    });
};

module.exports.getKriminal = function(callback) {
    onConnect(function(err, connection){
        r.db(dbConfig.db).table('news').filter({'category_id':5,'enabled':1}).filter(function(newsItem){
                return newsItem("news_date").lt(Date());
        }).orderBy(r.desc('news_date')).limit(4).run(connection, function(err, cursor) {
      if(err) {
        logerror("[ERROR][%s][findMessages] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
        callback(null, []);
        connection.close();
      } 
      else {
        cursor.toArray(function(err, results) {
          if(err) {
            logerror("[ERROR][%s][findMessages][toArray] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
            callback(null, []);
          } 
          else {
            callback(null, results);
          } 
          connection.close();
        });
      } 
    });
    });
};

module.exports.getIdman = function(callback) {
    onConnect(function(err, connection){
        r.db(dbConfig.db).table('news').filter({'category_id':9,'enabled':1}).filter(function(newsItem){
                return newsItem("news_date").lt(Date());
        }).orderBy(r.desc('news_date')).limit(4).run(connection, function(err, cursor) {
      if(err) {
        logerror("[ERROR][%s][findMessages] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
        callback(null, []);
        connection.close();
      } 
      else {
        cursor.toArray(function(err, results) {
          if(err) {
            logerror("[ERROR][%s][findMessages][toArray] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
            callback(null, []);
          } 
          else {
            callback(null, results);
          } 
          connection.close();
        });
      } 
    });
    });
};

module.exports.getTopNews = function(callback) {
    onConnect(function(err, connection){
        r.db(dbConfig.db).table('news').filter({'enabled':1}).filter(function(newsItem){
                return newsItem("news_date").lt(Date());
        }).orderBy(r.desc('viewed')).limit(10).run(connection, function(err, cursor) {
      if(err) {
        logerror("[ERROR][%s][findMessages] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
        callback(null, []);
        connection.close();
      } 
      else {
        cursor.toArray(function(err, results) {
          if(err) {
            logerror("[ERROR][%s][findMessages][toArray] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
            callback(null, []);
          } 
          else {
            callback(null, results);
          } 
          connection.close();
        });
      } 
    });
    });
};

function onConnect(callback) {
  r.connect({host: dbConfig.host, port: dbConfig.port }, function(err, connection) {
    assert.ok(err === null, err);
    connection['_id'] = Math.floor(Math.random()*10001);
    callback(err, connection);
  });
}