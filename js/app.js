$(document).ready(function() {

	$("#inputData").keyup(function(e){
	    if((e.keyCode || e.which) == 13) {
	    	$('#trumpanalyze').trigger('click');
	    }
	});

    var jsonData;
    var hash = '';

    var SPREADSHEET_ID = '1R8_6iBrV4ee8Xp6N0gcZaDYLr929cq-kHWsAeuuzZBs';
    $.googleSheetToJSON(SPREADSHEET_ID).done(function(rows) {
        jsonData = rows;

        if(window.location.hash.replace('#','')) {
            hash = window.location.hash.replace('#','');
            
            var ii = 0;
            $.each(jsonData, function(key, value) {
                if(ii == hash) {

                    $("body").removeClass("noTransition");
                    var question = $("textarea").val();
                    $(".question").html(question);
                    $(".question").addClass("active");
                    $(".contentEdit").addClass("desactive");
                    $("section").addClass("execute");

                    var random = Math.floor(Math.random() * 6);
                    $(".faces span:eq(" + random + ")").addClass("active");
                    $('#fraseMaxima').html(value.frases);
    
                    setShareUrl(ii);

                }
                ii = ii+1;
            });                 
            
        }

    }).fail(function(err) {
        console.log('error!', err);
    });
                
    var random = Math.floor(Math.random() * 6);
    $(".faces span:eq(" + random + ")").addClass("spanOne");

    autosize(document.querySelectorAll('textarea'));

    $(".btnR").click(function() {
        $("body").addClass("noTransition");
        $(".question").removeClass("active");
        $(".contentEdit").removeClass("desactive");
        $(".faces span.active").removeClass("active");
        $("section").removeClass("execute");
        $("textarea").val("");

    });

    var normalize = (function() {
      var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç", 
          to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
          mapping = {};
     
      for(var i = 0, j = from.length; i < j; i++ )
          mapping[ from.charAt( i ) ] = to.charAt( i );
     
      return function( str ) {
          var ret = [];
          for( var i = 0, j = str.length; i < j; i++ ) {
              var c = str.charAt( i );
              if( mapping.hasOwnProperty( str.charAt( i ) ) )
                  ret.push( mapping[ c ] );
              else
                  ret.push( c );
          }      
          return ret.join( '' );
      }
     
    })();
    
    function setShareUrl(sid) {
        
        if(sid>0) {
            var tw_share = 'https://twitter.com/intent/tweet?url=http://especiales.clarin.com/preguntale-donald-trump/#'+sid+'&via=clarincom&text=Preguntale a Donald Trump&original_referer=http://especiales.clarin.com/preguntale-donald-trump/';
            var fb_share = 'https://www.facebook.com/sharer.php?u=http://especiales.clarin.com/preguntale-donald-trump/#'+sid;
            var wh_share = 'http://especiales.clarin.com/preguntale-donald-trump/#'+sid;                   
        } else {
            var tw_share = 'https://twitter.com/intent/tweet?url=http://especiales.clarin.com/preguntale-donald-trump/&via=clarincom&text=Preguntale a Donald Trump&original_referer=http://especiales.clarin.com/preguntale-donald-trump/';
            var fb_share = 'https://www.facebook.com/sharer.php?u=http://especiales.clarin.com/preguntale-donald-trump/';
            var wh_share = 'http://especiales.clarin.com/preguntale-donald-trump/';
        }

        $('.fb-share').attr('href',fb_share);
        $('.tw-share').attr('href',tw_share);
        $('.wh-share').data('href',wh_share);
        
    }

    function trim1(str) {
        return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }

    var isMobile = false;
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;            
    
    if(!isMobile) {
        $('.whatsapp').hide();
    }

    $("#trumpanalyze").click(function() {

        var inputData = $('#inputData').val();

        if (trim1(inputData) == '') {
        	$('#inputData').val(trim1(inputData));
            alert('Preguntame algo');
            return false;
        }
        inputData = inputData.toLowerCase();
        inputData = normalize(inputData);

        var frasesCandidatas = [];
        var allFrases = [];
        var fraseMaxima = '';
        var max = 0;
        var sid = 0;
        
        $.each(jsonData, function(key, value) {
            var frase = value.frases;
            var tags = value.tag.split(',');
            var count = 0;
            for (var i = 0; i < tags.length; i++) {
                if (tags[i].replace(' ', '') != '') {
                    var t = tags[i].toLowerCase();
                    t = normalize(t);
                    t = trim1(t);
                    
                    var re = new RegExp('\\b' + t + '\\b', 'g');
                    if(re.test(inputData)) {
                    	count = count+1;
                    }
                    //count = count + (inputData.match(new RegExp(t, "g")) || []).length;
                }
            }
            
            allFrases[value.fid] = value.frases;
            
            if (count) {
                if (count > 0 && count >= max) {
                    max = count;                    
                    frasesCandidatas.push(value.fid);
                }
            }
        });
                
        if(frasesCandidatas.length > 0) {
			sid = frasesCandidatas[Math.floor(Math.random() * frasesCandidatas.length)];
			fraseMaxima = allFrases[sid];
        }
                
        $("body").removeClass("noTransition");
        var question = $("textarea").val();
        $(".question").html(question);
        $(".question").addClass("active");
        $(".contentEdit").addClass("desactive");
        $("section").addClass("execute");

        if (fraseMaxima == '') {

            var frasesRandom = [
                "Haceme otra, eso es una pavada",
                "Esa pregunta está amañada, tira otra"
            ];

            fraseMaxima = frasesRandom[Math.floor(Math.random() * frasesRandom.length)]
            var random = 5;

        } else {
            var random = Math.floor(Math.random() * 6);
        }
        
        setShareUrl(sid);

        $(".faces span:eq(" + random + ")").addClass("active");
        $('#fraseMaxima').html(fraseMaxima);

    });
});
