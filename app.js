var fs = require('fs'),
    express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    cons = require('consolidate'),
    kleiDust = require('klei-dust'),
    socket = require('socket.io'),
    request = require('request'),
    rdb = require('./lib/rethink'),
    slug = require('slug'),
    sanitizeHtml = require('sanitize-html'),
    moment = require('moment');

var index = require('./routes/index'); 
var categories = require('./routes/categories');
var news = require('./routes/news');

var app = express();
var io = socket();
app.io = io;

app.engine('dust', cons.dust);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('dust', kleiDust.dust);
app.set('view engine', 'dust');
app.set('view options', {
    layout: false,
    keepWhiteSpace: true,
    cache: true,
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

io.on('connection', function(socket){
        socket.on('getCats', function(){
                rdb.getCats(function (err, data) {
                    for(var i in data)
                    {
                        data[i].url=slug(data[i].title+' '+data[i].id,{lower: true});
                    }
                        socket.emit('gotCats', {'categories':data});
                });
        });

        socket.on('breakingNews', function(){
                rdb.getBreakingNews(function (err, data) {
                    for(var i in data)
                    {
                        var title_extra = sanitizeHtml(data[i].title_extra);
                        title_extra = title_extra.length>0?' - <span>'+sanitizeHtml(data[i].title_extra)+'</span>':'';
                        data[i].strippedTitle = sanitizeHtml(data[i].title)+title_extra;
                        data[i].specialcharedTitle = sanitizeHtml(data[i].strippedTitle);
                        data[i].link=slug(data[i].specialcharedTitle+' '+data[i].id,{lower: true});
                    }
                    socket.emit('breakingNews', {'breaking':data});
                });
        });

        socket.on('lastNews1', function(){
                rdb.getLastNews1(function (err, data) {
                    for(var i in data)
                    {
                        var title_extra = sanitizeHtml(data[i].title_extra);
                        title_extra = title_extra.length>0?' - <span>'+sanitizeHtml(data[i].title_extra)+'</span>':'';
                        data[i].strippedTitle = sanitizeHtml(data[i].title)+title_extra;
                        data[i].specialcharedTitle = sanitizeHtml(data[i].strippedTitle);
                        data[i].link=slug(data[i].specialcharedTitle+' '+data[i].id,{lower: true});
                        var datetime = new Date(data[i].news_date);
                        data[i].news_time = (datetime.getHours()<10?'0'+datetime.getHours():datetime.getHours())+':'+(datetime.getMinutes()<10?'0'+datetime.getMinutes():datetime.getMinutes());
                    }
                    var date = new Date();
                    socket.emit('lastNews1', {'date':date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear(),'lastNews1':data});
                });
        });
    
        socket.on('lastNews2', function(){
                rdb.getLastNews2(function (err, data) {
                    for(var i in data)
                    {
                        var title_extra = sanitizeHtml(data[i].title_extra);
                        title_extra = title_extra.length>0?' - <span>'+sanitizeHtml(data[i].title_extra)+'</span>':'';
                        data[i].strippedTitle = sanitizeHtml(data[i].title)+title_extra;
                        data[i].specialcharedTitle = sanitizeHtml(data[i].strippedTitle);
                        data[i].link=slug(data[i].specialcharedTitle+' '+data[i].id,{lower: true});
                        var datetime = new Date(data[i].news_date);
                        data[i].news_time = (datetime.getHours()<10?'0'+datetime.getHours():datetime.getHours())+':'+(datetime.getMinutes()<10?'0'+datetime.getMinutes():datetime.getMinutes());
                    }
                    socket.emit('lastNews2', {'lastNews1':data});
                });
        });
    
        socket.on('manset', function(){
                rdb.getManset(function (err, data) {
                    for(var i in data)
                    {
                        if(i==0)
                        {
                            data[i].isActive=1;
                        }
                        data[i].indicatorId=i;
                        data[i].indicatorId2=parseInt(1)+parseInt(i);
                        var title_extra = sanitizeHtml(data[i].title_extra);
                        title_extra = title_extra.length>0?' - <span>'+sanitizeHtml(data[i].title_extra)+'</span>':'';
                        data[i].strippedTitle = sanitizeHtml(data[i].title)+title_extra;
                        data[i].specialcharedTitle = sanitizeHtml(data[i].strippedTitle);
                        data[i].link=slug(data[i].specialcharedTitle+' '+data[i].id,{lower: true});
                        var datetime = new Date(data[i].news_date);
                        data[i].news_time = (datetime.getHours()<10?'0'+datetime.getHours():datetime.getHours())+':'+(datetime.getMinutes()<10?'0'+datetime.getMinutes():datetime.getMinutes());
                    }
                        socket.emit('manset', {'carouselId':'manset','manset':data});
                });
        });
    
        socket.on('xeber', function(){
                rdb.getCategoryXeber(function (err, data) {
                    for(var i = 0; i < data.length; i++)
                    {
                        if(i!=0)
                        {
                            delete data[i].news_img;
                        }
                        // delete authors
                        delete data[i].author;
                        data[i].description = data[i].content.replace(/(<([^>]+)>)/ig,"").substring(0,150);
                        var title_extra = sanitizeHtml(data[i].title_extra);
                        title_extra = title_extra.length>0?' - <span>'+sanitizeHtml(data[i].title_extra)+'</span>':'';
                        data[i].strippedTitle = sanitizeHtml(data[i].title)+title_extra;
                        data[i].specialcharedTitle = sanitizeHtml(data[i].strippedTitle);
                        data[i].link=slug(data[i].specialcharedTitle+' '+data[i].id,{lower: true});
                        var datetime = new Date(data[i].news_date);
                        data[i].news_time = (datetime.getHours()<10?'0'+datetime.getHours():datetime.getHours())+':'+(datetime.getMinutes()<10?'0'+datetime.getMinutes():datetime.getMinutes());
                    }
                        socket.emit('xeber', {'class':'xeber','categoryLink':'','categoryTitle':'Xəbər','newsList':data});
                });
        });
    
        socket.on('tribuna', function(){
                rdb.getTribuna(function (err, data) {
                    for(var i = 0; i < data.length; i++)
                    {
                        delete data[i].news_date;
                        data[i].description = data[i].content.replace(/(<([^>]+)>)/ig,"").substring(0,150);
                        var title_extra = sanitizeHtml(data[i].title_extra);
                        title_extra = title_extra.length>0?' - <span>'+sanitizeHtml(data[i].title_extra)+'</span>':'';
                        data[i].strippedTitle = sanitizeHtml(data[i].title)+title_extra;
                        data[i].specialcharedTitle = sanitizeHtml(data[i].strippedTitle);
                        data[i].link=slug(data[i].specialcharedTitle+' '+data[i].id,{lower: true});
                    }
                        socket.emit('tribuna', {'class':'tribuna','categoryTitle':'Tribuna','footerTitle':'Digər Tribuna xəbərləri','newsList':data});
                });
        });
    
        socket.on('hadise', function(){
                rdb.getHadise(function (err, data) {
                    for(var i = 0; i < data.length; i++)
                    {
                        if(i==0)
                        {
                            data[i].isActive=1;
                        }
                        data[i].indicatorId=i;
                        data[i].indicatorId2=parseInt(1)+parseInt(i);
                        var title_extra = sanitizeHtml(data[i].title_extra);
                        title_extra = title_extra.length>0?' - <span>'+sanitizeHtml(data[i].title_extra)+'</span>':'';
                        data[i].strippedTitle = sanitizeHtml(data[i].title)+title_extra;
                        data[i].specialcharedTitle = sanitizeHtml(data[i].strippedTitle);
                        data[i].link=slug(data[i].specialcharedTitle+' '+data[i].id,{lower: true});
                    }
                        socket.emit('hadise', {'class':'hadise','carouselId':'hadise','categoryTitle':'Hadisə','footerTitle':'Hadisə kateqoriyasındakı digər xəbərlər','carouselItems':data});
                });
        });
    
        socket.on('siyaset', function(){
                rdb.getCategorySiyaset(function (err, data) {
                    for(var i = 0; i < data.length; i++)
                    {
                        if(i!=0)
                        {
                            delete data[i].news_img;
                        }
                        // delete authors
                        delete data[i].author;
                        data[i].description = data[i].content.replace(/(<([^>]+)>)/ig,"").substring(0,150);
                        var title_extra = sanitizeHtml(data[i].title_extra);
                        title_extra = title_extra.length>0?' - <span>'+sanitizeHtml(data[i].title_extra)+'</span>':'';
                        data[i].strippedTitle = sanitizeHtml(data[i].title)+title_extra;
                        data[i].specialcharedTitle = sanitizeHtml(data[i].strippedTitle);
                        data[i].link=slug(data[i].specialcharedTitle+' '+data[i].id,{lower: true});
                        var datetime = new Date(data[i].news_date);
                        data[i].news_time = (datetime.getHours()<10?'0'+datetime.getHours():datetime.getHours())+':'+(datetime.getMinutes()<10?'0'+datetime.getMinutes():datetime.getMinutes());
                    }
                        socket.emit('siyaset', {'class':'siyaset','categoryTitle':'Siyasət','newsList':data});
                });
        });
    
        socket.on('fotosessiya', function(){
                rdb.getFotosessiya(function (err, data) {
                    for(var i in data)
                    {
                        if(i==0)
                        {
                            data[i].isActive=1;
                        }
                        data[i].indicatorId=i;
                        var title_extra = sanitizeHtml(data[i].title_extra);
                        title_extra = title_extra.length>0?' - <span>'+sanitizeHtml(data[i].title_extra)+'</span>':'';
                        data[i].strippedTitle = sanitizeHtml(data[i].title)+title_extra;
                        data[i].specialcharedTitle = sanitizeHtml(data[i].strippedTitle);
                        data[i].link=slug(data[i].specialcharedTitle+' '+data[i].id,{lower: true});
                        var datetime = new Date(data[i].news_date);
                        data[i].news_time = (datetime.getHours()<10?'0'+datetime.getHours():datetime.getHours())+':'+(datetime.getMinutes()<10?'0'+datetime.getMinutes():datetime.getMinutes());
                    }
                        socket.emit('fotosessiya', {'carouselId':'manset2','manset':data});
                });
        });
    
        socket.on('qadin', function(){
                rdb.getQadin(function (err, data) {
                    for(var i in data)
                    {
                        if(i==0)
                        {
                            data[i].isActive=1;
                        }
                        data[i].indicatorId=i;
                        data[i].indicatorId2=parseInt(1)+parseInt(i);
                        var title_extra = sanitizeHtml(data[i].title_extra);
                        title_extra = title_extra.length>0?' - <span>'+sanitizeHtml(data[i].title_extra)+'</span>':'';
                        data[i].strippedTitle = sanitizeHtml(data[i].title)+title_extra;
                        data[i].specialcharedTitle = sanitizeHtml(data[i].strippedTitle);
                        data[i].link=slug(data[i].specialcharedTitle+' '+data[i].id,{lower: true});
                    }
                        socket.emit('qadin', {'class':'qadin','carouselId':'qadin','categoryTitle':'Qadın','footerTitle':'Qadın kateqoriyasındakı digər xəbərlər','carouselItems':data});
                });
        });
    
        socket.on('bizdensize', function(){
                rdb.getBizdenSize(function (err, data) {
                    for(var i in data)
                    {
                        if(i==0)
                        {
                            data[i].isActive=1;
                        }
                        data[i].indicatorId=i;
                        data[i].indicatorId2=parseInt(1)+parseInt(i);
                        var title_extra = sanitizeHtml(data[i].title_extra);
                        title_extra = title_extra.length>0?' - <span>'+sanitizeHtml(data[i].title_extra)+'</span>':'';
                        data[i].strippedTitle = sanitizeHtml(data[i].title)+title_extra;
                        data[i].specialcharedTitle = sanitizeHtml(data[i].strippedTitle);
                        data[i].link=slug(data[i].specialcharedTitle+' '+data[i].id,{lower: true});
                    }
                        socket.emit('bizdensize', {'class':'bizdensize','carouselId':'bizdensize','categoryTitle':'Bizdən sizə','footerTitle':'Bizdən sizə kateqoriyasındakı digər xəbərlər','carouselItems':data});
                });
        });
    
        socket.on('musahibe', function(){
                rdb.getMusahibe(function (err, data) {
                    for(var i in data)
                    {
                        if(i==0)
                        {
                            data[i].isActive=1;
                        }
                        data[i].indicatorId=i;
                        data[i].indicatorId2=parseInt(1)+parseInt(i);
                        var title_extra = sanitizeHtml(data[i].title_extra);
                        title_extra = title_extra.length>0?' - <span>'+sanitizeHtml(data[i].title_extra)+'</span>':'';
                        data[i].strippedTitle = sanitizeHtml(data[i].title)+title_extra;
                        data[i].specialcharedTitle = sanitizeHtml(data[i].strippedTitle);
                        data[i].link=slug(data[i].specialcharedTitle+' '+data[i].id,{lower: true});
                    }
                        socket.emit('musahibe', {'class':'musahibe','carouselId':'musahibe','categoryTitle':'Müsahibə','footerTitle':'Müsahibə kateqoriyasındakı digər xəbərlər','carouselItems':data});
                });
        });
    
        socket.on('kitabevi', function(){
                rdb.getKitabevi(function (err, kitabevi) {
                    for(var i in kitabevi)
                    {
                        if(i==0)
                        {
                            kitabevi[i].isActive=1;
                        }
                        kitabevi[i].indicatorId=i;
                        kitabevi[i].indicatorId2=parseInt(1)+parseInt(i);
                    }
                        socket.emit('kitabevi', {'class':'kitabevi','carouselId':'kitabevi','categoryTitle':'Kitab evi','footerTitle':'Kitab evi kateqoriyasındakı digər xəbərlər','carouselItems':kitabevi});
                });
        });
    
        socket.on('shou', function(){
                rdb.getShou(function (err, data) {
                    for(var i = 0; i < data.length; i++)
                    {
                        if(i!=0)
                        {
                            delete data[i].news_img;
                        }
                        // delete authors
                        delete data[i].author;
                        data[i].description = data[i].content.replace(/(<([^>]+)>)/ig,"").substring(0,150);
                        var title_extra = sanitizeHtml(data[i].title_extra);
                        title_extra = title_extra.length>0?' - <span>'+sanitizeHtml(data[i].title_extra)+'</span>':'';
                        data[i].strippedTitle = sanitizeHtml(data[i].title)+title_extra;
                        data[i].specialcharedTitle = sanitizeHtml(data[i].strippedTitle);
                        data[i].link=slug(data[i].specialcharedTitle+' '+data[i].id,{lower: true});
                        var datetime = new Date(data[i].news_date);
                        data[i].news_time = (datetime.getHours()<10?'0'+datetime.getHours():datetime.getHours())+':'+(datetime.getMinutes()<10?'0'+datetime.getMinutes():datetime.getMinutes());
                    }
                        socket.emit('shou', {'class':'shou','categoryTitle':'Şou','newsList':data});
                });
        });
    
        socket.on('sosial', function(){
                rdb.getSosial(function (err, data) {
                    for(var i = 0; i < data.length; i++)
                    {
                        if(i!=0)
                        {
                            delete data[i].news_img;
                        }
                        // delete authors
                        delete data[i].author;
                        data[i].description = data[i].content.replace(/(<([^>]+)>)/ig,"").substring(0,150);
                        var title_extra = sanitizeHtml(data[i].title_extra);
                        title_extra = title_extra.length>0?' - <span>'+sanitizeHtml(data[i].title_extra)+'</span>':'';
                        data[i].strippedTitle = sanitizeHtml(data[i].title)+title_extra;
                        data[i].specialcharedTitle = sanitizeHtml(data[i].strippedTitle);
                        data[i].link=slug(data[i].specialcharedTitle+' '+data[i].id,{lower: true});
                        var datetime = new Date(data[i].news_date);
                        data[i].news_time = (datetime.getHours()<10?'0'+datetime.getHours():datetime.getHours())+':'+(datetime.getMinutes()<10?'0'+datetime.getMinutes():datetime.getMinutes());
                    }
                        socket.emit('sosial', {'class':'sosial','categoryTitle':'Sosial','newsList':data});
                });
        });
    
        socket.on('iqtisadiyyat', function(){
                rdb.getIqtisadiyyat(function (err, data) {
                    for(var i = 0; i < data.length; i++)
                    {
                        if(i!=0)
                        {
                            delete data[i].news_img;
                        }
                        // delete authors
                        delete data[i].author;
                        data[i].description = data[i].content.replace(/(<([^>]+)>)/ig,"").substring(0,150);
                        var title_extra = sanitizeHtml(data[i].title_extra);
                        title_extra = title_extra.length>0?' - <span>'+sanitizeHtml(data[i].title_extra)+'</span>':'';
                        data[i].strippedTitle = sanitizeHtml(data[i].title)+title_extra;
                        data[i].specialcharedTitle = sanitizeHtml(data[i].strippedTitle);
                        data[i].link=slug(data[i].specialcharedTitle+' '+data[i].id,{lower: true});
                        var datetime = new Date(data[i].news_date);
                        data[i].news_time = (datetime.getHours()<10?'0'+datetime.getHours():datetime.getHours())+':'+(datetime.getMinutes()<10?'0'+datetime.getMinutes():datetime.getMinutes());
                    }
                        socket.emit('iqtisadiyyat', {'class':'iqtisadiyyat','categoryTitle':'İqtisadiyyat','newsList':data});
                });
        });
    
        socket.on('dunya', function(){
                rdb.getDunya(function (err, data) {
                    for(var i = 0; i < data.length; i++)
                    {
                        if(i!=0)
                        {
                            delete data[i].news_img;
                        }
                        // delete authors
                        delete data[i].author;
                        data[i].description = data[i].content.replace(/(<([^>]+)>)/ig,"").substring(0,150);
                        var title_extra = sanitizeHtml(data[i].title_extra);
                        title_extra = title_extra.length>0?' - <span>'+sanitizeHtml(data[i].title_extra)+'</span>':'';
                        data[i].strippedTitle = sanitizeHtml(data[i].title)+title_extra;
                        data[i].specialcharedTitle = sanitizeHtml(data[i].strippedTitle);
                        data[i].link=slug(data[i].specialcharedTitle+' '+data[i].id,{lower: true});
                        var datetime = new Date(data[i].news_date);
                        data[i].news_time = (datetime.getHours()<10?'0'+datetime.getHours():datetime.getHours())+':'+(datetime.getMinutes()<10?'0'+datetime.getMinutes():datetime.getMinutes());
                    }
                        socket.emit('dunya', {'class':'dunya','categoryTitle':'Dünya','newsList':data});
                });
        });
    
        socket.on('qafqaz', function(){
                rdb.getQafqaz(function (err, data) {
                    for(var i = 0; i < data.length; i++)
                    {
                        if(i!=0)
                        {
                            delete data[i].news_img;
                        }
                        // delete authors
                        delete data[i].author;
                        data[i].description = data[i].content.replace(/(<([^>]+)>)/ig,"").substring(0,150);
                        var title_extra = sanitizeHtml(data[i].title_extra);
                        title_extra = title_extra.length>0?' - <span>'+sanitizeHtml(data[i].title_extra)+'</span>':'';
                        data[i].strippedTitle = sanitizeHtml(data[i].title)+title_extra;
                        data[i].specialcharedTitle = sanitizeHtml(data[i].strippedTitle);
                        data[i].link=slug(data[i].specialcharedTitle+' '+data[i].id,{lower: true});
                        var datetime = new Date(data[i].news_date);
                        data[i].news_time = (datetime.getHours()<10?'0'+datetime.getHours():datetime.getHours())+':'+(datetime.getMinutes()<10?'0'+datetime.getMinutes():datetime.getMinutes());
                    }
                        socket.emit('qafqaz', {'class':'qafqaz','categoryTitle':'Qafqaz','newsList':data});
                });
        });
    
        socket.on('din', function(){
                rdb.getDin(function (err, data) {
                    for(var i = 0; i < data.length; i++)
                    {
                        if(i!=0)
                        {
                            delete data[i].news_img;
                        }
                        // delete authors
                        delete data[i].author;
                        data[i].description = data[i].content.replace(/(<([^>]+)>)/ig,"").substring(0,150);
                        var title_extra = sanitizeHtml(data[i].title_extra);
                        title_extra = title_extra.length>0?' - <span>'+sanitizeHtml(data[i].title_extra)+'</span>':'';
                        data[i].strippedTitle = sanitizeHtml(data[i].title)+title_extra;
                        data[i].specialcharedTitle = sanitizeHtml(data[i].strippedTitle);
                        data[i].link=slug(data[i].specialcharedTitle+' '+data[i].id,{lower: true});
                        var datetime = new Date(data[i].news_date);
                        data[i].news_time = (datetime.getHours()<10?'0'+datetime.getHours():datetime.getHours())+':'+(datetime.getMinutes()<10?'0'+datetime.getMinutes():datetime.getMinutes());
                    }
                        socket.emit('din', {'class':'din','categoryTitle':'Din','newsList':data});
                });
        });
    
        socket.on('medeniyyet', function(){
                rdb.getMedeniyyet(function (err, data) {
                    for(var i = 0; i < data.length; i++)
                    {
                        if(i!=0)
                        {
                            delete data[i].news_img;
                        }
                        // delete authors
                        delete data[i].author;
                        data[i].description = data[i].content.replace(/(<([^>]+)>)/ig,"").substring(0,150);
                        var title_extra = sanitizeHtml(data[i].title_extra);
                        title_extra = title_extra.length>0?' - <span>'+sanitizeHtml(data[i].title_extra)+'</span>':'';
                        data[i].strippedTitle = sanitizeHtml(data[i].title)+title_extra;
                        data[i].specialcharedTitle = sanitizeHtml(data[i].strippedTitle);
                        data[i].link=slug(data[i].specialcharedTitle+' '+data[i].id,{lower: true});
                        var datetime = new Date(data[i].news_date);
                        data[i].news_time = (datetime.getHours()<10?'0'+datetime.getHours():datetime.getHours())+':'+(datetime.getMinutes()<10?'0'+datetime.getMinutes():datetime.getMinutes());
                    }
                        socket.emit('medeniyyet', {'class':'medeniyyet','categoryTitle':'Mədəniyyət','newsList':data});
                });
        });
    
        socket.on('kriminal', function(){
                rdb.getKriminal(function (err, data) {
                    for(var i = 0; i < data.length; i++)
                    {
                        if(i!=0)
                        {
                            delete data[i].news_img;
                        }
                        // delete authors
                        delete data[i].author;
                        data[i].description = data[i].content.replace(/(<([^>]+)>)/ig,"").substring(0,150);
                        var title_extra = sanitizeHtml(data[i].title_extra);
                        title_extra = title_extra.length>0?' - <span>'+sanitizeHtml(data[i].title_extra)+'</span>':'';
                        data[i].strippedTitle = sanitizeHtml(data[i].title)+title_extra;
                        data[i].specialcharedTitle = sanitizeHtml(data[i].strippedTitle);
                        data[i].link=slug(data[i].specialcharedTitle+' '+data[i].id,{lower: true});
                        var datetime = new Date(data[i].news_date);
                        data[i].news_time = (datetime.getHours()<10?'0'+datetime.getHours():datetime.getHours())+':'+(datetime.getMinutes()<10?'0'+datetime.getMinutes():datetime.getMinutes());
                    }
                        socket.emit('kriminal', {'class':'kriminal','categoryTitle':'Kriminal','newsList':data});
                });
        });
    
        socket.on('idman', function(){
                rdb.getIdman(function (err, data) {
                    for(var i = 0; i < data.length; i++)
                    {
                        if(i!=0)
                        {
                            delete data[i].news_img;
                        }
                        // delete authors
                        delete data[i].author;
                        data[i].description = data[i].content.replace(/(<([^>]+)>)/ig,"").substring(0,150);
                        var title_extra = sanitizeHtml(data[i].title_extra);
                        title_extra = title_extra.length>0?' - <span>'+sanitizeHtml(data[i].title_extra)+'</span>':'';
                        data[i].strippedTitle = sanitizeHtml(data[i].title)+title_extra;
                        data[i].specialcharedTitle = sanitizeHtml(data[i].strippedTitle);
                        data[i].link=slug(data[i].specialcharedTitle+' '+data[i].id,{lower: true});
                        var datetime = new Date(data[i].news_date);
                        data[i].news_time = (datetime.getHours()<10?'0'+datetime.getHours():datetime.getHours())+':'+(datetime.getMinutes()<10?'0'+datetime.getMinutes():datetime.getMinutes());
                    }
                        socket.emit('idman', {'class':'idman','categoryTitle':'İdman','newsList':data});
                });
        });
    
        socket.on('topnews', function(){
                rdb.getTopNews(function (err, topnews) {
//                    for(var i = 0; i < topnews.length; i++)
//                    {
//                        delete topnews[i].news_date;
//                    }
                    socket.emit('topnews', {'class':'topnews','categoryTitle':'Ən çox oxunan xəbərlər','newsList':topnews});
                });
        });
    

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;