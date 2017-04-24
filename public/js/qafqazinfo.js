      (function (i, s, o, g, r, a, m) {
          i['GoogleAnalyticsObject'] = r;
          i[r] = i[r] || function () {
              (i[r].q = i[r].q || []).push(arguments)
          }, i[r].l = 1 * new Date();
          a = s.createElement(o),
              m = s.getElementsByTagName(o)[0];
          a.async = 1;
          a.src = g;
          m.parentNode.insertBefore(a, m)
      })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

      ga('create', 'UA-42403691-1', 'qafqazinfo.az');
      ga('send', 'pageview');

      (function (d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s);
          js.id = id;
          js.async = true;
          js.src = "//connect.facebook.net/az_AZ/all.js#xfbml=1";
          fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));

      var socket = io().connect();
      socket.on('connect', function () {
          var data = {
              cssfiles: [{
                  file: '/css/bootstrap.min.css',
                  id: 'bootstrap-css'
              }, {
                  file: '/css/qafqazinfo.css',
                  id: 'qafqazinfo-css'
              }]
          };
          dust.render("tpl-partials\/meta.dust", data, function (err, out) {
                  if($('#bootstrap-css').length > 0){
                      // exists
                      console.log('css exists');
                  }else {
                    var timer = setInterval(function () {
                        $('head').append($(out));
                        if($('#bootstrap-css').length > 0){
                            clearInterval(timer)
                        }
                    }, 1000);
                  }
              dust.render("tpl-partials\/header.dust", '', function (err, out) {
                  $('header').html($(out));
              });
              
              dust.render("tpl-partials\/content.dust", {ad:true,'class':'sonxeber1'}, function (err, out) {
                  if($('.sonxeber1').length > 0){
                      // exists
                      console.log('exists');
                  }else {
                    var timer = setInterval(function () {
                        $(out).insertAfter('.manset-bottom-banner');
                        if($('.manset-bottom-banner').length > 0){
                            clearInterval(timer)
                        }
                    }, 1000);
                  }
              });
              
              socket.emit('getCats');
              socket.emit('breakingNews');
              socket.emit('manset');
              socket.emit('tribuna');
              socket.emit('hadise');
              socket.emit('xeber');
              socket.emit('lastNews1');
              socket.emit('siyaset');
              socket.emit('fotosessiya');
              socket.emit('qadin');
              socket.emit('bizdensize');
              socket.emit('musahibe');
              socket.emit('shou');
              socket.emit('lastNews2');
              socket.emit('sosial');
              socket.emit('kitabevi');
              socket.emit('topnews');
              socket.emit('iqtisadiyyat');
              socket.emit('dunya');
              socket.emit('qafqaz');
              socket.emit('din');
              socket.emit('medeniyyet');
              socket.emit('kriminal');
              socket.emit('idman');
          });
      });

      socket.on('gotCats', function (data) {
          dust.render("tpl-partials\/nav.dust", data, function (err, out) {
              $('.navbar-header').html($(out));
          });
      });

      socket.on('breakingNews', function (data) {
          dust.render('tpl-partials/toplinks.dust', data, function (err, out) {
              $('.toplinks').html($(out));
              $('.banner .col-xs-9').html($('<object width="728" height="90"><param name="movie" value="http://www.qafqazinfo.az/reklam/badamli.swf"><param name="wmode" value="transparent"><embed src="http://www.qafqazinfo.az/reklam/badamli.swf" width="728" height="90"></object>'));
          });
      });

      socket.on('manset', function (data) {
          dust.render('tpl-partials/manset.dust', data, function (err, out) {
              if($('#qafqazinfo-manset').length > 0){
                  // exists
                  console.log('exists');
              }else {
                var timer = setInterval(function () {
                    $('.content-left').prepend($(out));
                    $('<div class="manset-bottom-banner"><img src="http://ads.newmedia.az/www/images/0522a8f6215aa37e7e2061639cc1c006.jpg" alt="" height="" style=""></div>').insertAfter('#qafqazinfo-manset');
                    if($('.manset-bottom-banner').length > 0){
                        clearInterval(timer)
                    }
                }, 1000);
              }
          });
      });

      socket.on('lastNews1', function (data) {
          dust.render('tpl-partials/sonxeber1.dust', data, function (err, out) {
              if($('.sonxeber1 ul.sonxeber li').length > 0){
                  // exists
                  console.log('exists');
              }else {
                var timer = setInterval(function () {
                    $('.sonxeber1 ul.sonxeber').html($(out));
                    $('.index').first().html($('<iframe class="" src="http://www.azvision.az/qafqaza/rek.php" width="468" height="60" frameborder="0" scrolling="no" align="center"></iframe>'));
                    if($('.manset-bottom-banner').length > 0){
                        clearInterval(timer)
                    }
                }, 1000);
              }
          });
      });

      socket.on('xeber', function (data) {
          dust.render('tpl-partials/xeberpanel.dust', data, function (err, out) {
              if($('.xeber').length > 0){
                  // exists
                  console.log('exists');
              }else {
                var timer = setInterval(function () {
                    $('.index').append($(out));
                    if($('.xeber').length > 0){
                        clearInterval(timer)
                    }
                }, 1000);
              }
              if($('.'))
                  $('<div class="manset-bottom-banner"><img src="http://ads.newmedia.az/www/images/0522a8f6215aa37e7e2061639cc1c006.jpg" alt="" height="" style=""></div>').insertAfter('.xeber');
          });
      });

      socket.on('tribuna', function (data) {
          dust.render('tpl-partials/xeberpanel.dust', data, function (err, out) {
              if($('.tribuna').length > 0){
                  // exists
                  console.log('exists');
              }else {
                var timer = setInterval(function () {
                  $('.content-right').append($(out));
                  $('<iframe src="http://qafqazinfo.az/newmedia.php" frameborder="0" scrolling="no" width="300" height="250"></iframe>').insertBefore('.tribuna');
                  $('<iframe src="http://qafqazinfo.az/reklam/iframes/inteqral.html" style="border: 0px; display: none !important;" name="bakupost" scrolling="no" frameborder="0" marginheight="0px" marginwidth="0px" height="200px" width="300px"></iframe>').insertBefore('.tribuna');
                  $('<iframe id="a84845a5" name="a84845a5" src="http://migrate.adnetant.net/revive/www/delivery/afr.php?zoneid=38&amp;cb=INSERT_RANDOM_NUMBER_HERE" frameborder="0" scrolling="no" width="300" height="250" style="display: none !important;"></iframe>').insertBefore('.tribuna');
                  $('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="300" height="250" style="display: none !important;"><param name="movie" value="http://qafqazinfo.az/reklam/corella300x250.swf"><param name="quality" value="high"><embed src="http://qafqazinfo.az/reklam/corella300x250.swf" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="300" height="250"></object>').insertBefore('.tribuna');
                    if($('.tribuna').length > 0){
                        clearInterval(timer)
                    }
                }, 1000);
              }
          });
      });

      socket.on('hadise', function (data) {
          dust.render('tpl-partials/xeberpanel.dust', data, function (err, out) {
              if($('.hadise').length > 0){
                  // exists
                  console.log('exists');
              }else {
                var timer = setInterval(function () {
                    $(out).insertAfter('.tribuna');
                    if($('.hadise').length > 0){
                        clearInterval(timer)
                    }
                }, 1000);
              }
          });
      });

      socket.on('siyaset', function (data) {
          dust.render('tpl-partials/xeberpanel.dust', data, function (err, out) {
              if($('.siyaset').length > 0){
                  // exists
                  console.log('exists');
              }else {
                var timer = setInterval(function () {
                    $(out).insertAfter('.index2');
                    if($('.siyaset').length > 0){
                        clearInterval(timer)
                    }
                }, 1000);
              }
          });
      });

      socket.on('fotosessiya', function (data) {
          dust.render('tpl-partials/manset.dust', data, function (err, out) {
                if($('#qafqazinfo-manset2').length > 0){
                    // exists
                    console.log('exists');
                }else {
                    var timer = setInterval(function () {
                        $(out).insertAfter('.sonxeber1');
                        if($('#qafqazinfo-manset2').length > 0){
                            clearInterval(timer)
                        }
                    }, 1000);
                }
          });
            dust.render("tpl-partials\/content.dust", {class:'sonxeber2'}, function (err, out) {
                  if($('.sonxeber2').length > 0){
                      // exists
                      console.log('exists');
                  }else {
                    var timer = setInterval(function () {
                        $(out).insertAfter('#qafqazinfo-manset2');
                        if($('.sonxeber2').length > 0){
                            clearInterval(timer)
                        }
                    }, 1000);
                  }
            });
      });

      socket.on('qadin', function (data) {
          dust.render('tpl-partials/xeberpanel.dust', data, function (err, out) {
                if($('.qadin').length > 0){
                    // exists
                    console.log('exists');
                }else {
                    var timer = setInterval(function () {
                        $(out).insertAfter('.hadise');
                        $('<iframe class="qadin-alt" src="http://www.qafqazinfo.az/gsw/index.htm" width="300" height="185" frameborder="0" scrolling="no" align="center"></iframe>').insertAfter('.qadin');
                        if($('.qadin').length > 0){
                            clearInterval(timer)
                        }
                    }, 1000);
                }
          });
      });

      socket.on('bizdensize', function (data) {
          dust.render('tpl-partials/xeberpanel.dust', data, function (err, out) {
                if($('.bizdensize').length > 0){
                    // exists
                    console.log('exists');
                }else {
                    var timer = setInterval(function () {
                        $(out).insertAfter('.qadin-alt');
                        if($('.qadin-alt').length > 0){
                            clearInterval(timer)
                        }
                    }, 1000);
                }
          });
      });

      socket.on('lastNews2', function (data) {
          dust.render('tpl-partials/sonxeber1.dust', data, function (err, out) {
            if($('.sonxeber2 .col-xs-3 .sonxeber li').length > 0){
                // exists
                console.log('sonxeber2 exists');
            }else {
                console.log(out);
                var timer = setInterval(function () {
                    $('.sonxeber2 .col-xs-3 .sonxeber').html($(out));
                    if($('.sonxeber2 .sonxeber li').length > 0){
                        clearInterval(timer)
                    }
                }, 1000);
            }
          });
      });

      socket.on('shou', function (data) {
          dust.render('tpl-partials/xeberpanel.dust', data, function (err, out) {
                if($('.shou').length > 0){
                    // exists
                    console.log('exists');
                }else {
                    var timer = setInterval(function () {
                        $('.sonxeber2 .index').append($(out));
                        if($('.shou').length > 0){
                            clearInterval(timer)
                        }
                    }, 1000);
                }
          });
      });

      socket.on('sosial', function (data) {
          dust.render('tpl-partials/xeberpanel.dust', data, function (err, out) {
                if($('.sosial').length > 0){
                    // exists
                    console.log('exists');
                }else {
                    var timer = setInterval(function () {
                        $(out).insertAfter('.shou');
                        $('<iframe class="sosial-alt-banner" src="http://ikisahil.com/ikisahil_banner.html" width="470" height="70" frameborder="0" scrolling="no" align="center"></iframe>').insertAfter('.sosial')
                        if($('.sosial').length > 0){
                            clearInterval(timer)
                        }
                    }, 1000);
                }
          });
      });

      socket.on('musahibe', function (data) {
          dust.render('tpl-partials/xeberpanel.dust', data, function (err, out) {
                if($('.musahibe').length > 0){
                    // exists
                    console.log('exists');
                }else {
                    var timer = setInterval(function () {
                        $(out).insertAfter('.bizdensize');
                        if($('.musahibe').length > 0){
                            clearInterval(timer)
                        }
                    }, 1000);
                }
          });
      });

      socket.on('kitabevi', function (data) {
          dust.render('tpl-partials/xeberpanel.dust', data, function (err, out) {
                if($('.kitabevi').length > 0){
                    // exists
                    console.log('exists');
                }else {
                    var timer = setInterval(function () {
                        $(out).insertAfter('.musahibe');
                        if($('.kitabevi').length > 0){
                            clearInterval(timer)
                        }
                    }, 1000);
                }
          });
      });

      socket.on('iqtisadiyyat', function (data) {
          dust.render('tpl-partials/xeberpanel.dust', data, function (err, out) {
                if($('.iqtisadiyyat').length > 0){
                    // exists
                    console.log('exists');
                }else {
                    var timer = setInterval(function () {
                        $(out).insertAfter('.sosial-alt-banner');
                        if($('.iqtisadiyyat').length > 0){
                            clearInterval(timer)
                        }
                    }, 1000);
                }
          });
      });

      socket.on('dunya', function (data) {
          dust.render('tpl-partials/xeberpanel.dust', data, function (err, out) {
                if($('.dunya').length > 0){
                    // exists
                    console.log('exists');
                }else {
                    var timer = setInterval(function () {
                        $(out).insertAfter('.iqtisadiyyat');
                        if($('.dunya').length > 0){
                            clearInterval(timer)
                        }
                    }, 1000);
                }
          });
      });

      socket.on('qafqaz', function (data) {
          dust.render('tpl-partials/xeberpanel.dust', data, function (err, out) {
                if($('.qafqaz').length > 0){
                    // exists
                    console.log('exists');
                }else {
                    var timer = setInterval(function () {
                        $(out).insertAfter('.dunya');
                        if($('.qafqaz').length > 0){
                            clearInterval(timer)
                        }
                    }, 1000);
                }
          });
      });

      socket.on('din', function (data) {
          dust.render('tpl-partials/xeberpanel.dust', data, function (err, out) {
                if($('.din').length > 0){
                    // exists
                    console.log('exists');
                }else {
                    var timer = setInterval(function () {
                        $(out).insertAfter('.qafqaz');
                        if($('.din').length > 0){
                            clearInterval(timer)
                        }
                    }, 1000);
                }
          });
      });

      socket.on('medeniyyet', function (data) {
          dust.render('tpl-partials/xeberpanel.dust', data, function (err, out) {
                if($('.medeniyyet').length > 0){
                    // exists
                    console.log('exists');
                }else {
                    var timer = setInterval(function () {
                        $(out).insertAfter('.din');
                        if($('.medeniyyet').length > 0){
                            clearInterval(timer)
                        }
                    }, 1000);
                }
          });
      });

      socket.on('kriminal', function (data) {
          dust.render('tpl-partials/xeberpanel.dust', data, function (err, out) {
                if($('.kriminal').length > 0){
                    // exists
                    console.log('exists');
                }else {
                    var timer = setInterval(function () {
                        $(out).insertAfter('.medeniyyet');
                        if($('.kriminal').length > 0){
                            clearInterval(timer)
                        }
                    }, 1000);
                }
          });
      });

      socket.on('idman', function (data) {
          dust.render('tpl-partials/xeberpanel.dust', data, function (err, out) {
                if($('.idman').length > 0){
                    // exists
                    console.log('exists');
                }else {
                    var timer = setInterval(function () {
                        $(out).insertAfter('.kriminal');
                        if($('.idman').length > 0){
                            clearInterval(timer)
                        }
                    }, 1000);
                }
          });
      });

      socket.on('topnews', function (data) {
          dust.render('tpl-partials/xeberpanel.dust', data, function (err, out) {
                if($('.topnews').length > 0){
                    // exists
                    console.log('exists');
                }else {
                    var timer = setInterval(function () {
                        $(out).insertAfter('.kitabevi');
                        $('<iframe src="//www.facebook.com/plugins/likebox.php?href=https%3A%2F%2Fwww.facebook.com%2FQafqazInfo&amp;width=300&amp;height=290&amp;colorscheme=light&amp;show_faces=true&amp;header=true&amp;stream=false&amp;show_border=false&amp;appId=850653811627794" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:300px; height:290px;" allowtransparency="true"></iframe>').insertAfter('.topnews');
                        if($('.topnews').length > 0){
                            clearInterval(timer)
                        }
                    }, 1000);
                }
          });
      });